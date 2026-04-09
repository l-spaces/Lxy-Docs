---
title: 组件介绍
description: 基于真实导出入口的组件体系与 packages 归类
lastUpdated: true
---

# 组件介绍

## 简介

本页只基于真实导出入口和源码职责整理组件体系，避免把工具库、类型库误写为组件文档。

## 适用范围

- 组件能力归类
- `packages` 到 `apps/web-antd` 的接入关系理解
- 文档阅读路径选择

## 对应源码目录或关键文件

- `packages/*/package.json`
- `packages/effects/common-ui/src/index.ts`
- `packages/@core/ui-kit/*/src/index.ts`
- `apps/web-antd/src/components/*`
- `apps/web-antd/src/adapter/*`

## packages 归类清单

| 分类 | 包/目录 | 说明 |
| --- | --- | --- |
| UI 组件或组件能力 | `@vben/common-ui`、`@vben-core/shadcn-ui` | 通用组件、基础原子组件 |
| 场景页面/应用层 UI | `packages/effects/common-ui/src/ui` | 关于、认证、仪表盘、个人中心、兜底页等场景模块 |
| 插件/集成能力 | `@vben/plugins` | 图表、表格、动效等插件型能力 |
| 布局能力 | `@vben-core/layout-ui`、`@vben/layouts` | 底层布局容器与组合布局实现 |
| 表单能力 | `@vben-core/form-ui` | `setupVbenForm`、`useVbenForm`、Schema 与规则系统 |
| 菜单/标签页/弹窗交互能力 | `@vben-core/menu-ui`、`@vben-core/tabs-ui`、`@vben-core/popup-ui` | 菜单、tabbar、modal/drawer/alert |
| 工具库 | `@vben/utils`、`@vben/request`、`@vben/hooks`、`@vben/access`、`@vben/icons` | 不属于组件展示主体 |
| 类型定义 | `@vben/types`、`@vben-core/typings` | 类型声明与协议定义 |
| 基础能力 | `@vben/constants`、`@vben/locales`、`@vben/preferences`、`@vben/stores`、`@vben/styles`、`@vben-core/design`、`@vben-core/shared`、`@vben-core/composables` | 常量、状态、样式、共享逻辑等底座 |

## 组件体系阅读入口

- 包级聚合：
  - [vben-common-ui](./common-ui/vben-common-ui.md)
  - [scene-ui](./common-ui/scene-ui.md)
  - [vben-layout-system](./layout-ui/vben-layout-system.md)
  - [vben-plugins](./common-ui/vben-plugins.md)
- 交互核心：
  - [vben-form](./common-ui/vben-form.md)
  - [vben-menu](./common-ui/vben-menu.md)
  - [vben-tabs](./common-ui/vben-tabs.md)
  - [vben-modal](./common-ui/vben-modal.md)
  - [vben-drawer](./common-ui/vben-drawer.md)
  - [vben-alert](./common-ui/vben-alert.md)
- 应用层组件：
  - [应用层组件体系](./应用层组件体系.md)

## 使用方式、扩展方式或注意事项

- 先判断能力属于“包级能力”还是“应用层业务组件”，再落文档位置。
- `apps/web-antd/src/components` 中的组件主要服务业务页面与适配器，不等于可跨应用发布的组件包。
- 若某模块没有稳定导出入口，只在内部调用，不应在组件文档中当作公开 API 承诺。
