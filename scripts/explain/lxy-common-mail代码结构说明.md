# lxy-common-mail 代码结构说明

## 1. 文档主题概述

`lxy-common-mail` 负责 SMTP 配置接入和邮件发送工具封装。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-mail/src/main/java/cn/com/lxy/common/mail`

## 3. 核心内容梳理

### 3.1 SMTP 配置

- `MailConfig`
- `MailProperties`

### 3.2 邮件工具

- `MailUtils`

## 4. 关键实现说明

- `mail.enabled=true` 时才会装配 `MailAccount`。
- `MailUtils` 提供文本邮件、HTML 邮件、附件、抄送、密送和自定义账号发送能力。
- 当前实现基于 Hutool 邮件组件，发送动作依赖 Spring 容器中的 `MailAccount` Bean。

## 5. 使用方式或示例

验证码邮件：

```java
MailUtils.sendText(email, "登录验证码", "您本次验证码为：1234");
```

HTML 邮件：

```java
MailUtils.sendHtml("a@xx.com", "标题", "<b>内容</b>");
```

## 6. 注意事项

- `MailProperties.pass` 是授权码，不是邮箱登录密码。
- `MailUtils.getMailAccount(String from, String user, String pass)` 会修改当前账户对象，调用时要注意并发和共享 Bean 的影响。

## 7. 待确认项

- 当前仓库里没有单独的附件上传后再嵌入邮件正文的业务示例，这部分属于通用能力但未完整铺开。
