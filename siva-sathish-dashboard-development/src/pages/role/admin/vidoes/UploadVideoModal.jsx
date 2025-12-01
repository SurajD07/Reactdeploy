// import { Dialog, Transition } from "@headlessui/react";
// import React, { Fragment } from "react";
// import ReactModal from "react-modal";

// const UploadVideoModal = ({ uploadvideos }) => {
//   return (
//     <div>
//       <Transition appear show={open} as={Fragment} onClose={onClose}>
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
//             <div className="fixed inset-0 backdrop-blur-sm" />
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
//               <Dialog.Panel className="relative w-full max-w-2xl md:max-w-2xl bg-white rounded-lg shadow-xl p-6 md:p-8 sm:max-w-sm sm:p-4 max-h-[70vh] lg:max-h-[90vh] overflow-y-auto">
//                 {/* <button
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
//                 </button> */}

//                 <Dialog.Title className="lg:text-3xl sm:text-2xl font-semibold text-red-700 text-center p-4">
//                   Register for the Event
//                 </Dialog.Title>
//                 <Dialog.Title className="font-semibold text-black text-center">
//                   Join us for an exclusive event with Siva Sathish Kumar.
//                 </Dialog.Title>

//                 <div className="mt-4">
//                   <form className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="flex flex-col">
//                         <label className="text-gray-700 font-semibold mb-1">
//                           First Name
//                         </label>
//                         <input
//                           type="text"
//                           placeholder="First Name"
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
//                         />
//                       </div>

//                       <div className="flex flex-col">
//                         <label className="text-gray-700 font-semibold mb-1">
//                           Last Name
//                         </label>
//                         <input
//                           type="text"
//                           placeholder="Last Name"
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                       <div className="flex flex-col">
//                         <label className="text-gray-700 font-semibold mb-1">
//                           Mobile Number
//                         </label>
//                         <input
//                           type="number"
//                           placeholder="Mobile number"
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
//                         />
//                       </div>

//                       <div className="flex flex-col">
//                         <label className="text-gray-700 font-semibold mb-1">
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           placeholder="Enter your email Id"
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
//                         />
//                       </div>
//                     </div>

//                     <div className="flex flex-col">
//                       <label className="text-gray-700 font-semibold mb-1">
//                         Location
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="Enter Event Location"
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
//                       />
//                     </div>

//                     <div className="flex flex-col">
//                       <label className="text-gray-700 font-semibold mb-1">
//                         Select Event Type
//                       </label>
//                       <select className="w-full px-4 py-2 mt-1 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
//                         <option value="">Select Event</option>
//                         <option value="evolution">
//                           The Evolution of Tamil Language
//                         </option>
//                         <option value="book-launch">
//                           Book Launch: Mastering Tamil in 30 Days
//                         </option>
//                         <option value="podcast">
//                           Podcast Debut: “Tamil Talks”
//                         </option>
//                       </select>
//                     </div>

//                     <button
//                       type="submit"
//                       className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
//                     >
//                       Register
//                     </button>
//                   </form>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     </div>
//   );
// };

// export default UploadVideoModal;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const EventRegistrationModal = ({ isOpen, onClose }) => {
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
            <Dialog.Panel className="relative w-full max-w-lg bg-white rounded-lg shadow-xl p-6 md:p-8 max-h-[70vh] lg:max-h-[90vh] overflow-y-auto">
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
                Upload Video
              </Dialog.Title>

              <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center">
                <label className="block text-gray-600 font-medium mb-2">
                  Select a video file to upload
                </label>
                <Input
                  type="file"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-gray-700 font-semibold mb-1">
                  Select Catagory
                </label>
                <select className="w-full px-4 py-2 mt-1 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option value="">Select Event</option>
                  <option value="youtube">YouTube</option>
                  <option value="general">General</option>
                </select>
              </div>

              {/* <button className="absolute bottom-4 right-4 bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 mt-6 ">
                Upload
              </button> */}
              <div className="flex justify-end">
                <Button
                  onClick={onClose}
                  className="flex justify-end mt-5 me-3 bg-slate-300"
                >
                  cancel
                </Button>
                <Button className="flex justify-end mt-5 bg-red-600">
                  Upload
                </Button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EventRegistrationModal;
