import { ItemsProps, NAV_ITEMS } from "@/helpers/data/nav-items";

export const routePermissions = new Map<string, string>();

const walk = (items: ItemsProps[], parentPermission?: string) => {
  items.forEach((item) => {
    const permission = item.permission ?? parentPermission;

    if (item.route && permission) {
      routePermissions.set(item.route, permission);
    }

    if (item.children) {
      walk(item.children, permission);
    }
  });
};

walk(NAV_ITEMS);
