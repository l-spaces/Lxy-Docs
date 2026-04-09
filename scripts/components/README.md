---
title: Components 文档
description: 组件体系入口，覆盖 packages 组件能力与应用层组件
---

# Components 文档

## 简介

本分类聚焦“组件与组件能力”，同时补充 `apps/web-antd/src/components` 应用层组件。纯工具包、类型包、常量包不在组件页展开。

## 适用范围

- 组件选型与复用判断
- 组件能力接入（表单、弹窗、菜单、标签页、布局）
- 应用层业务组件定位

## 对应源码目录或关键文件

- `packages/effects/common-ui`
- `packages/@core/ui-kit/*`
- `packages/effects/{layouts,plugins}`
- `apps/web-antd/src/components`
- `apps/web-antd/src/adapter/{component,form,vxe-table}.ts`

## 文档清单

- [introduction](./introduction.md)
- [应用层组件体系](./应用层组件体系.md)
- `common-ui`
  - [vben-common-ui](./common-ui/vben-common-ui.md)
  - [scene-ui](./common-ui/scene-ui.md)
  - [shadcn-ui](./common-ui/shadcn-ui.md)
  - [vben-form](./common-ui/vben-form.md)
  - [vben-alert](./common-ui/vben-alert.md)
  - [vben-modal](./common-ui/vben-modal.md)
  - [vben-drawer](./common-ui/vben-drawer.md)
  - [vben-menu](./common-ui/vben-menu.md)
  - [vben-tabs](./common-ui/vben-tabs.md)
  - [vben-plugins](./common-ui/vben-plugins.md)
  - [vben-vxe-table](./common-ui/vben-vxe-table.md)
  - [vben-api-component](./common-ui/vben-api-component.md)
  - [vben-count-to-animator](./common-ui/vben-count-to-animator.md)
  - [vben-ellipsis-text](./common-ui/vben-ellipsis-text.md)
  - [captcha](./common-ui/captcha.md)
  - [code-mirror](./common-ui/code-mirror.md)
  - [col-page](./common-ui/col-page.md)
  - [cropper](./common-ui/cropper.md)
  - [icon-picker](./common-ui/icon-picker.md)
  - [json-preview](./common-ui/json-preview.md)
  - [json-viewer](./common-ui/json-viewer.md)
  - [loading](./common-ui/loading.md)
  - [markdown](./common-ui/markdown.md)
  - [page](./common-ui/page.md)
  - [resize](./common-ui/resize.md)
  - [tippy](./common-ui/tippy.md)
  - [tree](./common-ui/tree.md)
- `layout-ui`
  - [vben-layout-system](./layout-ui/vben-layout-system.md)

## 使用方式、扩展方式或注意事项

- 先看 [introduction](./introduction.md) 的 `packages` 归类，再进入单组件页面。
- 组件接入到 `web-antd` 时，要同时检查适配器层是否已注册。
- 若某 API 在文档中标注“未在源码中发现”，表示当前公开导出尚未形成稳定约定。
