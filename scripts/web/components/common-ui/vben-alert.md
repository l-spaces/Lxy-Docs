---
title: Alert 警告组件
description: "@vben-core/popup-ui 的 alert/confirm/prompt 能力"
outline: deep
lastUpdated: true
---

# `@vben-core/popup-ui` Alert

## 简介

Alert 能力位于 `packages/@core/ui-kit/popup-ui/src/alert`，提供组件形式和命令式调用两种入口。

## 适用范围

- 简单确认弹窗
- 二次确认操作（`confirm`）
- 轻量输入弹窗（`prompt`）

## 对应源码目录或关键文件

- `packages/@core/ui-kit/popup-ui/src/alert/index.ts`
- `packages/@core/ui-kit/popup-ui/src/alert/alert.ts`
- `packages/@core/ui-kit/popup-ui/src/alert/AlertBuilder.ts`

## 核心机制或功能说明

### 导出方式

`src/alert/index.ts` 当前导出：

- 组件：`Alert`
- hook：`useAlertContext`
- 命令式方法：
  - `alert`
  - `confirm`
  - `prompt`
  - `clearAllAlerts`
- 类型：
  - `AlertProps`
  - `PromptProps`
  - `IconType`
  - `BeforeCloseScope`

### 核心 API

`AlertProps` 重点属性：

- `content`（必填）
- `title`
- `showCancel`
- `confirmText` / `cancelText`
- `beforeClose(scope)`（返回 `false` 可阻止关闭）
- `overlayBlur`

`PromptProps<T>` 在 `AlertProps` 基础上补充：

- `component`
- `componentProps`
- `componentSlots`
- `defaultValue`
- `modelPropName`

### 运行机制

- `AlertBuilder.ts` 会创建独立容器并 `render` 到 `document.body`
- `confirm` 是 `alert` 的封装（默认 `showCancel: true`）
- `prompt` 在内部维护 `modelValue`，关闭前回调可拿到输入值

## 使用方式、扩展方式或注意事项

- 自定义内容组件里如需触发确认/取消，可使用 `useAlertContext()`。
- `prompt` 返回 Promise；取消会 reject，调用处需处理异常分支。
- 命令式弹窗较多时可用 `clearAllAlerts()` 做统一清理。
