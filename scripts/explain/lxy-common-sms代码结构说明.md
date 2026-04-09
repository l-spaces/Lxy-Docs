# lxy-common-sms 代码结构说明

## 1. 文档主题概述

`lxy-common-sms` 是 sms4j 的 Redis 适配和异常处理接入层。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-sms/src/main/java/cn/com/lxy/common/sms`

## 3. 核心内容梳理

### 3.1 自动配置

- `SmsAutoConfiguration`

### 3.2 DAO 适配

- `MySmsDao`

### 3.3 异常处理

- `SmsExceptionHandler`

## 4. 关键实现说明

- `SmsAutoConfiguration` 会把 `SmsDao` 替换成 `MySmsDao`。
- `MySmsDao` 把短信缓存统一写到 Redis，并自动加上 `global:` 前缀。
- `clean()` 会清理 `sms:*` 相关缓存。

## 5. 使用方式或示例

在 `CaptchaController` 里，短信验证码直接通过 sms4j 发送：

```java
SmsBlend smsBlend = SmsFactory.getSmsBlend("config1");
smsBlend.sendMessage(phonenumber, templateId, params);
```

## 6. 注意事项

- 当前 `CaptchaController` 里 `templateId` 还是空字符串，短信模板号需要业务侧补齐。
- `SmsDao` 的缓存 key 是框架协议的一部分，修改前缀会影响重试和拦截逻辑。

## 7. 待确认项

- 当前仓库里没有单独的短信服务封装示例，现有内容以验证码场景为主。
