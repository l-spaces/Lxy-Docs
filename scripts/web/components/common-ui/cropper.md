---
title: Cropper 图片裁剪
description: "@vben/common-ui 的图片裁剪组件，支持比例约束和裁剪结果导出"
outline: deep
lastUpdated: true
---

# `VCropper`

## 简介
`VCropper` 是项目内的图片裁剪组件，支持拖拽、缩放、固定比例和裁剪结果导出。

## 适用范围

- 用户头像裁剪
- 图片上传后的二次处理
- 需要在前端直接导出裁剪图的场景

## 对应源码目录或关键文件

- `packages/effects/common-ui/src/components/cropper/index.ts`
- `packages/effects/common-ui/src/components/cropper/cropper.vue`

## 核心机制

### 导出

- `VCropper`

### 关键 Props

- `img`：裁剪源图片
- `width`：容器宽度
- `height`：容器高度
- `aspectRatio`：裁剪比例，格式为 `宽:高`

### 暴露方法

- `getCropImage(format?, quality?, outputType?, targetWidth?, targetHeight?)`

### 实现特点

- 图片加载后自动计算适配尺寸。
- 裁剪框支持拖动和边角缩放。
- `getCropImage()` 可返回 `Blob` 或 base64 字符串。
- 远程图片会尝试处理跨域场景，避免 canvas 导出失败。

## 使用方式与注意事项

- `aspectRatio` 只接受类似 `1:1`、`16:9` 的格式。
- `getCropImage()` 默认输出 `image/png`，质量参数会被限制在 `0~1`。
- 如果图片不支持跨域访问，导出阶段仍可能失败，这不是组件逻辑问题。
