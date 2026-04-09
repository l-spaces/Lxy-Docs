# lxy-monitor-admin 代码结构说明

## 1. 文档主题概述

`lxy-monitor-admin` 是独立部署的 Spring Boot Admin Server，用于汇总和展示业务应用的运行状态、健康检查和管理信息。

它不属于主业务模块，而是一个独立的运维支撑服务。

## 2. 对应源码位置

### 2.1 启动类

- `lxy-extend/lxy-monitor-admin/src/main/java/cn/com/lxy/monitor/admin/MonitorAdminApplication.java`

### 2.2 安全与通知

- `lxy-extend/lxy-monitor-admin/src/main/java/cn/com/lxy/monitor/admin/config/SecurityConfig.java`
- `lxy-extend/lxy-monitor-admin/src/main/java/cn/com/lxy/monitor/admin/notifier/CustomNotifier.java`

### 2.3 资源配置

- `lxy-extend/lxy-monitor-admin/src/main/resources/application.yml`
- `lxy-extend/lxy-monitor-admin/src/main/resources/banner.txt`
- `lxy-extend/lxy-monitor-admin/src/main/resources/logback.xml`

## 3. 核心内容梳理

### 3.1 服务定位

这个模块的职责很明确：

- 作为 Spring Boot Admin Server 提供监控 UI
- 收集被监控应用的运行状态
- 对 actuator 端点做基础认证保护

### 3.2 安全配置

`SecurityConfig` 通过 `ActuatorAuthFilter` 对 `/actuator` 和 `/actuator/*` 做过滤。

`ActuatorAuthFilter` 使用 Basic Auth 方式校验用户名和密码，认证信息来自：

- `spring.boot.admin.client.username`
- `spring.boot.admin.client.password`

### 3.3 运行配置

`application.yml` 里能确认以下配置：

- 服务端口是 `9090`
- Admin UI 上下文路径是 `/admin`
- `management.endpoints.web.exposure.include=*`
- `management.endpoint.health.show-details=ALWAYS`

## 4. 关键实现说明

### 4.1 Actuator 认证是单独拦截器做的

不是靠复杂的 Spring Security 链条硬拼，而是通过 `FilterRegistrationBean<ActuatorAuthFilter>` 专门拦 `/actuator` 相关路径。

这意味着：

- 管理端点有独立保护
- 认证策略简单直接
- 配置和实现都比较明确

### 4.2 监控账号来自配置占位符

当前配置使用了 `@monitor.username@` 和 `@monitor.password@` 之类的占位符，说明真正运行时账号密码通常由 profile 或构建参数提供。

## 5. 使用方式或示例

### 5.1 启动后访问

启动后可以通过：

- `http://localhost:9090/admin`

访问 Admin UI。

### 5.2 业务应用接入

如果业务应用要注册到这个监控中心，需要在业务应用里配置 Spring Boot Admin Client，并把 `url` 指向当前 Admin Server。

### 5.3 Actuator 请求方式

访问 Actuator 相关接口时，需要带上 Basic Auth 认证头，否则会收到 401。

## 6. 注意事项

- 这是独立服务，不是主业务模块
- `spring.boot.admin.client.enabled` 当前在本模块配置中是开启状态，是否作为自注册示例使用，需结合部署方式再确认
- 认证信息要和业务应用接入配置保持一致
- `management.endpoints.web.exposure.include=*` 在生产环境要谨慎评估

## 7. 待确认项

- `CustomNotifier` 具体通知渠道和告警触发条件是否还有额外配置
- 当前 `spring.boot.admin.client.enabled=true` 是否仅用于示例自注册，还是正式部署也按此方式工作

