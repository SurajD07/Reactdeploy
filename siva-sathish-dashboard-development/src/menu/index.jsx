import { Role } from "@/router";
import { adminMenus } from "./AdminMenus";
// import { customerMenus } from "./customerMenus";

export const getMenuConfigBasedOnRole = (role) => {
  switch (role) {
    case Role.ADMIN:
      return adminMenus;
    // case Role.CUSTOMER:
    //     return customerMenus;
    default:
      return [];
  }
};
