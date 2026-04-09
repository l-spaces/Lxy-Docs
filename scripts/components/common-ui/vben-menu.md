---
title: "Menu 菜单组件"
description: "@vben-core/menu-ui 菜单组件与菜单容器 API"
outline: deep
lastUpdated: true
---

# `@vben-core/menu-ui`

## 模块定位

- 包名：`@vben-core/menu-ui`
- 所属目录：`packages/@core/ui-kit/menu-ui`
- 公开导出：
  - `Menu`
  - `MenuBadge`
  - `NormalMenu`
  - `types`

该包提供底层菜单渲染能力。仓库中的 `@vben/layouts` 并不直接重写菜单逻辑，而是通过它拼装出头部菜单、侧栏菜单和混合菜单。

## 导出方式

```ts
export { default as MenuBadge } from './components/menu-badge.vue';
export * from './components/normal-menu';
export { default as Menu } from './menu.vue';
export type * from './types';
```

## 组件结构

| 组件/模块 | 源码位置 | 说明 |
| --- | --- | --- |
| `Menu` | `src/menu.vue` | 面向外部的菜单视图组件，额外接收 `menus: MenuRecordRaw[]` |
| 内部 `Menu` 容器 | `src/components/menu.vue` | 真正负责收集菜单项、展开/收起、横向溢出处理 |
| `NormalMenu` | `src/components/normal-menu` | 普通菜单实现 |
| `MenuBadge` | `src/components/menu-badge.vue` | 菜单徽标 |
| `collapse-transition.vue` | `src/components/collapse-transition.vue` | 折叠动画 |
| `use-menu-context`、`use-menu-scroll`、`use-menu` | `src/hooks` | 上下文、滚动定位、菜单行为逻辑 |

## 核心 Props

### `MenuProps`

源码位置：`packages/@core/ui-kit/menu-ui/src/types.ts`

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `accordion` | `boolean` | `true` | 是否启用手风琴模式 |
| `collapse` | `boolean` | `false` | 是否折叠菜单 |
| `collapseShowTitle` | `boolean` | `false` | 折叠时是否显示标题 |
| `defaultActive` | `string` | - | 默认激活项 |
| `defaultOpeneds` | `string[]` | - | 默认展开的菜单路径 |
| `mode` | `'horizontal' \| 'vertical'` | `'vertical'` | 菜单模式 |
| `rounded` | `boolean` | `true` | 是否使用圆角风格 |
| `scrollToActive` | `boolean` | `false` | 纵向非折叠菜单下是否自动滚动到激活项 |
| `theme` | `ThemeModeType` | `'dark'` | 菜单主题 |

### `Menu` 额外 Props

`src/menu.vue` 在 `MenuProps` 基础上额外接收：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `menus` | `MenuRecordRaw[]` | 菜单数据源 |

## Events

内部容器 `src/components/menu.vue` 明确声明了以下事件：

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `select` | `(path: string, parentPaths: string[])` | 点击菜单项时触发 |
| `open` | `(path: string, parentPaths: string[])` | 展开子菜单时触发 |
| `close` | `(path: string, parentPaths: string[])` | 收起子菜单时触发 |

## 类型定义

源码位置：`packages/@core/ui-kit/menu-ui/src/types.ts`

| 类型 | 说明 |
| --- | --- |
| `MenuItemProps` | 单个菜单项的 `path`、`icon`、`query`、`disabled` 等属性 |
| `SubMenuProps` | 子菜单的 `path`、`icon`、`disabled` 等属性 |
| `MenuItemRegistered` | 菜单注册表中使用的数据结构 |
| `MenuProvider`、`SubMenuProvider` | 菜单上下文能力 |

## 插槽与渲染行为

- `src/components/menu.vue` 只在公开模板中使用了默认插槽。
- 横向模式下如果菜单项宽度溢出，会自动插入一个 “more” 子菜单，并把多余项移动到这个子菜单里。
- 源码中没有找到面向外部文档的命名插槽约定。

## 依赖关系与适配关系

| 关系 | 说明 |
| --- | --- |
| 依赖 `@vben-core/shadcn-ui` | 内部使用 Tooltip/Popover 等基础能力 |
| 依赖 `@vben-core/composables` | 使用 `useForwardProps`、命名空间样式工具 |
| 被 `@vben/layouts` 使用 | `packages/effects/layouts/src/basic/layout.vue` 通过 `LayoutMenu`、`LayoutMixedMenu` 组合成完整布局菜单 |

## 典型使用场景

- `BasicLayout` 的头部横向菜单
- `BasicLayout` 的侧边栏纵向菜单
- 混合导航模式下的多列菜单

## 业务示例

`Menu` 是对外更完整的菜单入口，`NormalMenu` 则是 `packages/effects/layouts/src/basic/menu/mixed-menu.vue` 里直接使用的普通菜单实现。

```vue
<script setup lang="ts">
import { ref } from 'vue';

import { Menu, NormalMenu } from '@vben-core/menu-ui';

const menus = ref([
  {
    icon: 'ion:grid-outline',
    path: '/dashboard',
    title: '仪表盘',
  },
  {
    children: [
      {
        path: '/system/user',
        title: '用户管理',
      },
    ],
    icon: 'ion:settings-outline',
    path: '/system',
    title: '系统管理',
  },
]);
</script>

<template>
  <Menu :menus="menus" default-active="/system/user" mode="vertical" />
  <NormalMenu
    active-path="/system/user"
    :collapse="false"
    :menus="menus"
    rounded
    theme="dark"
  />
</template>
```

## 使用注意事项

- `scrollToActive` 只有在 `mode === 'vertical'` 且 `collapse === false` 时才真正启用。
- 折叠模式和横向模式都会影响 `openedMenus` 的行为，不能把它们当成普通树菜单来理解。
- 目前没有独立暴露菜单方法实例；对外稳定 API 主要是 props、事件和菜单数据结构。
