<template>
  <div class="cockpit">
    <el-row :gutter="24" justify="space-around">
      <re-col>
        <h3 class="mb-3">活页教材情况</h3>
      </re-col>
      <re-col
        v-for="(item, index) in homeData" :key="index"
        v-motion
        class="mb-[18px]"
        :value="6" :md="12" :sm="12" :xs="24"
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 80 * (index + 1) } }"
      >
        <el-card class="line-card" shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">{{ item.name }}</span>
            <div
              class="w-8 h-8 flex justify-center items-center rounded-md"
              :style="{ backgroundColor: isDark ? 'transparent' : item.bgColor }"
            >
              <IconifyIconOffline :icon="item.icon" :color="item.color" width="18" />
            </div>
          </div>
          <div class="flex justify-between items-start mt-3">
            <div class="w-1/2">
              <ReNormalCountTo :duration="item.duration" :fontSize="'1.6em'" :startVal="0" :endVal="item.value" />
            </div>
          </div>
        </el-card>
      </re-col>
    </el-row>
  </div>
</template>

<script setup>
import ReCol from "@/components/ReCol";
import { ReNormalCountTo } from "@/components/ReCountTo";

import { useDark } from "@pureadmin/utils";
const { isDark } = useDark();

defineProps({
  homeData: {
    type: Array,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.cockpit {
}
</style>
