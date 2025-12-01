import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

const CreateGalleryModal = ({ isOpen, onClose, onAlbumCreated }) => {
  const [galleryName, setGalleryName] = useState("");
  const [category, setCategory] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const handleCreateGallery = () => {
    if (!galleryName || !category) {
      alert("Please fill in all fields");
      return;
    }

    const newAlbum = {
      galleryName,
      category,
    };

    onAlbumCreated(newAlbum);
    onClose();
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
                  Create Gallery
                </Dialog.Title>

                <div className="">
                  <label className="block text-gray-700 font-medium mb-2">
                    Gallery Name
                  </label>
                  <Input
                    type="text"
                    value={galleryName}
                    onChange={(e) => setGalleryName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500"
                    placeholder="Gallery Name"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-gray-700 font-semibold mb-1">
                    Select Catagory
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select Catagory</option>
                    <option value="evolution">Private</option>
                    <option value="book-launch">Public</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-2 mt-3">
                    Select Cover Photo
                  </label>
                  <Input
                    type="file"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500"
                    value={coverPhoto}
                    onChange={(e) => setCoverPhoto(e.target.value)}
                  />
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
                  <Button
                    onClick={handleCreateGallery}
                    className="flex justify-end mt-5 bg-red-600"
                  >
                    Create
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

export default CreateGalleryModal;
