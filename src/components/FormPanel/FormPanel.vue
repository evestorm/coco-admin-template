<template>
  <div class="form-panel">
    <el-form
      ref="formRef"
      @submit.native.prevent
      auto-complete="off"
      :model="props.form.data"
      :rules="props.mode === 'edit' ? (props.form.rules || {}) : {}"
      :label-width="useConfig.labelWidth || 'auto'"
      label-suffix="：">
      <el-row :gutter="24">
        <template v-for="item in props.form.items">
          <el-col :key="item.prop" :span="item.span || '24'" v-if="item.formatter ? item.formatter(props.form.data, props.form.items, item) : item.show">
            <!-- 文本输入框 -->
            <el-form-item
              v-if="item.type === 'input'"
              :rules="item.rules"
              :prop="item.prop"
              :label="item.label"
              class="el-dialog-content-form-item"
            >
              <el-input
                :ref="item.prop"
                :type="item.props.type || 'text'"
                v-if="props.mode === 'edit'"
                @input="e => props.form.data[item.prop] = filterInput(e)"
                v-model.trim="props.form.data[item.prop]"
                :maxlength="item.props.maxlength"
                :minlength="item.props.minlength"
                :show-word-limit="item.props.showWordLimit || false"
                :placeholder="item.props.placeholder"
                :disabled="item.props.disabled || false"
              ></el-input>
              <div v-else-if="mode === 'show'">{{props.form.data[item.prop]}}</div>
            </el-form-item>
            <!-- 标签头部 -->
            <el-form-item
              v-if="item.type === 'div'"
              :rules="item.rules"
              :label="item.label"
              class="el-dialog-content-form-item"
            ></el-form-item>
            <!-- 密码框 -->
            <el-form-item
              v-if="item.type === 'inputpwd'"
              :rules="item.rules"
              :prop="item.prop"
              :label="item.label"
              class="el-dialog-content-form-item"
            >
              <el-input
                show-password
                auto-complete="new-password"
                :ref="item.prop"
                v-if="mode === 'edit'"
                v-model.trim="props.form.data[item.prop]"
                :placeholder="item.props.placeholder"
              ></el-input>
              <div v-else-if="props.mode === 'show'">
                <span>{{showPwd ? (props.form.data[item.props && item.props.showProp ? item.props.showProp : item.prop]) : '******'}}</span>
                <i class="el-icon-view" @click="showPwd = !showPwd" style="margin-left:10px"></i>
              </div>
            </el-form-item>
            <!-- number -->
            <el-form-item
              v-else-if="item.type === 'inputnumber'"
              :rules="item.rules"
              :prop="item.prop"
              :label="item.label"
              class="el-dialog-content-form-item"
            >
              <el-input-number
                :ref="item.prop"
                v-if="props.mode === 'edit'"
                v-model.trim="props.form.data[item.prop]"
                :max="item.props.max"
                :min="item.props.min"
                :placeholder="item.props.placeholder"
                :disabled="item.props.disabled"
              ></el-input-number>
              <div
                v-else-if="mode === 'show'"
              >{{props.form.data[item.props && item.props.showProp ? item.props.showProp : item.prop]}}</div>
            </el-form-item>
            <!-- 多行文本输入框 -->
            <el-form-item
              v-else-if="item.type === 'textarea'"
              :rules="item.rules"
              :prop="item.prop"
              :label="item.label"
              class="el-dialog-content-form-item"
            >
              <el-input
                type="textarea"
                v-if="props.mode === 'edit'"
                v-model="props.form.data[item.prop]"
                :ref="item.prop"
                :maxlength="item.props.maxlength"
                :minlength="item.props.minlength"
                :show-word-limit="item.props.showWordLimit || false"
                :rows="item.props.rows"
                :placeholder="item.props.placeholder"
              ></el-input>
              <!-- todo: 对需要以html展示的表单做特殊处理 showHtml $xss npm install xss -->
              <div v-else-if="props.mode === 'show' && item.props && item.props.showHtml"
                   v-html="props.form.data[item.props && item.props.showProp ? item.props.showProp : item.prop]"></div>
              <div v-else-if="mode === 'show'"
                   v-text="props.form.data[item.props && item.props.showProp ? item.props.showProp : item.prop]"></div>
            </el-form-item>
            <!-- 单选 -->
            <el-form-item
              v-else-if="item.type === 'radio'"
              :rules="item.rules"
              :prop="item.prop"
              :label="item.label"
              class="el-dialog-content-form-item"
            >
              <el-radio-group v-model="props.form.data[item.prop]" :ref="item.prop">
                <el-radio
                  v-for="(option, index) in item.props.options"
                  :key="index"
                  :label="option.label"
                  :value="option.value"
                  :name="option.label"
                  :disabled="props.mode === 'show'"
                ></el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 多选 -->
            <el-form-item
              v-else-if="item.type === 'checkbox'"
              :rules="item.rules"
              :prop="item.prop"
              :label="item.label"
              class="el-dialog-content-form-item"
            >
              <el-checkbox-group
                :ref="item.prop"
                v-model="props.form.data[item.prop]"
                :min="item.props.min"
                :max="item.props.max"
                :disalbed="props.mode === 'show'"
              >
                <el-checkbox
                  v-for="(option, index) in item.props.options"
                  :key="index"
                  :label="option.value ? option.value : option.label"
                  :disabled="!!item.props.disabled"
                >{{option.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- 下拉选择框 -->
            <el-form-item
              v-else-if="item.type === 'select'"
              :rules="item.rules"
              :prop="item.prop"
              :label="item.label"
              class="el-dialog-content-form-item"
            >
              <el-select
                :filterable="item.props.filterable !== false"
                :ref="item.prop"
                v-loading="!!item.props.loading"
                element-loading-spinner="el-icon-loading"
                v-if="props.mode === 'edit'"
                v-model="props.form.data[item.prop]"
                :placeholder="item.props.placeholder"
                :clearable="item.props.clearable"
                :multiple="item.props.multiple"
                :popper-append-to-body="false"
                :title="(item.props.options.length > 0
                  && item.props.options.find(v => v.value === props.form.data[item.prop])) ?
                  item.props.options.find(v => v.value === props.form.data[item.prop]).name : ''"
                :disabled="!!item.props.disabled || !!item.props.loading"
                @change="item.props.event ? onEvent(item.props.event, $event): () => {}"
              >
                <el-option
                  v-for="(option, index) in (item.props.options || [])"
                  :key="index"
                  :value="option.value"
                  :label="option.label"
                  :title="option.label"
                  :disabled="option.disabled"
                >{{ option.label }}</el-option>
              </el-select>
              <div
                v-else-if="props.mode === 'show'"
              >{{ ((item.props.options || []).find(option => option.value === props.form.data[item.prop]) || {}).name ||
              props.form.data[ item.props && item.props.showProp ? item.props.showProp : item.prop]
                }}</div>
            </el-form-item>
            <!-- 日期时间选择 -->
            <el-form-item
              v-else-if="item.type === 'date'"
              :rules="item.rules"
              :prop="item.prop"
              :label="item.label"
              class="el-dialog-content-form-item"
            >
              <el-date-picker
                :ref="item.prop"
                v-if="props.mode === 'edit'"
                :format="item.props.format || 'yyyy-MM-dd HH:mm:ss'"
                :type="item.props.type || 'date'"
                v-model="props.form.data[item.prop]"
                :placeholder="item.props.placeholder"
                :default-time="item.props.defaultTime"
                :disabled="!!item.props.disabled"
              ></el-date-picker>
              <div
                v-else-if="mode === 'show'"
              >{{props.form.data[item.props && item.props.showProp ? item.props.showProp : item.prop]}}</div>
            </el-form-item>
            <!-- 时间范围选择 -->
            <el-form-item
              v-else-if="item.type === 'datetimerange'"
              :rules="item.rules"
              :prop="item.prop"
              :label="item.label"
              class="el-dialog-content-form-item"
            >
              <el-date-picker
                v-if="props.mode === 'edit'"
                v-model="props.form.data[item.prop]"
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
              ></el-date-picker>
              <div
                v-else-if="mode === 'show'"
              >{{props.form.data[item.props && item.props.showProp ? item.props.showProp : item.prop]}}</div>
            </el-form-item>
            <!-- 级联选择 -->
            <el-form-item
              v-else-if="item.type === 'cascader'"
              :rules="item.rules"
              :prop="item.prop"
              :label="item.label"
              class="el-dialog-content-form-item"
            >
              <el-cascader
                filterable
                :ref="item.prop"
                v-if="props.mode === 'edit'"
                v-loading="!!item.props.loading"
                element-loading-spinner="el-icon-loading"
                :options="item.props.options"
                clearable
                :emitPath="item.props.emitPath"
                :placeholder="item.props.placeholder"
                :show-all-levels="item.props.showAllLevels || true"
                :props="item.props.props"
                v-model="props.form.data[item.prop]"
                :disabled="!!item.props.disabled || !!item.props.loading"
                @change="item.props.event && onEvent(item.props.event, $event)"
              >
                <template slot-scope="{ node, data }">
                  <div class="cascader-node" :title="node.label">{{ node.label }}</div>
                </template>
              </el-cascader>
              <div
                v-else-if="mode === 'show'"
              >{{props.form.data[item.props && item.props.showProp ? item.props.showProp : item.prop]}}</div>
            </el-form-item>
            <!-- 自定义HTML内容 -->
            <el-form-item
              v-else-if="item.type === 'html'"
              :rules="item.rules"
              :prop="item.prop"
              :label="item.label"
              class="el-dialog-content-form-item"
            >
              <!-- todo: xss -->
              <div v-html="item.formatter && item.formatter(props.form.data, mode)" />
            </el-form-item>
            <!-- 文字展示 -->
            <el-form-item
              v-else-if="item.type === 'text'"
              :rules="item.rules"
              :prop="item.prop"
              :label="item.label"
              class="el-dialog-content-form-item"
            >{{item.formatter ? item.formatter(props.form.data, mode) : props.form.data[item.props && item.props.showProp ? item.props.showProp : item.prop] }}</el-form-item>
            <!-- 自定义插槽 -->
            <el-form-item
              v-else-if="item.type === 'slot'"
              :rules="item.rules"
              :prop="item.prop"
              :label="item.label"
              class="el-dialog-content-form-item slot-item"
            >
              <slot :name="item.props.slot" :item="item" :data="props.form.data" v-if="props.mode === 'edit'"></slot>
              <div v-else-if="props.mode === 'show'">
                <div v-if="!item.props.showSlot">{{props.form.data[item.props && item.props.showProp ? item.props.showProp : item.prop]}}</div>
                <div v-else>
                  <slot :name="item.props.slot" :item="item" :data="props.form.data"></slot>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <slot name="custom"></slot>
    <div
      slot="footer"
      class="dialog-footer"
      v-if="useConfig.buttons && useConfig.buttons.length > 0"
    >
      <template v-for="button in useConfig.buttons">
        <el-button
          v-if="button.show"
          :key="button.event"
          @click="onEvent(button.event)"
          :type="button.type"
          :disabled="!!loading"
        >{{ button.name }}</el-button>
      </template>
    </div>
  </div>
</template>

<script>
const defaultConfig = {
  width: `${ window.screen.width * 0.5 < 800 ? 800 : window.screen.width * 0.5 }px`,
  labelWidth: 'auto',
  fullscreen: true,
  top: '10vh',
  modal: true,
  modalAppendToBody: true,
  appendToBody: false,
  lockScroll: true,
  customClass: '',
  closeOnClickModal: false,
  closeOnPressEscape: false,
  showClose: true,
  center: false,
  destoryOnClose: true,
  buttons: [
    {
      type: 'primary',
      event: 'onOk',
      name: '提交',
      show: true
    }
  ]
};
</script>
<script setup>
import {computed, onMounted, reactive, ref, watch} from "vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  config: {
    type: Object,
    default: () => defaultConfig
  },
  form: {
    type: Object,
    default: () => ({
      data: {},
      items: [],
      rules: {},
    })
  },
  mode: {
    type: String,
    default: 'edit'
  }
});
const emits = defineEmits(['onEvent']);

const useConfig = computed(() => {
  return {
    ...defaultConfig,
    ...props.config
  };
});

const data = reactive({
  visible: false,
  showPwd: true
});
const formRef = ref(null);

// 触发事件
const onEvent = (event, params = {}) => {
  emits('onEvent', {
    event,
    params: {
      formRef: formRef,
      data: props.form.data,
      params
    }
  });
};

const getFormRef = () => {
  return formRef;
};

const show = () => {
  data.visible = true;
};
const close = () => {
  data.visible = false;
};

// 自定义方法

// 过滤空格
const filterInput = (data) => {
  return data.replace(/\s+/g, '');
}

defineExpose({
  show,
  close,
  getFormRef,
});
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
.el-dialog-content-form-item {
  width: 100%;
}
.dialog-footer {
  text-align: right;
}
</style>
