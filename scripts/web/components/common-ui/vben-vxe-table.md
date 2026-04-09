---
title: VxeTable 表格组件
description: "@vben/plugins/vxe-table 与 web-antd 适配层说明"
outline: deep
lastUpdated: true
---

# `@vben/plugins/vxe-table`

## 简介

VXE 表格能力通过 `@vben/plugins/vxe-table` 提供，`web-antd` 在 `adapter/vxe-table.ts` 中完成全局配置和渲染器扩展。

## 适用范围

- 可搜索、可分页的中后台数据表格
- 需要与 `VbenForm` 联动的查询区
- 需要统一响应结构映射（`rows/total`）的接口列表页

## 对应源码目录或关键文件

- `packages/effects/plugins/src/vxe-table/index.ts`
- `packages/effects/plugins/src/vxe-table/types.ts`
- `packages/effects/plugins/src/vxe-table/use-vxe-grid.ts`
- `apps/web-antd/src/adapter/vxe-table.ts`

## 核心机制或功能说明

### 导出方式

`@vben/plugins/vxe-table` 当前导出：

- `setupVbenVxeTable`
- `useVbenVxeGrid`
- `VbenVxeGrid`
- 类型：
  - `VxeTableGridColumns`
  - `VxeTableGridOptions`
  - `VxeGridDefines`
  - `VxeGridListeners`
  - `VxeGridProps`
  - `VxeGridPropTypes`

### `useVbenVxeGrid` 返回值

- `[Grid, gridApi]`
- `gridApi` 通过 `ExtendedVxeGridApi` 提供状态读取与控制能力

### `VxeGridProps` 关键字段

- `gridOptions`
- `gridEvents`
- `formOptions`
- `showSearchForm`
- `tableTitle`
- `tableTitleHelp`
- `separator`

### web-antd 适配层配置

`apps/web-antd/src/adapter/vxe-table.ts` 已完成：

- `setupVbenVxeTable({ configVxeTable, useVbenForm })`
- 全局 `proxyConfig.response` 映射：
  - `result: 'rows'`
  - `total: 'total'`
  - `list: 'rows'`
- 自定义渲染器：
  - `CellImage`
  - `CellLink`
- 工具函数：
  - `vxeCheckboxChecked`
  - `addSortParams`

## 业务示例

仓库里最典型的是 `system/user/index.vue` 这种“查询表单 + 分页表格 + 工具栏”页面。

```vue
<script setup lang="ts">
import { Page } from '@vben/common-ui';
import { useVbenVxeGrid } from '@vben/plugins/vxe-table';

const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: [
      { fieldName: 'username', component: 'Input', label: '用户名' },
      {
        fieldName: 'status',
        component: 'Select',
        componentProps: {
          options: [
            { label: '启用', value: 0 },
            { label: '停用', value: 1 },
          ],
        },
        label: '状态',
      },
    ],
    showDefaultActions: false,
  },
  gridOptions: {
    columns: [
      { field: 'username', title: '用户名' },
      { field: 'status', title: '状态' },
    ],
    height: 'auto',
    pagerConfig: {},
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues = {}) => {
          const list = [
            { status: '启用', username: 'admin' },
            { status: '停用', username: 'demo' },
          ].filter((item) => {
            return !formValues.username || item.username.includes(formValues.username);
          });

          const start = (page.currentPage - 1) * page.pageSize;
          const end = start + page.pageSize;
          const rows = list.slice(start, end);

          return {
            rows,
            total: list.length,
          };
        },
      },
    },
    rowConfig: {
      keyField: 'username',
    },
  },
});
</script>

<template>
  <Page auto-content-height title="用户列表">
    <Grid table-title="用户管理">
      <template #toolbar-tools>
        <a-button type="primary">新增</a-button>
      </template>
    </Grid>
  </Page>
</template>
```

在真实业务中，`proxyConfig.ajax.query` 通常会直接调用后端列表 API，然后返回 `{ rows, total }`。

## 使用方式、扩展方式或注意事项

- 列表接口建议返回 `rows + total`，可直接复用默认代理映射。
- 自定义单元格优先通过 renderer 扩展，避免页面里重复渲染模板。
- 排序参数联调建议复用 `addSortParams`，保持后端排序协议一致。
