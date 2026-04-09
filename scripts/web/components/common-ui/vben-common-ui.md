---
title: "Common UI 组件集"
description: "@vben/common-ui 的公开导出、模块分组与接入关系"
outline: deep
lastUpdated: true
---

# `@vben/common-ui`

## 模块定位

- 包名：`@vben/common-ui`
- 所属目录：`packages/effects/common-ui`
- 公开入口：
  - `@vben/common-ui`
  - `@vben/common-ui/es/loading`
  - `@vben/common-ui/es/tippy`

该包是当前仓库中“最上层”的通用组件聚合入口。它并不只包含自身目录下的组件，还二次导出了 `@vben-core/form-ui`、`@vben-core/popup-ui` 以及部分 `@vben-core/shadcn-ui` 组件。

## 导出结构

| 导出入口 | 源码位置 | 说明 |
| --- | --- | --- |
| `@vben/common-ui` | `packages/effects/common-ui/src/index.ts` | 聚合 `components/`、`ui/`、表单、弹窗与部分基础 UI |
| `@vben/common-ui/es/loading` | `packages/effects/common-ui/src/components/loading/index.ts` | `Loading`、`Spinner`、`registerLoadingDirective` |
| `@vben/common-ui/es/tippy` | `packages/effects/common-ui/src/components/tippy/index.ts` | `Tippy`、`initTippy`、`TippyProps` |

## `components/` 导出模块

| 模块/导出名 | 源码目录 | 说明 |
| --- | --- | --- |
| `ApiComponent` | `src/components/api-component` | 基于接口数据驱动的组件封装 |
| `PointSelectionCaptcha`、`PointSelectionCaptchaCard`、`SliderCaptcha`、`SliderRotateCaptcha`、`SliderTranslateCaptcha` | `src/components/captcha` | 点选、滑块、旋转、拼图验证码组件 |
| `CodeMirror`、`LanguageSupport` | `src/components/code-mirror` | 代码预览/编辑能力 |
| `ColPage` | `src/components/col-page` | 左右分栏页面容器，继承 `PageProps` |
| `CountTo` | `src/components/count-to` | 数字递增动画组件 |
| `VCropper` | `src/components/cropper` | 图片裁剪组件 |
| `EllipsisText` | `src/components/ellipsis-text` | 省略文本展示 |
| `IconPicker` | `src/components/icon-picker` | 图标选择器 |
| `JsonPreview` | `src/components/json-preview` | JSON 预览组件 |
| `JsonViewer` | `src/components/json-viewer` | JSON 树形查看组件 |
| `Loading`、`Spinner`、`registerLoadingDirective` | `src/components/loading` | 加载组件与 `v-loading` 指令 |
| `MarkdownEditor`、`MarkdownPreviewer` | `src/components/markdown` | Markdown 编辑与预览 |
| `Page` | `src/components/page` | 页面级布局容器 |
| `VResize` | `src/components/resize` | 尺寸变化监听组件 |
| `Tippy`、`initTippy`、`TippyProps` | `src/components/tippy` | Tooltip/Popover 指令与组件封装 |
| `Tree` | `src/components/tree` | 树组件 |
| `export * from '@vben-core/form-ui'` | `src/components/index.ts` | 直接复用 `useVbenForm`、`setupVbenForm`、`VbenFormSchema` 等表单能力 |
| `export * from '@vben-core/popup-ui'` | `src/components/index.ts` | 直接复用 `useVbenModal`、`useVbenDrawer`、弹窗组件与 API |
| `VbenAvatar`、`VbenButton`、`VbenButtonGroup`、`VbenCheckbox`、`VbenCheckButtonGroup`、`VbenContextMenu`、`VbenCountToAnimator`、`VbenFullScreen`、`VbenInputPassword`、`VbenLoading`、`VbenLogo`、`VbenPinInput`、`VbenSelect`、`VbenSpinner` | `src/components/index.ts` | 从 `@vben-core/shadcn-ui` 二次导出的基础 UI 组件 |

## `ui/` 场景模块

场景页面能力已单独整理为 [Scene UI 场景页面](./scene-ui.md)。这里仅保留根包与子路径的聚合关系。

| 导出名 | 源码目录 | 说明 |
| --- | --- | --- |
| `About` | `src/ui/about` | 关于页组件 |
| `AuthenticationLogin`、`AuthenticationCodeLogin`、`AuthenticationForgetPassword`、`AuthenticationQrCodeLogin`、`AuthenticationRegister`、`AuthenticationLoginExpiredModal` | `src/ui/authentication` | 登录、验证码登录、忘记密码、二维码登录、注册、登录过期弹窗 |
| `AnalysisChartCard`、`AnalysisChartsTabs`、`AnalysisOverview` | `src/ui/dashboard/analysis` | 分析页卡片与图表区块 |
| `WorkbenchHeader`、`WorkbenchProject`、`WorkbenchQuickNav`、`WorkbenchTodo`、`WorkbenchTrends` | `src/ui/dashboard/workbench` | 工作台场景组件 |
| `Fallback` | `src/ui/fallback` | 403/404/500/离线/Coming Soon 等兜底页 |
| `Profile`、`ProfileBaseSetting`、`ProfileNotificationSetting`、`ProfilePasswordSetting`、`ProfileSecuritySetting` | `src/ui/profile` | 个人中心场景组件 |

## 核心 API 线索

### 已在类型文件中声明的 API

