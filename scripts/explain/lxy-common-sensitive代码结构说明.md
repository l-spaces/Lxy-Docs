# lxy-common-sensitive 代码结构说明

## 1. 文档主题概述

`lxy-common-sensitive` 提供字段级脱敏注解和序列化处理器。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-sensitive/src/main/java/cn/com/lxy/common/sensitive`

## 3. 核心内容梳理

### 3.1 注解

- `Sensitive`

### 3.2 策略

- `SensitiveStrategy`

### 3.3 处理器

- `SensitiveHandler`

### 3.4 服务接口

- `SensitiveService`

## 4. 关键实现说明

- `Sensitive` 只能标在字段上。
- `SensitiveHandler` 会根据 `SensitiveService.isSensitive(roleKey, perms)` 判断是否真正脱敏。
- 如果没有可用的 `SensitiveService` Bean，会退回成原始值输出。

## 5. 使用方式或示例

```java
@Sensitive(strategy = SensitiveStrategy.PHONE)
private String mobile;
```

也可以叠加角色和权限控制：

```java
@Sensitive(strategy = SensitiveStrategy.STRING_MASK, roleKey = {"admin"}, perms = {"system:user:view"})
private String idCard;
```

## 6. 注意事项

- 脱敏不是全局强制开启，最终是否脱敏要看 `SensitiveService` 的业务实现。
- 不同策略适用的字段类型和展示效果不同，不能随意套用。

## 7. 待确认项

- 当前仓库没有提供默认 `SensitiveService` 实现，具体脱敏判定规则需要业务模块自己接入。
