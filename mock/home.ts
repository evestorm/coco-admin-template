// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/home",
    method: "get",
    response: () => {
      return {
        success: true,
        data: {
          /** 需求人数、提问数量、解决数量、用户满意度 */
          cockpitData: [
            {
              key: "published",
              value: 7,
            },
            {
              key: "toBeReviewed",
              value: 2,
            },
            {
              key: "passed",
              value: 19,
            },
            {
              key: "rejected",
              value: 1,
            }
          ],
        }
      };
    }
  }
] as MockMethod[];
