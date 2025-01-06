import React from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Button from "@/components/shared/Button";

const NotFound = () => {
  const navigate = useNavigate();

  // Default fallback store path
  const defaultStorePath = "/x_cacisatroso"; // Replace with your actual default path if available

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4 text-center">
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-52 h-52 text-gray-400"
          fill="currentColor"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-5h2v2h-2zm0-10h2v6h-2z" />
        </svg>
        <h1 className="text-4xl font-bold text-gray-800 mt-6">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <div className="mt-6">
        <Button
          className="flex items-center px-6 py-3  rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          onClick={() => navigate(defaultStorePath)}
        >
          <BiArrowBack className="mr-2 text-xl" />
          Go to Example Store
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
