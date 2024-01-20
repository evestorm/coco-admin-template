<script setup>
import ReCol from "@/components/ReCol";
import Cockpit from "./components/Cockpit/Cockpit.vue";

import Hero from '@/assets/welcome/hero.png';

import useHome from "./hooks/useHome";
import { useDark } from "@pureadmin/utils";

defineOptions({
  name: "Welcome"
});

const { isDark } = useDark();
const { homeData } = useHome();
</script>

<template>
  <div class="welcome">
    <Cockpit :homeData="homeData.data" />
    <el-main class="custom-main !px-10">
      <el-row :gutter="24" justify="space-around">
        <ReCol :value="12" :md="12" :sm="12" :xs="24">
          <div class="h-[80%] flex flex-col justify-center">
            <div class="title text-3xl leading-normal font-black">
              <h1>欢迎使用</h1>
              <h1>新形态数字活页教材平台</h1>
            </div>
            <div class="desc mt-5">植物的形式由于栽培，人的形成由于教育。</div>
          </div>
        </ReCol>
        <ReCol :value="12" :md="12" :sm="12" :xs="24">
          <el-image :src="Hero" fit="cover" />
        </ReCol>
      </el-row>
    </el-main>
  </div>
</template>

<style lang="scss" scoped>
.welcome {
  position: relative;
}
.custom-main {
  background-color: var(--el-fill-color-blank);
}
</style>
