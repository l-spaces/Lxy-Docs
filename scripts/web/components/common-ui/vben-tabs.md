---
title: "Tabs 标签栏组件"
description: "@vben-core/tabs-ui 标签栏与标签工具组件说明"
outline: deep
lastUpdated: true
---

# `@vben-core/tabs-ui`

## 模块定位

- 包名：`@vben-core/tabs-ui`
- 所属目录：`packages/@core/ui-kit/tabs-ui`
- 公开导出：
  - `TabsView`
  - `TabsToolMore`
  - `TabsToolRefresh`
  - `TabsToolScreen`
  - `IContextMenuItem`（从 `@vben-core/shadcn-ui` 透出）

该包负责标签栏视图渲染、滚动、拖拽与上下文菜单。仓库里的布局层通过它承接多标签页体验。

## 导出方式

```ts
export * from './components/widgets';
export { default as TabsView } from './tabs-view.vue';
export type { IContextMenuItem } from '@vben-core/shadcn-ui';
```

## 核心 Props

源码位置：`packages/@core/ui-kit/tabs-ui/src/types.ts`

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `active` | `string` | - | 当前激活标签 key |
| `contentClass` | `string` | `'vben-tabs-content'` | 容器 class |
| `contextMenus` | `(data: any) => IContextMenuItem[]` | - | 右键菜单生成函数 |
| `draggable` | `boolean` | `true` | 是否允许拖拽排序 |
| `gap` | `number` | `7` | 标签间距，仅 `chrome` 风格使用 |
| `maxWidth` | `number` | - | 标签最大宽度，仅 `chrome` 风格使用 |
| `middleClickToClose` | `boolean` | - | 中键关闭标签 |
| `minWidth` | `number` | - | 标签最小宽度，仅 `chrome` 风格使用 |
| `showIcon` | `boolean` | - | 是否显示图标 |
| `styleType` | `TabsStyleType` | `'chrome'` | 标签风格 |
| `tabs` | `TabDefinition[]` | - | 标签数据源 |
| `wheelable` | `boolean` | `true` | 是否响应滚轮滚动 |

## Events

源码位置：`packages/@core/ui-kit/tabs-ui/src/types.ts`

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `close` | `(key: string)` | 关闭标签 |
| `sortTabs` | `(oldIndex: number, newIndex: number)` | 拖拽排序完成 |
| `unpin` | `(tab: TabDefinition)` | 取消固定标签 |

### 工具组件附加事件/模型

| 组件 | API | 说明 |
| --- | --- | --- |
| `TabsToolRefresh` | `refresh` | 刷新事件 |
| `TabsToolScreen` | `v-model:screen` | 控制是否全屏 |
| `TabsToolMore` | `DropdownMenuProps` | 直接透传下拉菜单 props |

## 业务示例

`TabsView` 在仓库里就是 `packages/effects/layouts/src/basic/tabbar/tabbar.vue` 的主体实现，通常会和三个工具按钮一起出现。

```vue
<script setup lang="ts">
import { computed, ref } from 'vue';

import {
  TabsToolMore,
  TabsToolRefresh,
  TabsToolScreen,
  TabsView,
} from '@vben-core/tabs-ui';

const active = ref('/dashboard/analytics');
const screen = ref(false);
const tabs = ref([
  {
    affixTab: true,
    closable: false,
    icon: 'ion:bar-chart-outline',
    key: '/dashboard/analytics',
    title: '分析页',
  },
  {
    affixTab: false,
    closable: true,
    icon: 'ion:people-outline',
    key: '/system/user',
    title: '用户管理',
  },
]);

const menus = computed(() => [
  { label: '刷新', value: 'refresh' },
  { label: '关闭', value: 'close' },
]);

function refreshTab() {
  console.log('refresh current tab');
}

function handleClose(key: string) {
  console.log('close tab', key);
}

function handleSort(oldIndex: number, newIndex: number) {
  console.log('sort tabs', oldIndex, newIndex);
}

function handleUnpin(tab: any) {
  console.log('unpin tab', tab);
}
</script>

<template>
  <TabsView
    :active="active"
    :context-menus="() => []"
    :draggable="true"
    :middle-click-to-close="true"
    :show-icon="true"
    :tabs="tabs"
    style-type="chrome"
    @close="handleClose"
    @sort-tabs="handleSort"
    @unpin="handleUnpin"
    @update:active="active = $event"
  />

  <div class="flex items-center gap-2">
    <TabsToolMore :menus="menus" />
    <TabsToolRefresh @refresh="refreshTab" />
    <TabsToolScreen :screen="screen" @update:screen="screen = $event" />
  </div>
</template>
```

在布局层里，常配合的真实 API 是：

- `useTabs()` 的 `refreshTab()`、`unpinTab()`
- `useContentMaximize()` 的 `contentIsMaximize`、`toggleMaximize()`
- `tabbarStore.sortTabs(...)`

## 渲染模式

| 模式 | 源码位置 | 说明 |
| --- | --- | --- |
| `chrome` | `src/components/tabs-chrome/tabs.vue` | 类浏览器标签风格 |
| 其他风格 | `src/components/tabs/tabs.vue` | 普通标签渲染，支持 `plain`、`card`、`brisk` 等样式逻辑 |

`TabsView` 会根据 `styleType` 在这两种内部实现之间切换，并通过 `VbenScrollbar` 处理横向滚动。

## 依赖关系

| 关系 | 说明 |
| --- | --- |
| 依赖 `@vben-core/shadcn-ui` | 使用 `VbenScrollbar`、`VbenContextMenu`、`VbenIcon` |
| 依赖 `@vben-core/composables` | 通过 `useForwardPropsEmits` 转发 props/emits |
| 依赖 `@vben-core/icons` | 左右滚动按钮与固定/关闭图标 |
| 被 `@vben/layouts` 使用 | `packages/effects/layouts/src/basic/tabbar` 作为布局标签栏主体能力 |

## 典型使用场景

- 管理后台多标签页导航
- 带右键菜单的标签管理
- 支持固定标签、拖拽排序、中键关闭的页签栏

## 使用注意事项

- `middleClickToClose` 只有在标签可关闭、非固定标签、且标签数大于 1 时才生效。
- `TabsView` 没有在源码中声明额外命名插槽；扩展能力主要依赖 props、事件和右键菜单。
- `contextMenus` 的返回类型来自 `@vben-core/shadcn-ui` 的 `IContextMenuItem`，菜单项结构应与上下文菜单组件保持一致。
