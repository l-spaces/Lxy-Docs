---
title: Form 表单能力
description: "@vben-core/form-ui 与 web-antd 适配层的真实实现说明"
outline: deep
lastUpdated: true
---

# `@vben-core/form-ui`

## 简介

`Vben Form` 是 Schema 驱动表单能力，底层在 `@vben-core/form-ui`，`web-antd` 在适配层完成组件映射与校验规则本地化。

## 适用范围

- 新表单页面开发
- 新增表单组件类型映射
- 调整表单校验与模型绑定规则

## 对应源码目录或关键文件

- `packages/@core/ui-kit/form-ui/src/index.ts`
- `packages/@core/ui-kit/form-ui/src/types.ts`
- `apps/web-antd/src/adapter/form.ts`
- `apps/web-antd/src/adapter/component/index.ts`

## 核心机制或功能说明

### 导出方式

`@vben-core/form-ui` 当前根导出：

- `setupVbenForm`
- `useVbenForm`（从 `use-vben-form` 导出）
- `z`（`zod` 命名空间导出）
- 类型：
  - `VbenFormSchema`
  - `VbenFormProps`
  - `BaseFormComponentType`
  - `ExtendedFormApi`

### 核心类型能力

`types.ts` 中核心模型：

- `FormSchema`：字段定义（`component`、`fieldName`、`rules`、`dependencies` 等）
- `VbenFormProps`：表单级属性（`schema`、`showDefaultActions`、`handleSubmit`、`handleValuesChange` 等）
- `FormItemDependencies`：字段联动（`if/show/required/rules/trigger`）

### web-antd 适配配置

`apps/web-antd/src/adapter/form.ts`：

- `baseModelPropName = 'value'`
- `modelPropNameMap`：
  - `Checkbox -> checked`
  - `Radio -> checked`
  - `Switch -> checked`
  - `Upload -> fileList`
  - `RichTextarea -> modelValue`
- 自定义规则：
  - `required`
  - `selectRequired`

`apps/web-antd/src/adapter/component/index.ts` 会注册实际组件映射，例如：

- `Input`、`Textarea`、`InputPassword`
- `Select`、`Cascader`、`TreeSelect`
- `ApiSelect`、`ApiCascader`、`ApiTreeSelect`
- `ImageUpload`、`FileUpload`、`RichTextarea`
- `DefaultButton`、`PrimaryButton`

### 依赖与适配关系

- 表单引擎依赖 `vee-validate + zod`
- 具体 UI 组件由应用适配层注入到 `globalShareState`
- `web-antd` 中表单页面通常通过 `#/adapter/form` 暴露的 `useVbenForm` 使用

## 业务示例

下面的写法和项目里的 `ProfileBaseSetting`、登录页、用户抽屉一致，属于当前仓库最常见的表单接入方式。

```vue
<script setup lang="ts">
import { computed } from 'vue';

import type { VbenFormSchema } from '@vben-core/form-ui';
import { useVbenForm, z } from '@vben-core/form-ui';

const formSchema = computed<VbenFormSchema[]>(() => [
  {
    fieldName: 'username',
    component: 'Input',
    label: '用户名',
    rules: z.string().min(1, '请输入用户名'),
  },
  {
    fieldName: 'roles',
    component: 'Select',
    componentProps: {
      mode: 'tags',
      options: [
        { label: '管理员', value: 'super' },
        { label: '用户', value: 'user' },
      ],
    },
    label: '角色',
  },
  {
    fieldName: 'remark',
    component: 'Textarea',
    label: '备注',
  },
]);

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    labelWidth: 80,
  },
  handleSubmit: async (values) => {
    console.log('submit values:', values);
  },
  schema: formSchema,
  showDefaultActions: false,
});
</script>

<template>
  <Form />
  <a-button class="mt-4" type="primary" @click="formApi.submitForm()">
    提交
  </a-button>
</template>
```

在 `apps/web-antd` 中，表单和抽屉、弹窗联动时通常会继续调用：

- `formApi.setValues(...)`
- `formApi.setFieldValue(...)`
- `formApi.updateSchema(...)`
- `formApi.validate()`
- `formApi.getValues()`

## 使用方式、扩展方式或注意事项

- 新增组件类型时，先改 `ComponentType` 联合类型，再补 `initComponentAdapter()` 映射。
- 需要字段联动时，优先使用 `dependencies`，避免在页面里写分散逻辑。
- 若校验提示要国际化，统一在适配层规则中处理，避免页面重复定义。
