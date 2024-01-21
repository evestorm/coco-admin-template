import {onMounted, reactive, ref} from "vue";
import { getCategories, getTemplates } from "@/api/textbooks";

export default function useFormDialog() {
  const formConfig = reactive({
    config: {
      title: '编辑活页教材',
      name: 'editTextbook',
      // width: '600px',
      buttons: [
        { type: 'default', event: 'onFormCancel', show: true, name: '取消' },
        // { type: 'info', event: 'onImportAction', show: true, name: '导入' },
        { type: 'primary', event: 'formSubmit', show: true, name: '确定' }
      ]
    },
    mode: 'edit',
    form: {
      labelSuffix: '：',
      // labelWidth: '170px',
      data: {
        id: '', // 教材 id
        name: '', // 教材名称
        heroSrc: '', // 封面
        categoryId: '', // 教材分类 id
        templateId: '', // 模板 id
      },
      items: [
        {
          label: '教材名称',
          type: 'input',
          prop: 'name',
          show: true,
          span: 24,
          props: {
            placeholder: '请输入教材名称，最长100个字',
            maxlength: 100,
            disabled: false
          }
        },
        {
          label: '教材封面',
          type: 'slot',
          prop: 'heroSrc',
          show: false,
          span: 24,
          props: {
            placeholder: '请上传教材封面',
            slot: 'heroSrc',
            showSlot: true,
            // formatter: (data, items, item) => data.operationType === 0
          }
        },
        {
          label: '教材分类',
          type: 'select',
          prop: 'categoryId',
          show: true,
          span: 24,
          props: {
            placeholder: '请选择教材分类',
            options: [],
            filterable: true,
            clearable: true,
          }
        },
        {
          label: '教材模板',
          type: 'select',
          prop: 'templateId',
          show: true,
          span: 24,
          props: {
            placeholder: '请选择教材模板',
            options: [],
            event: 'handleTemplateChange',
            filterable: true,
          }
        },
        {
          label: '',
          type: 'slot',
          prop: 'templatePreview',
          show: true,
          span: 24,
          props: {
            slot: 'templatePreview',
            showSlot: true,
            options: []
          },
          // formatter: (data, items, item) => data.operationType === 0
        },
        // {
        //   label: '教材描述',
        //   type: 'textarea',
        //   prop: 'description',
        //   show: true,
        //   span: 24,
        //   props: {
        //     maxlength: 500,
        //     rows: 5,
        //     placeholder: '请输入教材描述，最长500个字'
        //   }
        // },
      ],
      rules: {
        name: [
          { required: true, message: '教材名称不能为空', trigger: 'change' },
          { max: 100, message: '教材名称不能超过100位', trigger: 'change' },
        ],
        categoryId: [
          { required: true, message: '请选择教材分类', trigger: 'change' },
        ],
        templateId: [
          { required: true, message: '请选择教材模板', trigger: 'change' },
        ],
      }
    }
  });

  onMounted(() => {
    getCategories().then(res => {
      if (res && res.success) {
        formConfig.form.items.find(v => v.prop === 'categoryId').props.options = res.data.map(v => ({ value: v.id, label: v.name }));
      }
    });
    getTemplates().then(res => {
      if (res && res.success) {
        const formatOptions = res.data.map(v => ({ ...v, value: v.id, label: v.name }));
        formConfig.form.items.find(v => v.prop === 'templateId').props.options = formatOptions;
        formConfig.form.items.find(v => v.prop === 'templatePreview').props.options = formatOptions;
      }
    });
  });

  return {
    formConfig
  }
}
