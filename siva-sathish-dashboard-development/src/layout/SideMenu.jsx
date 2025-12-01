import React, { useEffect, useState } from "react";
import logo from "../assets/Images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import Lucide from "@/components/ui/Lucide";
import { Home } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { profileGetApi } from "@/api/auth/authApi";
function SideMenu({ isSidebarOpen, toggleSidebar, menuData }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null); // For active main menu
  const [activeSubMenu, setActiveSubMenu] = useState(null); // For active submenu

  const profileget = useQuery({
    queryKey: ["profileGET"],
    queryFn: profileGetApi,
  });

  const toggleMenu = (index) => {
    setExpandedMenu((prev) => (prev === index ? null : index));
  };

  //   useEffect(() => {
  //     if (location.pathname === "/" && menuData) {
  //       //   navigate(menuData[0]?.pathname);
  //     }
  //   }, [location, menuData]);

  // Determine active menu and submenu based on current location
  useEffect(() => {
    menuData.forEach((menu, index) => {
      if (location.pathname === menu.pathname) {
        setActiveMenu(index);
        setActiveSubMenu(null);
      }
      if (menu.subMenu) {
        menu.subMenu.forEach((subMenu) => {
          if (location.pathname === subMenu.pathname) {
            setActiveMenu(index);
            setActiveSubMenu(subMenu.pathname);
          }
        });
      }
    });
  }, [location.pathname, menuData]);

  const handleMenuClick = (index, menu) => {
    if (menu.subMenu) {
      setActiveMenu(index === activeMenu ? null : index);
    } else {
      setActiveMenu(index);
      setActiveSubMenu(null);
      navigate(menu.pathname);
    }
  };

  const handleSubMenuClick = (subMenu) => {
    setActiveSubMenu(subMenu.pathname);
    navigate(subMenu.pathname);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 transform bg-primary bg-red-600 rounded-r-3xl text-white w-64 p-4 transition-transform duration-300 ease-in-out z-20 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col items-center justify-center lg:mt-3">
        <img
          onClick={() => navigate("/profile")}
          className="w-[40%] md:w-[0%] lg:w-[40%]"
          src={profileget?.data?.data?.result?.img_url}
          alt="logo"
        />
        <p className="mt-2 text-center text-sm lg:text-lg">
          {profileget?.data?.data?.result?.firstName}
          {profileget?.data?.data?.result?.lastName}
        </p>
      </div>
      <button
        className="text-white  text-2xl absolute top-5 right-4 lg:hidden"
        onClick={toggleSidebar}
      >
        &times;
      </button>
      <nav className="my-8 pb-20  max-h-full overflow-y-auto hide-scrollbar">
        <div className="px-2 space-y-2">
          {menuData?.map((menu, index) => (
            <div key={index}>
              <div
                onClick={() => handleMenuClick(index, menu)}
                className={`cursor-pointer flex items-center justify-between gap-3 w-full hover:bg-[#fff3] rounded-3xl transition-all duration-500 ease-in-out ${
                  activeMenu === index ? "bg-[#fff3]" : ""
                }`}
              >
                <div className="flex items-center gap-3 ms-3">
                  <div
                    className={`h-10 w-10 flex items-center justify-center rounded-full transition-all duration-500 ease-in-out ${
                      activeMenu === index
                        ? "bg-white text-primary"
                        : "text-slate-200"
                    }`}
                  >
                    <Lucide icon={menu.icon} className="w-5 h-5" />
                  </div>
                  <p
                    className={`text-lg capitalize transition-all duration-500 ease-in-out  ${
                      activeMenu === index ? "text-white" : "text-slate-200"
                    }`}
                  >
                    {menu.title}
                  </p>
                </div>
                {menu.subMenu && (
                  <div
                    className={`mr-4 ${
                      activeMenu === index ? "text-white" : "text-slate-200"
                    }`}
                  >
                    {activeMenu === index ? (
                      <Lucide icon="ChevronDown" className="w-4 h-4" />
                    ) : (
                      <Lucide icon="ChevronRight" className="w-4 h-4" />
                    )}
                  </div>
                )}
              </div>

              {menu.subMenu && activeMenu === index && (
                <div className="pl-6 mb-5 space-y-3 mt-5">
                  {menu.subMenu.map((subMenu, subIndex) => (
                    <div
                      key={subIndex}
                      onClick={() => handleSubMenuClick(subMenu)}
                      className={`cursor-pointer text-xs group flex items-center gap-3 px-4  rounded transition-all duration-500 ease-in-out ${
                        activeSubMenu === subMenu.pathname ? "" : ""
                      }`}
                    >
                      <p
                        className={` group-hover:text-white ${
                          activeSubMenu === subMenu.pathname
                            ? "text-white"
                            : "text-slate-200"
                        }`}
                      >
                        -
                      </p>

                      <p
                        className={`text-sm capitalize group-hover:text-white ${
                          activeSubMenu === subMenu.pathname
                            ? "text-white"
                            : "text-slate-200"
                        }`}
                      >
                        {subMenu.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </aside>

    // <aside
    //   className={`fixed inset-y-0 left-0 transform bg-primary bg-red-800 rounded-r-3xl text-white w-64 p-4 transition-transform duration-300 ease-in-out z-20 ${
    //     isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    //   }`}
    // >
    //   <div className="flex flex-col items-center justify-center lg:mt-3">
    //     <img className="w-[40%] md:w-[0%] lg:w-[40%]" src={logo} alt="logo" />
    //     <p className="mt-2 text-center text-sm lg:text-lg">Siva Sathish</p>
    //   </div>

    //   <button
    //     className="text-white text-2xl absolute top-5 right-4 lg:hidden"
    //     onClick={toggleSidebar}
    //   >
    //     &times;
    //   </button>
    //   <nav className="my-8 pb-20 max-h-full overflow-y-auto hide-scrollbar">
    //     <div className="px-4 space-y-2">
    //       {menuData.map((menu, index) => (
    //         <div
    //           key={index}
    //           onClick={() => setActiveMenu(index)}
    //           className={`cursor-pointer flex items-center gap-3 w-full rounded-3xl transition-all duration-500 ease-in-out ${
    //             activeMenu === index
    //               ? "bg-[#f45d5d] text-white"
    //               : "hover:bg-[#f45d5dcd]"
    //           }`}
    //         >
    //           <div className="h-10 w-10 flex items-center justify-center rounded-full text-slate-200">
    //             <Lucide icon={menu.icon} className="w-5 h-5" />
    //           </div>
    //           <p className="text-lg capitalize text-slate-200">{menu.title}</p>
    //         </div>
    //       ))}
    //     </div>
    //   </nav>
    // </aside>
  );
}

export default SideMenu;
