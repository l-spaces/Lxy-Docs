# lxy-demo 代码结构说明

## 1. 文档主题概述

`lxy-demo` 是演示和能力验证模块，主要用途是展示通用能力模块如何在项目中落地，而不是承载正式业务。

它更像一个“集成示例集合”，用于验证：

- Redis 缓存、锁、发布订阅
- 限流
- Sa-Token
- 短信、邮件
- Excel 导入导出
- 国际化
- 敏感数据处理
- WebSocket
- 队列示例
- 接口加密与演示查询

## 2. 对应源码位置

### 2.1 控制器

- `lxy-modules/lxy-demo/src/main/java/cn/com/lxy/demo/controller/*`
- `lxy-modules/lxy-demo/src/main/java/cn/com/lxy/demo/controller/queue/*`

### 2.2 领域模型

- `lxy-modules/lxy-demo/src/main/java/cn/com/lxy/demo/domain/*`
- `lxy-modules/lxy-demo/src/main/java/cn/com/lxy/demo/domain/bo/*`
- `lxy-modules/lxy-demo/src/main/java/cn/com/lxy/demo/domain/vo/*`

### 2.3 服务、监听器、Mapper

- `lxy-modules/lxy-demo/src/main/java/cn/com/lxy/demo/service/*`
- `lxy-modules/lxy-demo/src/main/java/cn/com/lxy/demo/service/impl/*`
- `lxy-modules/lxy-demo/src/main/java/cn/com/lxy/demo/listener/ExportDemoListener.java`
- `lxy-modules/lxy-demo/src/main/java/cn/com/lxy/demo/mapper/*`
- `lxy-modules/lxy-demo/src/main/resources/mapper/demo/*Mapper.xml`

### 2.4 示例资源

- `lxy-modules/lxy-demo/src/main/resources/excel/*.xlsx`

## 3. 核心内容梳理

### 3.1 示例控制器很全，但不是业务核心

当前模块的控制器覆盖面很广，包括：

- `RedisCacheController`
- `RedisLockController`
- `RedisPubSubController`
- `RedisRateLimiterController`
- `SaTokenTestController`
- `SmsController`
- `MailSendController`
- `Swagger3DemoController`
- `TestBatchController`
- `TestDemoController`
- `TestEncryptController`
- `TestExcelController`
- `TestI18nController`
- `TestSensitiveController`
- `TestTreeController`
- `WebSocketController`
- `BoundedQueueController`
- `DelayedQueueController`
- `PriorityQueueController`
- `PriorityDemo`

这说明该模块主要是“如何使用”的展示，而不是“正式业务”的归宿。

### 3.2 Excel 是该模块最完整的示例之一

`TestExcelController` 结合了：

- 模板导出
- 多 sheet 导出
- 下拉选项导出
- 自定义导出
- 导入解析

并且依赖 `ExportDemoListener` 与资源目录中的 Excel 模板文件。

### 3.3 Redis、锁、限流、消息是典型能力入口

`RedisCacheController`、`RedisLockController`、`RedisPubSubController`、`RedisRateLimiterController` 分别对应不同的 Redis 使用场景：

- 缓存
- 分布式锁
- 发布订阅
- 限流

### 3.4 树结构和批处理有独立示例

`TestTreeController` 和 `TestBatchController` 说明模块里还有树形数据、批量处理等通用场景示例。

## 4. 关键实现说明

### 4.1 这是“能力验证入口”

很多控制器并不是为了给外部系统调用，而是为了验证 `common-*` 模块是否按预期工作。

典型例子：

- `RedisCacheController` 验证 Spring Cache 和 Redis 的组合
- `TestExcelController` 验证模板、导入导出和监听器
- `WebSocketController` 验证 WebSocket 推送

### 4.2 Mapper 和 XML 只服务于示例数据

当前确认存在的示例持久层是：

- `TestDemoMapper.xml`
- `TestTreeMapper.xml`

这说明 demo 模块也遵循了“接口 + XML”的 MyBatis 结构，但表和查询都只是示例性质。

### 4.3 Excel 示例依赖资源文件

资源目录里已经有：

- `单列表.xlsx`
- `多sheet列表.xlsx`
- `多列表.xlsx`

它们是测试导入导出模板，不是运行时随意生成的临时文件。

## 5. 使用方式或示例

### 5.1 Redis 缓存示例

`RedisCacheController` 中已经演示了：

- `@Cacheable`
- `@CachePut`
- `@CacheEvict`

适合用来验证 `common-redis` 的缓存命名和过期策略。

### 5.2 Excel 导入导出示例

`TestExcelController` 可以直接作为 Excel 能力验证入口：

1. 先导出模板文件
2. 再按模板填充数据
3. 使用导入接口上传
4. 通过 `ExportDemoListener` 解析结果

### 5.3 WebSocket / 队列示例

如果要确认消息推送、长连接或队列处理是否正常，优先看：

- `WebSocketController`
- `BoundedQueueController`
- `DelayedQueueController`
- `PriorityQueueController`

## 6. 注意事项

- `lxy-demo` 不应作为正式业务实现模板
- 示例接口通常依赖外部配置和基础设施，不是“开箱即用”业务接口
- Excel、短信、邮件、社交登录等能力都需要结合 `lxy-admin` 的配置项理解
- 队列和推送能力要结合 `common-redis`、`common-sse`、`common-websocket` 一起看

## 7. 待确认项

- `SmsController`、`MailSendController`、`SaTokenTestController` 的外部服务前置配置是否全部齐备
- `TestEncryptController` 涉及的加密模式，是否同时覆盖接口加密和 MyBatis 加密场景，需要结合具体注解再确认

