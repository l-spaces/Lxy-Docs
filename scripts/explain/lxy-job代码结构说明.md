# lxy-job 代码结构说明

## 1. 文档主题概述

`lxy-job` 是 SnailJob 客户端任务示例模块，用于展示定时任务、广播任务、分片任务、MapReduce 和 DAG 类任务的写法。

它本身不是主应用启动模块，真正的调度服务端在 `lxy-extend/lxy-snailjob-server`，而客户端接入能力由 `lxy-common-job` 提供。

## 2. 对应源码位置

### 2.1 任务示例

- `lxy-modules/lxy-job/src/main/java/cn/com/lxy/job/snailjob/AlipayBillTask.java`
- `lxy-modules/lxy-job/src/main/java/cn/com/lxy/job/snailjob/WechatBillTask.java`
- `lxy-modules/lxy-job/src/main/java/cn/com/lxy/job/snailjob/SummaryBillTask.java`
- `lxy-modules/lxy-job/src/main/java/cn/com/lxy/job/snailjob/TestAnnoJobExecutor.java`
- `lxy-modules/lxy-job/src/main/java/cn/com/lxy/job/snailjob/TestBroadcastJob.java`
- `lxy-modules/lxy-job/src/main/java/cn/com/lxy/job/snailjob/TestClassJobExecutor.java`
- `lxy-modules/lxy-job/src/main/java/cn/com/lxy/job/snailjob/TestMapJobAnnotation.java`
- `lxy-modules/lxy-job/src/main/java/cn/com/lxy/job/snailjob/TestMapReduceAnnotation1.java`
- `lxy-modules/lxy-job/src/main/java/cn/com/lxy/job/snailjob/TestStaticShardingJob.java`

### 2.2 领域对象

- `lxy-modules/lxy-job/src/main/java/cn/com/lxy/job/entity/BillDto.java`

### 2.3 模块说明

- `lxy-modules/lxy-job/pom.xml`

## 3. 核心内容梳理

### 3.1 这个模块是任务示例集合

从类名就能看出，这里覆盖了多种 SnailJob 使用方式：

- 注解式任务
- 类式任务执行器
- 广播任务
- 分片任务
- MapReduce 任务
- DAG 风格账单任务

### 3.2 `BillDto` 是任务上下文示例对象

`BillDto` 用在账单类任务中，结合上下文传递展示 DAG 场景下的数据流转。

### 3.3 任务实现的两种风格

源码里可以看到两种典型写法：

- 直接在类上使用 `@JobExecutor(name = "...")`
- 继承 `AbstractJobExecutor` 并实现 `doJobExecute(JobArgs)`

这说明模块并不只展示一种任务注册方式。

## 4. 关键实现说明

### 4.1 任务输出依赖 SnailJob 的执行结果模型

例如 `TestClassJobExecutor` 通过 `ExecuteResult.success(...)` 返回执行结果。

### 4.2 DAG 任务会使用上下文传递

`AlipayBillTask` 和 `SummaryBillTask` 都直接使用了 `JobArgs` 的上下文能力：

- `jobArgs.getWfContext()`
- `jobArgs.appendContext(...)`

这说明任务之间不是简单串联，而是通过上下文交换中间结果。

### 4.3 广播任务有远程日志输出

`TestBroadcastJob` 使用了 `SnailJobLog.REMOTE`，说明任务日志不只是本地控制台打印，还能走远程日志链路。

## 5. 使用方式或示例

### 5.1 类式执行器

```java
@Component
public class TestClassJobExecutor extends AbstractJobExecutor {
    @Override
    protected ExecuteResult doJobExecute(JobArgs jobArgs) {
        return ExecuteResult.success("TestJobExecutor测试成功");
    }
}
```

这种方式适合需要明确控制执行入口和返回结果的任务。

### 5.2 注解式任务

```java
@Component
@JobExecutor(name = "testBroadcastJob")
public class TestBroadcastJob {
    public ExecuteResult jobExecute(JobArgs jobArgs) {
        // ...
    }
}
```

这种方式更贴近业务方法直接暴露为执行器。

### 5.3 DAG 上下文传递

`AlipayBillTask` 先把账单对象写入上下文，`SummaryBillTask` 再从上下文读取多个任务结果汇总总金额。

这类任务适合把多个分支的结果合并成最终结果。

## 6. 注意事项

- `lxy-job` 只是示例集合，不是独立调度服务端
- 真正的 SnailJob Server 在 `lxy-extend/lxy-snailjob-server`
- 任务定义和运行状态依赖 `script/sql/ry_job.sql`
- 任务类需要和 `lxy-common-job` 的自动装配配合使用
- DAG 场景下的上下文键名要保持一致，否则汇总任务读不到前置结果

## 7. 待确认项

- `TestAnnoJobExecutor`、`TestMapJobAnnotation`、`TestMapReduceAnnotation1` 的具体执行参数约定是否还存在额外文档依赖
- SnailJob 控制台上的任务配置和本仓库示例类之间的映射关系，是否有额外约定未落在代码里

