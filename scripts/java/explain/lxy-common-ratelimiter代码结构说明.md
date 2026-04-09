# lxy-common-ratelimiter 代码结构说明

## 1. 文档主题概述

`lxy-common-ratelimiter` 提供基于 Redisson 的方法级限流注解与切面。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-ratelimiter/src/main/java/cn/com/lxy/common/ratelimiter`

## 3. 核心内容梳理

### 3.1 注解

- `RateLimiter`

### 3.2 切面

- `RateLimiterAspect`

### 3.3 枚举

- `LimitType`

## 4. 关键实现说明

- `RateLimiterAspect` 在方法执行前申请令牌。
- `LimitType.IP` 会把客户端 IP 加入 key。
- `LimitType.CLUSTER` 会把 Redisson 客户端 ID 加入 key。
- `key` 支持 SpEL 表达式。

## 5. 使用方式或示例

```java
@RateLimiter(key = "#phonenumber", time = 60, count = 1)
@GetMapping("/resource/sms/code")
public R<Void> smsCode(String phonenumber) {
    ...
}
```

## 6. 注意事项

- 限流异常默认会转成 `ServiceException`。
- `timeout` 是限流策略 key 的存活时间，不是请求等待时间。

## 7. 待确认项

- 当前仓库没有单独的限流配置类，具体限流参数完全由注解和 Redis 运行时决定。
