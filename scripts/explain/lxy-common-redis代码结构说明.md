# lxy-common-redis 代码结构说明

## 1. 文档主题概述

`lxy-common-redis` 负责 Redisson 初始化、Spring Cache 适配、Redis 工具方法、Key 前缀处理和序列生成。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-redis/src/main/java/cn/com/lxy/common/redis`

## 3. 核心内容梳理

### 3.1 缓存与连接

- `RedisConfig`
- `CacheConfig`
- `RedissonProperties`
- `SpringCacheManager`
- `CaffeineCacheDecorator`

### 3.2 前缀处理

- `KeyPrefixHandler`

### 3.3 工具类

- `RedisUtils`
- `CacheUtils`
- `QueueUtils`
- `SequenceUtils`

## 4. 关键实现说明

- `RedisConfig` 统一配置 Redisson 编解码、线程池和 `keyPrefix`。
- `KeyPrefixHandler` 负责基础 Redis key 前缀。
- `lxy-common-tenant` 会在此基础上再叠加租户前缀。
- `CacheConfig` 通过 Caffeine + 自定义 `CacheManager` 支持本地缓存。
- `QueueUtils` 已标记为 `@Deprecated`，轻量队列仅适合小场景。

## 5. 使用方式或示例

缓存读写：

```java
RedisUtils.setCacheObject("global:demo:key", "value", Duration.ofMinutes(5));
String value = RedisUtils.getCacheObject("global:demo:key");
```

Spring Cache：

```java
CacheUtils.put(CacheNames.SYS_CONFIG, "tenant.enable", true);
```

## 6. 注意事项

- `redisson.keyPrefix` 为空时不会附加全局前缀。
- 租户开启后，实际 key 还会叠加 tenantId，不能只按配置字面值判断。
- `RedisUtils` 和 `CacheUtils` 使用的是 Spring 容器中的单例 Bean，初始化顺序要正确。

## 7. 待确认项

- 当前仓库里没有看到对 `QueueUtils` 的完整生产用例，后续如果继续保留需要再确认是否还值得保留 API。
