<template>
  <div class="search-panel">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form.data"
      class="search-form bg-bg_color w-full px-8 pt-[12px]"
    >
      <template v-for="item in form.items">
        <!-- 文本输入框 -->
        <el-form-item v-if="item.type === 'input'" :label="item.label" :prop="item.prop">
          <el-input :type="item.props.type || 'text'"
                    @input="e => form.data[item.prop] = filterInput(e)"
                    v-model.trim="form.data[item.prop]"
                    :rows="item.props.rows || 5"
                    :maxlength="item.props.maxlength"
                    :minlength="item.props.minlength"
                    :show-word-limit="item.props.showWordLimit || false"
                    :placeholder="item.props.placeholder"
                    :disabled="item.props.disabled || false"
                    :readonly="item.props.readonly || false"
                    :clearable="item.props.clearable || true"
                    class="!w-[180px]" />
        </el-form-item>
        <!-- 不过滤文本空格输入框 -->
        <el-form-item v-else-if="item.type === 'inputnotrim'" :label="item.label" :prop="item.prop">
          <el-input :type="item.props.type || 'text'"
                    v-model="form.data[item.prop]"
                    :rows="item.props.rows || 5"
                    :maxlength="item.props.maxlength"
                    :minlength="item.props.minlength"
                    :show-word-limit="item.props.showWordLimit || false"
                    :placeholder="item.props.placeholder"
                    :disabled="item.props.disabled || false"
                    :readonly="item.props.readonly || false"
                    :clearable="item.props.clearable || true"
                    class="!w-[180px]" />
        </el-form-item>
        <!-- 下拉选择框 -->
        <el-form-item v-else-if="item.type === 'select'" :label="item.label" :prop="item.prop">
          <el-select :filterable="item.props.filterable!==false"
                     v-model="form.data[item.prop]"
                     :placeholder="item.props.placeholder"
                     :multiple="item.props.multiple"
                     :multiple-limit="item.props.multipleLimit"
                     :clearable="item.props.clearable || true"
                     :title="(item.props.options.length > 0 && item.props.options.find(v => v.value === form.data[item.prop])) ? item.props.options.find(v => v.value === form.data[item.prop]).name : ''"
                     :disabled="!!item.props.disabled"
                     @change="item.props.event ? onEvent(item.props.event, $event): ()=>{}"
                     @visible-change="item.props.visibleEvent && onEvent(item.props.visibleEvent, $event)"
                     class="!w-[180px]">
            <el-option v-for="(option, index) in (item.props.options || [])"
                       :key="index"
                       :value="option.value"
                       :label="option.label"
                       :title="option.extraLabel || option.label"
                       :disabled="option.disabled">{{ option.extraLabel || option.label }}</el-option>
          </el-select>
        </el-form-item>
        <!-- 日期时间选择 -->
        <el-form-item v-else-if="item.type === 'date'" :label="item.label" :prop="item.prop">
          <el-date-picker :format="item.props.format || 'yyyy-MM-dd HH:mm:ss'"
                          :value-format="item.props.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
                          :type="item.props.type || 'date'"
                          v-model="form.data[item.prop]"
                          :placeholder="item.props.placeholder"
                          :default-time="item.props.defaultTime"
                          :disabled="!!item.props.disabled"
                          :picker-options="item.props && item.props.picker"
                          class="!w-[180px]" />
        </el-form-item>
        <!-- 时间范围选择 -->
        <el-form-item v-else-if="item.type === 'datetimerange'" :label="item.label" :prop="item.prop">
          <el-date-picker v-model="form.data[item.prop]"
                          type="datetimerange"
                          :readonly="item.props && item.props.readonly || false"
                          :disabled="!!item.disabled "
                          :editable="item.props && item.props.editable || true"
                          :clearable="item.props && item.props.clearable || true"
                          :size="item.props && item.props.size"
                          :start-placeholder="item.props && item.props.startPlaceholder"
                          :end-placeholder="item.props && item.props.endPlaceholder"
                          :time-arrow-control="item.props && item.props.time || true"
                          :format="item.props && item.props.format || 'yyyy-MM-dd HH:mm:ss'"
                          :align="item.props && item.props.align || 'left'"
                          :popper-class="item.props && item.props.popper"
                          :picker-options="item.props && item.props.picker"
                          :range-separator="item.props && item.props.range || '至'"
                          :default-value="item.props && item.props.defaultValue"
                          :default-time="item.props && item.props.defaultTime"
                          :value-format="item.props && item.props.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
                          :name="item.props && item.props.name"
                          :prefix-icon="item.props && item.props.prefixIcon || 'el-icon-date'"
                          :clear-icon="item.props && item.props.clear || 'el-icon-circle-close'"
                          @change="item.props.event && onEvent(item.props.event, $event)"
                          class="!w-[180px]"></el-date-picker>
        </el-form-item>
        <!-- 级联选择 -->
        <el-form-item v-else-if="item.type === 'cascader'" :label="item.label" :prop="item.prop">
          <el-cascader filterable
                       :ref="item.prop"
                       :options="item.props.options"
                       :clearable="item.props.clearable || true"
                       :placeholder="item.props.placeholder"
                       :show-all-levels="item.props.showAllLevels || true"
                       :props="item.props.props"
                       v-model="form.data[item.prop]"
                       :disabled="!!item.props.disabled || !!item.props.loading"
                       @change="item.props.event && onEvent(item.props.event, $event)"
                       @visible-change="item.props.operateEvent && onEvent(item.props.operateEvent, $event)"
                       class="!w-[180px]">
            <template slot-scope="{ node, data }">
              <div class="cascader-node" :title="node.label">{{node.label}}</div>
            </template>
          </el-cascader>
        </el-form-item>
        <!-- 自定义插槽 -->
        <el-form-item v-else-if="item.type === 'slot'" :label="item.label" :prop="item.prop" :class="item.className">
          <slot :name="item.props.slot"
                :item="item"
                :data="form.data"></slot>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Refresh from "@iconify-icons/ep/refresh";
import Search from '@iconify-icons/ep/search';
import {onMounted, ref} from "vue";

const props = defineProps({
  form: {
    type: Object,
    default: () => ({
      data: {},
      items: [],
      rules: {}
    })
  },
});
const emits = defineEmits(['onEvent']);

const formRef = ref(null);

onMounted(() => {
  onSearch();
});

// 过滤空格
const filterInput = (data) => {
  return data.replace(/\s+/g, '')
};

// 搜索
const onSearch = () => {
  emits('onEvent', {
    event: 'onSearch',
    params: {
      form: formRef,
      data: props.form.data
    }
  });
};

const resetForm = formEl => {
  if (!formEl) return;
  formEl.resetFields();
  onSearch();
};

// 触发事件
const onEvent = (event, params = {}) => {
  emits('onEvent', {
    event,
    params: {
      form: formRef,
      data: props.form.data,
      params
    }
  });
};
</script>

<style lang="scss" scoped></style>
