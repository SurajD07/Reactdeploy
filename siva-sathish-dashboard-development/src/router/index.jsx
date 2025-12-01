import React, { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { adminRoutes } from "./adminRoutes";
import { useQuery } from "@tanstack/react-query";
import AppLoading from "@/components/ui/AppLoading";
import PageNotFound from "@/components/PageNotFound";
import { profileGetApi } from "@/api/auth/authApi";

// Lazy imports
const Layout = lazy(() => import("@/layout/Layout"));
const Login = lazy(() => import("@/pages/common/Login"));

export const Role = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  // Add additional roles here
};

function AppRouter() {
  const hasToken = localStorage.getItem("token");

  const getProfileData = useQuery({
    queryKey: ["profileGET"],
    queryFn: () => profileGetApi(),
    enabled: !!hasToken,
  });

  const role = getProfileData?.data?.data?.result?.role?.name;
  // console.log(role);
  function roleBasedRoutesData() {
    switch (role) {
      case Role.ADMIN:
        return adminRoutes;
      //   case Role.CUSTOMER:
      //     return customerRoutes;
      default:
        return [];
    }
  }

  if (getProfileData.isLoading) {
    return <AppLoading />;
  }

  // Dynamically choose routes based on role
  const routes = [
    {
      path: "/",
      element: hasToken ? <Layout /> : <Navigate to="/login" replace />,
      children: roleBasedRoutesData(),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ];

  return useRoutes(routes);
}

export default AppRouter;
