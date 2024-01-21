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
    <FormDialogPanel ref="textbookFormDialogRef" v-bind="formConfig" @onEvent="onEvent">
      <template #templatePreview="{ item, data }">
        <el-divider />
        <div class="template-preview w-full" v-if="data.templateId">
          <h2 class="title mb-5">模板预览 - {{ item.props.options.find(v => v.value === data.templateId).label }}</h2>
          <div class="content overflow-y-auto max-h-[50vh]">
            <TemplatePreview :data="item.props.options.find(v => v.value === data.templateId).content" />
          </div>
        </div>
      </template>
    </FormDialogPanel>
  </el-main>
</template>

<script setup>
import {ref} from "vue";

import useSearch from "./hooks/useSearch";
import useTable, { bookStatus } from "./hooks/useTable";
import useFormDialog from './hooks/useFormDialog';
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import AddFill from "@iconify-icons/ri/add-fill";

import SearchPanel from "@/components/SearchPanel/SearchPanel.vue";
import FormDialogPanel from "@/components/FormDialogPanel/FormDialogPanel.vue";
import TemplatePreview from "@/components/TempatePreview/TemplatePreview.vue";

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "Textbooks"
});


const searchForm = useSearch();
const onEvent = (payload) => {
  const { event, params } = payload;
  events[event] && events[event](params);
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
const { formConfig } = useFormDialog();
const textbookFormDialogRef = ref(null);

const tableRef = ref();

const handleEdit = (row) => {
  console.log(
    "%crow===>>>: ",
    "color: MidnightBlue; background: Aquamarine; font-size: 20px;",
    row
  );
};

const openAddDialog = () => {
  formConfig.config.title = '新增活页教材';
  formConfig.mode = 'edit';
  console.log(textbookFormDialogRef);
  formConfig.config.buttons.forEach((item) => {
    item.show = ['formSubmit', 'onFormCancel'].includes(item.event);
  });
  textbookFormDialogRef && textbookFormDialogRef.value.show();
};

const events = {
  onSearch() {
    onLoadData();
  },
  formSubmit(params) {
    console.log('formSubmit', params);
    const { data, formRef } = params;
    formRef.value?.getFormRef().value?.validate((valid) => {
      if (valid) {
        console.log('submit!', data);
        textbookFormDialogRef && textbookFormDialogRef.value.close();
      } else {
        console.log('error submit!!', data);
        return false;
      }
    });
  },
  onFormCancel(params) {
    const { data, formRef } = params;
    console.log('onFormCancel', formRef.value?.close);
    formRef.value?.getFormRef().value?.resetFields();
    textbookFormDialogRef && textbookFormDialogRef.value.close();
  },
  onCloseDialog(params) {
    events.onFormCancel(params);
  }
}
</script>

<style lang="scss" scoped>
</style>
