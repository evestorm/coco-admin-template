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
