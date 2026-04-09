# docs/explain 文档索引

## 1. 文档主题概述

`docs/explain` 是后端工程的技术说明文档目录，用来配合源码解释各模块的职责边界、配置来源、调用链路和使用方式。

这里的文档不是泛泛的项目介绍，而是按模块和能力拆分的内部维护资料。

## 2. 对应源码位置

这个目录本身不对应单一源码模块，它对应的是整个仓库中已经落地的文档集合，重点覆盖：

- 项目整体架构
- 启动与部署
- 核心配置项
- 数据库与基础设施
- `lxy-admin`
- `lxy-common`
- `lxy-modules` 下的 `lxy-system`、`lxy-workflow`、`lxy-generator`、`lxy-job`、`lxy-demo`
- `lxy-extend` 下的 `lxy-monitor-admin`、`lxy-snailjob-server`

## 3. 核心内容梳理

推荐阅读顺序是：

1. `项目整体架构说明.md`
2. `启动与部署说明.md`
3. `核心配置项说明.md`
4. `数据库与基础设施说明.md`
5. 各模块代码结构说明

这样能先建立整体边界，再看具体模块实现。

## 4. 关键实现说明

这个目录的写法原则是：

- 只写当前仓库源码、配置、Mapper XML 和脚本里已经出现的内容
- 不确定的地方统一标记为 `待确认`
- 说明优先级按“模块边界 > 核心类 > 配置项 > 使用方式”来排

## 5. 使用方式或示例

如果你要快速定位某个能力，直接按关键词找对应文档：

- 认证、权限、登录：`lxy-admin`、`lxy-common-security`、`lxy-common-satoken`
- 租户：`lxy-common-tenant`、`lxy-system`
- MyBatis 和 XML：`lxy-common-mybatis`、`lxy-system`
- Redis / 缓存：`lxy-common-redis`
- 工作流：`lxy-workflow`
- 代码生成：`lxy-generator`
- 调度示例：`lxy-job`、`lxy-snailjob-server`

## 6. 注意事项

- 这里的文档是长期维护资料，模块调整后要同步更新
- 不要把共享能力误写成 `lxy-admin` 专属逻辑
- 不要把示例模块写成正式业务模块

## 7. 待确认项

- 后续如果仓库继续新增模块，索引文件需要同步补链
- 如果某些文档名称发生变化，索引里的链接要一起更新

