# lxy-common-log 代码结构说明

## 1. 文档主题概述

`lxy-common-log` 负责操作日志注解、AOP 采集、登录日志事件和操作日志事件。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-log/src/main/java/cn/com/lxy/common/log`

## 3. 核心内容梳理

### 3.1 注解与切面

- `Log`
- `LogAspect`

### 3.2 事件模型

- `LogininforEvent`
- `OperLogEvent`

### 3.3 枚举

- `BusinessStatus`
- `BusinessType`
- `OperatorType`

## 4. 关键实现说明

- `LogAspect` 只拦截标注了 `@Log` 的方法。
- 它会采集 URL、请求方式、方法名、参数、返回值、耗时、登录用户和租户信息。
- 采集结果不是直接写库，而是发布成 `OperLogEvent` 交给后续监听器处理。

## 5. 使用方式或示例

```java
@Log(title = "用户管理", businessType = BusinessType.UPDATE)
@PutMapping("/user")
public R<Void> update(@RequestBody SysUserBo bo) {
    ...
}
```

## 6. 注意事项

- `LogAspect` 会过滤 `MultipartFile`、`HttpServletRequest`、`HttpServletResponse` 和 `BindingResult`，避免日志过大。
- 如果方法返回值不是 `R<?>`，响应日志记录仍然会尝试序列化，注意返回对象是否可序列化。

## 7. 待确认项

- 具体日志持久化监听器不在当前模块内展示，若后续变更日志落库方式需要再补链路说明。
