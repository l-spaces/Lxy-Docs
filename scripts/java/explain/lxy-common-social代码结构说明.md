# lxy-common-social 代码结构说明

## 1. 文档主题概述

`lxy-common-social` 基于 JustAuth 提供第三方登录授权、回调状态缓存和请求构造。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-social/src/main/java/cn/com/lxy/common/social`

## 3. 核心内容梳理

### 3.1 第三方登录授权

- `SocialAutoConfiguration`
- `SocialUtils`
- `AuthRedisStateCache`

### 3.2 配置管理

- `SocialProperties`
- `SocialLoginConfigProperties`

### 3.3 支持的来源

- `AuthGiteaRequest`
- `AuthMaxKeyRequest`
- `AuthTopIamRequest`
- 以及 JustAuth 已支持的常规来源

## 4. 关键实现说明

- `SocialProperties` 绑定的是 `justauth.type`。
- `SocialUtils.getAuthRequest()` 根据 `source` 构建不同的 JustAuth 请求对象。
- `AuthRedisStateCache` 负责 OAuth state 缓存。

## 5. 使用方式或示例

获取授权地址：

```java
AuthRequest authRequest = SocialUtils.getAuthRequest("gitee", socialProperties);
String url = authRequest.authorize(state);
```

回调登录：

```java
AuthResponse<AuthUser> response = SocialUtils.loginAuth(source, code, state, socialProperties);
```

## 6. 注意事项

- 不是每个 source 都有独立的自定义请求类，很多来源直接使用 JustAuth 内置实现。
- `redirectUri`、`clientSecret`、`clientId` 必须和实际第三方平台配置一致。

## 7. 待确认项

- `source` 列表非常长，当前仓库里没有在文档中逐个验证所有来源是否都在生产环境启用，后续应按实际配置收敛。
