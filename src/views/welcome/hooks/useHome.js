import {getHome} from "@/api/home";
import {onMounted, reactive} from "vue";
import BookMarkedLine from "@iconify-icons/ri/book-mark-line";
import FileSearch from "@iconify-icons/ri/file-search-line";
import CheckLine from "@iconify-icons/ri/chat-check-line";
import ChatDelete from "@iconify-icons/ri/chat-delete-line";

const chartData = [
  {
    icon: BookMarkedLine,
    bgColor: "#effaff",
    color: "#41b6ff",
    duration: 1000,
    key: "published",
    name: "已发布",
    value: 0
  },
  {
    icon: FileSearch,
    bgColor: "#fff5f4",
    color: "#7846e5",
    duration: 1000,
    key: "toBeReviewed",
    name: "待审核",
    value: 0
  },
  {
    icon: CheckLine,
    bgColor: "#eff8f4",
    color: "#26ce83",
    duration: 1000,
    key: "passed",
    name: "已通过",
    value: 0
  },
  {
    icon: ChatDelete,
    bgColor: "#f6f4fe",
    color: "#e85f33",
    duration: 1000,
    key: "rejected",
    name: "已驳回",
    value: 0
  }
];

const formatData = (data) => {
  return chartData.map((item) => {
    if (data.data && data.data.cockpitData) {
      const target = data.data.cockpitData.find(v => v.key === item.key);
      if (target) {
        item.value = target.value;
      }
    }
    return item;
  });
}

export default function useHome() {
  const homeData = reactive({
    data: []
  });

  onMounted(async () => {
    const data = await getHome();
    homeData.data = formatData(data);
  });
  return {
    homeData
  }
}
