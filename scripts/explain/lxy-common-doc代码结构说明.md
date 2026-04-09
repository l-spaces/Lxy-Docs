# lxy-common-doc 代码结构说明

## 1. 文档主题概述

`lxy-common-doc` 负责 SpringDoc / OpenAPI 的统一装配，并把 Javadoc 和 Sa-Token 注解信息补进接口文档。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-doc/src/main/java/cn/com/lxy/common/doc`

## 3. 核心内容梳理

### 3.1 OpenAPI 装配

- `SpringDocConfig`
- `SpringDocProperties`

### 3.2 Javadoc 解析

- `JavadocResolver`
- `AbstractMetadataJavadocResolver`
- `SaTokenAnnotationMetadataJavadocResolver`

### 3.3 自定义文档构建器

- `OpenApiHandler`

## 4. 关键实现说明

- `SpringDocConfig` 在 `springdoc.api-docs.enabled=true` 时生效。
- `OpenApiHandler` 继承自 springdoc 的 `OpenAPIService`，并额外解析 Javadoc 描述和 Sa-Token 权限元数据。
- `openApiCustomizer()` 会把上下文路径补到所有 path 上，避免文档路径和真实路由不一致。

## 5. 使用方式或示例

在控制器或方法上写 Javadoc，再配合 `@SaCheckPermission` / `@SaIgnore`，文档就会自动带出更完整的描述信息。

```java
/**
 * 查询用户列表
 */
@SaCheckPermission("system:user:list")
@GetMapping("/user/list")
public R<List<UserDTO>> list() {
    ...
}
```

## 6. 注意事项

- 如果项目没有 `JavadocProvider`，`OpenApiHandler` 会退回到较基础的 tag 解析方式。
- 文档信息和配置里的 `springdoc.group-configs` 要保持一致。

## 7. 待确认项

- 当前仓库没有列出所有可选的 `OpenAPI` 安全方案配置，新增安全定义时需要结合实际控制器再补。
