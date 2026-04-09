# lxy-common-websocket 代码结构说明

## 1. 文档主题概述

`lxy-common-websocket` 提供 WebSocket 握手鉴权、会话管理和基于 Redis 的跨实例消息路由。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-websocket/src/main/java/cn/com/lxy/common/websocket`

## 3. 核心内容梳理

### 3.1 握手鉴权

- `WebSocketConfig`
- `WebSocketInterceptor`

### 3.2 会话管理

- `WebSocketHandler`
- `WebSocketSessionHolder`

### 3.3 消息路由

- `WebSocketUtils`
- `WebSocketTopicListener`

## 4. 关键实现说明

- `websocket.enabled=true` 时才会启用。
- `WebSocketConfig` 默认路径由 `websocket.path` 控制，未配置时会退回 `/websocket`。
- 握手阶段会校验登录态和 `clientid` 与 token 扩展字段的一致性。
- `WebSocketUtils.publishMessage()` 会优先发给本机会话，找不到时再走 Redis 发布订阅。

## 5. 使用方式或示例

```java
WebSocketMessageDto dto = new WebSocketMessageDto();
dto.setSessionKeys(List.of(userId));
dto.setMessage("hello");
WebSocketUtils.publishMessage(dto);
```

## 6. 注意事项

- `WebSocketHandler` 目前按 `userId` 存会话，如果同一用户多端并发需求更复杂，需要另行扩展。
- `allowedOrigins` 为空时默认允许所有来源，部署时要结合前端域名收敛。

## 7. 待确认项

- 当前仓库没有展示完整前端 websocket 订阅协议，消息格式需要和前端一起确认。
