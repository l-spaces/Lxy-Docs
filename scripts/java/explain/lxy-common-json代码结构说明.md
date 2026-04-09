# lxy-common-json 代码结构说明

## 1. 文档主题概述

`lxy-common-json` 负责 Jackson 的统一序列化策略、JSON 工具封装和简单 JSON 类型判断。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-json/src/main/java/cn/com/lxy/common/json`

## 3. 核心内容梳理

### 3.1 统一 Jackson 行为

- `JacksonConfig`
- `BigNumberSerializer`
- `CustomDateDeserializer`

### 3.2 统一 JSON 工具

- `JsonUtils`

### 3.3 JSON 校验扩展

- `JsonPattern`
- `JsonPatternValidator`
- `JsonType`

## 4. 关键实现说明

- `JacksonConfig` 统一配置 `LocalDateTime`、`Date`、大整数、大数值字符串化和默认时区。
- `JsonUtils` 依赖 Spring 容器中的 `ObjectMapper`。
- `BigNumberSerializer` 会把超过 JS 安全整数范围的数字序列化成字符串。

## 5. 使用方式或示例

常见转换：

```java
String json = JsonUtils.toJsonString(obj);
UserDTO dto = JsonUtils.parseObject(json, UserDTO.class);
boolean valid = JsonUtils.isJsonObject(json);
```

## 6. 注意事项

- `JsonUtils` 不是独立静态工具箱，它依赖 `ObjectMapper` Bean 已经完成初始化。
- 如果业务对象上有自定义 Jackson 注解，仍然要结合 `JacksonConfig` 的全局策略一起看。

## 7. 待确认项

- `JsonPattern` / `JsonType` 的所有使用点在当前仓库里没有完全展开，后续新增校验场景时需要再补充。
