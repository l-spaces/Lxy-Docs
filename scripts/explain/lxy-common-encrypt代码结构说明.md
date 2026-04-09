# lxy-common-encrypt 代码结构说明

## 1. 文档主题概述

`lxy-common-encrypt` 提供两类能力：

- 接口层请求/响应加解密
- MyBatis 层字段加解密

## 2. 对应源码位置

- ` /lxy-common/lxy-common-encrypt/src/main/java/cn/com/lxy/common/encrypt`

## 3. 核心内容梳理

### 3.1 接口加解密

- `ApiEncrypt`
- `ApiDecryptAutoConfiguration`
- `CryptoFilter`
- `ApiDecryptProperties`

### 3.2 字段加解密

- `EncryptField`
- `EncryptorAutoConfiguration`
- `EncryptorManager`
- `MybatisEncryptInterceptor`
- `MybatisDecryptInterceptor`

### 3.3 算法与编码

- `AlgorithmType`
- `EncodeType`
- `AesEncryptor`
- `Base64Encryptor`
- `RsaEncryptor`
- `Sm2Encryptor`
- `Sm4Encryptor`

## 4. 关键实现说明

- `api-decrypt.enabled=true` 时才会挂载全局过滤器。
- `mybatis-encryptor.enable=true` 时才会启用 MyBatis 拦截器。
- `EncryptorManager` 会扫描 `mybatis-plus.typeAliasesPackage` 指定的实体包，缓存带 `@EncryptField` 的字符串字段。

## 5. 使用方式或示例

接口加密：

```java
@ApiEncrypt(response = true)
@PostMapping("/auth/login")
public R<LoginVo> login(@RequestBody String body) {
    ...
}
```

字段加密：

```java
public class SysUser {
    @EncryptField
    private String email;
}
```

## 6. 注意事项

- `ApiEncrypt` 只标在方法上，不是字段注解。
- 字段加密依赖实体扫描范围，实体包没被 `typeAliasesPackage` 覆盖时会失效。
- 配置里的公私钥、密码和算法必须成套理解，不能只改一项。

## 7. 待确认项

- 当前仓库里没有看到专门的示例控制器完整覆盖所有算法，具体算法组合仍需按实际配置确认。
