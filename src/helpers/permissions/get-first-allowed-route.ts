import { NAV_ITEMS } from "../data/nav-items";

export function getFirstAllowedRoute(
  permissionsMap: Record<string, boolean>
): string {
  for (const parent of NAV_ITEMS) {
    const parentAllowed =
      !parent.permission || permissionsMap[parent.permission];

    if (!parentAllowed) continue;

    if (parent.route && !parent.external) return parent.route;

    const allowedChild = parent.children?.find((c) => c.route && !c.external);

    if (allowedChild?.route) return allowedChild.route;
  }

  return "/";
}
