---
title: "Shadcn UI 基础库"
description: "@vben-core/shadcn-ui 的基础组件与业务包装组件概览"
outline: deep
lastUpdated: true
---

# `@vben-core/shadcn-ui`

## 模块定位

- 包名：`@vben-core/shadcn-ui`
- 所属目录：`packages/@core/ui-kit/shadcn-ui`
- 公开入口：`@vben-core/shadcn-ui`

该包是当前仓库的基础 UI 能力底座，分为两层：

- `src/components/`：面向项目封装过的业务友好组件
- `src/ui/`：更接近 shadcn / Reka UI 原子组件的基础实现

## 导出方式

根入口 `src/index.ts`：

```ts
export * from './components';
export * from './ui';
export { createContext, Slot, VisuallyHidden } from 'reka-ui';
```

## `components/` 业务包装组件

源码位置：`packages/@core/ui-kit/shadcn-ui/src/components/index.ts`

当前公开导出如下模块：

- `avatar`
- `back-top`
- `breadcrumb`
- `button`
- `checkbox`
- `context-menu`
- `count-to-animator`
- `dropdown-menu`
- `expandable-arrow`
- `full-screen`
- `hover-card`
- `icon`
- `input-captcha`
- `input-password`
- `logo`
- `pin-input`
- `popover`
- `render-content`
- `scrollbar`
- `segmented`
- `select`
- `spine-text`
- `spinner`
- `tooltip`

这些模块通常对应 `Vben*` 前缀组件，例如 `VbenLogo`、`VbenContextMenu`、`VbenScrollbar`、`VbenButton`。

## `ui/` 基础原子组件

源码位置：`packages/@core/ui-kit/shadcn-ui/src/ui/index.ts`

当前公开导出如下模块：

- `accordion`
- `alert-dialog`
- `avatar`
- `badge`
- `breadcrumb`
- `button`
- `card`
- `checkbox`
- `dialog`
- `dropdown-menu`
- `form`
- `hover-card`
- `input`
- `label`
- `number-field`
- `pagination`
- `pin-input`
- `popover`
- `radio-group`
- `resizable`
- `scroll-area`
- `select`
- `separator`
- `sheet`
- `switch`
- `tabs`
- `textarea`
- `toggle`
- `toggle-group`
- `tooltip`
- `tree`

## 组件相关能力

| 能力 | 源码位置 | 说明 |
| --- | --- | --- |
| `createContext`、`Slot`、`VisuallyHidden` | `src/index.ts` | 直接从 `reka-ui` 透出 |
| `components.json` | 包根目录 | shadcn 组件元数据配置 |
| `src/assets/index.css` | 包内样式入口 | 该包的基础样式资源 |

## 与其他包的关系

| 使用方 | 关系 |
| --- | --- |
| `@vben/common-ui` | 二次导出 `VbenAvatar`、`VbenButton`、`VbenSelect`、`VbenSpinner` 等 |
| `@vben/layouts` | 使用 `VbenBackTop`、`VbenLogo`、`VbenAvatar`、`DropdownMenu*` 等 |
| `@vben-core/layout-ui` | 使用 `VbenIconButton` 等基础组件 |
| `@vben-core/tabs-ui` | 使用 `VbenScrollbar`、`VbenContextMenu`、`VbenIcon` |

## 典型使用场景

- 作为布局、菜单、标签栏、弹窗等更高层组件的基础渲染单元
- 为 `@vben/common-ui` 提供统一视觉风格的基础 UI 组件
- 为业务页面提供头像、Logo、上下文菜单、滚动条、输入组件等基础积木

## 业务示例

### 布局顶部工具

`packages/effects/layouts/src/widgets/language-toggle.vue` 和 `layout-toggle.vue` 里，语言/布局切换都是靠 `VbenDropdownRadioMenu` + `VbenIconButton` 实现的。

```vue
<script setup lang="ts">
import { ref } from 'vue';

import { VbenDropdownRadioMenu, VbenIconButton } from '@vben-core/shadcn-ui';

const locale = ref('zh-CN');

const menus = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
];

function handleUpdate(value: string | undefined) {
  if (value) {
    locale.value = value;
  }
}
</script>

<template>
  <VbenDropdownRadioMenu
    :menus="menus"
    :model-value="locale"
    @update:model-value="handleUpdate"
  >
    <VbenIconButton>
      <span class="text-sm">语言</span>
    </VbenIconButton>
  </VbenDropdownRadioMenu>
</template>
```

### 通知面板

`packages/effects/layouts/src/widgets/notification/notification.vue` 的结构会同时用到 `VbenPopover`、`VbenScrollbar`、`VbenButton` 和 `VbenIconButton`。

```vue
<script setup lang="ts">
import { VbenButton, VbenIconButton, VbenPopover, VbenScrollbar } from '@vben-core/shadcn-ui';
</script>

<template>
  <VbenPopover content-class="w-90 p-0">
    <template #trigger>
      <VbenIconButton>
        <span>消息</span>
      </VbenIconButton>
    </template>

    <VbenScrollbar class="max-h-80">
      <div class="p-4">
        <p class="text-sm">通知内容</p>
      </div>
    </VbenScrollbar>

    <div class="flex items-center justify-between border-t border-border px-4 py-3">
      <VbenButton size="sm" variant="ghost">清空</VbenButton>
      <VbenButton size="sm">查看全部</VbenButton>
    </div>
  </VbenPopover>
</template>
```

### 其他高频组件

- `VbenAvatar`：用户头像、个人中心、工作台头部
- `VbenLogo`：`BasicLayout` 顶部 Logo
- `VbenBackTop`：布局主内容区回到顶部
- `VbenLoading`、`VbenSpinner`：页面加载态与路由切换加载
- `VbenCountToAnimator`：仪表盘统计数字动画
- `VbenFullScreen`：头部全屏按钮
- `VbenContextMenu`：标签栏和菜单右键菜单

## 使用注意事项

- 当前包只有根路径导出；源码中虽然按目录拆分，但 `package.json` 没有为每个子目录声明独立 `exports`。
- 文档页只总结包级能力，不逐一展开上百个原子组件的 props/events/slots。
- 如果需要精确 API，应直接查看对应子目录的 `index.ts`、`*.vue` 和配套 `types.ts`。
