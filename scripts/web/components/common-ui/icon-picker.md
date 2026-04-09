---
title: IconPicker 图标选择器
description: "@vben/common-ui 的图标选择器，支持搜索、分页和输入框集成"
outline: deep
lastUpdated: true
---

# `IconPicker`

## 简介
`IconPicker` 是一个基于弹层的图标选择器，内部支持自动拉取图标列表、搜索过滤和分页浏览。

## 适用范围

- 图标字段选择
- 表单中的图标输入框
- 需要把图标名作为表单值保存的场景

## 对应源码目录或关键文件

- `packages/effects/common-ui/src/components/icon-picker/index.ts`
- `packages/effects/common-ui/src/components/icon-picker/icon-picker.vue`
- `packages/effects/common-ui/src/components/icon-picker/icons.ts`

## 核心机制

### 导出

- `IconPicker`

### 关键 Props

- `pageSize`
- `prefix`
- `autoFetchApi`
- `icons`
- `inputComponent`
- `iconSlot`
- `modelValueProp`
- `iconClass`
- `type`

### 组件行为

- 默认使用 `VbenPopover` 承载弹层。
- `prefix` 存在且开启自动拉取时，会尝试从图标源加载数据。
- `type="input"` 时显示输入框触发器，`type="icon"` 时只显示图标按钮。
- 组件内部支持关键字过滤和分页。

### 暴露方法

- `toggleOpenState()`
- `open()`
- `close()`

## 业务示例

在 `apps/web-antd/src/adapter/component/index.ts` 里，`IconPicker` 会被包装进表单适配器；如果直接在页面里用，通常就是给菜单、按钮或卡片配置图标名。

```vue
<script setup lang="ts">
import { ref } from 'vue';

import { IconPicker } from '@vben/common-ui';

const icon = ref('ion:home-outline');
</script>

<template>
  <IconPicker
    v-model="icon"
    class="w-[280px]"
    :page-size="48"
    prefix="ion"
    type="input"
  />
</template>
```

如果要和自定义输入框一起用，记得同时传 `inputComponent` 和 `modelValueProp`，这和表单适配层的接入方式一致。

## 使用方式与注意事项

- `inputComponent` 必须和 `modelValueProp` 一起配合使用，否则自定义输入框无法正确回写值。
- `icons` 传入后会优先使用显式列表。
- 图标集合为空时，组件会展示空状态而不是报错。
