import { useRef, useState } from "react";
import { IoMdAdd, IoMdCalendar } from "react-icons/io";
import { TbCalendarCancel, TbCancel, TbFilterSearch } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { data, useNavigate } from "react-router-dom";
import { FaCalendarDays, FaLocationPin, FaMeetup } from "react-icons/fa6";
import ScheduleEventModal from "./ScheduleEventModal";
import { Search, Share2 } from "lucide-react";
import ShareEventModal from "./ShareEventModal";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { eventGetApi } from "@/api/admin/Event";
import { convertToAmPm, formatDateNew } from "@/lib/utils";
import event from "../../../../assets/Images/noevents.svg";
import { SiGooglemeet } from "react-icons/si";
import EventViewModal from "./EventViewModal";

const Tab = ({ label, isActive, onClick }) => (
  <p
    className={`px-2 py-1 rounded-lg transition-colors ${
      isActive
        ? "bg-red-600 text-white cursor-default font-semibold"
        : "text-gray-800 hover:bg-gray-300 cursor-pointer"
    }`}
    onClick={onClick}
  >
    {label}
  </p>
);

const SubTab = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium transition-all duration-200
    ${
      isActive
        ? "bg-white text-red-600 text-lg"
        : "border-transparent text-gray-500 hover:text-gray-700 "
    }
  `}
  >
    {label}
  </button>
);

// const dummyEvents = [
//   {
//     id: 1,
//     name: "About Sivan",
//     type: "Offline",
//     status: "Paid",
//     date: "12/5/2025",
//     time: "12:00 PM",
//     address: "vijayamangalam tollgate",
//     Host: "Siva Sathish",
//     strength: "100+ members",
//     timing: "2 hours",
//     title: "Devtional",
//   },
//   {
//     id: 2,
//     name: "Virtual Tech Talk",
//     type: "Online",
//     status: "Free",
//     date: "13/5/2025",
//     time: "2:00 PM",
//     address: "Online Event (Zoho meet)",
//     Host: "Solomon Pappaiah",
//     strength: "100+ members",
//     link: "https://meet.zoho.in/oYtE-0xl-uKQ",
//   },
//   {
//     id: 3,
//     name: "AI Seminar",
//     type: "Offline",
//     status: "Paid",
//     date: "14/5/2025",
//     time: "3:00 PM",
//     address: "IISc Bangalore",
//     Host: "Nellai Kannan",
//     strength: "20+ members",
//   },
//   {
//     id: 4,
//     name: "AI Seminar",
//     type: "Offline",
//     status: "Paid",
//     date: "14/5/2025",
//     time: "3:00 PM",
//     address: "IISc Bangalore",
//     Host: "Nellai Kannan",
//     strength: "20+ members",
//   },
//   {
//     id: 5,
//     name: "AI Seminar",
//     type: "Offline",
//     status: "Paid",
//     date: "14/5/2025",
//     time: "3:00 PM",
//     address: "IISc Bangalore",
//     Host: "Nellai Kannan",
//     strength: "20+ members",
//   },
//   {
//     id: 6,
//     name: "AI Seminar",
//     type: "Offline",
//     status: "Paid",
//     date: "14/5/2025",
//     time: "3:00 PM",
//     address: "IISc Bangalore",
//     Host: "Nellai Kannan",
//     strength: "20+ members",
//   },
// ];

const AdminEvent = () => {
  const [activeTab, setActiveTab] = useState("today");
  const [subTab, setSubTab] = useState("offline");
  const [openModal, setOpenModal] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [eventview, setEventView] = useState(false);
  const [eventid, setEventId] = useState("");
  const navigate = useNavigate();

  console.log(eventid);
  const dummyEvents1 = useQuery({
    queryKey: ["dummyEvents1", activeTab, subTab],
    queryFn: () =>
      eventGetApi(`?completeStatus=${activeTab}&event_type=${subTab}`),
  });

  const filteredEvents = dummyEvents1?.data?.data?.result?.rows?.filter(
    (event) => event.event_type === subTab
  );
  console.log(dummyEvents1);

  const handleCloseShareModal = (tab) => {
    setShowPopup(false);
  };
  const handleCloseEventModal = (tab) => {
    setEventView(false);
  };

  const handleJoinClick = (event) => {
    console.log(event);
    // const links = filteredEvents.map((event) => event?.zohoDetails?.startLink);
    // console.log(links);
    setIframeUrl(event);
  };

  const closeIframe = () => {
    setIframeUrl("");
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold">
          Your <span className="text-red-700">Events!</span>
        </h1>
        <div className="flex justify-end items-center gap-2">
          <Button
            onClick={() => navigate("/event/createevent")}
            className="flex items-center gap-2"
          >
            <IoMdAdd /> Create Event
          </Button>
          {/* <Button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2"
          >
            <IoMdCalendar /> Schedule Event
          </Button> */}
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center mt-5 gap-4">
        <div className="flex flex-wrap gap-3 w-full md:w-auto justify-start md:justify-normal">
          <Tab
            label="Today's Events"
            isActive={activeTab === "today"}
            onClick={() => setActiveTab("today")}
          />
          <Tab
            label="Upcoming"
            isActive={activeTab === "upcoming"}
            onClick={() => setActiveTab("upcoming")}
          />
          <Tab
            label="Completed"
            isActive={activeTab === "completed"}
            onClick={() => setActiveTab("completed")}
          />
          <Tab
            label="Cancelled"
            isActive={activeTab === "cancelled"}
            onClick={() => setActiveTab("cancelled")}
          />
        </div>
      </div>

      <div className="mt-6  flex flex-col-reverse md:flex-row justify-between items-start md:items-center  border-gray-200">
        <div>
          <SubTab
            label="Offline"
            isActive={subTab === "offline"}
            onClick={() => setSubTab("offline")}
          />
          <SubTab
            label="Online"
            isActive={subTab === "online"}
            onClick={() => setSubTab("online")}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto md:justify-end">
          <div className="flex flex-col w-full max-w-sm">
            <div className="flex items-center space-x-2">
              <Search
                className="text-gray-500 cursor-pointer hidden sm:block"
                onClick={() => setOpen(true)}
              />

              <input
                type="search"
                placeholder="Search..."
                className={`bg-transparent outline-none border-none transition-all duration-500 ease-in-out transform
                w-full opacity-100 ml-2
                 sm:${open ? "w-full opacity-100 ml-2" : "w-0 opacity-0"}
                `}
                onBlur={() => setOpen(false)}
              />
            </div>

            <div className="h-0.5 w-full bg-gray-300 relative overflow-hidden mt-1">
              <div
                className={`h-full bg-red-500 transition-all duration-500 ease-out 
        w-full
        sm:${open ? "w-full" : "w-0"}
      `}
              ></div>
            </div>
          </div>

          <div className="flex gap-3 w-full sm:w-auto justify-between">
            <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1 min-w-[120px]">
              <TbFilterSearch size={20} className="text-gray-600" />
              <select className="outline-none bg-transparent text-gray-700 w-full">
                <option>Filter</option>
                <option value="paid">Paid</option>
                <option value="free">Free</option>
              </select>
            </div>

            <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1 min-w-[120px]">
              <TbFilterSearch size={20} className="text-gray-600" />
              <select className="outline-none bg-transparent text-gray-700 w-full">
                <option>Sortby</option>
                <option value="new">Latest </option>
                <option value="old">Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "today" && (
          <div className="col-span-3 bg-white h-[64vh] rounded-lg p-4 overflow-y-scroll hide-scrollbar -mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredEvents?.length > 0 ? (
                filteredEvents.map((event) => (
                  <div
                    key={event._id}
                    className="relative rounded-3xl overflow-hidden shadow-xl"
                  >
                    <div className="relative h-[50vh]">
                      <img
                        src="https://ieeeupconferences.com/img/3speaker.jpg"
                        alt="Event Background"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 flex justify-between w-full">
                        <div
                          className={`${
                            event.joiningFeeRequired
                              ? "bg-red-500"
                              : "bg-green-500"
                          } text-white text-xs px-3 py-1 rounded-full font-semibold shadow`}
                        >
                          <p>{event.joiningFeeRequired ? "Paid" : "Free"}</p>
                        </div>

                        <div className="flex">
                          <Share2
                            className="text-white me-8 cursor-pointer"
                            onClick={() => {
                              setShowPopup(true), setEventId(event._id);
                            }}
                          />
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                        <div className="bg-white rounded-2xl p-4 shadow-lg">
                          <h2 className="text-lg font-bold text-gray-900">
                            {event.name}
                          </h2>
                          <p className="text-sm text-gray-500 mb-2 -mt-1">
                            {event.host}
                          </p>

                          <div className="text-sm text-gray-700 flex flex-wrap items-center gap-2 mb-1">
                            <FaCalendarDays />{" "}
                            <span>{formatDateNew(new Date(event.date))}</span>
                            <span>
                              {convertToAmPm(event.fromTime)} -{" "}
                              {convertToAmPm(event.toTime)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-700 flex flex-wrap items-center gap-2 mb-2">
                            {subTab === "offline" ? (
                              <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                                  event.location
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:underline"
                              >
                                <FaLocationPin />
                                <span>{event.location || "-"}</span>
                              </a>
                            ) : (
                              <div className="flex items-center gap-2 text-gray-700">
                                <span>
                                  <SiGooglemeet />
                                </span>
                                <span>Zoho Meeting (online)</span>
                              </div>
                            )}
                          </div>

                          <div className="mt-4 flex justify-between items-center flex-wrap gap-2">
                            <div className="flex -space-x-2">
                              <img
                                className="w-6 h-6 rounded-full border-2 border-white"
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt=""
                              />
                              <img
                                className="w-6 h-6 rounded-full border-2 border-white"
                                src="https://randomuser.me/api/portraits/women/44.jpg"
                                alt=""
                              />
                              <img
                                className="w-6 h-6 rounded-full border-2 border-white"
                                src="https://randomuser.me/api/portraits/men/85.jpg"
                                alt=""
                              />
                              <span className="text-sm text-gray-500 ml-2">
                                {event.strength}
                              </span>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                              <Button
                                // onClick={() =>
                                //   navigate("/event/eventdetails", {
                                //     state: {
                                //       subTab: subTab,
                                //       event: event?._id,
                                //     },
                                //   })
                                // }
                                onClick={() => {
                                  setEventView(true), setEventId(event._id);
                                }}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                View
                              </Button>
                              {subTab === "online" && (
                                <Button
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => {
                                    handleJoinClick(
                                      event?.zohoDetails?.startLink
                                    );
                                    window.open(
                                      event?.zohoDetails?.startLink,
                                      "_blank"
                                    );
                                  }}
                                >
                                  Join
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className=" w-full items-center ">
                  <div className="flex justify-center">
                    <img src={event} alt="Success" className="mx-auto " />
                  </div>
                  <div>
                    <p className="text-lg text-gray-600">No events Today.</p>
                  </div>
                </div>
              )}
            </div>

            {/* {iframeUrl && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col">
                <div className="flex justify-end p-4">
                  <button
                    onClick={closeIframe}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-9 h-9 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <main>
                  <iframe
                    src={iframeUrl}
                    className="flex-1 w-full h-screen"
                    allow="camera; microphone; fullscreen; display-capture"
                    allowFullScreen
                  />
                </main>
              </div>
            )} */}
          </div>
        )}
        {activeTab === "upcoming" && (
          <div className="col-span-3 bg-white h-[64vh] rounded-lg p-4 overflow-y-scroll hide-scrollbar -mt-6">
            {filteredEvents?.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredEvents.map((event) => (
                    <div
                      key={event._id}
                      className="relative rounded-3xl overflow-hidden shadow-xl"
                    >
                      <div className="relative h-[50vh]">
                        <img
                          src="https://ieeeupconferences.com/img/3speaker.jpg"
                          alt="Event Background"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 flex justify-between w-full">
                          <div
                            className={`${
                              event.joiningFeeRequired
                                ? "bg-red-500"
                                : "bg-green-500"
                            } text-white text-xs px-3 py-1 rounded-full font-semibold shadow`}
                          >
                            <p>{event.joiningFeeRequired ? "Paid" : "Free"}</p>
                          </div>
                          <div className="flex">
                            <Share2 color="white" className="me-8" />
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                          <div className="bg-white rounded-2xl p-4 shadow-lg">
                            <h2 className="text-lg font-bold text-gray-900">
                              {event.name}
                            </h2>
                            <p className="text-sm text-gray-500 mb-2">
                              {event.host}
                            </p>

                            <div className="text-sm text-gray-700 flex flex-wrap items-center gap-2 mb-1">
                              <FaCalendarDays />{" "}
                              <span>{formatDateNew(new Date(event.date))}</span>
                              <span>
                                {convertToAmPm(event.fromTime)} -{" "}
                                {convertToAmPm(event.toTime)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-700 flex flex-wrap items-center gap-2 mb-2">
                              {subTab === "Offline" && event.location ? (
                                <a
                                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                                    event.location
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 hover:underline"
                                >
                                  <FaLocationPin />
                                  <span>{event.location}</span>
                                </a>
                              ) : (
                                <div className="flex items-center gap-2 text-gray-700">
                                  <FaLocationPin />
                                  <span>{event.location}</span>
                                </div>
                              )}
                            </div>

                            <div className="mt-4 flex justify-between items-center flex-wrap gap-2">
                              <div className="flex -space-x-2">
                                <img
                                  className="w-6 h-6 rounded-full border-2 border-white"
                                  src="https://randomuser.me/api/portraits/men/32.jpg"
                                  alt=""
                                />
                                <img
                                  className="w-6 h-6 rounded-full border-2 border-white"
                                  src="https://randomuser.me/api/portraits/women/44.jpg"
                                  alt=""
                                />
                                <img
                                  className="w-6 h-6 rounded-full border-2 border-white"
                                  src="https://randomuser.me/api/portraits/men/85.jpg"
                                  alt=""
                                />
                                <span className="text-sm text-gray-500 ml-2">
                                  {event.strength}
                                </span>
                              </div>
                              <div className="flex gap-2 flex-wrap justify-end">
                                <Button
                                  // onClick={() =>
                                  //   navigate("/event/eventdetails", {
                                  //     state: { subTab, event },
                                  //   })
                                  // }
                                  onClick={() => {
                                    setEventView(true), setEventId(event._id);
                                  }}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  View
                                </Button>
                                {subTab === "online" && (
                                  <Button
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() =>
                                      handleJoinClick(
                                        event?.zohoDetails?.startLink
                                      )
                                    }
                                  >
                                    Join
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end mt-3 gap-2">
                            <Button className="bg-white text-black">
                              Cancel
                            </Button>
                            <Button className="bg-white text-black">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center align-center">
                <img src={event} alt="Success" className="h-[50dvh] mx-auto" />
                <p className="text-lg text-gray-600 text-center">
                  No upcoming events!
                </p>
              </div>
            )}

            {iframeUrl && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col">
                <div className="flex justify-end p-4">
                  <button
                    onClick={closeIframe}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-9 h-9 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <main>
                  <iframe
                    src={iframeUrl}
                    className="flex-1 w-full h-screen"
                    allow="camera; microphone; fullscreen; display-capture"
                    allowFullScreen
                  />
                </main>
              </div>
            )}
          </div>
        )}
        {activeTab === "completed" && (
          <div className="col-span-3 bg-white h-[64vh] rounded-lg p-4 overflow-y-scroll hide-scrollbar -mt-6">
            {filteredEvents?.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredEvents.map((event) => (
                    <div
                      key={event._id}
                      className="relative rounded-3xl overflow-hidden shadow-xl"
                    >
                      <div className="relative h-[50vh]">
                        <img
                          src="https://ieeeupconferences.com/img/3speaker.jpg"
                          alt="Event Background"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 flex justify-between w-full">
                          <div
                            className={`${
                              event.joiningFeeRequired
                                ? "bg-red-500"
                                : "bg-green-500"
                            } text-white text-xs px-3 py-1 rounded-full font-semibold shadow`}
                          >
                            <p>{event.joiningFeeRequired ? "Paid" : "Free"}</p>
                          </div>
                          <div className="flex">
                            <Share2 color="white" className="me-8" />
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                          <div className="bg-white rounded-2xl p-4 shadow-lg">
                            <h2 className="text-lg font-bold text-gray-900">
                              {event.name}
                            </h2>
                            <p className="text-sm text-gray-500 mb-2">
                              {event.host}
                            </p>

                            <div className="text-sm text-gray-700 flex flex-wrap items-center gap-2 mb-1">
                              <FaCalendarDays /> <span>{event.date}</span> -
                              <span>{event.time}</span> -
                            </div>
                            <div className="text-sm text-gray-700 flex flex-wrap items-center gap-2 mb-2">
                              {subTab === "Offline" && event.location ? (
                                <a
                                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                                    event.location
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 hover:underline"
                                >
                                  <FaLocationPin />
                                  <span>{event.location}</span>
                                </a>
                              ) : (
                                <div className="flex items-center gap-2 text-gray-700">
                                  <FaLocationPin />
                                  <span>{event.location}</span>
                                </div>
                              )}
                            </div>

                            <div className="mt-4 flex justify-between items-center flex-wrap gap-2">
                              <div className="flex -space-x-2">
                                <img
                                  className="w-6 h-6 rounded-full border-2 border-white"
                                  src="https://randomuser.me/api/portraits/men/32.jpg"
                                  alt=""
                                />
                                <img
                                  className="w-6 h-6 rounded-full border-2 border-white"
                                  src="https://randomuser.me/api/portraits/women/44.jpg"
                                  alt=""
                                />
                                <img
                                  className="w-6 h-6 rounded-full border-2 border-white"
                                  src="https://randomuser.me/api/portraits/men/85.jpg"
                                  alt=""
                                />
                                <span className="text-sm text-gray-500 ml-2">
                                  {event.strength}
                                </span>
                              </div>
                              <div className="flex gap-2 flex-wrap justify-end">
                                <Button
                                  onClick={() =>
                                    navigate("/event/eventdetails", {
                                      state: { subTab, event },
                                    })
                                  }
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  View
                                </Button>
                                {subTab === "online" && (
                                  <Button
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleJoinClick(event.link)}
                                  >
                                    Join
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center align-center">
                <img src={event} alt="Success" className="h-[50dvh] mx-auto" />
                <p className="text-lg text-gray-600 text-center">
                  You haven’t completed any events yet!
                </p>
              </div>
            )}

            {iframeUrl && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col">
                <div className="flex justify-end p-4">
                  <button
                    onClick={closeIframe}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-9 h-9 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <main>
                  <iframe
                    src={iframeUrl}
                    className="flex-1 w-full h-screen"
                    allow="camera; microphone; fullscreen; display-capture"
                    allowFullScreen
                  />
                </main>
              </div>
            )}
          </div>
        )}
        {activeTab === "cancelled" && (
          <div className="col-span-3 bg-white h-[64vh] rounded-lg p-4 overflow-y-scroll hide-scrollbar -mt-6">
            {filteredEvents?.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredEvents.map((event) => (
                    <div
                      key={event._id}
                      className="relative rounded-3xl overflow-hidden shadow-xl"
                    >
                      <div className="relative h-[50vh]">
                        <img
                          src="https://ieeeupconferences.com/img/3speaker.jpg"
                          alt="Event Background"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 flex justify-between w-full">
                          <div
                            className={`${
                              event.joiningFeeRequired
                                ? "bg-red-500"
                                : "bg-green-500"
                            } text-white text-xs px-3 py-1 rounded-full font-semibold shadow`}
                          >
                            <p>{event.joiningFeeRequired ? "Paid" : "Free"}</p>
                          </div>
                          <div className="flex">
                            <Share2 color="white" className="me-8" />
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                          <div className="bg-white rounded-2xl p-4 shadow-lg">
                            <h2 className="text-lg font-bold text-gray-900">
                              {event.name}
                            </h2>
                            <p className="text-sm text-gray-500 mb-2">
                              {event.host}
                            </p>

                            <div className="text-sm text-gray-700 flex flex-wrap items-center gap-2 mb-1">
                              <FaCalendarDays />{" "}
                              <span>{formatDateNew(new Date(event.date))}</span>
                              <span>
                                {convertToAmPm(event.fromTime)} -{" "}
                                {convertToAmPm(event.toTime)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-700 flex flex-wrap items-center gap-2 mb-2">
                              {subTab === "Offline" && event.location ? (
                                <a
                                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                                    event.location
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 hover:underline"
                                >
                                  <FaLocationPin />
                                  <span>{event.location}</span>
                                </a>
                              ) : (
                                <div className="flex items-center gap-2 text-gray-700">
                                  <FaLocationPin />
                                  <span>{event.location}</span>
                                </div>
                              )}
                            </div>

                            <div className="mt-4 flex justify-between items-center flex-wrap gap-2">
                              <div className="flex -space-x-2">
                                <img
                                  className="w-6 h-6 rounded-full border-2 border-white"
                                  src="https://randomuser.me/api/portraits/men/32.jpg"
                                  alt=""
                                />
                                <img
                                  className="w-6 h-6 rounded-full border-2 border-white"
                                  src="https://randomuser.me/api/portraits/women/44.jpg"
                                  alt=""
                                />
                                <img
                                  className="w-6 h-6 rounded-full border-2 border-white"
                                  src="https://randomuser.me/api/portraits/men/85.jpg"
                                  alt=""
                                />
                                <span className="text-sm text-gray-500 ml-2">
                                  {event.strength}
                                </span>
                              </div>
                              <div className="flex gap-2 flex-wrap justify-end">
                                <Button
                                  // onClick={() =>
                                  //   navigate("/event/eventdetails", {
                                  //     state: { subTab, event },
                                  //   })
                                  // }
                                  onClick={() => {
                                    setEventView(true), setEventId(event._id);
                                  }}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  View
                                </Button>
                                {subTab === "online" && (
                                  <Button
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() =>
                                      handleJoinClick(
                                        event?.zohoDetails?.startLink
                                      )
                                    }
                                  >
                                    Join
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center align-center">
                <img src={event} alt="Success" className="h-[50dvh] mx-auto" />
                <p className="text-lg text-gray-600 text-center">
                  Well done! You haven't canceled any events yet.{" "}
                </p>
              </div>
            )}

            {iframeUrl && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col">
                <div className="flex justify-end p-4">
                  <button
                    onClick={closeIframe}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <main>
                  <iframe
                    src={iframeUrl}
                    className="flex-1 w-full h-screen"
                    allow="camera; microphone; fullscreen; display-capture"
                    allowFullScreen
                  />
                </main>
              </div>
            )}
          </div>
        )}
      </div>
      <ScheduleEventModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
      <ShareEventModal
        isOpen={showPopup}
        onClose={handleCloseShareModal}
        subTab={subTab}
        id={eventid}
      />
      <EventViewModal
        isOpen={eventview}
        onClose={handleCloseEventModal}
        subTab={subTab}
        id={eventid}
      />
    </div>
  );
};

export default AdminEvent;
