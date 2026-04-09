# lxy-common-idempotent 代码结构说明

## 1. 文档主题概述

`lxy-common-idempotent` 提供方法级防重复提交能力，适合提交类接口和写操作接口。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-idempotent/src/main/java/cn/com/lxy/common/idempotent`

## 3. 核心内容梳理

### 3.1 注解

- `RepeatSubmit`

### 3.2 切面

- `RepeatSubmitAspect`

### 3.3 配置

- `IdempotentConfig`

## 4. 关键实现说明

- 切面会把请求 URI、token 头和请求参数组合成幂等 key。
- Redis 写入成功后，在有效期内再次提交会被拒绝。
- 如果方法返回 `R` 且失败，切面会主动清理 key，避免误伤重试。

## 5. 使用方式或示例

```java
@RepeatSubmit(interval = 5000)
@PostMapping("/user")
public R<Void> save(@RequestBody SysUserBo bo) {
    ...
}
```

## 6. 注意事项

- 最小间隔不能小于 1 秒。
- 同一个接口如果入参不同，仍然会按参数参与幂等判断。

## 7. 待确认项

- 当前仓库里没有额外的幂等配置开关，是否需要细化到某些接口组要结合业务模块再确认。
