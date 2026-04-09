# lxy-system 代码结构说明

## 1. 文档主题概述

`lxy-system` 是系统管理核心业务模块，承载后端最典型的一组后台管理能力：

- 用户、角色、菜单、部门、岗位
- 字典、参数、公告
- 客户端、社交账号、租户、租户套餐
- OSS 配置与文件记录
- 登录日志、操作日志、在线用户、缓存查看

这个模块是典型的业务域模块，既提供 Controller，也提供 Service、Mapper、XML、实体和 VO，不应该再往 `lxy-admin` 里塞系统管理逻辑。

## 2. 对应源码位置

### 2.1 控制器

- `lxy-modules/lxy-system/src/main/java/cn/com/lxy/system/controller/system/*`
- `lxy-modules/lxy-system/src/main/java/cn/com/lxy/system/controller/monitor/*`

### 2.2 领域模型

- `lxy-modules/lxy-system/src/main/java/cn/com/lxy/system/domain/*`
- `lxy-modules/lxy-system/src/main/java/cn/com/lxy/system/domain/bo/*`
- `lxy-modules/lxy-system/src/main/java/cn/com/lxy/system/domain/vo/*`

### 2.3 持久层

- `lxy-modules/lxy-system/src/main/java/cn/com/lxy/system/mapper/*`
- `lxy-modules/lxy-system/src/main/resources/mapper/system/*Mapper.xml`

### 2.4 服务层

- `lxy-modules/lxy-system/src/main/java/cn/com/lxy/system/service/*`
- `lxy-modules/lxy-system/src/main/java/cn/com/lxy/system/service/impl/*`

### 2.5 启动初始化

- `lxy-modules/lxy-system/src/main/java/cn/com/lxy/system/runner/SystemApplicationRunner.java`

## 3. 核心内容梳理

### 3.1 系统管理主线

当前模块覆盖的主线可以直接从控制器看出来：

- `SysUserController`
- `SysRoleController`
- `SysMenuController`
- `SysDeptController`
- `SysPostController`
- `SysDictDataController`
- `SysDictTypeController`
- `SysConfigController`
- `SysNoticeController`
- `SysClientController`
- `SysSocialController`
- `SysTenantController`
- `SysTenantPackageController`
- `SysOssController`
- `SysOssConfigController`
- `SysLogininforController`
- `SysOperlogController`
- `SysUserOnlineController`
- `CacheController`

这说明该模块不只是“用户管理”，而是整个后台管理域的基础数据中心。

### 3.2 用户与权限

`SysUserController` 是最核心的入口之一，包含：

- 用户分页查询
- 导出、导入、导入模板
- 当前登录用户信息
- 用户详情
- 新增、编辑、删除
- 重置密码、修改状态
- 获取用户授权角色

它的依赖链是典型的：

`SysUserController` -> `ISysUserService` -> `SysUserMapper` -> `sys_user`

同时会联动角色、岗位、部门、租户与数据权限。

### 3.3 租户与套餐

`SysTenantController` 与 `SysTenantPackageController` 负责租户和套餐管理。

这部分是和 `lxy-common-tenant` 强绑定的，控制器本身也直接体现了租户约束：

- 只有超级管理员可访问
- 受 `tenant.enable` 控制
- 一些写操作带 `@Lock4j` 和 `@RepeatSubmit`

### 3.4 OSS 初始化

`SystemApplicationRunner` 在应用启动后会调用 `ISysOssConfigService.init()`，说明 OSS 配置不是完全依赖请求时加载，而是有启动阶段初始化动作。

### 3.5 Mapper 与 XML 一一对应

`lxy-system` 的 Mapper 接口和 XML 文件对应关系很明确，例如：

- `SysUserMapper.java` -> `mapper/system/SysUserMapper.xml`
- `SysRoleMapper.java` -> `mapper/system/SysRoleMapper.xml`
- `SysMenuMapper.java` -> `mapper/system/SysMenuMapper.xml`
- `SysTenantMapper.java` -> `mapper/system/SysTenantMapper.xml`
- `SysOssConfigMapper.java` -> `mapper/system/SysOssConfigMapper.xml`

这类模块修改 SQL 时，不能只改 Java 接口，XML 必须同步看。

## 4. 关键实现说明

### 4.1 Controller 不是裸 CRUD

以 `SysUserController` 为例，源码已经明确使用了：

- `@SaCheckPermission`
- `@Log`
- `@RepeatSubmit`
- `@ApiEncrypt`
- `@Validated`

这说明它不是普通 CRUD，而是带权限、审计、幂等和加密约束的后台接口。

### 4.2 数据权限和租户能力是横向约束

`SysUserController#getInfo()` 中使用了 `DataPermissionHelper.ignore(...)`，表明某些查询要显式绕过数据权限，避免当前登录态影响“查看自己的信息”。

`SysTenantController` 中使用了 `TenantHelper.ignore(...)`、`TenantHelper.setDynamic(...)` 和 `TenantHelper.clearDynamic()`，说明租户切换和租户隔离是有明确辅助工具链的，不是简单在 SQL 里拼条件。

### 4.3 控制器与配置强关联

例如：

- `tenant.enable` 决定租户相关接口是否生效
- `tenant.excludes` 决定哪些表不参与租户隔离
- `security.excludes` 决定哪些路径不走安全拦截
- `mybatis-plus.mapperLocations` 决定 XML 是否能被扫描到

### 4.4 启动即初始化

`SystemApplicationRunner` 的存在意味着系统管理模块在启动后就会执行初始化逻辑。当前源码确认的是 OSS 配置初始化，其他初始化动作如果要加，应该继续放在这里或类似的启动钩子里。

## 5. 使用方式或示例

### 5.1 查询当前用户信息

`SysUserController#getInfo()` 的目标是返回当前登录用户信息、菜单权限和角色权限。这个接口通常是前端登录成功后拉取用户上下文的入口。

### 5.2 新增用户

新增用户时，源码里已经做了这些检查：

- 部门数据权限检查
- 用户名唯一性检查
- 手机号唯一性检查
- 邮箱唯一性检查
- 租户剩余额度检查
- 密码 BCrypt 加密

这意味着新增用户不能只做“插入一条记录”。

### 5.3 新增系统接口的写法示例

```java
@SaCheckPermission("system:user:list")
@Log(title = "用户管理", businessType = BusinessType.QUERY)
@GetMapping("/list")
public TableDataInfo<SysUserVo> list(SysUserBo bo, PageQuery pageQuery) {
    return userService.selectPageUserList(bo, pageQuery);
}
```

这是当前模块里比较标准的写法模板。

## 6. 注意事项

- `lxy-system` 是业务域核心，不要把它写成通用工具模块
- 涉及 `sys_*` 表的修改时，必须同步检查 Java Mapper 和 XML
- 涉及租户、权限、数据权限时，不要只改 Controller，Service 和辅助类也要一起看
- `tenant.enable` 默认关闭时，租户相关能力不会以同样方式运行
- `SysTenantController` 这类接口只允许超级管理员访问，不能随意放宽

## 7. 待确认项

- `CacheController` 的具体缓存查看范围是否还有额外运行约束
- 某些社交登录、客户端、OSS 相关接口的前端依赖是否已全部接入，需结合前端调用再确认

