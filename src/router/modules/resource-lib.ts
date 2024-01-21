import { $t } from "@/plugins/i18n";

export default {
  path: "/resource-lib",
  redirect: "/resource-lib/index",
  meta: {
    icon: "bookletLine",
    title: $t("menus.resource-lib"),
    // showLink: false,
    rank: 2
  },
  children: [
    {
      path: "/resource-lib/index",
      name: "ResourceLib",
      component: () => import("@/views/resource-lib/resourceLib.vue"),
      meta: {
        title: $t("menus.resource-lib")
      }
    },
  ]
} as RouteConfigsTable;
