# lxy-common-satoken 代码结构说明

## 1. 文档主题概述

`lxy-common-satoken` 负责 Sa-Token 的 JWT 模式、权限接口实现、Token DAO 和异常统一处理。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-satoken/src/main/java/cn/com/lxy/common/satoken`

## 3. 核心内容梳理

### 3.1 登录态

- `SaTokenConfig`
- `LoginHelper`

### 3.2 权限抽象

- `SaPermissionImpl`

### 3.3 Token DAO

- `MySaTokenDao`

### 3.4 异常处理

- `SaTokenExceptionHandler`

## 4. 关键实现说明

- `SaTokenConfig` 使用 `StpLogicJwtForSimple`，说明当前登录态采用 JWT 简化模式。
- `MySaTokenDao` 通过 `RedisUtils` 存取 Token，并加了一层 Caffeine 本地缓存。
- `LoginHelper.login()` 会把 tenantId、userId、username、dept 等信息写入 token 扩展字段。
- `SaPermissionImpl` 会优先使用当前登录用户缓存的权限，必要时回退到 `PermissionService`。

## 5. 使用方式或示例

登录后获取上下文：

```java
Long userId = LoginHelper.getUserId();
String tenantId = LoginHelper.getTenantId();
boolean login = LoginHelper.isLogin();
```

权限校验：

```java
@SaCheckPermission("system:user:list")
@GetMapping("/user/list")
public R<List<UserVo>> list() {
    ...
}
```

## 6. 注意事项

- `LoginHelper` 依赖 `StpUtil.getExtra()`，如果登录时没有写入扩展信息，下游读取会为空。
- `SaPermissionImpl` 的 fallback 逻辑依赖 `PermissionService`，所以业务模块要提供对应实现。

## 7. 待确认项

- `APP_USER` 相关分支在当前实现里基本是占位逻辑，后续如果启用多端权限，需要再补业务实现。
