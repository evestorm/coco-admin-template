// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";
import dayjs from "dayjs";
const date = dayjs(new Date()).format("YYYY-MM-DD");

export default [
  {
    url: "/textbooks",
    method: "get",
    response: () => {
      return {
        success: true,
        data: {
          /** 教材列表 */
          data: [
            {
              date,
              name: "乡村景观设计",
              author: "李晓峰",
              collaborators: "王小明、李婷、刘晓磊、陈静",
              status: 1,
              category: "环境设计",
            },
            {
              date,
              name: "城市规划与可持续发展",
              author: "杨育红",
              collaborators: "杨梅、黄博、赵丽华",
              status: 2,
              category: "城市规划",
            },
            {
              date,
              name: "数字艺术基础",
              author: "韩梅梅",
              collaborators: "刘建国、王芳、张磊、李雪",
              status: 3,
              category: "艺术",
            },
            {
              date,
              name: "环境科学导论",
              author: '张明',
              collaborators: "王刚、李丽、刘波、张娜、王健",
              status: 4,
              category: "环境科学",
            },
            {
              date,
              name: "创新创业管理",
              author: "李小花",
              collaborators: "范丽丽、刘伟、赵蕾、李明",
              status: 5,
              category: "管理学",
            },
            {
              date,
              name: "人工智能原理与应用",
              author: "李丽丽",
              collaborators: "王丽丽、张涛、陈秀英、杨洋",
              status: 1,
              category: "计算机",
            },
            {
              date,
              name: "营销心理学入门",
              author: "王小明",
              collaborators: "周勇、张丽、李勇、王霞、刘强",
              status: 2,
              category: "心理学",
            },
            {
              date,
              name: "数据结构与算法设计",
              author: "胡小小",
              collaborators: "张雪、杨磊、王艳、刘涛、张明",
              status: 3,
              category: "计算机",
            }
          ],
        }
      };
    }
  },
  {
    url: "/cocoType",
    method: "get",
    response: () => {
      return {
        success: true,
        data: [
          {
            id: 1,
            name: "自定义页面",
          },
          {
            id: 2,
            name: "模块",
          },
          {
            id: 3,
            name: "项目",
          },
          {
            id: 4,
            name: "小节",
          }]
      }
    }
  },
  {
    url: '/categories',
    method: "get",
    response: () => {
      return {
        success: true,
        data: [
          {
            id: 1,
            name: '环境设计'
          },
          {
            id: 2,
            name: '城市规划'
          },
          {
            id: 3,
            name: '艺术'
          },
          {
            id: 4,
            name: '环境科学'
          },
          {
            id: 5,
            name: '管理学'
          },
          {
            id: 6,
            name: '计算机'
          },
          {
            id: 7,
            name: '心理学'
          }
        ]
      }
    }
  },
  {
    url: '/templates',
    method: "get",
    response: () => {
      return {
        success: true,
        data: [
          {
            id: 1,
            name: '乡村景观设计模板',
            content: [
              {
                id: 1,
                name: '扉页',
                type: 1,
                style: '',
                content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                heroImage: '',
                children: []
              },
              {
                id: 2,
                name: '特色民居景观设计',
                type: 2,
                style: `{"title":"color: 'red'; font-size: '24px';"}`,
                content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                heroImage: 'https://picsum.photos/200/300',
                children: [
                  {
                    id: 3,
                    name: '庭院花园设计',
                    type: 3,
                    style: `{"title":"color: 'blue'; font-size: '18px'"}`,
                    content: 'lorem aaaaaaaaaaaa',
                    heroImage: 'https://picsum.photos/400/600',
                    children: [
                      {
                        id: 7,
                        name: '庭院花园设计 - 自定义页面',
                        type: 1,
                        style: '',
                        content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                        heroImage: '',
                        children: []
                      },
                      {
                        id: 4,
                        name: '工作任务导入',
                        type: 4,
                        style: `{"title":"color: 'green'; font-size: '14px'"}`,
                        content: '',
                        heroImage: '',
                        children: [
                          {
                            id: 5,
                            name: '工作任务导入 - 具体内容',
                            type: 1,
                            style: '',
                            content: '工作任务导入 - 具体内容',
                            children: []
                          }
                        ]
                      }]
                  }
                ]
              },
              {
                id: 11,
                name: '后记',
                type: 1,
                style: '',
                content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                heroImage: '',
                children: []
              },
            ]
          },
          {
            id: 2,
            name: '模版 2',
            content: [
              {
                id: 1,
                name: '扉页 23333',
                type: 1,
                style: '',
                content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                heroImage: '',
                children: []
              },
              {
                id: 2,
                name: '模块 1111111',
                type: 2,
                style: `{"title":"color: 'red'; font-size: '24px'"}`,
                content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                heroImage: 'https://picsum.photos/200/300',
                children: [
                  {
                    id: 3,
                    name: '项目 1111111111',
                    type: 3,
                    style: `{"title":"color: 'blue'; font-size: '18px'"}`,
                    content: 'lorem aaaaaaaaaaaa',
                    heroImage: 'https://picsum.photos/400/600',
                    children: [
                      {
                        id: 4,
                        name: '小节 111111111',
                        type: 4,
                        style: `{"title":"color: 'green'; font-size: '14px'"}`,
                        content: '',
                        heroImage: '',
                        children: [
                          {
                            id: 5,
                            name: '1.1 任务计划 11111111',
                            type: 1,
                            style: '',
                            content: '齐齐哈尔市',
                            children: []
                          }
                        ]
                      }]
                  }
                ]
              }
            ]
          }],
      }
    },
  },
] as MockMethod[];
