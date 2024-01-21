<template>
  <div class="module aspect-[210/297] w-full">
    <div class="title" :style="computedTitleStyle">模块 - {{ props.data.name }}</div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { transformStyle } from "../utils";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      style: {}
    })
  }
});

const computedTitleStyle = computed(() => {
  return transformStyle(props.data.style, 'title');
});
</script>

<style lang="scss" scoped></style>
