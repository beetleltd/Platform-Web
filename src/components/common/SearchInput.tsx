import React, { useState } from "react";
import { useResponsive } from "@/hooks/useResponsive";
import { IoSearchOutline } from "react-icons/io5";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
} from "../ui/dialog";
import Button from "../shared/Button";
import { useFilterStore } from "@/store/filters";

const SearchInput = () => {
  const { isMobile } = useResponsive();
  const [searchTerm, setSearchTerm] = useState("");
  const { filters, setFilters } = useFilterStore();
  const [open, setOpen] = useState(false);

  const handleSearch = () => {
    if (!searchTerm) return;
    setFilters({ search: searchTerm });
    console.log("Filters:", filters);

    console.log("Searching for:", searchTerm);
  };

  if (isMobile) {
    return (
      <div className="flex justify-center items-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button>
              <IoSearchOutline className="text-3xl text-gray-700" />
            </button>
          </DialogTrigger>
          <DialogContent className="p-6 max-w-md w-full bg-white rounded-lg shadow-lg">
            <div className="flex flex-col gap-y-2">
              <DialogTitle className="mb-4 text-lg text-gray-700 font-semibold text-center">
                Search for products here
              </DialogTitle>

              <div className="w-full flex items-center">
                <input
                  type="text"
                  placeholder="Type a product name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg rounded-tr-none rounded-br-none shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                />

                <Button
                  onClick={() => {
                    setOpen(false);
                    handleSearch();
                  }}
                  className="!w-auto h-full !rounded-tl-none !rounded-bl-none"
                >
                  <IoSearchOutline className="text-xl text-white" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center">
      <div className="relative w-[90%] mx-auto">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-5 py-3 border border-gray-100 focus:border-gray-200 rounded-lg w-full outline-none"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
          <IoSearchOutline
            className="h-6 w-6 text-gray-600"
            onClick={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
