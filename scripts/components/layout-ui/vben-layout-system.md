---
title: "Layout 布局系统"
description: "@vben-core/layout-ui 与 @vben/layouts 的布局容器、组合布局与小部件说明"
outline: deep
lastUpdated: true
---

# 布局系统

## 模块分层

当前仓库的布局能力分成两层：

| 层级 | 包名 | 目录 | 职责 |
| --- | --- | --- | --- |
| 底层容器 | `@vben-core/layout-ui` | `packages/@core/ui-kit/layout-ui` | 提供 `VbenAdminLayout` 与基础布局插槽、尺寸模型 |
| 组合布局 | `@vben/layouts` | `packages/effects/layouts` | 基于偏好设置、菜单、标签栏、小部件拼装出最终后台布局 |

## `@vben-core/layout-ui`

### 公开导出

源码位置：`packages/@core/ui-kit/layout-ui/src/index.ts`

```ts
export type * from './vben-layout';
export { default as VbenAdminLayout } from './vben-layout.vue';
```

### `VbenLayoutProps`

源码位置：`packages/@core/ui-kit/layout-ui/src/vben-layout.ts`

| 分类 | 属性 |
| --- | --- |
| 内容区 | `contentCompact`、`contentCompactWidth`、`contentPadding`、`contentPaddingTop`、`contentPaddingRight`、`contentPaddingBottom`、`contentPaddingLeft` |
| Header | `headerHeight`、`headerHidden`、`headerMode`、`headerTheme`、`headerToggleSidebarButton`、`headerVisible` |
| Footer | `footerEnable`、`footerFixed`、`footerHeight` |
| Sidebar | `sidebarCollapse`、`sidebarCollapsedButton`、`sidebarCollapseShowTitle`、`sidebarEnable`、`sidebarExtraCollapsedWidth`、`sidebarFixedButton`、`sidebarHidden`、`sidebarMixedWidth`、`sidebarTheme`、`sidebarThemeSub`、`sidebarWidth`、`sideCollapseWidth` |
| Layout | `layout`、`isMobile`、`zIndex` |
| Tabbar | `tabbarEnable`、`tabbarHeight` |

### `VbenAdminLayout` 组件模型

源码位置：`packages/@core/ui-kit/layout-ui/src/vben-layout.vue`

#### `defineModel`

| 模型 | 说明 |
| --- | --- |
| `sidebarDraggable` | 侧栏是否可拖拽 |
| `sidebarCollapse` | 侧栏折叠状态 |
| `sidebarExtraVisible` | 侧栏扩展区是否显示 |
| `sidebarExtraCollapse` | 侧栏扩展区是否折叠 |
| `sidebarExpandOnHover` | 是否悬停展开侧栏 |
| `sidebarEnable` | 是否启用侧栏 |

#### Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `sideMouseLeave` | - | 侧栏离开事件 |
| `toggleSidebar` | - | 点击头部折叠按钮时触发 |
| `update:sidebar-width` | `(value: number)` | 侧栏宽度变化 |

#### Slots

源码模板中实际使用的插槽如下：

- `logo`
- `header`
- `menu`
- `mixed-menu`
- `side-extra`
- `side-extra-title`
- `tabbar`
- `content`
- `content-overlay`
- `footer`
- `extra`

### 内部组成

| 模块 | 源码目录 | 说明 |
| --- | --- | --- |
| `LayoutHeader` | `src/components/layout-header.vue` | 顶部区域容器 |
| `LayoutSidebar` | `src/components/layout-sidebar.vue` | 侧边栏容器 |
| `LayoutTabbar` | `src/components/layout-tabbar.vue` | 标签栏容器 |
| `LayoutContent` | `src/components/layout-content.vue` | 内容区容器 |
| `LayoutFooter` | `src/components/layout-footer.vue` | 底部容器 |
| `sidebar-collapse-button`、`sidebar-fixed-button` | `src/components/widgets` | 侧栏控制按钮 |

## `@vben/layouts`

### 公开导出

源码位置：`packages/effects/layouts/src/index.ts`

```ts
export * from './authentication';
export * from './basic';
export * from './iframe';
export * from './widgets';
```

### `BasicLayout`

源码位置：`packages/effects/layouts/src/basic/index.ts`

`BasicLayout` 是当前后台主布局实现。它在 `packages/effects/layouts/src/basic/layout.vue` 中：

- 读取 `@vben/preferences` 中的布局、主题、标签栏、面包屑、侧栏参数
- 使用 `VbenAdminLayout` 作为底层容器
- 组合 `LayoutHeader`、`LayoutMenu`、`LayoutMixedMenu`、`LayoutTabbar`、`LayoutContent`、`LayoutFooter`
- 注入 `Breadcrumb`、`Preferences`、`VbenBackTop`、`VbenLogo`

仓库中的实际接入位置：`apps/web-antd/src/layouts/basic.vue`

### `AuthPageLayout`

源码位置：`packages/effects/layouts/src/authentication/index.ts`

#### Props

