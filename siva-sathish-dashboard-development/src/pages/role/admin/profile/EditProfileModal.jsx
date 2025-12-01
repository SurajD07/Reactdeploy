import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";

const EditProfileModal = ({ isOpen, onClose, getProfile }) => {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    if (isOpen && getProfile) {
      const firstName = getProfile?.data?.data?.result?.firstName || "-";
      const lastName = getProfile?.data?.data?.result?.lastName || "-";
      setForm({
        name: `${firstName} ${lastName}`,
        email: getProfile?.data?.data?.result?.email || "-",
        mobile: getProfile?.data?.data?.result?.mobile || "-",
        dob: getProfile?.data?.data?.result?.dob || "-",
      });
    }
  }, [isOpen, getProfile]);

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

                <Dialog.Title className="text-2xl font-semibold text-center mb-3">
                  Edit Profile
                </Dialog.Title>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    value={form.name}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500"
                    placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 mt-4">
                    Date Of Birth
                  </label>
                  <Input
                    type="text"
                    value={form.dob}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500"
                    placeholder="Date Of Birth"
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  />
                </div>

                <div className="flex flex-col mt-4">
                  <label className="text-gray-700 font-semibold mb-1">
                    Email
                  </label>
                  <Input
                    type="text"
                    value={form.email}
                    placeholder=" email Id"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-2 mt-3">
                    Mobile Number
                  </label>
                  <Input
                    type="number"
                    value={form.mobile}
                    placeholder="Mobile number"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500"
                    onChange={(e) =>
                      setForm({ ...form, mobile: e.target.value })
                    }
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={onClose}
                    className="flex justify-end mt-5 me-3 bg-slate-300"
                  >
                    cancel
                  </Button>
                  <Button className="flex justify-end mt-5 bg-red-600">
                    Update
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

export default EditProfileModal;
