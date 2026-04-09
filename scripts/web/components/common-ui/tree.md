---
title: Tree 树组件
description: "@vben/common-ui 的树形组件封装，基于 VbenTree 并补充空状态"
outline: deep
lastUpdated: true
---

# `Tree`

## 简介
`Tree` 是对 `VbenTree` 的轻量包装，保留树组件能力，同时统一空状态展示。

## 适用范围

- 菜单树
- 部门树
- 分类树
- 需要统一空状态的树形数据展示

## 对应源码目录或关键文件

- `packages/effects/common-ui/src/components/tree/index.ts`
- `packages/effects/common-ui/src/components/tree/tree.vue`

## 核心机制

### 导出

- `Tree`

### 组件行为

- 当 `treeData` 存在且有数据时，直接渲染 `VbenTree`。
- 当数据为空时，组件会渲染带图标的空状态。
- 所有插槽会继续透传给 `VbenTree`。

## 使用方式与注意事项

- 该组件依赖 `@vben-core/shadcn-ui` 的 `TreeProps` 和 `treePropsDefaults()`。
- 如果需要自定义树节点内容，继续使用原生插槽即可，不需要额外二次封装。
