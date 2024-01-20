import { http } from "@/utils/http";

export type HomeResult = {
  success: boolean;
  data: {
    cockpitData: Array<any>
  };
};

/** 登录 */
export const getHome = (data?: object) => {
  return http.request<HomeResult>("get", "/home", { data });
};
