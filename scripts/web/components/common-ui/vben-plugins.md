---
title: "Plugins 插件能力"
description: "@vben/plugins 的根入口与 echarts、vxe-table、motion 子能力说明"
outline: deep
lastUpdated: true
---

# `@vben/plugins`

## 模块定位

- 包名：`@vben/plugins`
- 所属目录：`packages/effects/plugins`
- `package.json` 声明的公开入口：
  - `@vben/plugins`
  - `@vben/plugins/echarts`
  - `@vben/plugins/vxe-table`
  - `@vben/plugins/motion`

该包不是单一组件库，而是“组件相关插件能力”的集合。根入口只暴露插件上下文与配置类型，真正的图表、表格、动效能力通过子路径使用。

## 根入口 API

源码位置：`packages/effects/plugins/src/index.ts`

```ts
export * from './plugins-context';
export * from './types';
```

### 公开方法

| API | 源码位置 | 说明 |
| --- | --- | --- |
| `providePluginsOptions(options)` | `src/plugins-context.ts` | 合并并写入全局插件配置 |
| `injectPluginsOptions()` | `src/plugins-context.ts` | 读取当前全局插件配置 |
| `resetPluginsOptions()` | `src/plugins-context.ts` | 清空全局插件配置 |

### 配置类型

源码位置：`packages/effects/plugins/src/types.ts`

| 类型 | 说明 |
| --- | --- |
| `VbenPluginsOptions` | 总配置对象 |
| `VbenPluginsFormOptions` | 表单插件选项，当前定义 `useVbenForm` |
| `VbenPluginsModalOptions` | 弹窗插件选项，当前定义 `useVbenModal` |
| `VbenPluginsMessageOptions` | 消息插件选项，当前定义 `useMessage` |
| `VbenPluginsComponentsOptions` | 组件映射表 |

## `@vben/plugins/echarts`

### 导出方式

源码位置：`packages/effects/plugins/src/echarts/index.ts`

```ts
export * from './echarts';
export { default as EchartsUI } from './echarts-ui.vue';
export * from './types';
export * from './use-echarts';
```

### `EchartsUI` 组件 API

源码位置：`packages/effects/plugins/src/echarts/echarts-ui.vue`

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `height` | `string` | `'300px'` | 图表容器高度 |
| `width` | `string` | `'100%'` | 图表容器宽度 |

### `useEcharts(chartRef)` 返回值

源码位置：`packages/effects/plugins/src/echarts/use-echarts.ts`

| 方法/状态 | 说明 |
| --- | --- |
| `isActive` | 当前图表是否处于激活状态 |
| `renderEcharts(options, clear?)` | 初始化或重绘图表 |
| `resize(withAnimation?)` | 触发尺寸重算 |
| `updateData(option, notMerge?, lazyUpdate?)` | 更新 option |
| `getChartInstance()` | 获取原始 ECharts 实例 |

### 注册的图表能力

源码位置：`packages/effects/plugins/src/echarts/echarts.ts`

- 图表：`BarChart`、`LineChart`、`PieChart`、`RadarChart`、`GaugeChart`、`MapChart`
- 组件：`DatasetComponent`、`GridComponent`、`LegendComponent`、`TitleComponent`、`ToolboxComponent`、`TooltipComponent`、`TransformComponent`、`VisualMapComponent`
- 特性：`LabelLayout`、`LegacyGridContainLabel`、`UniversalTransition`
- 渲染器：`CanvasRenderer`

### `ECOption`

源码位置：`packages/effects/plugins/src/echarts/types.ts`

`ECOption` 当前组合了 `Bar`、`Line`、`Pie`、`Radar` 及部分组件 option。源码中虽然注册了 `Gauge`、`Map`、`VisualMap` 等能力，但该类型别名未把这些 option 一并组合进去。

### 仓库中的实际使用

- `apps/web-antd/src/views/dashboard/analytics/*`
- `apps/web-antd/src/views/monitor/cache/components/*`

## `@vben/plugins/vxe-table`

公开入口已经单独整理为 [Vxe Table 组件](./vben-vxe-table)。

当前子路径公开导出：

- `setupVbenVxeTable`
- `useVbenVxeGrid`
- `VbenVxeGrid`
- `VxeTableGridColumns`
- `VxeTableGridOptions`
- `VxeGridDefines`
- `VxeGridListeners`
- `VxeGridProps`
- `VxeGridPropTypes`

仓库中的实际接入位于 `apps/web-antd/src/adapter/vxe-table.ts`。

## `@vben/plugins/motion`

源码位置：`packages/effects/plugins/src/motion/index.ts`

```ts
export * from './types';

export {
  MotionComponent as Motion,
  MotionDirective,
  MotionGroupComponent as MotionGroup,
  MotionPlugin,
} from '@vueuse/motion';
```

这部分能力更偏“动效插件”，不是独立业务组件。当前仓库中的实际接入在 `apps/web-antd/src/bootstrap.ts`：

- 动态导入 `MotionPlugin`
- 通过 `app.use(MotionPlugin)` 安装到应用

## 业务示例

### ECharts 图表

仓库里的真实接入基本都长这样，和 `apps/web-antd/src/views/dashboard/analytics/analytics-trends.vue` 的写法一致。

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue';

import type { EchartsUIType } from '@vben/plugins/echarts';
import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

onMounted(() => {
  renderEcharts({
    series: [
      {
        areaStyle: {},
        data: [111, 2000, 6000, 16_000, 33_333],
        smooth: true,
        type: 'line',
      },
    ],
    xAxis: {
      data: ['06:00', '07:00', '08:00', '09:00', '10:00'],
      type: 'category',
    },
    yAxis: [{ type: 'value' }],
  });
});
</script>

<template>
  <EchartsUI ref="chartRef" height="260px" />
</template>
```

### Motion 插件

`MotionPlugin` 只需要在应用启动时安装一次：

```ts
import { MotionPlugin } from '@vben/plugins/motion';

app.use(MotionPlugin);
```

### Vxe Table

完整示例见 [Vxe Table 组件](./vben-vxe-table.md)。`@vben/plugins/vxe-table` 在项目里主要和 `useVbenForm` 一起构成“查询表单 + 列表页”。

## 使用注意事项

- 根入口 `@vben/plugins` 不会自动把 `echarts`、`vxe-table`、`motion` 透出到同一路径，实际使用时应走对应子路径。
- `EchartsUI` 是真正的可视化组件；`motion` 更多是指令与插件能力。
- 如果需要查看 VXE 表格的详细 API，请直接进入 [Vxe Table 组件](./vben-vxe-table)。
