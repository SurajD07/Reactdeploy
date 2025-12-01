import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { IoMdAdd, IoMdExit } from "react-icons/io";
import CreateGalleryModal from "./CreateGalleryModal";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
const AdminGallery = () => {
  const [openmodal, setopenModal] = useState(false);
  const [deletemodal, setDeleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState("public");
  const navigate = useNavigate();

  const Tab = ({ label, isActive, onClick }) => (
    <p
      className={`px-2 py-1 rounded-lg transition-colors mt-3 ${
        isActive
          ? "bg-red-600 text-white cursor-default font-semibold"
          : "text-gray-800  cursor-pointer"
      }`}
      onClick={onClick}
    >
      {label}
    </p>
  );
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Collection of <span className="text-red-700">Memories</span> !
        </h1>
        <Button
          onClick={() => setopenModal(true)}
          className="flex items-center gap-2"
        >
          <IoMdAdd /> Create Gallery
        </Button>
      </div>
      <div className="flex flex-wrap gap-3 w-full md:w-auto justify-start md:justify-normal">
        <Tab
          label="Public"
          isActive={activeTab === "public"}
          onClick={() => setActiveTab("public")}
        />
        <Tab
          label="Private"
          isActive={activeTab === "private"}
          onClick={() => setActiveTab("private")}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 h-[79vh] overflow-y-scroll hide-scrollbar">
        <div className="rounded-lg  ">
          <img
            src={
              "https://th.bing.com/th/id/OIP.hm2-1Vpw2jopvDle40DMhAHaEK?rs=1&pid=ImgDetMain"
            }
            alt="Cover"
            className="mt-2 w-full rounded-lg cursor-pointer"
            onClick={() => navigate("/gallery/gallerydetails")}
          />

          <div className="flex justify-between items-center mt-2">
            <h2 className="text-xl  font-semibold">Pollachi Event</h2>
            <div className="flex items-center">
              <FaRegEdit
                style={{ marginRight: "10px" }}
                size={24}
                className="cursor-pointer"
              />
              <RiDeleteBin6Line
                size={24}
                color="darkred"
                className="cursor-pointer"
                onClick={() => setDeleteModal(true)}
              />
            </div>
          </div>
          <h1 className="text-xl ">
            <span className="text-red-700">4</span>
          </h1>
        </div>
      </div>
      <CreateGalleryModal
        isOpen={openmodal}
        onClose={() => setopenModal(false)}
      />
      <DeleteModal isOpen={deletemodal} onClose={() => setDeleteModal(false)} />
    </div>
  );
};

export default AdminGallery;
