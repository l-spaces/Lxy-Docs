# lxy-snailjob-server 代码结构说明

## 1. 文档主题概述

`lxy-snailjob-server` 是独立部署的 SnailJob Server 启动模块，用于提供任务调度控制台和服务端能力。

它不是主业务模块，而是与 `lxy-job` 这类客户端示例模块配套的调度服务端。

## 2. 对应源码位置

### 2.1 启动入口

- `lxy-extend/lxy-snailjob-server/src/main/java/cn/com/lxy/snailjob/SnailJobServerApplication.java`

### 2.2 过滤与安全

- `lxy-extend/lxy-snailjob-server/src/main/java/com/aizuda/snailjob/server/starter/filter/ActuatorAuthFilter.java`
- `lxy-extend/lxy-snailjob-server/src/main/java/com/aizuda/snailjob/server/starter/filter/SecurityConfig.java`

### 2.3 资源配置

- `lxy-extend/lxy-snailjob-server/src/main/resources/application.yml`
- `lxy-extend/lxy-snailjob-server/src/main/resources/application-dev.yml`
- `lxy-extend/lxy-snailjob-server/src/main/resources/application-prod.yml`
- `lxy-extend/lxy-snailjob-server/src/main/resources/banner.txt`
- `lxy-extend/lxy-snailjob-server/src/main/resources/logback.xml`

## 3. 核心内容梳理

### 3.1 启动类是壳，真正运行的是上游 Server

本模块的 `main` 方法并不是直接启动本类，而是运行：

`com.aizuda.snailjob.server.SnailJobServerApplication`

这说明当前项目把 SnailJob Server 当作上游服务的启动壳来使用。

### 3.2 配置文件已经给出服务端约束

从 `application.yml` 可以确认：

- 服务端口是 `8800`
- 上下文路径是 `/snail-job`
- `management.endpoints.web.exposure.include=*`
- `management.endpoint.health.show-details=ALWAYS`
- 控制台静态资源目录是 `classpath:admin/`

### 3.3 Actuator 认证单独处理

`SecurityConfig` 注册了 `ActuatorAuthFilter`，对 `/actuator` 和 `/actuator/*` 做 Basic Auth 认证。

认证凭据来自：

- `spring.boot.admin.client.username`
- `spring.boot.admin.client.password`

## 4. 关键实现说明

### 4.1 不是简单的“跑一个页面”

这个模块实际上把以下能力组合在了一起：

- SnailJob Server 主程序
- 控制台静态资源
- MyBatis Plus 数据访问配置
- Actuator 认证保护

### 4.2 与客户端任务模块联动

`lxy-job` 里的任务示例会依赖这个服务端提供调度、执行和管理能力。

因此这里不是单独看 UI，而要结合客户端任务定义和数据库元数据一起理解。

### 4.3 数据库元数据是必需的

调度服务端依赖 `script/sql/ry_job.sql` 中的元数据表才能正常管理任务。

这意味着：

- 没有初始化 SQL，服务端不能只靠启动成功就算完整可用
- 调度配置和运行状态都落在数据库侧

## 5. 使用方式或示例

### 5.1 启动方式

直接启动 `cn.com.lxy.snailjob.SnailJobServerApplication`。

### 5.2 访问地址

启动后可通过：

- `http://localhost:8800/snail-job`

访问服务端控制台。

### 5.3 跟客户端配套

客户端任务模块通常需要：

1. 先启动 SnailJob Server
2. 再启动 `lxy-job` 相关客户端任务
3. 最后在控制台中配置任务和调度策略

## 6. 注意事项

- 本模块是独立服务，不是主业务模块
- `main` 方法实际启动的是上游 SnailJob Server 类，不要误解为只启动当前包下的壳类
- `ActuatorAuthFilter` 使用的是 Basic Auth，配置要和实际部署一致
- 生产环境需要重点确认数据源账号、服务端口和服务注册配置
- `application-dev.yml` 与 `application-prod.yml` 里有示例连接串，正式环境必须替换

## 7. 待确认项

- SnailJob 控制台的详细业务能力是否还有外部配置未落到仓库
- `snail-job.server-port` 等服务端内部端口参数在不同版本下的语义是否完全一致

