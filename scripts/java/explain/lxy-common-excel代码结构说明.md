# lxy-common-excel 代码结构说明

## 1. 文档主题概述

`lxy-common-excel` 基于 `fastexcel` 封装了导入、导出、模板填充、下拉选项和批注等通用 Excel 能力。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-excel/src/main/java/cn/com/lxy/common/excel`

## 3. 核心内容梳理

### 3.1 导入

- `ExcelUtil.importExcel(...)`
- `DefaultExcelListener`
- `ExcelListener`
- `ExcelResult`

### 3.2 导出

- `ExcelUtil.exportExcel(...)`
- `ExcelWriterWrapper`
- `ExcelDownHandler`
- `DataWriteHandler`
- `CellMergeStrategy`

### 3.3 注解与转换

- `ExcelNotation`
- `ExcelRequired`
- `ExcelDictFormat`
- `ExcelEnumFormat`
- `ExcelDynamicOptions`

## 4. 关键实现说明

- 导入默认支持校验，失败会在 `ExcelResult.errorList` 中记录原因。
- 导出默认注册列宽自适应、大数字转换、批注必填项和下拉选处理器。
- `ExcelDownHandler` 会优先解析字典和枚举下拉，再处理外部传入的 `DropDownOptions`。
- 模板导出要求模板文件放在启动类对应的 `resource` 目录下。

## 5. 使用方式或示例

导入：

```java
ExcelResult<TestDemoVo> result = ExcelUtil.importExcel(inputStream, TestDemoVo.class, true);
```

导出：

```java
ExcelUtil.exportExcel(list, "用户列表", TestDemoVo.class, response);
```

模板导出：

```java
ExcelUtil.exportTemplate(list, "导出文件.xlsx", "excel/单列表.xlsx", response);
```

## 6. 注意事项

- `DefaultExcelListener` 默认开启 Bean 校验，导入前要确保注解和分组配置正确。
- 下拉选项太多时会创建隐藏工作表，不要把海量字典直接塞进单元格校验。
- `ExcelWriterWrapper` 只是对 `ExcelWriter` 的安全封装，不要绕过它直接关闭底层流。

## 7. 待确认项

- 当前仓库里的 Excel 示例资源主要集中在 `lxy-demo`，若后续新增复杂模板应再补实际示例。
