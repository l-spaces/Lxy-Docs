---
title: package.json 对比分析
description: 根 package.json、apps/web-antd 与 docs 子包配置差异
lastUpdated: true
---

# package.json 对比分析

## 简介

本页只分析当前仓库真实配置：根目录、`apps/web-antd`、`docs` 三个 package 的职责边界。

## 适用范围

- 命令入口定位
- 依赖归属判断
- 文档站点与主应用构建差异识别

## 对应源码目录或关键文件

- `package.json`
- `apps/web-antd/package.json`
- `docs/package.json`
- `pnpm-workspace.yaml`

## 核心机制或功能说明

### 角色分工

| 位置 | 包名 | 角色 |
| --- | --- | --- |
| 根目录 | `vben-admin-monorepo` | Monorepo 编排层（Turbo、质量检查、统一命令） |
| 应用 | `@vben/web-antd` | 业务应用运行层（Vite dev/build/preview） |
| 文档 | `@lxy/docs` | VitePress 文档站点 |

### scripts 差异（核心命令）

根目录：

- `dev`、`dev:antd`
- `build`、`build:antd`、`build:antd:test`
- `docs:dev`、`docs:build`、`docs:preview`
- `lint`、`check:type`、`check`

`apps/web-antd`：

- `dev`
- `build:prod`
- `build:test`
- `build:analyze`
- `preview`
- `typecheck`

`docs`：

- `dev`（`vitepress dev`）
- `build`（`vitepress build`）
- `preview`（`vitepress preview`）

### 依赖归属

- 根目录以 `devDependencies` 为主，负责工程工具链
- `apps/web-antd` 以运行时依赖为主，引用大量 `workspace:*` 内部包
- `docs` 只保留 `vitepress` 相关依赖，职责单一

### 版本与环境约束

根目录定义：

- `engines.node = ^20.19.0 || ^22.18.0 || ^24.0.0`
- `engines.pnpm >= 10.0.0`
- `packageManager = pnpm@10.32.1`

应用与 docs 未重复声明，默认继承根目录开发约束。

## 使用方式、扩展方式或注意事项

- 新增通用命令优先放根目录，避免子包命令分散。
- 新增业务运行依赖放 `apps/web-antd`，不要误放根目录。
- 文档站点能力仅在 `docs` 子包维护，保持与业务应用解耦。
