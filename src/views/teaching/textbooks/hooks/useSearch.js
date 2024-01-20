import { reactive } from "vue";
import { bookStatus } from "./useTable";

export default function useSearch() {
  return reactive({
    data: {
      name: '',
      status: ''
    },
    items: [
      {
        label: '教材名称',
        type: 'input',
        prop: 'name',
        props: {
          options: [],
          placeholder: '请输入教材名称',
        }
      },
      {
        label: '状态',
        type: 'select',
        prop: 'status',
        props: {
          options: bookStatus,
          placeholder: '请选择状态',
        }
      }
    ]
  });
}
