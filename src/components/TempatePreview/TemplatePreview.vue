<template>
  <div class="template-preview max-w-[350px] mx-auto">
    <div class="content w-[95%] mx-auto flex flex-col gap-y-2 py-2">
      <component class="bg-white" v-for="item in data.flattenedTree" :key="item.id" :is="renderComp(item.type)" :data="item"></component>
    </div>
  </div>
</template>

<script setup>
import { getCocoType } from "@/api/textbooks";
import {onMounted, reactive, watch} from "vue";
import CustomView from '@/components/Coco/CustomView/CustomView.vue';
import Module from '@/components/Coco/Module/Module.vue';
import Project from '@/components/Coco/Project/Project.vue';
import Section from '@/components/Coco/Section/Section.vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => ([])
  }
});

const data = reactive({
  cocoType: [],
  flattenedTree: []
});

const renderComp = (type) => {
  switch (type) {
    case 1:
      return CustomView;
    case 2:
      return Module;
    case 3:
      return Project;
    case 4:
      return Section;
    default:
      return null;
  }
}

const formatData = () => {
  // 将树结构平铺
  const flattenedTrees = [];
  // 遍历每个根节点，调用递归函数
  props.data.forEach(root => {
    const flattenedTree = flattenTree(root);
    flattenedTrees.push(...flattenedTree);
  });
  data.flattenedTree = flattenedTrees;
  console.log(data.flattenedTree);
}

onMounted(async () => {
  const res = await getCocoType();
  data.cocoType = res.data;

  formatData();
});

watch(() => props.data, () => {
  formatData();
});
//
// // 示例的树结构
// const tree = [
//   {
//     id: 1,
//     name: "Node 1",
//     children: [
//       {
//         id: 2,
//         name: "Node 1.1",
//         children: [
//           {
//             id: 4,
//             name: "Node 1.1.1",
//             children: []
//           }
//         ]
//       },
//       {
//         id: 3,
//         name: "Node 1.2",
//         children: []
//       }
//     ]
//   },
//   {
//     id: 5,
//     name: "Node 2",
//     children: []
//   }
// ];

// 递归函数，用于平铺树结构
function flattenTree(node, result = []) {
  result.push(node); // 将当前节点加入结果数组

  if (node.children && node.children.length > 0) {
    // 递归处理子节点
    node.children.forEach(child => flattenTree(child, result));
  }

  return result;
}
</script>

<style lang="scss" scoped>
.template-preview {
  background-color: var(--el-fill-color-light);
}
</style>
