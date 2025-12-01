import React, { useState } from "react";
import ImageModal from "./ImageViewModal";
import { TbArrowsSort } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { IoMdAdd } from "react-icons/io";
import UploadImageModal from "./UploadImageModal";

const SingleView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [uploadImageModal, setUploadImageModal] = useState(false);
  const thisMonthImages = [
    "https://th.bing.com/th/id/OIP.hm2-1Vpw2jopvDle40DMhAHaEK?rs=1&pid=ImgDetMain",
    "https://i.ytimg.com/vi/72dC_vor7Ok/maxresdefault.jpg",
    "https://i.ytimg.com/vi/Ztbi-LGVrQc/maxresdefault.jpg",
  ];

  const lastMonthImages = [
    "https://i.ytimg.com/vi/iHMkcKW6xjE/maxresdefault.jpg",
  ];

  const allImages = [...thisMonthImages, ...lastMonthImages];

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-end mb-5">
        <Button onClick={() => setUploadImageModal(true)}>
          <IoMdAdd />
          Upload Image
        </Button>
      </div>
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold mb-4">This month</h1>
        <TbArrowsSort size={25} className="cursor-pointer" />
      </div>
      <h1 className="text-xl text-gray-400 border-b-2 mb-4 "></h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {thisMonthImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            className="rounded-lg cursor-pointer"
            onClick={() => openModal(index)}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold mb-4 mt-5">Last month</h1>
        <TbArrowsSort size={25} className="cursor-pointer" />
      </div>
      <h1 className="text-xl text-gray-400 border-b-2 mb-4 "></h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {lastMonthImages.map((image2, i) => (
          <img
            key={i + thisMonthImages.length}
            src={image2}
            alt=""
            className="rounded-lg cursor-pointer"
            onClick={() => openModal(i + thisMonthImages.length)}
          />
        ))}
      </div>

      {isModalOpen && (
        <ImageModal
          images={allImages}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <UploadImageModal
        isOpen={uploadImageModal}
        onClose={() => setUploadImageModal(false)}
      />
    </div>
  );
};

export default SingleView;
