# lxy-common-mybatis 代码结构说明

## 1. 文档主题概述

`lxy-common-mybatis` 负责 MyBatis-Plus 的核心插件装配、分页、数据权限、主键生成、实体填充和异常处理。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-mybatis/src/main/java/cn/com/lxy/common/mybatis`

## 3. 核心内容梳理

### 3.1 分页与插件

- `MybatisPlusConfig`
- `PaginationInnerInterceptor`
- `OptimisticLockerInnerInterceptor`

### 3.2 数据权限

- `DataPermission`
- `DataColumn`
- `DataPermissionHelper`
- `DataPermissionInterceptor`
- `MyDataPermissionHandler`

### 3.3 基类与填充

- `BaseEntity`
- `MyBaseMapper`
- `InjectionMetaObjectHandler`
- `MyPostInitTableInfoHandler`

### 3.4 ID 生成

- `IdGeneratorUtil`
- `DefaultIdentifierGenerator`

## 4. 关键实现说明

- `MybatisPlusConfig` 会优先把 `TenantLineInnerInterceptor` 放到插件链最前面。
- 分页插件启用了 `overflow=true`。
- `DataPermissionInterceptor` 同时处理查询和 update/delete。
- `DataPermissionHelper.ignore()` 可临时跳过数据权限。
- `idGenerator()` 使用网卡信息绑定雪花 ID，降低集群重复风险。

## 5. 使用方式或示例

分页查询通常搭配 `PageQuery` 和 `TableDataInfo<T>` 使用。

```java
public TableDataInfo<SysUserVo> list(SysUserBo bo, PageQuery pageQuery) {
    return sysUserService.selectPage(bo, pageQuery);
}
```

数据权限示例：

```java
@DataPermission({
    @DataColumn(key = "deptId", value = "dept_id")
})
```

## 6. 注意事项

- Mapper 接口和 XML 必须一起看，数据权限 SQL 最终会落在真实查询语句上。
- `tenant.enable` 和 MyBatis 插件顺序有关，改动时要同步验证租户条件。
- `DataPermissionHelper.ignore()` 与 `TenantHelper.ignore()` 都会影响插件行为，排查时要区分。

## 7. 待确认项

- 当前仓库没有把所有数据权限注解的完整使用场景都铺开，后续如新增业务模块需要再补。
