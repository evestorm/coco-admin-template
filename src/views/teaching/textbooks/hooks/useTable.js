import { getTextBooks } from "@/api/textbooks";

import { ref, onMounted, reactive } from "vue";
import { clone, delay } from "@pureadmin/utils";

export const bookStatus = [
  { label: '草稿', value: 1 },
  { label: '待审核', value: 2 },
  { label: '审核通过', value: 3 },
  { label: '审核驳回', value: 4 },
  { label: '已发布', value: 5 },
];

export default function useTable(searchParams) {
  const dataList = ref([]);
  const loading = ref(true);
  const columns = [
    {
      label: "教材名称",
      prop: "name",
      width: "250",
      fixed: true
    },
    {
      label: "创建者",
      prop: "author",
      width: "150"
    },
    {
      label: "协作者",
      prop: "collaborators",
      width: "260"
    },
    {
      label: "状态",
      prop: "statusText",
      width: "100"
    },
    {
      label: "更新时间",
      prop: "date",
      width: "200"
    },
    {
      label: "教材分类",
      prop: "category",
      width: "150"
    },
    {
      label: "操作",
      width: "250",
      fixed: "right",
      slot: "operation",
      align: "left"
    }
  ];

  /** 分页配置 */
  const pagination = reactive({
    pageSize: 20,
    currentPage: 1,
    pageSizes: [20, 40, 60],
    total: 0,
    align: "right",
    background: true,
    small: false
  });

  /** 加载动画配置 */
  const loadingConfig = reactive({
    text: "正在加载第一页...",
    viewBox: "-10, -10, 50, 50",
    spinner: `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
    // svg: "",
    // background: rgba()
  });

  /** 撑满内容区自适应高度相关配置 */
  const adaptiveConfig = {
    /** 表格距离页面底部的偏移量，默认值为 `96` */
    offsetBottom: 110
    /** 是否固定表头，默认值为 `true`（如果不想固定表头，fixHeader设置为false并且表格要设置table-layout="auto"） */
    // fixHeader: true
    /** 页面 `resize` 时的防抖时间，默认值为 `60` ms */
    // timeout: 60
    /** 表头的 `z-index`，默认值为 `100` */
    // zIndex: 100
  };

  function onSizeChange(val) {
    console.log("onSizeChange", val);
    pagination.pageSize = val;
    onLoadData();
  }

  function onCurrentChange(val) {
    loadingConfig.text = `正在加载第${val}页...`;
    pagination.currentPage = val;
    onLoadData();
  }

  const formatData = (data = []) => {
    return data.map((item) => {
      return {
        ...item,
        statusText: bookStatus.find((status) => status.value === item.status)?.label,
      }
    });
  };

  const onLoadData = async () => {
    const params = {
      page: pagination.currentPage,
      size: pagination.pageSize,
      ...searchParams,
    };
    console.log("onLoadData", params);
    loading.value = true;
    const resp = await getTextBooks(params);
    dataList.value = formatData(resp.data?.data);
    pagination.total = dataList.value.length;
    loading.value = false;
  }

  onMounted(async () => {
    await onLoadData();
  });

  return {
    loading,
    columns,
    dataList,
    pagination,
    loadingConfig,
    adaptiveConfig,
    onSizeChange,
    onCurrentChange,
    onLoadData,
  };
}
