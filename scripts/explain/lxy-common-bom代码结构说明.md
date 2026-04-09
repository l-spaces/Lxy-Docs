# lxy-common-bom 代码结构说明

## 1. 文档主题概述

`lxy-common-bom` 不是业务代码模块，而是 `lxy-common` 子模块的依赖管理层。它把通用模块的版本统一起来，供 `lxy-admin`、`lxy-modules` 和 `lxy-extend` 复用。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-bom/pom.xml`

## 3. 核心内容梳理

- 通过 `dependencyManagement` 统一声明 `lxy-common-core`、`lxy-common-web`、`lxy-common-redis`、`lxy-common-mybatis`、`lxy-common-satoken` 等模块版本。
- 它的职责是版本收口，不提供运行期 bean，也不承载 controller / service / mapper。

## 4. 关键实现说明

`lxy-common-bom` 被根工程 `pom.xml` 作为依赖管理导入，所以各子模块在声明 `cn.com.lxy` 组内依赖时通常不需要重复写版本号。

## 5. 使用方式或示例

业务模块直接依赖即可：

```xml
<dependency>
  <groupId>cn.com.lxy</groupId>
  <artifactId>lxy-common-core</artifactId>
</dependency>
```

版本由 BOM 统一托管。

## 6. 注意事项

- `lxy-common-bom` 不是可运行模块，不要把它当成 Spring Boot 应用。
- 如果新增一个 `lxy-common-*` 模块，通常也要同步把它加入 BOM。

## 7. 待确认项

- 当前 BOM 是否仍会作为所有内部模块的唯一版本来源，仓库里没有额外的替代约定。
