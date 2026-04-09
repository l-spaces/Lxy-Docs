---
title: JsonViewer JSON 查看器
description: "@vben/common-ui 的 JSON 树形查看器，支持 bigint、安全解析和交互事件"
outline: deep
lastUpdated: true
---

# `JsonViewer`

## 简介
`JsonViewer` 是项目中的交互式 JSON 查看器，基于 `vue-json-viewer` 做了 bigint 兼容、文案本地化和事件包装。

## 适用范围

- 结构化配置查看
- 调试接口响应
- 需要对 JSON 节点做点击回调的场景

## 对应源码目录或关键文件

- `packages/effects/common-ui/src/components/json-viewer/index.ts`
- `packages/effects/common-ui/src/components/json-viewer/index.vue`
- `packages/effects/common-ui/src/components/json-viewer/types.ts`
- `packages/effects/common-ui/src/components/json-viewer/style.scss`

## 核心机制

### 导出

- `JsonViewer`
- `JsonViewerProps`
- `JsonViewerAction`
- `JsonViewerValue`
- `JsonViewerToggle`

### 关键 Props

- `value`
- `expandDepth`
- `copyable`
- `sort`
- `boxed`
- `theme`
- `expanded`
- `timeformat`
- `previewMode`
- `showArrayIndex`
- `showDoubleQuotes`

### 事件

- `click`
- `copied`
- `keyClick`
- `toggle`
- `valueClick`

### 实现特点

- 如果 `value` 是字符串，会先做 JSON 解析。
- 解析过程使用 `json-bigint`，用于兼容大整数。
- `copyable` 既可以是布尔值，也可以是复制文案配置对象。
- 点击 JSON 节点时，组件会尽量还原路径、层级和值信息。

## 使用方式与注意事项

- 如果传入的是非法 JSON 字符串，组件会回退为空对象。
- 当前实现依赖 `vue-json-viewer` 的内部结构，样式和交互不适合随意魔改。
