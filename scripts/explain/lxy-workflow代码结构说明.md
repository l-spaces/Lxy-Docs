# lxy-workflow 代码结构说明

## 1. 文档主题概述

`lxy-workflow` 是工作流业务模块，基于 Warm-Flow Starter 封装流程分类、流程定义、流程实例、待办任务、SpEL 规则和示例业务等能力。

它不是纯“流程示例仓库”，而是一个已经把工作流引擎接入到项目体系中的业务模块。

## 2. 对应源码位置

### 2.1 配置与条件装配

- `lxy-modules/lxy-workflow/src/main/java/cn/com/lxy/workflow/common/ConditionalOnEnable.java`
- `lxy-modules/lxy-workflow/src/main/java/cn/com/lxy/workflow/config/WarmFlowConfig.java`

### 2.2 控制器

- `lxy-modules/lxy-workflow/src/main/java/cn/com/lxy/workflow/controller/FlwCategoryController.java`
- `lxy-modules/lxy-workflow/src/main/java/cn/com/lxy/workflow/controller/FlwDefinitionController.java`
- `lxy-modules/lxy-workflow/src/main/java/cn/com/lxy/workflow/controller/FlwInstanceController.java`
- `lxy-modules/lxy-workflow/src/main/java/cn/com/lxy/workflow/controller/FlwTaskController.java`
- `lxy-modules/lxy-workflow/src/main/java/cn/com/lxy/workflow/controller/FlwSpelController.java`
- `lxy-modules/lxy-workflow/src/main/java/cn/com/lxy/workflow/controller/TestLeaveController.java`

### 2.3 领域与扩展点

- `lxy-modules/lxy-workflow/src/main/java/cn/com/lxy/workflow/domain/*`
- `lxy-modules/lxy-workflow/src/main/java/cn/com/lxy/workflow/domain/bo/*`
- `lxy-modules/lxy-workflow/src/main/java/cn/com/lxy/workflow/domain/vo/*`
- `lxy-modules/lxy-workflow/src/main/java/cn/com/lxy/workflow/handler/*`
- `lxy-modules/lxy-workflow/src/main/java/cn/com/lxy/workflow/listener/WorkflowGlobalListener.java`
- `lxy-modules/lxy-workflow/src/main/java/cn/com/lxy/workflow/rule/SpelRuleComponent.java`

### 2.4 持久层

- `lxy-modules/lxy-workflow/src/main/java/cn/com/lxy/workflow/mapper/*`
- `lxy-modules/lxy-workflow/src/main/resources/mapper/workflow/*Mapper.xml`

## 3. 核心内容梳理

### 3.1 工作流主线

从控制器和 mapper 可以直接看出模块职责：

- `flow_category`：流程分类
- `flow_definition`：流程定义
- `flow_instance`：流程实例
- `flow_task`：待办任务
- `flow_his_task`：历史任务
- `flow_spel`：SpEL 规则配置
- `flow_instance_biz_ext`：流程实例业务扩展信息

### 3.2 Warm-Flow 接入

`WarmFlowConfig` 是对 Warm-Flow Starter 的接入配置，`ConditionalOnEnable` 则说明这个模块具备条件化启用能力。

从 `application.yml` 可以确认：

- `warm-flow.enabled: true`
- `warm-flow.ui: true`
- `warm-flow.token-name: ${sa-token.token-name},clientid`

这表示工作流并不是独立孤岛，而是和 Sa-Token、前端 UI 以及项目现有认证体系一起工作的。

### 3.3 扩展点

`handler`、`listener`、`rule` 三类目录分别表示：

- `handler`：流程处理/辅助处理逻辑
- `listener`：流程事件监听
- `rule`：SpEL 规则组件

这几个点是工作流模块最值得关注的定制入口。

## 4. 关键实现说明

### 4.1 这是“流程引擎 + 业务封装”

模块里有大量 `bo` / `vo` 类型，说明它不是直接把引擎 API 暴露给前端，而是通过业务对象做了封装。

这符合项目整体的分层风格：

`Controller` -> `Service` -> `Mapper/XML` -> 数据表

### 4.2 任务办理和实例查询是两条主线

从控制器命名就能看出来，工作流有两类最常见的使用方式：

- `FlwInstanceController`：启动或查询流程实例
- `FlwTaskController`：处理待办任务

历史任务、流程定义、SpEL 规则则属于围绕这两条主线的配套能力。

### 4.3 模块内置了示例业务

`TestLeaveController` 和 `TestLeave` 相关类是示例业务入口，目的是验证流程引擎如何绑定真实业务单据，而不是工作流唯一的核心入口。

### 4.4 多租户要看排除项

`flow_*` 表已经出现在租户排除配置中，这说明工作流数据在当前架构下更偏向全局能力，而不是按租户强隔离的局部业务表。

## 5. 使用方式或示例

### 5.1 启用工作流

工作流是否生效，先看配置：

```yaml
warm-flow:
  enabled: true
  ui: true
```

如果没有打开这个开关，控制器和引擎的行为都不能按启用状态理解。

### 5.2 典型调用流程

1. 在 `FlwCategoryController` 维护流程分类
2. 在 `FlwDefinitionController` 维护流程定义
3. 通过 `FlwInstanceController` 发起流程实例
4. 通过 `FlwTaskController` 办理待办
5. 通过 `FlwSpelController` 维护表达式规则

### 5.3 示例业务接入思路

如果要接入一个新的业务单据，推荐思路是：

1. 定义自己的 `bo` / `vo`
2. 在业务服务里封装发起流程、流转、撤回等动作
3. 通过工作流模块现有的控制器或服务能力完成流程实例和任务联动

## 6. 注意事项

- `lxy-workflow` 不是纯示例模块，表结构和业务调用已经落地
- 修改 `flow_*` 表前，要先确认和 Warm-Flow Starter 的兼容性
- `TestLeaveController` 不应被误认为唯一的核心业务入口
- `flow_*` 表已经纳入租户排除范围，修改租户策略时要一起核对
- `warm-flow.token-name` 依赖当前项目的 Sa-Token token 配置

## 7. 待确认项

- Warm-Flow Starter 的具体版本和外部 API 兼容边界
- 各 `handler`、`listener`、`rule` 的完整扩展语义，是否还有未在当前仓库中暴露的依赖点

