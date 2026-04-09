# lxy-common-oss 代码结构说明

## 1. 文档主题概述

`lxy-common-oss` 封装了兼容 S3 协议的对象存储客户端，支持阿里云、腾讯云、七牛、华为云、MinIO 等场景。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-oss/src/main/java/cn/com/lxy/common/oss`

## 3. 核心内容梳理

### 3.1 客户端封装

- `OssClient`
- `OssFactory`
- `OssProperties`

### 3.2 上传下载

- `UploadResult`
- `WriteOutSubscriber`
- `AccessPolicyType`

### 3.3 配置缓存

- `OssConstant`

## 4. 关键实现说明

- `OssFactory.instance()` 会先从 Redis 取默认配置 key，再加载具体配置。
- 实例缓存按 `tenantId + configKey` 区分，避免多租户下同名配置覆盖。
- `OssClient` 使用 AWS S3 异步客户端和 `S3TransferManager` 完成上传下载。

## 5. 使用方式或示例

```java
OssClient client = OssFactory.instance("sys_oss_config_1");
UploadResult result = client.upload(path, "demo/test.png", md5, "image/png");
```

## 6. 注意事项

- `OssProperties.endpoint`、`bucketName`、`accessKey`、`secretKey` 必须成套配置。
- 多租户开启时，OSS 配置对象里的 `tenantId` 会参与实例缓存 key。

## 7. 待确认项

- 当前仓库没有展示完整的“上传记录入库 -> 预览链接返回”业务闭环，若后续要补管理端页面，需要再补说明。
