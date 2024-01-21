<template>
  <div class="custom-view w-full">
    小节 - {{ props.data.name }}
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
});
</script>

<style lang="scss" scoped></style>
