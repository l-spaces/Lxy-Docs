# lxy-common 模块总览

## 1. 文档主题概述

`lxy-common` 是项目的通用能力底座，负责为 `lxy-admin` 和各业务模块提供可复用的基础设施能力，而不是承载单一业务。

它解决的是“通用能力怎么做”，不是“具体业务怎么做”。

## 2. 对应源码位置

- 聚合入口：`/lxy-common/pom.xml`
- 依赖管理：`/lxy-common/lxy-common-bom/pom.xml`
- 通用基础：`/lxy-common/lxy-common-core`
- Web 基础：`/lxy-common/lxy-common-web`
- Redis 与缓存：`/lxy-common/lxy-common-redis`
- 认证与权限：`/lxy-common/lxy-common-satoken`、`/lxy-common/lxy-common-security`
- 持久层增强：`/lxy-common/lxy-common-mybatis`、`/lxy-common/lxy-common-tenant`
- 业务集成：`/lxy-common/lxy-common-excel`、`/lxy-common/lxy-common-mail`、`/lxy-common/lxy-common-sms`、`/lxy-common/lxy-common-social`、`/lxy-common/lxy-common-oss`、`/lxy-common/lxy-common-sse`、`/lxy-common/lxy-common-websocket`

## 3. 核心内容梳理

### 3.1 基础底座

- `lxy-common-bom`
- `lxy-common-core`
- `lxy-common-json`

### 3.2 Web 与基础设施

- `lxy-common-web`
- `lxy-common-redis`
- `lxy-common-mybatis`
- `lxy-common-doc`
- `lxy-common-job`
- `lxy-common-mail`

### 3.3 鉴权与安全

- `lxy-common-satoken`
- `lxy-common-security`
- `lxy-common-tenant`
- `lxy-common-log`
- `lxy-common-ratelimiter`
- `lxy-common-idempotent`
- `lxy-common-encrypt`
- `lxy-common-sensitive`

### 3.4 业务增强

- `lxy-common-social`
- `lxy-common-sms`
- `lxy-common-oss`
- `lxy-common-excel`
- `lxy-common-translation`
- `lxy-common-sse`
- `lxy-common-websocket`

## 4. 关键实现说明

### 4.1 认证链路

`common-core` -> `common-redis` -> `common-satoken` -> `common-security`

### 4.2 租户链路

`common-core` + `common-redis` + `common-mybatis` -> `common-tenant`

### 4.3 输出增强链路

`common-json` + `common-translation` + `common-sensitive`

这些模块主要影响 JSON 输出阶段，而不是侵入业务查询逻辑。

## 5. 使用方式或示例

业务模块通常按下面方式组合：

```xml
<dependency>
  <groupId>cn.com.lxy</groupId>
  <artifactId>lxy-common-core</artifactId>
</dependency>
<dependency>
  <groupId>cn.com.lxy</groupId>
  <artifactId>lxy-common-web</artifactId>
</dependency>
<dependency>
  <groupId>cn.com.lxy</groupId>
  <artifactId>lxy-common-redis</artifactId>
</dependency>
```

## 6. 注意事项

- 公共能力应优先放在 `lxy-common-*`，不要回填到 `lxy-admin`。
- 租户、安全、Redis 前缀、Sa-Token DAO 这些能力是联动的，不能只看单个模块。

## 7. 待确认项

- `lxy-common` 未来是否还会继续拆分更细粒度的公共模块，当前仓库无法确认。
