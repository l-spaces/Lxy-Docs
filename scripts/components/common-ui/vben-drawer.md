---
title: Drawer 抽屉组件
description: "@vben-core/popup-ui 的 useVbenDrawer、状态模型与接入约束"
outline: deep
lastUpdated: true
---

# `@vben-core/popup-ui` Drawer

## 简介

Drawer 能力位于 `packages/@core/ui-kit/popup-ui/src/drawer`，与 Modal 结构一致，适合侧边编辑与详情场景。

## 适用范围

- 侧边抽屉编辑
- 连接组件模式下的外层控制
- 抽屉默认行为统一配置

## 对应源码目录或关键文件

- `packages/@core/ui-kit/popup-ui/src/drawer/index.ts`
- `packages/@core/ui-kit/popup-ui/src/drawer/drawer.ts`
- `packages/@core/ui-kit/popup-ui/src/drawer/drawer-api.ts`
- `packages/@core/ui-kit/popup-ui/src/drawer/use-drawer.ts`

## 核心机制或功能说明

### 导出方式

`src/drawer/index.ts` 导出：

- `VbenDrawer`
- `useVbenDrawer`
- `setDefaultDrawerProps`
- 类型：`DrawerProps`、`DrawerState`、`DrawerApiOptions`、`ExtendedDrawerApi`

### Drawer 状态模型

`DrawerProps` 关键属性包括：

- 展示控制：`header`、`footer`、`title`
- 位置控制：`placement`（`left/right/top/bottom`）
- 交互控制：`closeOnClickModal`、`closeOnPressEscape`
- 状态控制：`loading`、`confirmLoading`、`confirmDisabled`、`submitting`
- 样式控制：`appendToMain`、`overlayBlur`、`closeIconPlacement`

### `DrawerApi` 关键方法

- `open()`
- `close()`
- `setState(...)`
- `setData(payload)` / `getData<T>()`
- `lock(isLocked?)` / `unlock()`
- `drawerLoading(loading)`

### connectedComponent 模式

`useVbenDrawer({ connectedComponent })` 场景下：

- 通过 `provide/inject` 连接 API
- 支持外层拿到扩展 API 控制内层抽屉
- 源码同样提示不建议混用大量 props 直传

## 使用方式、扩展方式或注意事项

- 抽屉提交态优先使用 `lock()`，关闭逻辑可结合 `onBeforeClose`。
- 与 Modal 一样，临时业务数据建议走 `setData/getData`。
- 若要全局调整抽屉行为，可在应用启动时调用 `setDefaultDrawerProps`（当前 `web-antd` 未启用该段配置）。

## 业务示例

项目里最典型的是“左侧/右侧抽屉编辑 + 表单”场景，和 `system/user/user-drawer.vue`、`system/menu/menu-drawer.vue` 的接入方式一致。

```vue
<script setup lang="ts">
import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { useVbenForm } from '@vben-core/form-ui';

const isEdit = ref(false);

const [BasicForm, formApi] = useVbenForm({
  schema: computed(() => [
    { fieldName: 'name', component: 'Input', label: '名称' },
    { fieldName: 'status', component: 'Select', label: '状态' },
  ]),
  showDefaultActions: false,
});

const [EditDrawer, drawerApi] = useVbenDrawer({
  async onOpenChange(isOpen) {
    if (!isOpen) {
      formApi.resetForm();
      return null;
    }

    drawerApi.drawerLoading(true);
    const { id } = drawerApi.getData<{ id?: number }>() ?? {};
    isEdit.value = !!id;
    await Promise.resolve();
    drawerApi.drawerLoading(false);
  },
  async onConfirm() {
    drawerApi.lock(true);
    try {
      await formApi.validate();
      const values = await formApi.getValues();
      console.log('submit values:', values);
      drawerApi.close();
    } finally {
      drawerApi.lock(false);
    }
  },
  });

function openDrawer(id?: number) {
  drawerApi.setData({ id });
  drawerApi.open();
}
</script>

<template>
  <EditDrawer :title="isEdit ? '编辑数据' : '新增数据'" class="w-[600px]">
    <BasicForm />
  </EditDrawer>

  <a-button type="primary" @click="openDrawer(1)">打开抽屉</a-button>
</template>
