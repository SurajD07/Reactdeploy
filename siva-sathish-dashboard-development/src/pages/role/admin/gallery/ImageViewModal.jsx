import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";

const ImageViewModal = ({ images, currentIndex, setCurrentIndex, onClose }) => {
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <button
        onClick={onClose}
        className="absolute top-5 right-8 text-2xl text-white  "
      >
        <TfiClose />
      </button>
      <button
        onClick={prevImage}
        className="absolute left-4 text-white text-4xl"
      >
        <FaChevronLeft size={50} />
      </button>
      <img
        src={images[currentIndex]}
        alt=""
        className="max-w-full max-h-[80vh] object-contain rounded-xl"
      />
      <button
        onClick={nextImage}
        className="absolute right-4 text-white text-4xl"
      >
        <FaChevronRight size={50} />
      </button>
    </div>
  );
};

export default ImageViewModal;
