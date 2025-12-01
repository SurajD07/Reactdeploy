// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Dialog, Transition } from "@headlessui/react";
// import { Calendar, Timer } from "lucide-react";
// import React, { Fragment } from "react";
// import { TbTimeDurationOff } from "react-icons/tb";

// const ScheduleEventModal = ({ isOpen, onClose }) => {
//   return (
//     <div>
//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-50" onClose={onClose}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 backdrop-blur-sm bg-black/30" />
//           </Transition.Child>

//           <div className="fixed inset-0 flex items-center justify-center p-4">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="relative w-full max-w-lg bg-white rounded-lg shadow-xl p-6 md:p-8 max-h-[70vh] lg:max-h-[90vh] overflow-y-auto">
//                 <button
//                   onClick={onClose}
//                   className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={2}
//                     stroke="currentColor"
//                     className="w-6 h-6"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>

//                 <Dialog.Title className="text-2xl font-semibold text-center mb-6">
//                   Schedule Event
//                 </Dialog.Title>

//                 <div>
//                   <label className="block text-gray-600 font-medium mb-1 ">
//                     Event Title
//                   </label>
//                   <Input
//                     type="text"
//                     placeholder="Enter your Event Name"
//                     className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500"
//                   />
//                 </div>
//                 <div className="flex gap-3 mt-4">
//                   <div>
//                     <label className="block text-gray-600 font-medium mb-1 ">
//                       Date
//                     </label>
//                     <div className="relative w-full">
//                       <Input
//                         type="text"
//                         className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-red-500"
//                         placeholder="Select date"
//                       />
//                       <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-gray-600 font-medium mb-1 ">
//                       Time
//                     </label>
//                     <div className="relative w-full">
//                       <Input
//                         type="text"
//                         className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-red-500"
//                         placeholder=""
//                       />
//                       <Timer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-gray-600 font-medium mb-1 ">
//                       Duration
//                     </label>
//                     <div className="relative w-full">
//                       <Input
//                         type="text"
//                         className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-red-500"
//                         placeholder=""
//                       />
//                       <TbTimeDurationOff className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col mt-4">
//                   <label className="text-gray-700 font-semibold mb-1">
//                     Host
//                   </label>
//                   <Input
//                     type="email"
//                     placeholder="Enter Host email id"
//                     className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500"
//                   />
//                 </div>
//                 <div className="flex flex-col mt-4">
//                   <label className="text-gray-700 font-semibold mb-1">
//                     Participants
//                   </label>
//                   <Input
//                     type="email"
//                     placeholder="Enter Participants email id"
//                     className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500"
//                   />
//                 </div>

//                 <div className="flex justify-end">
//                   <Button
//                     onClick={onClose}
//                     className="flex justify-end mt-5 me-3 bg-slate-300"
//                   >
//                     cancel
//                   </Button>
//                   <Button className="flex justify-end mt-5 bg-red-600">
//                     Schedule
//                   </Button>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     </div>
//   );
// };

// export default ScheduleEventModal;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, Transition } from "@headlessui/react";
import { Calendar, Timer } from "lucide-react";
import React, { Fragment, useState } from "react";
import { TbTimeDurationOff } from "react-icons/tb";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ScheduleEventModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    type: "",
    date: null,
    time: null,
    duration: "",
    host: "",
    participants: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.title) newErrors.title = "Event title is required";
    if (!form.type) newErrors.type = "Event type is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.time) newErrors.time = "Time is required";
    if (!form.duration) newErrors.duration = "Duration is required";
    if (!form.host) {
      newErrors.host = "Host email is required";
    } else if (!emailRegex.test(form.host)) {
      newErrors.host = "Invalid email address";
    }
    if (!form.participants) {
      newErrors.participants = "Participants email is required";
    } else if (!emailRegex.test(form.participants)) {
      newErrors.participants = "Invalid email address";
    }
    if (!form.meetingIdOrVenue) {
      newErrors.meetingIdOrVenue =
        form.type === "online"
          ? "Meeting ID is required"
          : "Venue details are required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Scheduled:", form);
      onClose();
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  return (
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
            <Dialog.Panel className="relative w-full max-w-lg bg-white rounded-lg shadow-xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
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

              <Dialog.Title className="text-2xl font-semibold text-center mb-6">
                Schedule Event
              </Dialog.Title>

              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-1">
                  Event Title
                </label>
                <Input
                  type="text"
                  placeholder="Enter your Event Name"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>
              <div className="mb-4">
                <div className="flex flex-col mt-4">
                  <label className="text-gray-700 font-semibold mb-1">
                    Event Type
                  </label>
                  <select
                    className="w-full px-4 py-2 mt-1 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={form.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                  {form.type === "online" && (
                    <div className="mt-4">
                      <label className="text-gray-700 font-semibold mb-1 block">
                        Meeting ID
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter Meeting ID"
                        value={form.meetingIdOrVenue}
                        onChange={(e) =>
                          handleChange("meetingIdOrVenue", e.target.value)
                        }
                      />
                      {errors.meetingIdOrVenue && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.meetingIdOrVenue}
                        </p>
                      )}
                    </div>
                  )}
                  {form.type === "offline" && (
                    <div className="mt-4">
                      <label className="text-gray-700 font-semibold mb-1 block">
                        Venue Details
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter Venue Details"
                        value={form.meetingIdOrVenue}
                        onChange={(e) =>
                          handleChange("meetingIdOrVenue", e.target.value)
                        }
                      />
                      {errors.meetingIdOrVenue && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.meetingIdOrVenue}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={form.date}
                      onChange={(date) => handleChange("date", date)}
                      className="w-full border border-gray-300 rounded-lg p-2 pl-10 focus:ring-2 focus:ring-red-500"
                      placeholderText="Select date"
                      dateFormat="MMM d, yyyy"
                      popperModifiers={[
                        {
                          name: "offset",
                          options: {
                            offset: [13, 6],
                          },
                        },
                      ]}
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Time
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={form.time}
                      onChange={(time) => handleChange("time", time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      className="w-full h-full border border-gray-300 rounded-lg p-2 pl-10 focus:ring-2 focus:ring-red-500"
                      placeholderText="Select time"
                    />
                    <Timer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Duration
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="e.g. 1h 30m"
                      value={form.duration}
                      onChange={(e) => handleChange("duration", e.target.value)}
                      className="pl-10"
                    />
                    <TbTimeDurationOff className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {errors.duration && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.duration}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-gray-700 font-semibold mb-1 block">
                  Host
                </label>
                <Input
                  type="email"
                  placeholder="Enter Host email id"
                  value={form.host}
                  onChange={(e) => handleChange("host", e.target.value)}
                />
                {errors.host && (
                  <p className="text-red-500 text-sm mt-1">{errors.host}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="text-gray-700 font-semibold mb-1 block">
                  Participants
                </label>
                <Input
                  type="email"
                  placeholder="Enter Participants email id"
                  value={form.participants}
                  onChange={(e) => handleChange("participants", e.target.value)}
                />
                {errors.participants && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.participants}
                  </p>
                )}
              </div>

              <div className="flex justify-end flex-wrap gap-3">
                <Button onClick={onClose} className="bg-slate-300">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-red-600 text-white"
                >
                  Schedule
                </Button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ScheduleEventModal;
