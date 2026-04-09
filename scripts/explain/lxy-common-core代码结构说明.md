# lxy-common-core 代码结构说明

## 1. 文档主题概述

`lxy-common-core` 是项目最底层的公共模块，提供返回体、登录模型、异常体系、通用常量、基础工具和校验分组。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-core/src/main/java/cn/com/lxy/common/core`

## 3. 核心内容梳理

### 3.1 配置与基础设施

- `ApplicationConfig`：开启 AOP 和异步调用
- `ThreadPoolConfig`：提供 `scheduledExecutorService`
- `ValidatorConfig`：校验器快速失败
- `LxyConfig`：读取 `lxy.*` 配置

### 3.2 常量与返回体

- `R<T>`
- `CacheConstants`
- `GlobalConstants`
- `SystemConstants`
- `TenantConstants`

### 3.3 登录与流程模型

- `LoginUser`
- `LoginBody` / `PasswordLoginBody` / `SmsLoginBody` / `EmailLoginBody` / `SocialLoginBody` / `XcxLoginBody`
- `RegisterBody`
- `UserOnlineDTO`
- `StartProcessDTO`、`CompleteTaskDTO`、`FlowCopyDTO` 等工作流 DTO

### 3.4 校验和工具

- `AddGroup` / `EditGroup` / `QueryGroup`
- `DictPattern` / `EnumPattern`
- `Xss`
- `ValidatorUtils`、`StringUtils`、`DateUtils`、`MapstructUtils`、`MessageUtils`、`ServletUtils`、`SpringUtils`

## 4. 关键实现说明

- `ThreadPoolConfig` 在 Spring Boot 3.5 下提供统一定时线程池，并在容器关闭时主动释放。
- `ValidatorConfig` 把 Hibernate Validator 配成 fail-fast，避免一次请求返回太多校验错误。
- `GlobalConstants` 和 `CacheConstants` 是上层安全、租户、Redis、登录链路的公共约束。

## 5. 使用方式或示例

典型写法：

```java
@Validated
@RestController
public class DemoController {
    @GetMapping("/ping")
    public R<String> ping() {
        return R.ok("ok");
    }
}
```

校验分组通常配合 `@Validated(AddGroup.class)`、`@Validated(EditGroup.class)` 使用。

## 6. 注意事项

- `common-core` 里既有模型也有工具，不要把它理解成“纯常量包”。
- 工作流 DTO 也放在这里，说明它是跨模块共享对象，不是某个业务模块私有对象。

## 7. 待确认项

- `RegexPatternPoolFactory`、`YmlPropertySourceFactory` 的扩展使用点在当前仓库里没有完整遍历，后续如有新调用方需要再补充。
