import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  PointElement,
} from "chart.js";
import Lucide from "@/components/ui/Lucide";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import { BsFacebook, BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { Calendar, Table } from "lucide-react";
import { AiTwotoneEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { profileGetApi } from "@/api/auth/authApi";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  PointElement
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getProfileData = useQuery({
    queryKey: ["profileGET"],
    queryFn: () => profileGetApi(),
  });

  const barData = {
    labels: ["Channel 1", "Channel 2", "Channel 3", "Channel 4", "Channel 5"],
    datasets: [
      {
        label: "Views",
        data: [100, 200, 150, 300, 250],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart resizes properly
    plugins: {
      title: {
        display: true,
        // text: "Channel Views",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Subscribers",
        data: [
          1000, 1200, 1500, 1800, 2000, 2200, 2500, 2800, 3000, 3200, 3500,
          3800,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) =>
            value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value,
        },
      },
    },
  };

  const table = [
    {
      id: "1",
      name: "sourav",
      email: "sourav@gmail.com",
      event: "Pollachi event",
      status: "registerd",
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
      status: "registerd",
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
  const today = new Date();
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const currentDate = selectedDate.getDate();
  const monthName = selectedDate.toLocaleString("default", { month: "long" });

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const goToPreviousMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  const calendarCells = [];

  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(<div key={`empty-${i}`} className="p-2"></div>);
  }

  for (let d = 1; d <= totalDays; d++) {
    const isToday =
      d === currentDate &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year;

    calendarCells.push(
      <div
        key={d}
        className={`text-center p-2 rounded cursor-pointer ${
          isToday ? "bg-red-500 text-white font-bold" : "hover:bg-blue-100"
        }`}
      >
        {d}
      </div>
    );
  }

  return (
    <div className=" md:p-8">
      <h1 className="text-xl font-semibold text-center md:text-left lg:-mt-8">
        Welcome back,{" "}
        <span className="text-red-700">
          {getProfileData?.data?.data?.result?.firstName}
          {getProfileData?.data?.data?.result?.lastName}!
        </span>
      </h1>

      <div>
        <h1 className="font-bold text-xl mt-5"> </h1>
        <div className="grid grid-cols-12 gap-6 mt-7 ">
          <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div className="relative transition-transform duration-300 hover:scale-105">
              <div className="p-5 box bg-orange-100 rounded-lg shadow-md dark:bg-darkmode-400">
                <div className="flex">
                  <div className="mt-1 ms-5 text-xl text-slate-500 ">
                    Subscribers
                  </div>
                </div>
                <div className="flex items-center justify-between ms-4 mt-2">
                  <div className="text-4xl font-medium leading-8">10</div>
                  <Lucide icon="Users" className="w-[34px] h-[54px] me-4 " />
                </div>
                <div className=" flex ms-5 me-2 mt-1 text-green-600 font-bold">
                  12%
                  <span>
                    <FiArrowUpRight style={{ marginTop: "4px" }} />
                  </span>
                  <span className="text-gray-400 text-sm mt-1">
                    from last month
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={() => navigate("/event")}
            className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y cursor-pointer"
          >
            <div className="relative transition-transform duration-300 hover:scale-105">
              <div className="p-5 box bg-green-100 rounded-lg shadow-md dark:bg-darkmode-400">
                <div className="flex items-center justify-between ms-4">
                  <div className="text-xl text-slate-500">Events</div>
                </div>

                <div className="flex items-center justify-between ms-4 mt-2">
                  <div className="text-4xl font-medium leading-8">10</div>
                  <Lucide
                    icon="CalendarClock"
                    className="w-[34px] h-[54px] me-4"
                  />
                </div>

                <div className="flex items-center ms-5 me-2 mt-2 text-green-600 font-bold">
                  2%
                  <span className="ml-1">
                    <FiArrowUpRight style={{ marginTop: "4px" }} />
                  </span>
                  <span className="text-gray-400 text-sm mt-1 ml-1">
                    from last month
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={() => navigate("/member")}
            className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y cursor-pointer"
          >
            <div className="relative transition-transform duration-300 hover:scale-105">
              <div className="p-5 box bg-red-100 rounded-lg shadow-md dark:bg-darkmode-400">
                <div className="flex">
                  <div className="mt-1 ms-5 text-xl text-slate-500">
                    Total Members
                  </div>
                </div>
                <div className="flex items-center justify-between ms-4 mt-2">
                  <div className="text-4xl font-medium leading-8">10</div>
                  <Lucide icon="Users" className="w-[34px] h-[54px] me-4" />
                </div>
                <div className=" flex ms-5 me-2 mt-1 text-red-600 font-bold">
                  2%
                  <span>
                    <FiArrowDownRight style={{ marginTop: "4px" }} />
                  </span>
                  <span className="text-gray-400 text-sm mt-1">
                    from last month
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={() => navigate("/video")}
            className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y cursor-pointer"
          >
            <div className="relative transition-transform duration-300 hover:scale-105">
              <div className="p-5 box bg-purple-100 rounded-lg shadow-md dark:bg-darkmode-400">
                <div className="flex">
                  <div className=" ms-4 text-xl text-slate-500">
                    Total Vidoes
                  </div>
                </div>
                <div className="flex items-center justify-between ms-4 mt-2">
                  <div className="text-4xl font-medium leading-8">10</div>
                  <Lucide
                    icon="Youtube"
                    className="w-[34px] h-[54px] me-4 text-red-700"
                  />
                </div>
                <div className=" flex ms-5 me-2 mt-1 text-green-600 font-bold">
                  4%
                  <span>
                    <FiArrowUpRight style={{ marginTop: "4px" }} />
                  </span>
                  <span className="text-gray-400 text-sm mt-1">
                    from last month
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-9 grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-5 w-full h-full md:h-full md:col-span-3 ">
          <h2 className="text-lg font-semibold -mt-3 text-center  ">
            Social Media Stats
          </h2>
          <hr className="mt-2" />

          <div
            onClick={() => window.open("https://www.instagram.com", "_blank")}
            className="cursor-pointer"
          >
            <div className="flex mt-5">
              <BsInstagram
                style={{ height: "35px", width: "35px", color: "red" }}
              />
              <span className="font-bold text-2xl ms-5">Instagram</span>
            </div>
            <h1 className="ms-12">20k Followers</h1>
          </div>
          <div
            onClick={() => window.open("https://www.facebook.com/", "_blank")}
            className="cursor-pointer"
          >
            <div className="flex mt-5">
              <BsFacebook
                style={{ height: "35px", width: "35px", color: "blue" }}
              />
              <span className="font-bold text-2xl ms-5 ">Facebook</span>
            </div>
            <h1 className="ms-12">20k Followers</h1>
          </div>
          <div
            onClick={() => window.open("https://x.com/?lang=en-in", "_blank")}
            className="cursor-pointer"
          >
            <div className="flex mt-5">
              <BsTwitter
                style={{ height: "35px", width: "35px", color: "blue" }}
              />
              <span className="font-bold text-2xl ms-5 ">Twitter</span>
            </div>
            <h1 className="ms-12">20k Followers</h1>
          </div>
          <div
            onClick={() => window.open("https://web.whatsapp.com/ ", "_blank")}
            className="cursor-pointer"
          >
            <div className="flex mt-5">
              <BsWhatsapp
                style={{ height: "35px", width: "35px", color: "green" }}
              />
              <span className="font-bold text-2xl ms-5 ">WhatsApp</span>
            </div>
            <h1 className="ms-12">20k Followers</h1>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-5 w-full h-[360px] md:h-[400px] md:col-span-6 ">
          <h2 className="text-lg font-semibold -mt-3 text-center">
            Watch Time Details
          </h2>
          <hr className="mt-2" />

          <div className="w-full h-full">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
        {/* <div className="bg-white shadow-lg rounded-lg p-5 w-full h-[300px] md:h-[400px] md:col-span-3">
          <h2 className="text-lg font-semibold -mt-3 text-center">
            Upcoming Events
          </h2>

          <div className="w-full h-full">
            <Bar data={barData} options={barOptions} />
          </div>
        </div> */}
        <div className="bg-white shadow-lg rounded-lg p-5 w-full h-full md:h-full md:col-span-3">
          <h2 className="text-lg font-semibold -mt-3 text-center">
            Upcoming Events
          </h2>
          <hr className="mt-2" />

          <div className="w-full">
            <h3 className=" flex justify-between  font-semibold mt-3 mb-3">
              <div className=" flex justify-start">
                {monthName} {year}
              </div>
              <div className="flex gap-3 cursor-pointer">
                <FaAngleLeft
                  size={20}
                  onClick={goToPreviousMonth}
                  className="text-gray-400 bg-gray-100"
                />
                <FaAngleRight
                  size={20}
                  onClick={goToNextMonth}
                  className="text-gray-400 bg-gray-100"
                />
              </div>
            </h3>
            <div className="grid grid-cols-7 gap-2 text-sm text-gray-700">
              {days.map((day) => (
                <div key={day} className="text-center font-medium">
                  {day}
                </div>
              ))}
              {calendarCells}
            </div>
            <hr />
            <div onClick={() => navigate("/event")} className="cursor-pointer">
              <h1 className="text-center mt-5 text-gray-700">
                No upcoming Events
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mt-20 overflow-auto intro-y lg:overflow-visible md:mt-9">
          <h1 className="font-bold text-xl mb-4"> Members Details</h1>
          <table className="min-w-full bg-white border  shadow-md rounded-md">
            <thead>
              <tr className="bg-fuchsia-100 text-center">
                <th className="p-3 border-b">ID</th>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
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
                  <td className="border-b">{table.event}</td>
                  <td className="border-b">{table.status}</td>
                  <td className="border-b text-center">
                    <div className="flex items-center justify-center">
                      <AiTwotoneEye />
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
