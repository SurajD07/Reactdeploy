import React, { useEffect, useRef, useState } from "react";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Search,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import profile from "../assets/Images/logo.png";
// import { useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import Lucide from "@/components/ui/Lucide";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import { BsFillCalendar2Fill, BsWhatsapp } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { profileGetApi } from "@/api/auth/authApi";

function Header({ toggleSidebar, isSidebarOpen, data }) {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();

  const profileget = useQuery({
    queryKey: ["profileGET"],
    queryFn: profileGetApi,
  });
  console.log(profileget);

  const togglePopup = () => setShowPopup(!showPopup);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  return (
    <header
      className={`h-16 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "lg:ps-[280px]" : "ps-6"
      } bg-gray-100 text-black flex justify-between items-center gap-4 px-6 fixed top-0 left-0 right-0 z-10 rounded-3xl`}
    >
      <div className="flex items-center gap-4">
        <button className="text-xl" onClick={toggleSidebar}>
          <svg
            className="h-6 w-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {location.pathname.startsWith("/dashboard") ? (
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        ) : location.pathname === "/event" ? (
          <h1 className="text-2xl font-semibold">Events</h1>
        ) : location.pathname === "/videos" ? (
          <h1 className="text-2xl font-semibold">Videos</h1>
        ) : location.pathname === "/member" ? (
          <h1 className="text-2xl font-semibold">Members</h1>
        ) : location.pathname === "/gallery" ? (
          <h1 className="text-2xl font-semibold">Gallery</h1>
        ) : location.pathname === "/video" ? (
          <h1 className="text-2xl font-semibold">Videos</h1>
        ) : location.pathname === "/profile" ? (
          <h1 className="text-2xl font-semibold">Profile</h1>
        ) : location.pathname === "/event/eventdetails" ? (
          <h1 className="text-2xl font-semibold">Event Details</h1>
        ) : location.pathname === "/event/createevent" ? (
          <h1 className="text-2xl font-semibold">Create Event</h1>
        ) : (
          ""
        )}
      </div>
      <div className="flex items-center gap-3 lg:me-9 ">
        {/* <div className="  flex-col w-full max-w-sm hidden lg:block">
          <div className="flex items-center space-x-2">
            <Search className="text-gray-500 cursor-pointer" />

            <input
              type="search"
              placeholder="Search..."
              className={`bg-transparent outline-none border-none transition-all duration-500 ease-in-out transform ${
                open ? "w-full opacity-100 ml-2" : "w-0 opacity-0"
              }`}
            />
          </div>

          <div className="h-0.5 w-full bg-gray-300 relative overflow-hidden mt-1">
            <div
              className={`h-full  transition-all duration-500 ease-out ${
                open ? "w-full" : "w-0"
              }`}
            ></div>
          </div>
        </div> */}
        <div className="flex gap-4">
          <div className="relative hidden md:block" ref={popupRef}>
            <div
              className="bg-secondary text-primary h-10 w-10 rounded-md flex items-center justify-center cursor-pointer"
              onClick={togglePopup}
            >
              <Lucide
                icon="MessageSquareMore"
                className="w-6 h-6 text-green-600"
              />
            </div>

            {showPopup && (
              <div className="absolute top-12 right-0 bg-white shadow-md border rounded-lg w-64 z-50 p-4">
                <h2 className="text-sm font-semibold mb-2">Messages</h2>
                <p className="text-sm text-gray-600">No new messages</p>
              </div>
            )}
          </div>
          <div className="bg-secondary text-primary h-10 w-10 rounded-md flex items-center justify-center cursor-pointer -ms-3 ">
            <a href="https://www.youtube.com/@SivaSathishPollachi/videos">
              <Lucide icon="Youtube" className="w-6 h-6 text-red-700" />
            </a>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="text-right hidden md:block">
                <p className="text-lg">
                  {profileget?.data?.data?.result?.firstName}
                </p>
              </div>
              <img
                className="h-10 w-10 rounded-md object-cover "
                src={profileget?.data?.data?.result?.img_url}
                alt="profile"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuGroup>
              {/* <DropdownMenuItem onClick={() => navigate("")}>
                <User />
                <span>Profile</span>
              </DropdownMenuItem> */}

              {/* <DropdownMenuItem onClick={() => navigate("")}>
                <Settings />
                <span>Settings</span>
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/event")}>
                <BsFillCalendar2Fill />
                <span>Events</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus />
                  <span>Invite Members</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <BsWhatsapp />
                      <span>WhatsApp</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              {/* <DropdownMenuItem onClick={() => navigate("/member")}>
                <Plus />
                <span>New Member</span>
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;
