import { Button } from "@/components/ui/button";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import img from "../../../../assets/Images/Events-pana.svg";
import { useNavigate } from "react-router-dom";
import { convertToAmPm, formatDateNew } from "@/lib/utils";

const EventCreateSuccessModal = ({ isOpen, createResponce }) => {
  const navigate = useNavigate();
  // console.log(createResponce?.data?.result);
  // const event = createResponce?.data?.result;
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => {}}>
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
              <Dialog.Panel className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 md:p-8 overflow-y-auto">
                <img src={img} alt="Success" className="mx-auto " />

                <div className="text-center -mt-2 mb-6">
                  <h1 className="text-2xl font-bold  text-green-600">
                    Event Created Successfully
                  </h1>
                  <p className="text-gray-500 mt-1">
                    You can see your event details in event list
                  </p>
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-sm  p-3 rounded-md bg-green-50 shadow-xl hover:bg-green-100">
                  <div className="flex ">
                    <span className="font-medium">Title:</span>
                    <span className="ms-2">{event?.name}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium">Date:</span>
                    <span className="ms-2">
                      <span>{formatDateNew(new Date(event?.date))}</span>
                    </span>
                  </div>
                  <div className="flex ">
                    <span className="font-medium">Time:</span>
                    <span className="ms-2">
                      {convertToAmPm(event?.fromTime)} -{" "}
                      {convertToAmPm(event?.toTime)}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-medium">Location:</span>
                    <span className="ms-2">{event?.location || "-"}</span>
                  </div>
                </div> */}

                <div className="flex justify-end mt-6 ">
                  <Button
                    onClick={() => navigate("/event")}
                    className="bg-green-950"
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

export default EventCreateSuccessModal;
