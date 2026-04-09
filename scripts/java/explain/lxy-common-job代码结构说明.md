# lxy-common-job 代码结构说明

## 1. 文档主题概述

`lxy-common-job` 是 SnailJob 客户端接入层，负责把调度能力挂进 Spring Boot 应用。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-job/src/main/java/cn/com/lxy/common/job`

## 3. 核心内容梳理

### 3.1 自动配置

- `SnailJobConfig`

## 4. 关键实现说明

- `snail-job.enabled=true` 时才会启用。
- `@EnableScheduling` 和 `@EnableSnailJob` 会一起生效。
- 在 SnailJob 客户端启动事件里，会把 `SnailLogbackAppender` 挂到 root logger。

## 5. 使用方式或示例

业务模块在 `lxy-job` 中直接使用 SnailJob 注解任务执行器，例如：

```java
@JobExecutor(name = "testJobExecutor")
public class TestAnnoJobExecutor {
    public ExecuteResult jobExecute(JobArgs jobArgs) { ... }
}
```

## 6. 注意事项

- 这是客户端接入模块，不是调度服务端。
- 启用后要确保 `application-dev.yml` / `application-prod.yml` 里的 `snail-job` 相关地址可达。

## 7. 待确认项

- 当前仓库没有展示所有 SnailJob 分布式任务类型的完整业务闭环，现有内容以示例为主。
