<template>
  <el-main class="!m-0">
    <SearchPanel class="mb-2" :form="searchForm" @onEvent="onEvent" />
    <PureTableBar
      title="教材管理"
      :columns="columns"
      :config="{ showRefresh: false, showDensity: false }"
    >
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openAddDialog()"
        >
          新增教材
        </el-button>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <PureTable
          align-whole="center"
          table-layout="auto"
          :size="size"
          ref="tableRef"
          border
          adaptive
          :adaptiveConfig="adaptiveConfig"
          row-key="id"
          alignWhole="center"
          showOverflowTooltip
          :loading="loading"
          :loading-config="loadingConfig"
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="pagination"
          @page-size-change="onSizeChange"
          @page-current-change="onCurrentChange"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
        >
          <template #operation="{ row }">
            <el-button link type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button link type="primary" size="small" v-if="bookStatus.map(v => v.value).filter(v => v === 3).includes(row.status)">发布</el-button>
            <el-button link type="primary" size="small">打印</el-button>
            <el-button link type="primary" size="small">复制</el-button>
            <el-button link type="danger" size="small">删除</el-button>
          </template>
        </PureTable>
      </template>
    </PureTableBar>
  </el-main>
</template>

<script setup>
import {ref} from "vue";

import useSearch from "./hooks/useSearch";
import useTable, { bookStatus } from "./hooks/useTable";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import AddFill from "@iconify-icons/ri/add-fill";

import {getTextBooks} from "@/api/textbooks";

import SearchPanel from "@/components/SearchPanel/SearchPanel.vue";

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "Textbooks"
});


const searchForm = useSearch();
const onEvent = (payload) => {
  const { event, params } = payload;
  if (event === "onSearch") {
    onLoadData();
  }
};
const {
  loading,
  columns,
  dataList,
  pagination,
  loadingConfig,
  adaptiveConfig,
  onSizeChange,
  onCurrentChange,
  onLoadData
} = useTable(searchForm.data);

const tableRef = ref();

const handleEdit = (row) => {
  console.log(
    "%crow===>>>: ",
    "color: MidnightBlue; background: Aquamarine; font-size: 20px;",
    row
  );
};

const openAddDialog = () => {
  console.log("openAddDialog");
};
</script>

<style lang="scss" scoped></style>
