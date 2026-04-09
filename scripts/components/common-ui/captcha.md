---
title: Captcha 验证码能力
description: "@vben/common-ui 的验证码组件集合，包含点选、滑块、旋转和拼图校验"
outline: deep
lastUpdated: true
---

# `Captcha`

## 简介
`packages/effects/common-ui/src/components/captcha` 提供一组前端验证码组件，不是单一组件，而是按验证码形态拆分的能力集合。

## 适用范围

- 登录、注册、找回密码等高风险表单
- 需要前端完成交互式校验的场景
- 需要在通过验证后回调业务逻辑的场景

## 对应源码目录或关键文件

- `packages/effects/common-ui/src/components/captcha/index.ts`
- `packages/effects/common-ui/src/components/captcha/types.ts`
- `packages/effects/common-ui/src/components/captcha/point-selection-captcha/index.vue`
- `packages/effects/common-ui/src/components/captcha/slider-captcha/index.vue`
- `packages/effects/common-ui/src/components/captcha/slider-rotate-captcha/index.vue`
- `packages/effects/common-ui/src/components/captcha/slider-translate-captcha/index.vue`

## 核心机制

### 导出

- `PointSelectionCaptcha`
- `PointSelectionCaptchaCard`
- `SliderCaptcha`
- `SliderRotateCaptcha`
- `SliderTranslateCaptcha`

### 点选验证码

- `PointSelectionCaptcha` 内部维护点击点位列表。
- 组件会在点击时计算相对坐标，并通过 `click` 事件抛出 `CaptchaPoint`。
- `showConfirm` 打开后会增加确认按钮，并通过 `confirm(points, clear)` 事件通知外部。
- `hintImage` 和 `hintText` 至少需要提供一个，否则源码会报警告。

### 滑块验证码

- `SliderCaptcha` 是通用滑条容器，使用 `v-model` 管理通过状态。
- 组件会发出 `start`、`move`、`end`、`success` 事件。
- 组件暴露 `resume()`，可在失败后重置滑块。

### 旋转验证码

- `SliderRotateCaptcha` 在图片加载后生成随机角度。
- 用户拖动滑块时，组件根据滑动距离计算当前旋转角度。
- 当误差小于 `diffDegree` 时视为通过，并发出 `success`。

### 拼图验证码

- `SliderTranslateCaptcha` 使用 `canvas` 裁切拼图块。
- 组件通过拖动滑块控制拼图块水平位置。
- 验证成功后同样通过 `success` 事件抛出时间信息。

## 使用方式与注意事项

- `PointSelectionCaptchaCard` 和 `PointSelectionCaptcha` 当前指向同一个 `index.vue` 导出。
- `SliderCaptcha` 可通过 `isSlot` 作为联动容器使用，旋转和拼图验证码都基于它实现。
- 验证码图片涉及跨域时，源码会尝试设置 `crossOrigin`，但仍需要后端或静态资源正确支持 CORS。
- 这组组件偏交互，不应当和通用表单输入组件混为一类。
