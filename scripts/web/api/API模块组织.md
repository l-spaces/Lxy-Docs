---
title: API 模块组织
description: apps/web-antd/src/api 的目录结构、导入方式与模块约定
---

# API 模块组织

## 简介

本页描述 `apps/web-antd/src/api` 的真实目录组织和导入策略，避免把不存在的聚合入口当成约定使用。

## 适用范围

- 新建 API 模块
- 调整导入路径
- 统一模块命名与类型文件放置

## 对应源码目录或关键文件

- `apps/web-antd/src/api/index.ts`
- `apps/web-antd/src/api/core/index.ts`
- `apps/web-antd/src/api/{system,monitor,tool,workflow}`
- `apps/web-antd/src/api/common.d.ts`

## 核心机制或功能说明

### 目录结构（当前仓库）

```text
api/
├── common.d.ts
├── helper.ts
├── index.ts
├── core/
│   ├── auth.ts
│   ├── captcha.ts
│   ├── menu.ts
│   ├── upload.ts
│   ├── user.ts
│   └── index.ts
├── system/
│   ├── client/
│   ├── config/
│   ├── dept/
│   ├── dict/                  # dict-data.ts + dict-type.ts（无 index.ts）
│   ├── menu/
│   ├── notice/
│   ├── oss/
│   ├── oss-config/
│   ├── post/
│   ├── profile/
│   ├── role/
│   ├── social/
│   ├── tenant/
│   ├── tenant-package/
│   └── user/
├── monitor/
│   ├── cache/
│   ├── logininfo/
│   ├── online/
│   └── operlog/
├── tool/
│   └── gen/
└── workflow/
    ├── category/
    ├── definition/
    ├── instance/
    ├── spel/
    └── task/
```

### 导入策略

- `#/api`：
  - 来源 `apps/web-antd/src/api/index.ts`
  - 当前仅透出 `core`（`export * from './core'`）
- 业务模块：
  - 使用路径导入，例如 `#/api/system/user`
  - `dict` 模块按文件导入：`#/api/system/dict/dict-data`、`#/api/system/dict/dict-type`

### 模块内部通用写法

多数模块采用以下模式：

- `enum Api` 管理端点常量
- `index.ts` 放接口函数
- `model.d.ts` 放类型（可选）
- 调用统一使用 `alovaInstance`

### 通用类型与工具

- `common.d.ts`：`ID/IDS`、`PageQuery`、`PageResult`
- `helper.ts`：`commonExport`、`ContentTypeEnum`

## 使用方式、扩展方式或注意事项

- 新模块优先遵循“目录 + index.ts + model.d.ts”的结构，但可按现有模块实际情况（如 `dict`）保持一致。
- 需要在 `#/api` 根路径可用的函数，必须同步更新 `api/index.ts` 导出。
- 命名建议与后端资源路径保持一致，降低联调成本。