来源：`packages/effects/layouts/src/authentication/authentication.vue`

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `appName` | `string` | `''` | 应用名称 |
| `logo` | `string` | `''` | 亮色 logo |
| `logoDark` | `string` | `''` | 暗色 logo |
| `pageTitle` | `string` | `''` | 页面主标题 |
| `pageDescription` | `string` | `''` | 页面描述 |
| `sloganImage` | `string` | `''` | 右侧宣传图 |
| `toolbar` | `boolean` | `true` | 是否显示顶部工具栏 |
| `copyright` | `boolean` | `true` | 是否显示版权区 |
| `toolbarList` | `ToolbarType[]` | `['color', 'language', 'layout', 'theme']` | 工具栏项 |
| `clickLogo` | `() => void` | `() => {}` | 点击 logo 回调 |

#### Slots

- `toolbar`
- `logo`
- `copyright`

仓库中的实际接入位置：`apps/web-antd/src/layouts/auth.vue`

### `IFrameView` / `IFrameRouterView`

源码位置：`packages/effects/layouts/src/iframe/index.ts`

| 导出名 | 说明 |
| --- | --- |
| `IFrameView` | iframe 视图容器 |
| `IFrameRouterView` | 路由级 iframe 视图容器 |

仓库中的实际接入位置：`apps/web-antd/src/layouts/index.ts`

### 小部件导出

源码位置：`packages/effects/layouts/src/widgets/index.ts`

| 导出名 | 源码目录 | 说明 |
| --- | --- | --- |
| `Breadcrumb` | `src/widgets/breadcrumb.vue` | 面包屑 |
| `CheckUpdates` | `src/widgets/check-updates` | 版本检查按钮/弹层 |
| `AuthenticationColorToggle` | `src/widgets/color-toggle.vue` | 认证页配色切换 |
| `GlobalSearch` | `src/widgets/global-search` | 全局搜索弹窗与快捷键入口 |
| `LanguageToggle` | `src/widgets/language-toggle.vue` | 语言切换 |
| `AuthenticationLayoutToggle` | `src/widgets/layout-toggle.vue` | 认证页布局切换 |
| `LockScreen`、`LockScreenModal` | `src/widgets/lock-screen` | 锁屏相关组件 |
| `Notification` | `src/widgets/notification` | 消息通知弹出层 |
| `Preferences`、`PreferencesButton`、`useOpenPreferences` | `src/widgets/preferences` | 偏好设置面板与打开逻辑 |
| `ThemeToggle` | `src/widgets/theme-toggle` | 主题切换 |
| `TimezoneButton` | `src/widgets/timezone` | 时区切换按钮 |
| `UserDropdown` | `src/widgets/user-dropdown` | 用户下拉菜单 |

### 已在源码中发现的典型小部件 API

#### `Notification`

来源：

- 组件：`packages/effects/layouts/src/widgets/notification/notification.vue`
- 类型：`packages/effects/layouts/src/widgets/notification/types.ts`

Props：

- `dot?: boolean`
- `notifications?: NotificationItem[]`

Events：

- `clear`
- `makeAll`
- `read`
- `viewAll`

`NotificationItem` 结构：

- `id`
- `avatar`
- `date`
- `isRead`
- `message`
- `title`
- `userId`

#### `UserDropdown`

来源：`packages/effects/layouts/src/widgets/user-dropdown/user-dropdown.vue`

Props：

- `avatar?: string`
- `description?: string`
- `enableShortcutKey?: boolean`
- `menus?: Array<{ handler; icon?; text }>`
- `tagText?: string`
- `text?: string`
- `trigger?: 'both' | 'click' | 'hover'`
- `hoverDelay?: number`

Events：

- `logout`

Slots：

- `tagText`

#### `GlobalSearch`

来源：`packages/effects/layouts/src/widgets/global-search/global-search.vue`

Props：

- `enableShortcutKey?: boolean`
- `menus?: MenuRecordRaw[]`

源码中未发现额外公开事件；搜索弹窗的开关由内部 `useVbenModal` 驱动。

## 典型接入关系

| 使用位置 | 说明 |
| --- | --- |
| `apps/web-antd/src/layouts/basic.vue` | 主后台布局，注入 `UserDropdown`、`Notification`、`LockScreen`、登录过期弹窗 |
| `apps/web-antd/src/layouts/auth.vue` | 登录/注册页布局，直接使用 `AuthPageLayout` |
| `apps/web-antd/src/store/notify.ts` | 依赖 `NotificationItem` 类型 |

## 未纳入公开 API 的源码模块

- `packages/effects/layouts/src/route-cached` 中存在 `RouteCachedPage`、`RouteCachedView`，但根入口 `src/index.ts` 没有导出它们，因此本页不把它们视为 `@vben/layouts` 的稳定公开 API。

## 使用注意事项

- 如果只是搭布局容器，优先看 `VbenAdminLayout`；如果是整套后台页面，优先看 `BasicLayout`。
- `BasicLayout` 的很多行为并不靠 props 传入，而是直接读取 `@vben/preferences` 和 `@vben/stores`。
- `AuthPageLayout` 的左右/居中布局切换不是通过 props 控制，而是跟随偏好设置中的认证页布局状态。
