import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Lucide from "@/components/ui/Lucide";
import { MessageSquare, Search, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { AiTwotoneEye } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { TbArrowsSort, TbFilterSearch } from "react-icons/tb";

const AdminMember = () => {
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const table = [
    {
      id: "1",
      name: "sourav",
      email: "sourav@gmail.com",
      event: "Pollachi event",
      status: "registerd",
      mobile: "1234567890",
    },
    {
      id: "2",
      name: "ram",
      email: "sourav@gmail.com",
      event: "Pollachi event",
      status: "registerd",
    },
    {
      id: "3",
      name: "gokul",
      email: "sourav@gmail.com",
      event: "Pollachi event",
      status: "Guest",
    },
    {
      id: "4",
      name: "john",
      email: "sourav@gmail.com",
      event: "Pollachi event",
      status: "registerd",
    },
    {
      id: "5",
      name: "prem",
      email: "sourav@gmail.com",
      event: "Pollachi event",
      status: "Guest",
    },
    {
      id: "6",
      name: "rahul",
      email: "sourav@gmail.com",
      event: "Pollachi event",
      status: "registerd",
    },
    {
      id: "6",
      name: "rahul",
      email: "sourav@gmail.com",
      event: "Pollachi event",
      status: "registerd",
    },
    {
      id: "6",
      name: "rahul",
      email: "sourav@gmail.com",
      event: "Pollachi event",
      status: "registerd",
    },
    {
      id: "6",
      name: "rahul",
      email: "sourav@gmail.com",
      event: "Pollachi event",
      status: "Guest",
    },
    {
      id: "6",
      name: "rahul",
      email: "sourav@gmail.com",
      event: "Pollachi event",
      status: "registerd",
    },
    {
      id: "6",
      name: "rahul",
      email: "sourav@gmail.com",
      event: "Pollachi event",
      status: "registerd",
    },
  ];
  const handleOptionClick = (type) => {
    setOpenSubMenu(false);
    if (type === "normal") {
      ("");
    } else if (type === "whatsapp") {
      window.open("https://web.whatsapp.com/");
    }
  };
  return (
    <>
      <div>
        <div>
          <h1 className="font-semibold text-2xl mt-5"></h1>
          <div className="grid grid-cols-12 gap-6 mt-7 ">
            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div className="relative transition-transform duration-300 hover:scale-105">
                <div className="p-5 box  rounded-lg shadow-md bg-white dark:bg-darkmode-400">
                  <div className="flex">
                    <div className="mt-1 ms-5 text-xl text-slate-500 ">
                      Total Members
                    </div>
                    <Lucide
                      icon="Users"
                      className="w-[34px] h-[54px] ms-10 mt-8"
                    />
                  </div>
                  <div className="ms-5 text-4xl -mt-9 font-medium leading-8">
                    70
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div className="relative transition-transform duration-300 hover:scale-105">
                <div className="p-5 box rounded-lg shadow-md bg-white dark:bg-darkmode-400">
                  <div className="flex">
                    <div className="ms-4 text-xl text-slate-500">
                      Active Members
                    </div>

                    <Lucide
                      icon="Users"
                      className="w-[34px] h-[54px] ms-10 mt-8 text-green-700 -me-9"
                    />
                  </div>
                  <div className="ms-4 -mt-9  text-4xl font-medium leading-8">
                    10
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div className="relative transition-transform duration-300 hover:scale-105">
                <div className="p-5 box  rounded-lg shadow-md bg-white dark:bg-darkmode-400">
                  <div className="flex">
                    <div className="mt-1 ms-5 text-xl text-slate-500">
                      InActive Members
                    </div>
                    <Lucide
                      icon="Users"
                      className="w-[34px] h-[54px] ms-10 mt-8 text-red-700 "
                    />
                  </div>
                  <div className="-mt-9 ms-5 text-4xl font-medium leading-8">
                    14
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div className="relative transition-transform duration-300 hover:scale-105">
                <div className="p-5 box  rounded-lg shadow-md bg-white dark:bg-darkmode-400">
                  <div className="flex">
                    <div className=" ms-4 text-xl text-slate-500">
                      Registered Members
                    </div>
                    <Lucide
                      icon="Users"
                      className="w-[34px] h-[54px] ms-10 mt-8 "
                    />
                  </div>
                  <div className="-mt-9 ms-5 text-4xl font-medium leading-8">
                    12
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-5">
          <div>
            <h1 className="font-semibold text-2xl">Members List</h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="flex flex-col w-full max-w-sm">
              <div className="flex items-center space-x-2">
                <Search
                  className="text-gray-500 cursor-pointer"
                  onClick={() => setOpen(true)}
                />

                <input
                  type="search"
                  placeholder="Search..."
                  className={`bg-transparent outline-none border-none transition-all duration-500 ease-in-out transform ${
                    open ? "w-full opacity-100 ml-2" : "w-0 opacity-0"
                  }`}
                  onBlur={() => setOpen(false)}
                />
              </div>

              <div className="h-0.5 w-full bg-gray-300 relative overflow-hidden mt-1">
                <div
                  className={`h-full bg-red-500 transition-all duration-500 ease-out ${
                    open ? "w-full" : "w-0"
                  }`}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1">
              <TbArrowsSort size={20} className="text-gray-600" />
              <select className="outline-none bg-transparent text-gray-700">
                <option>Sort by</option>
                <option value="registered">Newest</option>
                <option value="upcoming">Oldest</option>
              </select>
            </div>

            <div className="relative">
              <Button
                onClick={() => setOpenSubMenu((prev) => !prev)}
                className="flex items-center gap-2 bg-green-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                <IoMdAdd />
                Invite Member
              </Button>

              {openSubMenu && (
                <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg">
                  <button
                    onClick={() => handleOptionClick("normal")}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    <MessageSquare size={16} />
                    <span>Text Message</span>
                  </button>
                  <button
                    onClick={() => handleOptionClick("whatsapp")}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    <BsWhatsapp />
                    <span>via WhatsApp</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mt-5 h-[56vh] overflow-y-scroll hide-scrollbar">
        <div>
          <div className=" overflow-auto intro-y lg:overflow-visible  ">
            <h1 className="font-bold text-xl mb-4"></h1>
            <table className="min-w-full bg-white border rounded-md">
              <thead>
                <tr className="bg-red-200 text-center sticky top-0 ">
                  <th className="p-3 border-b">ID</th>
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Email</th>
                  <th className="p-3 border-b">Mobile No</th>
                  <th className="p-3 border-b">Event</th>
                  <th className="p-3 border-b">Status</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              {table.map((table) => (
                <tbody className="p-3 text-center">
                  <tr className="">
                    <td className="p-3 border-b">{table.id}</td>
                    <td className="border-b">{table.name}</td>
                    <td className="border-b">{table.email}</td>
                    <td className="border-b">{table.mobile}</td>
                    <td className="border-b">{table.event}</td>
                    <td className="border-b">{table.status}</td>
                    <td className="border-b ">
                      <div className="flex items-center justify-center">
                        <AiTwotoneEye className="text-gray-600" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMember;
