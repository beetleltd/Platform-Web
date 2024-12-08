import { Menu } from "@headlessui/react";
import { FiChevronDown, FiCopy, FiMail, FiPhone } from "react-icons/fi";
import { useTheme } from "../../contexts/ThemeContext";
import { BsPatchCheckFill } from "react-icons/bs";
import Button from "../shared/Button";
import { MdOutlineOpenInNew } from "react-icons/md";
import StoreTag from "./StoreTag";

const StoreProfileMenu = () => {
  const { theme } = useTheme();
  const businessType = theme ? "Business" : "Reseller";
  return (
    <div className="relative">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="">
          <div className="flex gap-x-3 items-center">
            <div className="relative">
              <img
                src="https://via.placeholder.com/50" // Placeholder for the avatar image
                alt="Avatar"
                className="w-14 h-14 rounded-full"
              />
              <div className="absolute -top-1 -right-1 ">
                <BsPatchCheckFill
                  className={`${
                    theme === "business"
                      ? "text-business-primary"
                      : "text-reseller-primary"
                  } w-5 h-5 scale-90 relative z-20 `}
                />
                <BsPatchCheckFill className="text-white absolute z-10 top-0 -right-0 w-5 h-5 scale-110" />
              </div>
            </div>

            <div className="text-justify">
              <p className="flex items-center gap-x-2">
                <span className="font-bold text-xl text-black">
                  HeyFan Store
                </span>
                <FiChevronDown />
              </p>
              <p className="text-xs text-gray-700 font-medium">
                {businessType}
              </p>
            </div>
          </div>
        </Menu.Button>

        {/* Dropdown Menu */}
        <Menu.Items className="absolute p-5 left-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-4">
            {/* Store Header */}
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/50" // Placeholder for the store logo
                alt="Store Logo"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-900">HeyFan Store</h3>
                <StoreTag />
              </div>
            </div>

            {/* Contact Details */}
            <div className="pt-5 pb-3 mb-3 space-y-2 border-b border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <FiPhone className="text-gray-500" />
                  <span>08123456789</span>
                </div>
                <button
                  className="text-purple-600 hover:text-purple-800 transition"
                  onClick={() => navigator.clipboard.writeText("08123456789")}
                >
                  <FiCopy />
                </button>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <FiMail className="text-gray-500" />
                  <span>heyfanstore@gmail.com</span>
                </div>
                <button
                  className="text-purple-600 hover:text-purple-800 transition"
                  onClick={() =>
                    navigator.clipboard.writeText("heyfanstore@gmail.com")
                  }
                >
                  <FiCopy />
                </button>
              </div>
            </div>

            {/* CTA Button */}

            <Button className="!text-sm !gap-x-2">
              Get your business on Bloom!
              <MdOutlineOpenInNew />
            </Button>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default StoreProfileMenu;
