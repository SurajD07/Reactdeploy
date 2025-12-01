import React from "react";
import logo from "../../assets/Images/logo.png";

const AppLoading = () => {
  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="relative">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-32 h-32 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
        </div>

        <img src={logo} alt="Logo" className="w-24 h-24 z-10 animate-bounce" />

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-2xl font-bold tracking-wider animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppLoading;
