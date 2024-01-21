import { http } from "@/utils/http";

export type TextbooksResult = {
  success: boolean;
  data: {
    data: Array<any>
  };
};

/** 首页 */
export const getTextBooks = (data?: object) => {
  return http.request<TextbooksResult>("get", "/textbooks", { data });
};

/** 教材分类 */
export const getCategories = (data?: object) => {
  return http.request<TextbooksResult>("get", "/categories", { data });
}

/** 元素类型 */
export const getCocoType = (data?: object) => {
  return http.request<TextbooksResult>("get", "/cocoType", { data });
}

/** 教材模板 */
export const getTemplates = (data?: object) => {
  return http.request<TextbooksResult>("get", "/templates", { data });
}
