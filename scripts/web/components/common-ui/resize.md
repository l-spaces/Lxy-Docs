---
title: Resize 可拖拽缩放
description: "@vben/common-ui 的拖拽缩放容器，支持边界限制、吸附和比例控制"
outline: deep
lastUpdated: true
---

# `VResize`

## 简介
`VResize` 是一个从 `vue-drag-resize` 思路演化出来的容器组件，适合做可拖拽、可缩放的面板或浮层。

## 适用范围

- 设计器中的可拖拽模块
- 浮动窗口或面板
- 需要在父容器内保持边界的自由布局

## 对应源码目录或关键文件

- `packages/effects/common-ui/src/components/resize/index.ts`
- `packages/effects/common-ui/src/components/resize/resize.vue`

## 核心机制

### 导出

- `VResize`

### 关键 Props

- `isActive`
- `isDraggable`
- `isResizable`
- `aspectRatio`
- `parentLimitation`
- `snapToGrid`
- `gridX`
- `gridY`
- `parentW`
- `parentH`
- `w`
- `h`
- `minw`
- `minh`
- `x`
- `y`
- `z`
- `dragHandle`
- `dragCancel`
- `sticks`
- `axis`
- `contentClass`

### 事件

- `clicked`
- `dragging`
- `dragstop`
- `resizing`
- `resizestop`
- `activated`
- `deactivated`

## 使用方式与注意事项

- `dragHandle` 和 `dragCancel` 都是选择器级控制，不是布尔开关。
- `axis` 支持 `both`、`none`、`x`、`y`。
- 开启 `aspectRatio` 后，缩放会按比例收敛，不再是纯自由宽高变化。
- 这是低层交互组件，适合做设计器，不适合替代普通布局容器。
