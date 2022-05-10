import { intersection } from "lodash";

export function isArrayWithLength(arr: any) {
  return Array.isArray(arr) && arr.length;
}

export function getAllowedRoutes(routes: any) {
  const role = JSON.parse(localStorage.getItem("user") || "").role;
  return routes.filter(({ permission }: any) => {
    if (!permission) return true;
    else if (!isArrayWithLength(permission)) {
      return true;
    } else {
      return permission.includes(role);
    }
  });
}
