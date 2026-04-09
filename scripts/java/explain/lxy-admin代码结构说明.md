# lxy-admin 代码结构说明

## 1. 文档主题概述

`lxy-admin` 是整个后端工程的主启动与应用装配模块。它本身不承载核心业务数据模型，主要负责：

- 提供 Spring Boot 主启动入口
- 适配外部 Servlet 容器部署
- 承接登录、验证码、首页等基础 Web 入口
- 组装认证、登录链路、在线用户监听等应用级能力

这个模块的定位是“装配层 + 入口层”，真正的系统管理、工作流、代码生成、演示能力都应该由 `lxy-common`、`lxy-modules`、`lxy-extend` 提供，`lxy-admin` 只做组合和入口。

## 2. 对应源码位置

### 2.1 启动与部署

- `lxy-admin/src/main/java/cn/com/lxy/StartApplication.java`
- `lxy-admin/src/main/java/cn/com/lxy/WebServletInitializer.java`

### 2.2 Web 入口

- `lxy-admin/src/main/java/cn/com/lxy/web/controller/AuthController.java`
- `lxy-admin/src/main/java/cn/com/lxy/web/controller/CaptchaController.java`
- `lxy-admin/src/main/java/cn/com/lxy/web/controller/IndexController.java`

### 2.3 登录与监听

- `lxy-admin/src/main/java/cn/com/lxy/web/service/IAuthStrategy.java`
- `lxy-admin/src/main/java/cn/com/lxy/web/service/SysLoginService.java`
- `lxy-admin/src/main/java/cn/com/lxy/web/service/SysRegisterService.java`
- `lxy-admin/src/main/java/cn/com/lxy/web/service/impl/PasswordAuthStrategy.java`
- `lxy-admin/src/main/java/cn/com/lxy/web/service/impl/SmsAuthStrategy.java`
- `lxy-admin/src/main/java/cn/com/lxy/web/service/impl/EmailAuthStrategy.java`
- `lxy-admin/src/main/java/cn/com/lxy/web/service/impl/SocialAuthStrategy.java`
- `lxy-admin/src/main/java/cn/com/lxy/web/service/impl/XcxAuthStrategy.java`
- `lxy-admin/src/main/java/cn/com/lxy/web/listener/UserActionListener.java`

### 2.4 资源配置

- `lxy-admin/src/main/resources/application.yml`
- `lxy-admin/src/main/resources/application-dev.yml`
- `lxy-admin/src/main/resources/application-prod.yml`
- `lxy-admin/src/main/resources/logback.xml`
- `lxy-admin/src/main/resources/banner.txt`
- `lxy-admin/src/main/resources/i18n/messages*.properties`
- `lxy-admin/src/main/resources/ip2region_v4.xdb`

## 3. 核心内容梳理

### 3.1 启动装配

`StartApplication` 是标准 Spring Boot 启动类，并启用了 `BufferingApplicationStartup(2048)`，说明项目对启动阶段性能观测是有意识配置的。

`WebServletInitializer` 继承 `SpringBootServletInitializer`，用于外部 Servlet 容器部署场景。

### 3.2 登录入口

`AuthController` 是主登录入口，负责把前端请求分发到不同认证策略：

- 用户名密码登录
- 手机验证码登录
- 邮箱验证码登录
- 第三方社交登录
- 小程序登录

`CaptchaController` 提供验证码相关入口，当前源码已存在图片验证码以及短信、邮箱验证码的配套接口。

`IndexController` 只负责最基础的首页访问提示，不承载业务页面逻辑。

### 3.3 登录链路

`IAuthStrategy` 是统一登录策略接口，当前实现包括：

- `PasswordAuthStrategy`
- `SmsAuthStrategy`
- `EmailAuthStrategy`
- `SocialAuthStrategy`
- `XcxAuthStrategy`

其中 `XcxAuthStrategy` 在当前仓库里仍是需要继续确认的实现点，不能简单视为完整可用的小程序登录。

`SysLoginService` 负责登录校验、用户构建、失败次数控制、最近登录信息更新等核心动作。

`SysRegisterService` 负责注册链路，包含验证码校验、密码加密、用户唯一性检查和注册落库。

### 3.4 登录行为监听

`UserActionListener` 实现 `SaTokenListener`，负责监听登录、退出、踢下线等行为，并维护在线用户缓存和登录日志。

这个监听器记录的信息以源码为准，包含：

- IP
- 登录地点
- 浏览器
- 操作系统
- token
- 用户名
- 客户端标识
- 设备类型
- 部门名称

## 4. 关键实现说明

### 4.1 认证链路不是写死在 Controller 里

`AuthController` 只做入口分发，真正的认证行为由 `IAuthStrategy` 策略实现。这样做的好处是：

- 认证方式可以扩展
- Controller 逻辑保持稳定
- 不同登录形态可以共享统一的登录结果构建与日志能力

### 4.2 登录态依赖 Sa-Token 和 Redis

登录成功后，`SysLoginService` 通过 Sa-Token 建立登录态，`UserActionListener` 再把在线用户信息写入 Redis。

这意味着：

- 不能只看数据库表判断在线状态
- 退出、踢下线、顶下线都需要结合缓存和 Sa-Token 一起理解

### 4.3 多租户和登录链路是联动的

登录时会校验租户状态、密码错误次数和锁定策略。`lxy-admin` 里不是单纯的账号密码验证，而是把租户能力、登录日志、在线用户缓存一起串起来。

### 4.4 配置驱动的入口能力

`application.yml` 里集中了这个模块最重要的运行开关：

- `captcha.enable`
- `sa-token.token-name`
- `security.excludes`
- `tenant.enable`
- `tenant.excludes`
- `mybatis-plus`
- `mybatis-encryptor.enable`
- `api-decrypt.enabled`
- `xss.enabled`
- `sse.enabled`
- `websocket.enabled`
- `warm-flow.enabled`

其中 `captcha.enable` 当前默认是 `false`，也就是说验证码功能虽然代码存在，但是否启用由配置决定。

## 5. 使用方式或示例

### 5.1 登录请求链路

典型流程是：

1. 前端先请求验证码接口
2. 调用 `/auth/login`
3. `AuthController` 根据登录类型分发给对应策略
4. `SysLoginService` 校验用户状态、租户状态与密码
5. `LoginHelper` 建立 Sa-Token 登录态
6. `UserActionListener` 写入在线用户和登录日志

### 5.2 新增登录方式

如果要增加一种新的登录方式，应优先：

1. 新增 `IAuthStrategy` 实现
2. 让 `AuthController` 的分发逻辑能够识别该类型
3. 复用 `SysLoginService` 的通用登录结果处理

### 5.3 配置示例

```yaml
sa-token:
  token-name: Authorization

captcha:
  enable: false
  type: math

tenant:
  enable: false
```

## 6. 注意事项

- `lxy-admin` 不应该承载系统管理业务逻辑，系统管理应放在 `lxy-modules/lxy-system`
- `XcxAuthStrategy` 不能默认当成完整实现，相关能力仍需确认
- 邮箱验证码、短信验证码是否真正可用，要结合具体配置和上游服务实现确认
- 登录、租户、在线用户都强依赖 Redis，不要只看数据库
- 如果修改了安全放行规则，需要同步检查 `application.yml` 中的 `security.excludes`

## 7. 待确认项

- `XcxAuthStrategy` 的最终完成度和可用范围
- 邮箱验证码模板 ID 和对应服务接入方式
- `ip2region_v4.xdb` 的具体调用链是否仅用于登录日志地点解析

