# lxy-common-translation 代码结构说明

## 1. 文档主题概述

`lxy-common-translation` 通过 Jackson 序列化扩展，把字段值翻译成展示文本。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-translation/src/main/java/cn/com/lxy/common/translation`

## 3. 核心内容梳理

### 3.1 注解

- `Translation`
- `TranslationType`

### 3.2 核心处理

- `TranslationConfig`
- `TranslationHandler`
- `TranslationBeanSerializerModifier`

### 3.3 翻译接口

- `TranslationInterface`

### 3.4 默认实现

- `DeptNameTranslationImpl`
- `DictTypeTranslationImpl`
- `NicknameTranslationImpl`
- `OssUrlTranslationImpl`
- `UserNameTranslationImpl`

## 4. 关键实现说明

- `TranslationConfig` 会扫描 Spring 容器里的 `TranslationInterface` 实现并按 `@TranslationType.type` 注册。
- `TranslationHandler` 在序列化阶段把字段值替换成翻译结果。
- 如果翻译失败，会回退原始值，避免整条序列化链路中断。

## 5. 使用方式或示例

```java
@Translation(type = "dept_name", mapper = "deptId", other = "sys_dept")
private Long deptId;
```

实现类需要标注：

```java
@TranslationType(type = "dept_name")
public class DeptNameTranslationImpl implements TranslationInterface<String> {
    ...
}
```

## 6. 注意事项

- `mapper` 不为空时会从当前对象上取映射字段，而不是使用当前字段值。
- 翻译模块是 JSON 序列化层能力，不会改写数据库查询本身。

## 7. 待确认项

- 当前仓库里展示的是若干默认翻译实现，具体业务模块是否还有额外实现需要继续检查。