| 类型 | 源码位置 | 关键内容 |
| --- | --- | --- |
| `AuthenticationProps` | `src/ui/authentication/types.ts` | 控制登录页标题、按钮、是否显示验证码登录/注册/二维码登录/第三方登录 |
| `GrantType`、`LoginAndRegisterParams`、`LoginCodeParams` | `src/ui/authentication/types.ts` | 登录/注册表单提交数据结构 |
| `PageProps` | `src/components/page/types.ts` | `title`、`description`、`autoContentHeight`、`heightOffset` 等 |
| `ColPageProps` | `src/components/col-page/types.ts` | 在 `PageProps` 基础上补充左右栏宽度、可折叠、可拖拽等 |
| `PointSelectionCaptchaProps`、`SliderCaptchaProps`、`SliderRotateCaptchaProps`、`SliderTranslateCaptchaProps` | `src/components/captcha/types.ts` | 验证码模块公开 props |
| `LanguageSupport` | `src/components/code-mirror/data.ts` | CodeMirror 语言支持类型 |

### 未在统一入口中声明的内容

- `@vben/common-ui` 没有为所有子模块建立统一的 props/events/slots 类型表。
- 某些导出只有默认组件，没有配套 `types.ts`，此时应以对应目录的 `.vue` 实现为准。
- `PointSelectionCaptchaCard` 当前与 `PointSelectionCaptcha` 指向同一个 `index.vue` 默认导出，源码中未发现独立卡片组件入口。

## 依赖与适配关系

| 关系 | 说明 |
| --- | --- |
| 依赖 `@vben-core/form-ui` | 统一承接表单 schema、`useVbenForm`、校验能力 |
| 依赖 `@vben-core/popup-ui` | 统一承接 `useVbenModal` / `useVbenDrawer` |
| 依赖 `@vben-core/shadcn-ui` | 复用头像、按钮、下拉、全屏、上下文菜单等基础 UI |
| 依赖 `@vben/preferences`、`@vben/locales` | 驱动主题、语言与用户可见文本 |
| 依赖 `vue-tippy` | `Tippy` 指令与组件封装 |

## 仓库中的实际使用场景

| 使用位置 | 实际调用 |
| --- | --- |
| `apps/web-antd/src/bootstrap.ts` | `setDefaultModalProps`、`registerLoadingDirective`、`initTippy` |
| `apps/web-antd/src/adapter/form.ts` | `setupVbenForm`、`useVbenForm`、`z` |
| `apps/web-antd/src/layouts/basic.vue` | `AuthenticationLoginExpiredModal` |
| `apps/web-antd/src/views/_core/authentication/*` | `AuthenticationLogin`、`AuthenticationCodeLogin`、`AuthenticationRegister` 等 |
| `apps/web-antd/src/views/dashboard/*` | `AnalysisOverview`、`WorkbenchHeader` 等 |
| `apps/web-antd/src/views/system/*`、`apps/web-antd/src/views/workflow/*` | `Page`、`useVbenModal`、`useVbenDrawer`、`JsonPreview`、`CodeMirror` 等 |

## 本次补充索引

下面这些入口是仓库里已经在业务中直接使用、并且本次补了可运行示例的文档页：

| 实际入口 | 典型业务 | 详细文档 |
| --- | --- | --- |
| `Page` | 列表页、详情页 | [page.md](./page.md) |
| `useVbenForm` / `setupVbenForm` | 登录、抽屉、个人设置 | [vben-form.md](./vben-form.md) |
| `useVbenModal` | 详情弹窗、导入弹窗、代码预览 | [vben-modal.md](./vben-modal.md) |
| `useVbenDrawer` | 编辑抽屉、详情抽屉 | [vben-drawer.md](./vben-drawer.md) |
| `ApiComponent` | 远程下拉、树选择 | [vben-api-component.md](./vben-api-component.md) |
| `IconPicker` | 菜单/表单图标选择 | [icon-picker.md](./icon-picker.md) |
| `JsonPreview` | 流程变量、配置详情 | [json-preview.md](./json-preview.md) |
| `CodeMirror` | 代码预览、模板展示 | [code-mirror.md](./code-mirror.md) |
| `Loading` | 路由加载、局部遮罩 | [loading.md](./loading.md) |
| `Tippy` | 图标提示、按钮说明 | [tippy.md](./tippy.md) |
| `VbenCountToAnimator` | 仪表盘数字动画 | [vben-count-to-animator.md](./vben-count-to-animator.md) |
| `Authentication*`、`Analysis*`、`Workbench*`、`Profile*`、`Fallback`、`About` | 场景页 | [scene-ui.md](./scene-ui.md) |
| `VbenAvatar`、`VbenButton`、`VbenCheckbox`、`VbenContextMenu`、`VbenCountToAnimator`、`VbenFullScreen`、`VbenInputPassword`、`VbenLoading`、`VbenLogo`、`VbenPinInput`、`VbenSelect`、`VbenSpinner` 等 | 基础 UI / 数字动画 | [shadcn-ui.md](./shadcn-ui.md) |

## 本次未展开的入口

这些导出在包内存在，但在 `apps/web-antd` 里未检出稳定的业务侧直接引用，所以本轮没有补业务示例：

- `PointSelectionCaptcha`、`PointSelectionCaptchaCard`、`SliderCaptcha`、`SliderRotateCaptcha`、`SliderTranslateCaptcha`
- `ColPage`
- `VCropper`
- `EllipsisText`
- `JsonViewer`
- `MarkdownEditor`、`MarkdownPreviewer`
- `VResize`
- `Tree`

## 使用注意事项

- 该包是“聚合入口”，不代表所有 API 都在这一层定义。查 props 和事件时要继续追到子目录。
- 如果只需要 `Loading` 或 `Tippy`，仓库已经提供了明确的子路径导出，优先使用 `@vben/common-ui/es/loading` 和 `@vben/common-ui/es/tippy`。
- 表单、弹窗的核心能力并不在本包内实现，而是转发到 `@vben-core/form-ui` 与 `@vben-core/popup-ui`。
