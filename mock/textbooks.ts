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
  }
] as MockMethod[];
