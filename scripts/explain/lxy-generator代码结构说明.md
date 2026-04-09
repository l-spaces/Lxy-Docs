# lxy-generator 代码结构说明

## 1. 文档主题概述

`lxy-generator` 是代码生成模块，用于根据数据库表结构生成后端 Java 代码、Mapper XML、SQL、TS 类型和 Vue 页面模板。

它的目标不是“模板拼接工具”，而是一个基于表元数据读取、模板渲染和代码打包输出的生成器。

## 2. 对应源码位置

### 2.1 控制器

- `lxy-modules/lxy-generator/src/main/java/cn/com/lxy/generator/controller/GenController.java`

### 2.2 配置与常量

- `lxy-modules/lxy-generator/src/main/java/cn/com/lxy/generator/config/GenConfig.java`
- `lxy-modules/lxy-generator/src/main/java/cn/com/lxy/generator/config/MyBatisDataSourceMonitor.java`
- `lxy-modules/lxy-generator/src/main/java/cn/com/lxy/generator/constant/GenConstants.java`

### 2.3 领域与持久层

- `lxy-modules/lxy-generator/src/main/java/cn/com/lxy/generator/domain/GenTable.java`
- `lxy-modules/lxy-generator/src/main/java/cn/com/lxy/generator/domain/GenTableColumn.java`
- `lxy-modules/lxy-generator/src/main/java/cn/com/lxy/generator/mapper/GenTableMapper.java`
- `lxy-modules/lxy-generator/src/main/java/cn/com/lxy/generator/mapper/GenTableColumnMapper.java`
- `lxy-modules/lxy-generator/src/main/resources/mapper/generator/GenTableMapper.xml`
- `lxy-modules/lxy-generator/src/main/resources/mapper/generator/GenTableColumnMapper.xml`

### 2.4 生成器工具与模板

- `lxy-modules/lxy-generator/src/main/java/cn/com/lxy/generator/service/GenTableServiceImpl.java`
- `lxy-modules/lxy-generator/src/main/java/cn/com/lxy/generator/util/GenUtils.java`
- `lxy-modules/lxy-generator/src/main/java/cn/com/lxy/generator/util/VelocityInitializer.java`
- `lxy-modules/lxy-generator/src/main/java/cn/com/lxy/generator/util/VelocityUtils.java`
- `lxy-modules/lxy-generator/src/main/resources/generator.yml`
- `lxy-modules/lxy-generator/src/main/resources/vm/*`

## 3. 核心内容梳理

### 3.1 生成对象

当前模块围绕两类表结构对象工作：

- `GenTable`
- `GenTableColumn`

它们分别表示表级元数据和字段级元数据。

### 3.2 核心入口

`GenController` 是代码生成的统一入口，提供以下能力：

- 查询已导入的生成表
- 查询数据库表
- 查询表字段
- 导入表结构
- 编辑生成配置
- 删除生成配置
- 预览代码
- 下载 ZIP
- 直接生成到目标路径
- 同步数据库结构
- 查询数据源名称

### 3.3 模板与配置

生成逻辑依赖 `generator.yml` 和 `vm` 模板目录：

- `vm/java/*.vm`
- `vm/sql/*.vm`
- `vm/ts/*.vm`
- `vm/vue/*.vm`
- `vm/xml/*.vm`

这说明生成能力不仅覆盖 Java 后端，也覆盖前端页面和数据库脚本。

## 4. 关键实现说明

### 4.1 生成流程是表元数据驱动

典型链路是：

`GenController` -> `IGenTableService` / `GenTableServiceImpl` -> `GenTableMapper` / `GenTableColumnMapper` -> 数据库元数据 -> Velocity 模板 -> 目标代码

这比“字符串拼接”更准确，因为它依赖表结构读取和模板渲染。

### 4.2 控制器已经做了权限、锁和幂等约束

`GenController` 中可以确认使用了：

- `@SaCheckPermission`
- `@Log`
- `@RepeatSubmit`
- `@Lock4j`

所以生成器的导入、编辑、生成不是裸接口，而是带并发和审计控制的管理接口。

### 4.3 数据源能力是可查询的

`GenController#getCurrentDataSourceNameList()` 直接调用 `DataBaseHelper.getDataSourceNameList()`，说明生成器不是只针对单一数据源，而是支持读取当前可用的数据源名称。

## 5. 使用方式或示例

### 5.1 典型使用步骤

1. 打开生成器页面
2. 查询数据库表
3. 导入目标表到生成配置
4. 调整表和字段配置
5. 预览生成结果
6. 下载 ZIP 或直接生成到目标路径

### 5.2 新增表的推荐做法

如果是新表首次落地，推荐先走“导入表结构 -> 预览 -> 下载”的方式，确认模板输出符合项目目录约定后，再考虑直接生成。

### 5.3 模板调整示例

如果要调整生成内容，通常是改这里：

- `src/main/resources/vm/java/*.vm`
- `src/main/resources/vm/vue/*.vm`
- `src/main/resources/vm/xml/*.vm`

不是直接改控制器。

## 6. 注意事项

- 这是生成器，不是业务运行时模块
- 修改模板前，先确认生成路径和前后端目录约定
- 涉及数据库元数据同步时，要检查 `GenTableMapper.xml` 和 `GenTableColumnMapper.xml`
- `@Lock4j` 和 `@RepeatSubmit` 已经说明导入/生成操作需要防重复
- 数据库表结构变化后，要重新同步生成表信息

## 7. 待确认项

- 各数据库方言模板的完整覆盖范围是否与当前数据源完全一致
- `generator.yml` 中的具体路径约定是否已经与前端工程保持一致

