---
title: API 组件
description: "@vben/common-ui 中 ApiComponent 的数据驱动封装能力"
outline: deep
lastUpdated: true
---

# `ApiComponent`

## 简介

`ApiComponent` 位于 `packages/effects/common-ui/src/components/api-component/api-component.vue`，用于给任意选择类组件附加“远程 options 加载”能力。

## 适用范围

- 远程下拉、级联、树选择等场景
- 统一 options 结构转换
- 表单适配器中的 `ApiSelect/ApiCascader/ApiTreeSelect`

## 对应源码目录或关键文件

- `packages/effects/common-ui/src/components/api-component/index.ts`
- `packages/effects/common-ui/src/components/api-component/api-component.vue`
- `apps/web-antd/src/adapter/component/index.ts`

## 核心机制或功能说明

### 导出方式

- `index.ts`：`export { default as ApiComponent }`

### 核心 Props（源码定义）

- `component`：目标组件（必填）
- `api`：远程请求函数
- `params`：请求参数
- `resultField`：响应结果字段提取
- `labelField/valueField/childrenField/disabledField`
- `optionsPropName`：目标组件接收 options 的属性名
- `immediate`：是否立即请求
- `alwaysLoad`：是否每次展开都重新加载
- `visibleEvent`：触发懒加载的事件名
- `beforeFetch/shouldFetch/afterFetch`
- `modelPropName`
- `autoSelect`：`first/last/one/function/false`

### Emits 与 Expose

组件会抛出：

- `optionsChange(options)`

组件会暴露：

- `getOptions()`
- `getValue()`
- `getComponentRef()`
- `updateParam(newParams)`

### 运行机制

- 内部统一把远程数据映射成 `{ label, value, disabled, children }`
- 支持 `numberToString` 转换 value 类型
- 对并发请求有待处理标记，避免重复加载导致状态错乱

### 在 web-antd 的接入

`apps/web-antd/src/adapter/component/index.ts` 已把它封装为：

- `ApiSelect`
- `ApiCascader`
- `ApiTreeSelect`

并统一注入默认 placeholder 与字段映射。

## 业务示例

`ApiComponent` 更像一个“远程选项驱动器”。在当前项目里，它通常不会单独直接挂到页面，而是被适配成 `ApiSelect`、`ApiCascader`、`ApiTreeSelect` 再放进 `VbenForm` schema。

```vue
<script setup lang="ts">
import { ref } from 'vue';

import { ApiComponent } from '@vben/common-ui';
import { Select } from 'antdv-next';

const deptId = ref<number | undefined>();

async function loadDeptOptions() {
  return [
    { id: 1, deptName: '研发部' },
    { id: 2, deptName: '产品部' },
  ];
}
</script>

<template>
  <ApiComponent
    v-model="deptId"
    class="w-full"
    :api="loadDeptOptions"
    :component="Select"
    label-field="deptName"
    loading-slot="suffixIcon"
    model-prop-name="value"
    value-field="id"
    visible-event="onDropdownVisibleChange"
  />
</template>
```

如果你已经在用项目里的表单适配层，对应写法通常会简化成：

```ts
{
  fieldName: 'deptId',
  component: 'ApiSelect',
  componentProps: {
    api: loadDeptOptions,
  },
}
```

## 使用方式、扩展方式或注意事项

- 首次加载与展开加载策略取决于 `immediate + visibleEvent + alwaysLoad` 组合。
- 如果后端字段名不一致，优先使用 `labelField/valueField/...` 映射，不要在页面里二次转换。
- `autoSelect` 只在当前值为空时触发，避免覆盖用户已选值。
