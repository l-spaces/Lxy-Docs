# lxy-common-sse 代码结构说明

## 1. 文档主题概述

`lxy-common-sse` 提供基于 `SseEmitter` 的服务端推送能力，并通过 Redis 发布订阅实现跨实例通知。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-sse/src/main/java/cn/com/lxy/common/sse`

## 3. 核心内容梳理

### 3.1 建立 SSE 连接

- `SseAutoConfiguration`
- `SseController`
- `SseEmitterManager`

### 3.2 单向消息推送

- `SseMessageDto`
- `SseMessageUtils`

### 3.3 Redis 订阅联动

- `SseTopicListener`

## 4. 关键实现说明

- `sse.enabled=true` 时才会启用。
- 默认路径来自 `sse.path`，当前配置是 `/resource/sse`。
- `SseEmitterManager` 用 `global:sse` 作为 Redis topic。
- 连接建立后会定时发送 heartbeat，失效连接会被清理。

## 5. 使用方式或示例

连接建立后，业务代码可以直接推送：

```java
SseMessageDto dto = new SseMessageDto();
dto.setUserIds(List.of(userId));
dto.setMessage("欢迎登录");
SseMessageUtils.publishMessage(dto);
```

## 6. 注意事项

- `SseController.connect()` 只有登录后才返回 `SseEmitter`。
- 当前实现更适合“登录后通知、状态提醒”这类轻量推送，不适合大吞吐消息总线。

## 7. 待确认项

- 当前仓库里没有展示前端完整接入样例，具体连接与重连策略需要结合前端一起确认。
