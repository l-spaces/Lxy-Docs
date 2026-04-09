---
title: VbenCountToAnimator 数字动画组件
description: "@vben-core/shadcn-ui 的数字动画组件，业务中实际使用的是 VbenCountToAnimator"
outline: deep
lastUpdated: true
---

# `VbenCountToAnimator`

## 简介

`VbenCountToAnimator` 位于 `packages/@core/ui-kit/shadcn-ui/src/components/count-to-animator`，用于把统计数字做成平滑递增/递减动画。当前仓库业务页里实际使用的是这个组件，例如 `apps/web-antd/src/views/dashboard/analytics/index.vue` 里的 `AnalysisOverview`。

`packages/effects/common-ui/src/components/count-to` 里也保留了早期的 `CountTo` 实现，但业务页面当前没有直接引用它。

## 适用范围

- 仪表盘统计卡片
- 需要首屏展示动画数字的概览区
- 有前缀、后缀、小数、分隔符格式需求的数值展示

## 对应源码目录或关键文件

- `packages/@core/ui-kit/shadcn-ui/src/components/count-to-animator/count-to-animator.vue`
- `packages/effects/common-ui/src/ui/dashboard/analysis/analysis-overview.vue`
- `apps/web-antd/src/views/dashboard/analytics/index.vue`

## 核心机制或功能说明

### 导出方式

- `VbenCountToAnimator`

### 关键 Props

- 动画控制：`autoplay`、`startVal`、`endVal`、`duration`
- 数值格式：`prefix`、`suffix`、`decimals`、`decimal`、`separator`
- 运动曲线：`transition`、`useEasing`
- 视觉控制：`color`

### 事件

- `started`
- `finished`

源码里还保留了兼容事件：

- `onStarted`
- `onFinished`

### 暴露方法

- `reset()`

### 实现要点

- 内部基于 `@vueuse/core` 的 `useTransition`
- `startVal`、`endVal` 或 `autoplay` 变化时会自动重新触发动画
- 最终显示值会按 `decimals`、`separator`、`prefix`、`suffix` 格式化后渲染

## 业务示例

`AnalysisOverview` 里的统计卡片就是这种写法。

```vue
<script setup lang="ts">
import { ref } from 'vue';

import { VbenCountToAnimator } from '@vben-core/shadcn-ui';

const totalValue = ref(120000);

function handleFinished() {
  console.log('count finished');
}
</script>

<template>
  <VbenCountToAnimator
    :start-val="0"
    :end-val="totalValue"
    :decimals="0"
    :duration="1800"
    color="hsl(215, 100%, 54%)"
    prefix="¥"
    suffix=" 元"
    @finished="handleFinished"
  />
</template>
```

如果需要手动重播动画，可以拿到组件实例后调用 `reset()`。

## 使用方式、扩展方式或注意事项

- 业务页里优先使用 `VbenCountToAnimator`，不要再直接依赖旧的 `CountTo` 实现。
- 需要千分位分隔时优先传 `separator`，不要在外层自己拼接字符串。
- 如果当前页面是静态占位数据，可以关闭 `autoplay` 或降低 `duration`。
