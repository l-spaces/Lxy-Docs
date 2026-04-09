# lxy-common-tenant 代码结构说明

## 1. 文档主题概述

`lxy-common-tenant` 负责租户行级隔离、Redis / Cache / Sa-Token 的租户化适配，以及动态租户切换。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-tenant/src/main/java/cn/com/lxy/common/tenant`

## 3. 核心内容梳理

### 3.1 行级隔离

- `TenantConfig`
- `MyTenantLineHandler`
- `TenantProperties`

### 3.2 缓存隔离

- `TenantKeyPrefixHandler`
- `TenantSpringCacheManager`

### 3.3 登录态隔离

- `TenantSaTokenDao`
- `TenantHelper`

## 4. 关键实现说明

- `tenant.enable=true` 时才启用该模块。
- `TenantConfig` 会注册 MyBatis-Plus 租户拦截器，并替换 Redisson / Spring Cache / Sa-Token 的实现。
- `TenantHelper.dynamic()` 用于临时切换租户，`clearDynamic()` 负责清理。
- `TenantSaTokenDao` 会在原 Redis key 前增加 `global:`，避免和业务 key 混淆。

## 5. 使用方式或示例

动态执行：

```java
TenantHelper.dynamic(tenantId, () -> {
    return userMapper.selectVoOne(...);
});
```

读取当前租户：

```java
String tenantId = TenantHelper.getTenantId();
```

## 6. 注意事项

- `tenant.excludes` 只是租户表排除列表，不是接口白名单。
- `TenantHelper.ignore()` 只适用于确实要跳过租户的场景，不能滥用。
- Redis key 前缀、Cache 名称和 Sa-Token DAO 都会叠加租户逻辑，排查问题时要一起看。

## 7. 待确认项

- `TenantHelper.setDynamic(..., true)` 的全局动态租户用法当前没有完整业务示例，建议在实际需求出现时再补充。
