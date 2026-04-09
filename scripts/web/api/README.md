---
title: API 文档
description: 请求层封装、API 组织方式与核心接口说明
---

# API 文档

## 简介

本分类基于 `apps/web-antd/src/api` 与 `apps/web-antd/src/utils/http` 的真实实现，描述当前项目 API 的组织方式、请求封装与核心接口。

## 适用范围

- 接口接入与联调
- 新模块 API 目录落点判断
- 排查请求头、分页、加密、错误提示相关问题

## 对应源码目录或关键文件

- `apps/web-antd/src/api/*`
- `apps/web-antd/src/utils/http/index.ts`
- `apps/web-antd/src/utils/http/checkStatus.ts`
- `apps/web-antd/src/utils/http/helper.ts`
- `packages/constants/src/core.ts`

## 文档清单

- [05-API接口文档](./05-API接口文档.md)
- [请求层封装](./请求层封装.md)
- [API模块组织](./API模块组织.md)
- [核心接口说明](./核心接口说明.md)

## 使用方式、扩展方式或注意事项

- 先看 [请求层封装](./请求层封装.md) 统一理解 `alovaInstance` 的行为，再看模块和接口细节。
- 若接口行为与文档不符，以 `apps/web-antd/src/utils/http/index.ts` 实际逻辑为准。
- 根导出 `#/api` 当前只透出 `core`，系统模块需按目录路径直接导入。
