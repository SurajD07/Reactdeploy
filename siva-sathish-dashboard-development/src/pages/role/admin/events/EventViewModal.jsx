import { eventGetApi } from "@/api/admin/Event";
import { convertToAmPm, formatDateNew, formateMinsToHrs } from "@/lib/utils";
import { Button, Dialog, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import React, { Fragment } from "react";

const EventViewModal = ({ isOpen, onClose, id, subTab }) => {
  console.log(id);
  const eventGet = useQuery({
    queryKey: ["eventGET", id],
    queryFn: () => eventGetApi(`/${id}`),
  });

  console.log(eventGet);
  const event = eventGet?.data?.data?.result;
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-sm bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-5xl bg-white rounded-xl shadow-xl p-6 md:p-8 overflow-y-auto">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div>
                  {event && (
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white">
                      <div className="flex justify-between items-center w-full mb-6 -mt-10 ">
                        <div>
                          <p className="text-gray-900 text-xl font-semibold bg-green-300 px-4 py-1 rounded-2xl">
                            {event.event_type}
                          </p>
                        </div>

                        <div className="absolute left-1/2 transform -translate-x-1/2">
                          <h1 className="text-4xl font-bold text-gray-800 text-center">
                            Event Details
                          </h1>
                        </div>
                      </div>

                      <div className="space-y-8 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-base sm:text-lg">
                          {[
                            { label: "Event Name", value: event.name },
                            { label: "Host", value: event.host },
                            {
                              label: "Date",
                              value: formatDateNew(new Date(event.date)),
                            },
                            {
                              label: "Time",
                              value: `${convertToAmPm(
                                event.fromTime
                              )} - ${convertToAmPm(event.toTime)}`,
                            },
                            {
                              label: "Duration",
                              value: formateMinsToHrs(event.duration),
                            },
                            {
                              label: "Created On",
                              value: formatDateNew(new Date(event.createdAt)),
                            },

                            {
                              label: "Meeting Details",
                              value: (
                                <>
                                  <div>
                                    <span className="font-thin">
                                      Meeting Key:
                                    </span>
                                    {event?.zohoDetails?.meetingKey || "-"}
                                  </div>
                                  <div>
                                    <span className="font-thin">Password:</span>{" "}
                                    {event?.zohoDetails?.pwd || "-"}
                                  </div>
                                </>
                              ),
                            },

                            {
                              label: "Event Status",
                              value: event.joiningFeeRequired ? "paid" : "Free",
                            },
                            {
                              label: "Event payment",
                              value: event.joiningFeeAmount,
                            },
                          ].map(({ label, value }) => (
                            <div key={label}>
                              <p className="text-gray-500 font-medium mb-1">
                                {label}
                              </p>
                              <p className="text-gray-900 text-lg font-semibold">
                                {value}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between gap-6">
                          <div className="sm:w-1/2">
                            <p className="text-gray-500 font-medium mb-1">
                              Meeting Details
                            </p>
                            {subTab === "online" ? (
                              <>
                                <p className="text-gray-900 text-base sm:text-lg font-medium">
                                  Meeting ID
                                </p>
                                <a
                                  href={event?.zohoDetails?.startLink || "#"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-700 text-sm sm:text-base underline hover:text-blue-600"
                                >
                                  {event?.zohoDetails?.startLink || "-"}
                                </a>
                              </>
                            ) : (
                              <>
                                <p className="text-gray-900 text-base sm:text-lg font-medium">
                                  Location
                                </p>
                                <p className="text-gray-700 text-sm sm:text-base">
                                  {event?.location || "-"}
                                </p>
                              </>
                            )}
                          </div>

                          <div className="sm:w-1/2">
                            <p className="text-gray-500 font-medium mb-1">
                              Co-host
                            </p>
                            {event.participants?.length > 0 ? (
                              <div className="max-h-40 overflow-y-auto space-y-2">
                                {event.participants.map((participant) => (
                                  <div
                                    key={participant._id}
                                    className=" text-gray-800 text-sm sm:text-base"
                                  >
                                    {participant.email}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-700 italic">
                                No participants added yet.
                              </p>
                            )}
                          </div>

                          <div className="sm:w-1/2">
                            <p className="text-gray-500 font-medium mb-1">
                              Description
                            </p>
                            <p className="text-gray-900 text-base sm:text-lg">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={onClose}
                    className="bg-red-700 text-white p-1 px-2 rounded-md -mt-5"
                  >
                    Done
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default EventViewModal;
