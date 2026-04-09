---
title: Markdown 编辑与预览
description: "@vben/common-ui 的 Markdown 编辑器与预览器封装，基于 Vditor"
outline: deep
lastUpdated: true
---

# `Markdown`

## 简介
`packages/effects/common-ui/src/components/markdown` 同时提供 Markdown 编辑器和只读预览器。

## 适用范围

- 内容编辑页
- 帮助文档编辑页
- 详情页中的富文本/Markdown 预览

## 对应源码目录或关键文件

- `packages/effects/common-ui/src/components/markdown/index.ts`
- `packages/effects/common-ui/src/components/markdown/editor.vue`
- `packages/effects/common-ui/src/components/markdown/preview.vue`

## 核心机制

### 导出

- `MarkdownEditor`
- `MarkdownPreviewer`

### 编辑器能力

- `MarkdownEditor` 支持 `v-model:value`
- `mode` 可在 `ir`、`sv`、`wysiwyg` 之间切换
- `enableCache` 打开时必须提供 `id`
- `disabled` 会在实例初始化后同步到 Vditor
- `options` 会原样透传到 Vditor 配置

### 预览器能力

- `MarkdownPreviewer` 是只读模式
- 默认关闭工具栏
- 同样会跟随当前主题状态切换暗色/亮色

## 使用方式与注意事项

- 两个组件都会在实例准备好后发出 `mounted` 事件。
- 组件依赖 `Vditor`，不适合在不支持 DOM 的环境中直接使用。
- 如果需要缓存编辑内容，必须保证 `id` 唯一。
