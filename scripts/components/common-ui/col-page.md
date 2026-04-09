---
title: ColPage 分栏页面
description: "@vben/common-ui 的左右分栏页面容器，基于 Page 和可拖拽分栏实现"
outline: deep
lastUpdated: true
---

# `ColPage`

## 简介
`ColPage` 是面向管理页的分栏容器，底层组合了 `Page` 和 `ResizablePanelGroup`。

## 适用范围

- 左侧筛选区、树区、列表区
- 右侧明细区、编辑区、内容区
- 需要可折叠、可拖拽分割线的页面

## 对应源码目录或关键文件

- `packages/effects/common-ui/src/components/col-page/index.ts`
- `packages/effects/common-ui/src/components/col-page/col-page.vue`
- `packages/effects/common-ui/src/components/col-page/types.ts`
- `packages/effects/common-ui/src/components/page/page.vue`

## 核心机制

### 导出

- `ColPage`
- `ColPageProps`

### 关键能力

- 左右两栏分别使用 `leftWidth` 和 `rightWidth` 控制默认宽度。
- `leftCollapsible`、`rightCollapsible` 控制面板是否可折叠。
- `resizable` 控制中间拖拽分割线是否显示。
- `splitLine` 和 `splitHandle` 用于控制分割线样式。

### 对 `Page` 的继承

`ColPageProps` 直接继承 `PageProps`，因此页面标题、描述、底部等能力仍由 `Page` 提供。

### 暴露方法

- `expandLeft()`
- `collapseLeft()`

## 使用方式与注意事项

- 左侧区域通过 `left` 插槽渲染，默认内容通过默认插槽渲染。
- 当需要按业务状态控制左侧折叠时，可通过 `ref` 调用暴露方法。
- 这是页面容器，不是通用布局库，不建议脱离页面级场景单独使用。
