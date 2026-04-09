---
title: CodeMirror 代码编辑器
description: "@vben/common-ui 的 CodeMirror 封装，支持语言切换、主题同步和只读模式"
outline: deep
lastUpdated: true
---

# `CodeMirror`

## 简介
`packages/effects/common-ui/src/components/code-mirror` 对 `vue-codemirror6` 做了项目级封装，重点是语言支持映射和深色主题同步。

## 适用范围

- 代码展示或轻量编辑
- 需要按语言切换高亮的文本区域
- 需要和主题状态同步的编辑器场景

## 对应源码目录或关键文件

- `packages/effects/common-ui/src/components/code-mirror/index.ts`
- `packages/effects/common-ui/src/components/code-mirror/code-mirror.vue`
- `packages/effects/common-ui/src/components/code-mirror/data.ts`

## 核心机制

### 导出

- `CodeMirror`
- `LanguageSupport`

### 语言支持

`languageSupportMap` 目前明确支持：

- `html`
- `java`
- `js`
- `jsx`
- `sql`
- `ts`
- `tsx`
- `vue`
- `xml`

### 组件行为

- `language` 是必需的核心配置，未命中映射时会回退到 JavaScript 语法。
- `readonly` 控制只读模式。
- 组件会读取当前主题状态，并将 `oneDark` 作为默认扩展。
- 当 `language` 改变时，组件会通过重挂载刷新编辑器实例，避免 CodeMirror 内部语言状态残留。

## 业务示例

仓库里的真实接入基本都是“代码预览”或“轻量编辑”，例如 `tool/gen/code-preview-modal.vue` 的文件树 + 代码预览联动。

```vue
<script setup lang="ts">
import { ref } from 'vue';

import type { LanguageSupport } from '@vben/common-ui';
import { CodeMirror } from '@vben/common-ui';

const language = ref<LanguageSupport>('vue');
const code = ref(`<template>\n  <div class="p-4">Hello Vben</div>\n</template>`);
</script>

<template>
  <CodeMirror v-model="code" :language="language" class="h-80 rounded-md border" />
</template>
```

如果是只读预览，把 `readonly` 打开即可；如果要预览代码生成结果，语言通常会跟着文件后缀切换成 `ts`、`vue`、`java`、`xml` 或 `sql`。

## 使用方式与注意事项

- 适合文档编辑、配置预览、代码模板展示，不适合复杂 IDE 场景。
- 如果需要支持新的语言，应优先扩展 `data.ts` 里的 `languageSupportMap`，再在页面侧传入 `LanguageSupport`。
- 当前实现会把所有插槽透传给 `vue-codemirror6`。
