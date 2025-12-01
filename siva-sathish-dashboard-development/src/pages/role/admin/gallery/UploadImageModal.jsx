import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const UploadImageModal = ({ isOpen, onClose }) => {
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
              <Dialog.Panel className="relative w-full max-w-xl bg-white rounded-lg shadow-xl p-6 md:p-8  overflow-y-auto">
                <Dialog.Title className="text-xl font-semibold text-center mb-6">
                  Upload Image
                </Dialog.Title>
                <div className="">
                  <label className="text-gray-700 font-semibold">
                    Select Image
                  </label>
                  <Input
                    type="file"
                    placeholder="Upload Image"
                    className="mb-4"
                  />
                  <div className="flex justify-center gap-3">
                    <Button onClick={onClose} className="">
                      Cancel
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700   text-white">
                      Upload
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default UploadImageModal;
