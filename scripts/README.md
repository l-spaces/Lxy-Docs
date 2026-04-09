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

- [guide](./guide/README.md)：项目概述、环境配置、架构、核心模块、开发规范、常见问题
- [api](./api/README.md)：请求层封装、API 组织、核心接口
- [components](./components/README.md)：组件体系、组件能力与应用层组件
- [analysis](./analysis/README.md)：源码分析与结构对比
- [development](./development/README.md)：本地开发、联调、命令、分支与提交规范
- [deployment](./deployment/README.md)：环境变量、代理、构建与部署
- [maintenance](./maintenance/README.md)：排障、依赖升级与日常维护
- [reference](./reference/README.md)：索引、阅读路径、文档关系
- [changelog](./changelog/CHANGELOG.md)：版本更新记录

## 对应源码目录或关键文件

- `apps/web-antd/src`
- `packages`
- `internal`
- `docs/scripts/changelog/CHANGELOG.md`
- `docs/.vitepress/config.mts`

## 使用方式

1. 先读 [guide](./guide/README.md) 建立全局认知。
2. 按场景进入 [api](./api/README.md)、[components](./components/README.md)、[development](./development/README.md) 等专题。
3. 最后通过 [reference](./reference/README.md) 做索引回查。
