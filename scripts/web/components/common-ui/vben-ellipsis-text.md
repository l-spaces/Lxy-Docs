---
title: 省略文本组件
description: "@vben/common-ui EllipsisText 的截断、提示与展开机制"
outline: deep
lastUpdated: true
---

# `EllipsisText`

## 简介

`EllipsisText` 位于 `packages/effects/common-ui/src/components/ellipsis-text/ellipsis-text.vue`，用于长文本截断、tooltip 展示和点击展开。

## 适用范围

- 表格列长文本展示
- 卡片摘要文本展示
- 仅在实际截断时显示 tooltip 的场景

## 对应源码目录或关键文件

- `packages/effects/common-ui/src/components/ellipsis-text/index.ts`
- `packages/effects/common-ui/src/components/ellipsis-text/ellipsis-text.vue`

## 核心机制或功能说明

### 导出方式

- `index.ts`：`export { default as EllipsisText }`

### Props（源码定义）

- 展示控制：
  - `line`
  - `maxWidth`
  - `expand`
- tooltip 控制：
  - `tooltip`
  - `tooltipWhenEllipsis`
  - `placement`
  - `tooltipBackgroundColor`
  - `tooltipColor`
  - `tooltipFontSize`
  - `tooltipMaxWidth`
  - `tooltipOverlayStyle`
- 截断判断：
  - `ellipsisThreshold`

### 事件

- `expandChange(isExpand: boolean)`

### 实现机制

- 使用 `ResizeObserver` 监听尺寸变化（`tooltipWhenEllipsis = true` 时启用）
- 单行通过 `scrollWidth/clientWidth` 判断截断，多行通过 `scrollHeight/clientHeight` 判断
- tooltip 组件使用 `VbenTooltip`

## 使用方式、扩展方式或注意事项

- `tooltipWhenEllipsis` 建议配合较小 `ellipsisThreshold`，避免误判。
- 需要点击展开时开启 `expand`，并监听 `expandChange` 做状态联动。
- 多行场景依赖 `-webkit-line-clamp`，在极端样式覆盖下需回归验证。
