import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="404"
        className="max-w-md w-full "
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-red-600 text-white rounded-xl text-lg font-medium hover:bg-red-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default PageNotFound;
