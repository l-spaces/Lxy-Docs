---
title: Page 页面组件
description: "@vben/common-ui Page 组件的页面容器能力"
outline: deep
lastUpdated: true
---

# `Page`

## 简介

`Page` 是页面级内容容器，位于 `packages/effects/common-ui/src/components/page`，用于统一页面头部、内容区、底部区结构。

## 适用范围

- 常规管理页布局骨架
- 需要自动计算内容区高度的页面

## 对应源码目录或关键文件

- `packages/effects/common-ui/src/components/page/index.ts`
- `packages/effects/common-ui/src/components/page/types.ts`
- `packages/effects/common-ui/src/components/page/page.vue`

## 核心机制或功能说明

### 导出方式

- `Page`
- `PageProps`

### `PageProps`（源码定义）

- `title`
- `description`
- `contentClass`
- `headerClass`
- `footerClass`
- `autoContentHeight`
- `heightOffset`

### 插槽

模板中实际使用：

- `title`
- `description`
- `extra`
- `default`
- `footer`

### 自动高度机制

- 启用 `autoContentHeight` 后，组件会读取：
  - `headerRef.offsetHeight`
  - `footerRef.offsetHeight`
- 再结合 `CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT` 与 `heightOffset` 计算内容区高度

## 业务示例

`Page` 在仓库里最常见的用法，就是承载列表页或详情页的标准页面骨架，和 `system/user/index.vue`、`workflow/task/*.vue` 这类页面一致。

```vue
<script setup lang="ts">
import { Page } from '@vben/common-ui';
</script>

<template>
  <Page title="用户管理" description="维护系统账号、状态与角色" auto-content-height>
    <template #extra>
      <a-button type="primary">新增用户</a-button>
    </template>

    <div class="rounded-lg border border-border bg-background p-4">
      <div class="text-sm text-muted-foreground">这里放列表、表单或者统计卡片。</div>
    </div>

    <template #footer>
      <div class="text-xs text-muted-foreground">共 128 条数据</div>
    </template>
  </Page>
</template>
```

实际接入时，这几个参数最常见：

- `title`
- `description`
- `autoContentHeight`
- `heightOffset`
- `extra` 插槽

## 使用方式、扩展方式或注意事项

- 页面需要固定可滚动内容区时可开启 `autoContentHeight`。
- `heightOffset` 适合补偿额外工具栏或自定义区块高度。
- 若页面没有头部/底部插槽，组件会自动跳过对应区域渲染。
