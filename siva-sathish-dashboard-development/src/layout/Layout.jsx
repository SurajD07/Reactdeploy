import React, { useEffect, useState } from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getMenuConfigBasedOnRole } from "@/menu";
// import { profileGet } from "@/api/auth/authApi";
// import { useQuery } from "@tanstack/react-query";
// import { getMenuConfigBasedOnRole } from "@/menus";
// import AppLoading from "@/components/AppLoading";
// import { getUserRole } from "@/lib/utils";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [menuData, setMenuData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  //   console.log(getUserRole());

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const selectMenu = (data) => {
    setSelectedMenu(data);
  };

  //   const getProfileData = useQuery({
  //     queryKey: ["profileGET"],
  //     queryFn: () => profileGet(),
  //   });

  // Set sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches; // lg breakpoint
      setIsSidebarOpen(isLargeScreen); // Open sidebar for lg screens
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (true) {
      const roleBasedMenus = getMenuConfigBasedOnRole("ADMIN");
      setMenuData(roleBasedMenus);
      setSelectedMenu(roleBasedMenus[0]);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/" && menuData) {
      navigate(menuData[0]?.pathname);
    }
  }, [location, menuData]);

  //   if (getProfileData.isLoading) {
  //     return <AppLoading />;
  //   }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <Header
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        selectedMenu={selectedMenu}
        menuData={menuData}
        // data={getProfileData?.data?.data?.result}
      />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <SideMenu
          menuData={menuData}
          selectMenu={selectMenu}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* Backdrop for Sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <main
          className={`flex-1 min-w-0  p-6 bg-slate-50 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "lg:ml-64" : "ml-0"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
