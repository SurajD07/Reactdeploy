import React, { useRef, useState } from "react";
import logo from "../../../../assets/Images/logo.png";
import { CiEdit } from "react-icons/ci";
import { TfiLocationPin } from "react-icons/tfi";
import { Button } from "@/components/ui/button";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { LiaUserEditSolid } from "react-icons/lia";
import EditProfileModal from "./EditProfileModal";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { profileGetApi } from "@/api/auth/authApi";
import { formatDateNew, TimeAgo } from "@/lib/utils";

const AdminProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const getProfileData = useQuery({
    queryKey: ["profileGET"],
    queryFn: profileGetApi,
  });
  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 ">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 border-b border-gray-200 pb-6  ">
          <div className="relative">
            <img
              src={getProfileData?.data?.data?.result?.img_url}
              alt="Profile"
              className=" lg:w-[300px] sm:w-[900px] rounded-full object-cover border-2 border-gray-300"
            />
            <button className="absolute bottom-2 right-2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition">
              <Input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  e.target.files[0];
                }}
              />
              <CiEdit
                onClick={handleEditClick}
                className="text-2xl text-gray-600"
              />
            </button>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
            <div>
              <h2 className="text-sm text-gray-500">Name</h2>
              <p className="text-xl font-semibold text-gray-800">
                {getProfileData?.data?.data?.result?.firstName}
                {getProfileData?.data?.data?.result?.lastName}
              </p>
            </div>
            <div>
              <h2 className="text-sm text-gray-500">Email</h2>
              <p className="text-xl font-semibold text-gray-800">
                {getProfileData?.data?.data?.result?.email || "-"}
              </p>
            </div>
            <div>
              <h2 className="text-sm text-gray-500">Mobile No</h2>
              <p className="text-xl font-semibold text-gray-800">
                {getProfileData?.data?.data?.result?.mobile || "-"}
              </p>
            </div>
            <div>
              <h2 className="text-sm text-gray-500">Date Of Birth</h2>
              <div className="flex items-center text-xl font-semibold text-gray-800">
                {getProfileData?.data?.data?.result?.dob || "-"}
              </div>
            </div>
            {/* <div>
              <h2 className="text-sm text-gray-500">Location</h2>
              <div className="flex items-center text-xl font-semibold text-gray-800">
                <TfiLocationPin className="text-xl font-semibold mr-1" />
                Bangalore, India
              </div>
            </div> */}
            <div>
              <h2 className="text-sm text-gray-500">Account Created</h2>
              <p className="text-xl font-semibold text-gray-800">
                Jan 15, 2024
              </p>
            </div>
            <div>
              <h2 className="text-sm text-gray-500">Last Login</h2>
              <p className="text-xl font-semibold text-gray-800">
                {formatDateNew(
                  new Date(getProfileData?.data?.data?.result?.lastLogin || "-")
                )}
              </p>
              <div className="flex justify-end mt-10">
                <Button
                  className="-mt-9 bg-red-400 hover:bg-gray-800 rounded-xl"
                  onClick={() => setOpenModal(true)}
                >
                  <span>
                    <LiaUserEditSolid />
                  </span>{" "}
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-b border-gray-200 pb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Channel Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 gap-x-12">
            <div>
              <h3 className="text-sm text-gray-500">Channel Name</h3>
              <p className="text-lg font-semibold text-gray-800">
                Siva Sathish pollachi
              </p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Channel ID</h3>
              <p className="text-lg font-semibold text-gray-800">
                UC1234567890XYZ
              </p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Status</h3>
              <p className="text-lg font-semibold text-green-600"> Active </p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Subscribers</h3>
              <p className="text-lg font-semibold text-gray-800">24,530</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Total Videos</h3>
              <p className="text-lg font-semibold text-gray-800">152</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Total Shorts</h3>
              <p className="text-lg font-semibold text-gray-800">100</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Total Views</h3>
              <p className="text-lg font-semibold text-gray-800">1.4M</p>
            </div>

            <div>
              <h3 className="text-sm text-gray-500">Channel Income</h3>
              <button className="text-blue-600 hover:underline font-medium text-lg">
                Click to see Income Details
              </button>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Subscribed Channels</h3>
              <h1>Aim window channel</h1>
              <h1>
                Siva Sathish devotional{" "}
                <span className="text-blue-600">...view more</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Account Security
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
            <div>
              <h3 className="text-sm text-gray-500">Two Step Verification</h3>
              <p className="text-lg font-semibold text-gray-800">Enabled</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Last Password Change</h3>
              <p className="text-lg font-semibold text-gray-800">
                Mar 20, 2025
              </p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Role</h3>
              <p className="text-lg font-semibold text-gray-800">Admin</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Change Password</h3>
              <button className="text-blue-600 hover:underline font-medium text-lg">
                Click here to update
              </button>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Social Media
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com"
                  className="hover:scale-110 transition-transform"
                >
                  <BsInstagram className="w-5 h-5 text-pink-600" />
                </a>
                <a
                  href="https://twitter.com"
                  className="hover:scale-110 transition-transform"
                >
                  <BsTwitter className="w-5 h-5 text-blue-500" />
                </a>
                <a
                  href="https://facebook.com"
                  className="hover:scale-110 transition-transform"
                >
                  <BsFacebook className="w-5 h-5 text-blue-600" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        getProfile={getProfileData}
      />
    </>
  );
};

export default AdminProfile;
