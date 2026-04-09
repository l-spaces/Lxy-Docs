---
title: 项目文档中心
description: Lxy-Vue-Admin docs/scripts 文档中心入口
---

# 项目文档中心

## 简介

本目录是 `Lxy-Vue-Admin` 的源码对齐文档中心，所有内容以当前仓库实现为准。

## 适用范围

- 目录：`docs/scripts/**`
- 目标：快速定位项目机制、接口、组件能力、开发与部署流程

## 分类入口

- [guide](./web/guide/README.md)：项目概述、环境配置、架构、核心模块、开发规范、常见问题
- [api](./web/api/README.md)：请求层封装、API 组织、核心接口
- [components](./web/components/README.md)：组件体系、组件能力与应用层组件
- [analysis](./web/analysis/README.md)：源码分析与结构对比
- [development](./web/development/README.md)：本地开发、联调、命令、分支与提交规范
- [deployment](./web/deployment/README.md)：环境变量、代理、构建与部署
- [maintenance](./web/maintenance/README.md)：排障、依赖升级与日常维护
- [reference](./web/reference/README.md)：索引、阅读路径、文档关系
- [changelog](./web/changelog/CHANGELOG.md)：版本更新记录
- [java](./java/explain/README.md)：后端工程说明、模块结构、启动部署与核心配置

## 对应源码目录或关键文件

- `apps/web-antd/src`
- `packages`
- `internal`
- `docs/scripts/web/changelog/CHANGELOG.md`
- `docs/scripts/java/explain/README.md`
- `docs/.vitepress/config.mts`

## 使用方式

1. 先读 [guide](./web/guide/README.md) 建立全局认知。
2. 按场景进入 [api](./web/api/README.md)、[components](./web/components/README.md)、[development](./web/development/README.md) 等专题。
3. 后端说明进入 [java](./java/explain/README.md)。
4. 最后通过 [reference](./web/reference/README.md) 做索引回查。
