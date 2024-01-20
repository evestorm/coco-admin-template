import { $t } from "@/plugins/i18n";

export default {
  path: "/teaching",
  redirect: "/teaching/index",
  meta: {
    icon: "bookletLine",
    title: $t("menus.teaching"),
    // showLink: false,
    rank: 1
  },
  children: [
    {
      path: "/teaching/textbooks",
      name: "Textbooks",
      component: () => import("@/views/teaching/textbooks/textbooks.vue"),
      meta: {
        title: $t("menus.textbooks")
      }
    },
    {
      path: "/teaching/resource",
      name: "Resource",
      component: () => import("@/views/teaching/resource/resource.vue"),
      meta: {
        title: $t("menus.resource")
      }
    },
  ]
} as RouteConfigsTable;
