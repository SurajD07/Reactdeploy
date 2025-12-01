import React, { Fragment, useState } from "react";
import { BsFacebook, BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import { Dialog, Transition } from "@headlessui/react";
import { eventGetApi } from "@/api/admin/Event";
import { useQuery } from "@tanstack/react-query";
import { GrLocation } from "react-icons/gr";
import { convertToAmPm, formatDateNew } from "@/lib/utils";
const ShareEventModal = ({ isOpen, onClose, id, subTab }) => {
  const [copied, setCopied] = useState(false);

  const isOnline = subTab === "online";
  console.log(id);
  const eventGet = useQuery({
    queryKey: ["eventGET", id],
    queryFn: () => eventGetApi(`/${id}`),
  });

  console.log(eventGet);
  const event = eventGet?.data?.data?.result;

  const handleCopy = () => {
    if (event?.zohoDetails?.startLink) {
      navigator.clipboard
        .writeText(event.zohoDetails.startLink)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

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
              <Dialog.Panel className="relative h-full w-full max-w-sm bg-white rounded-lg shadow-xl max-h-fit  p-6 md:p-8 overflow-y-auto">
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

                {isOnline ? (
                  <>
                    <div className="text-center -mt-4 mb-7">
                      <p className="text-xl font-semibold">Share Event Link</p>
                    </div>
                    <div className="flex justify-center gap-6 mb-4 -mt-3">
                      <a
                        href="https://wa.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform cursor-pointer"
                      >
                        <BsWhatsapp className="w-7 h-7 text-green-600" />
                      </a>
                      <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform cursor-pointer"
                      >
                        <BsInstagram className="w-7 h-7 text-pink-600" />
                      </a>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform cursor-pointer"
                      >
                        <BsTwitter className="w-7 h-7 text-blue-500" />
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform cursor-pointer"
                      >
                        <BsFacebook className="w-7 h-7 text-blue-600" />
                      </a>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="link"
                        className="text-sm font-medium text-gray-700"
                      >
                        Copy Link
                      </label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="link"
                          type="text"
                          readOnly
                          value={event?.zohoDetails?.startLink}
                          className="flex-1"
                        />
                        {event && (
                          <div className="relative inline-block text-center">
                            {copied && (
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2  text-xs px-2 py-1 rounded shadow">
                                Copied!
                              </div>
                            )}
                            <button
                              onClick={handleCopy}
                              className="text-sm px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                              Copy
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {event && (
                      <div>
                        <div className="text-center -mt-4 mb-5">
                          <p className="text-xl font-semibold">
                            Share Event Location
                          </p>
                        </div>

                        <div className="flex justify-center gap-6">
                          <a
                            href="https://maps.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform cursor-pointer"
                          >
                            <BsFacebook className="w-7 h-7 text-blue-700 " />
                          </a>
                          <a
                            href="https://wa.me/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform cursor-pointer"
                          >
                            <BsWhatsapp className="w-7 h-7 text-green-600" />
                          </a>
                          <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform cursor-pointer"
                          >
                            <BsInstagram className="w-7 h-7 text-pink-600" />
                          </a>
                          <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform cursor-pointer"
                          >
                            <BsTwitter className="w-7 h-7 text-blue-500" />
                          </a>
                        </div>

                        <div className=" flex mt-4">
                          <p className="text-sm text-gray-500">
                            Location:
                            <span className="ml-2 text-bold text-black">
                              {event.location}
                            </span>{" "}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600  mt-1 flex">
                            <span>Date:</span>
                            <span className="ml-2 text-black">
                              {formatDateNew(new Date(event.date))}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600  flex mt-1">
                            <span>Time:</span>
                            <span className="ml-2 text-black">
                              {convertToAmPm(event.fromTime)} -{" "}
                              {convertToAmPm(event.toTime)}
                            </span>
                          </p>
                        </div>

                        <div className="text-center flex justify-center mt-4 ">
                          <a
                            href="https://maps.google.com/?q=Pollachi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition cursor-pointer"
                          >
                            <GrLocation />
                            View in Maps
                          </a>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ShareEventModal;
