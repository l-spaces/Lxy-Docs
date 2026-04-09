# lxy-common-security 代码结构说明

## 1. 文档主题概述

`lxy-common-security` 负责路由级安全拦截、白名单处理和 Actuator 访问控制，是认证体系外层的“入口门禁”。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-security/src/main/java/cn/com/lxy/common/security`

## 3. 核心内容梳理

### 3.1 路由门禁

- `SecurityConfig`
- `SecurityProperties`

### 3.2 全量 URL 校验

- `AllUrlHandler`

## 4. 关键实现说明

- `SecurityConfig` 用 `SaInterceptor` 做统一登录校验。
- 真实放行列表来源于 `security.excludes`。
- 进入拦截的请求还会校验请求头/参数里的 `clientid` 是否和 token 扩展信息一致。
- `getSaServletFilter()` 会用 `spring.boot.admin.client.username/password` 保护 `/actuator/**`。

## 5. 使用方式或示例

放行路径配置示例：

```yaml
security:
  excludes:
    - /auth/login
    - /auth/code
    - /resource/sms/code
```

## 6. 注意事项

- 白名单不能只按页面判断，要结合接口实际调用链。
- 新增匿名接口时，要同步检查 `@SaIgnore`、`security.excludes` 和路由是否都已覆盖。

## 7. 待确认项

- `AllUrlHandler` 的具体 URL 汇总范围取决于 Spring MVC 的实际映射结果，新增特殊路由时需要再次验证。
