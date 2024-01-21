<template>
  <div class="form-dialog-panel">
    <el-dialog :title="useConfig.title"
               v-model="data.visible"
               :width="useConfig.width"
               :top="useConfig.top"
               :modal="useConfig.modal"
               :modal-append-to-body="useConfig.modalAppEndToBody"
               :appendToBody="useConfig.appendToBody"
               :draggable="useConfig.draggable"
               :lockScroll="useConfig.lockScroll"
               :customClass="useConfig.customClass"
               :closeOnClickModal="useConfig.closeOnClickModal"
               :closeOnPressEscape="useConfig.closeOnPressEscape"
               :showClose="useConfig.showClose"
               :center="useConfig.center"
               :destoryOnClose="useConfig.destoryOnClose"
               :fullscreen="fullscreen ? true : useConfig.fullscreen ? true : false"
               @open="onEvent('onOpenDialog', $event)"
               @opened="onEvent('onOpenedDialog', $event)"
               @close="onEvent('onCloseDialog', $event)"
               @closed="onEvent('onClosedDialog', $event)">
      <!-- header -->
      <template
        v-if="useConfig.fullscreenIcon"
        #header="{ close, titleId, titleClass }"
      >
        <div
          v-if="useConfig.fullscreenIcon"
          class="flex items-center justify-between"
        >
          <span :id="titleId" :class="titleClass">{{ useConfig.title }}</span>
          <i
            v-if="!useConfig.fullscreen"
            :class="fullscreenClass"
            @click="fullscreen = !fullscreen"
          >
            <IconifyIconOffline
              class="pure-dialog-svg"
              :icon="
              useConfig.fullscreen
                ? ExitFullscreen
                : fullscreen
                ? ExitFullscreen
                : Fullscreen
            "
            />
          </i>
        </div>
      </template>
      <div class="el-dialog-content-view"
           v-loading="loading"
           v-show="data.visible">
        <slot name="before-forms"></slot>
        <FormPanel ref="formRef" v-bind="props" @onEvent="({ event, params }) => onEvent(event, params)">
          <template v-for="(slot, index) of Object.keys($slots)" :key="index" v-slot:[slot]="payload">
            <slot :name="slot" v-bind="payload" />
          </template>
        </FormPanel>
      </div>
      <slot name="custom"></slot>
      <!--<div slot="footer"-->
      <!--     class="dialog-footer"-->
      <!--     v-if="useConfig.buttons && useConfig.buttons.length > 0">-->
      <!--  <template v-for="button in useConfig.buttons">-->
      <!--    <el-button v-if="button.show"-->
      <!--               :key="button.event"-->
      <!--               @click="onEvent(button.event)"-->
      <!--               :type="button.type"-->
      <!--               :disabled="!!loading">-->
      <!--      {{ button.name }}-->
      <!--    </el-button>-->
      <!--  </template>-->
      <!--</div>-->
    </el-dialog>
  </div>
</template>

<script>
const defaultConfig = {
  width: `${ window.screen.width * 0.5 < 800 ? 800 : window.screen.width * 0.5 }px`,
  labelWidth: 'auto',
  fullscreen: false,
  fullscreenIcon: true,
  top: '10vh',
  modal: true,
  modalAppendToBody: true,
  appendToBody: false,
  draggable: true,
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
import {computed, nextTick, onMounted, reactive, ref} from "vue";

import Fullscreen from "@iconify-icons/ri/fullscreen-fill";
import ExitFullscreen from "@iconify-icons/ri/fullscreen-exit-fill";

import FormPanel from "@/components/FormPanel/FormPanel.vue";

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

const fullscreenClass = computed(() => {
  return [
    "el-icon",
    "el-dialog__close",
    "-translate-x-2",
    "cursor-pointer",
    "hover:!text-[red]"
  ];
});

const data = reactive({
  visible: false,
  showPwd: true
});
const formRef = ref(null);
const fullscreen = ref(false);

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
  fullscreen.value = false;
};

// 自定义方法

// 过滤空格
const filterInput = (data) => {
  return data.replace(/\s+/g, '');
};

// const changeShowPwd = (refName) => {
//   data.showPwd = !data.showPwd;
//   setTimeout(() => {
//     changeCursorPosition(refName);
//   }, 0);
// };
// // 光标控制
// const changeCursorPosition = (refName) => {
//   try {
//     const dom = this.$refs[refName] && this.$refs[refName][0].$refs.input
//     // 获取光标的位置
//     const startPos = this.$utils.dom.getCursortPosition(dom)
//     // 设置光标位置
//     this.$utils.dom.setCaretPosition(dom, startPos)
//   } catch (e) { }
// };

onMounted(() => {
  console.log(props);
});

defineExpose({
  show,
  close,
  getFormRef,
})
</script>

<style lang="scss" scoped>
.el-dialog-content-view {
  width: 100%;
}
</style>
