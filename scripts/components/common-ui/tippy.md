---
title: Tippy 提示器
description: "@vben/common-ui 的 Tippy 封装，包含组件、指令和全局初始化"
outline: deep
lastUpdated: true
---

# `Tippy`

## 简介
`Tippy` 模块对 `vue-tippy` 做了项目级封装，提供组件、指令和初始化函数三种入口。

## 适用范围

- 表单项提示
- 图标悬浮说明
- 页面内轻量 tooltip/popover

## 对应源码目录或关键文件

- `packages/effects/common-ui/src/components/tippy/index.ts`
- `packages/effects/common-ui/src/components/tippy/directive.ts`

## 核心机制

### 导出

- `Tippy`
- `TippyProps`
- `initTippy`

### 组件行为

- `Tippy` 是对 `vue-tippy` 组件的二次封装。
- `theme` 支持 `auto`、`dark`、`light`。
- 默认会根据当前主题状态自动切换。

### 指令行为

- `initTippy(app, options?)` 会注册 `v-tippy` 指令。
- 指令支持从绑定值、`title` 属性或 `content` 属性读取提示内容。
- 修饰符可用于控制 placement，`arrow` 修饰符可控制箭头显示。
- 组件 vnode 上的 `onTippyShow/onTippyShown/onTippyHidden/onTippyHide/onTippyMount` 会被转成对应回调。

## 业务示例

`Tippy` 在仓库里最常见的是布局头部的小图标提示，以及按钮上的说明气泡。`bootstrap.ts` 里会先做全局初始化。

```ts
import { initTippy } from '@vben/common-ui/es/tippy';

initTippy(app);
```

```vue
<script setup lang="ts">
import { Tippy } from '@vben/common-ui/es/tippy';
import { VbenIconButton } from '@vben-core/shadcn-ui';
</script>

<template>
  <VbenIconButton v-tippy="'刷新当前列表'">
    刷新
  </VbenIconButton>

  <Tippy content="点击后会执行保存" placement="top">
    <a-button type="primary">保存</a-button>
  </Tippy>
</template>
```

如果需要和主题联动，优先让 `initTippy()` 保持默认 `theme: auto`，这样深浅色切换会自动生效。

## 使用方式与注意事项

- `initTippy()` 应该只在应用启动阶段调用一次。
- 如果只需要局部提示，优先用组件；如果页面上大量是属性驱动提示，再用指令。
