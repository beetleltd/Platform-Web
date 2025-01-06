import { Menu } from "@headlessui/react";
import { useState } from "react";
import FilterButton from "./FilterButton";
import { FaRegStar } from "react-icons/fa";
import Button from "@/components/shared/Button";

const RatingFilter = () => {
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // Toggle selected ratings
  const toggleRating = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  return (
    <div className="relative">
      {/* Rating Filter Button */}
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button>
              <FilterButton>
                <div className="flex gap-x-2 items-center">
                  <FaRegStar />
                  <span>Rating</span>
                </div>
              </FilterButton>
            </Menu.Button>

            {/* Rating Filter Popup */}
            <Menu.Items
              as="div"
              className="absolute mt-2 left-0 w-64 bg-white border border-gray-200 rounded-xl shadow-lg focus:outline-none z-10"
            >
              <div className="p-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold text-gray-800">Rating</span>
                  {/* <button
                    className="text-reseller-primary font-medium hover:underline text-xs"
                    onClick={() => console.log("Apply filter", selectedRatings)}
                  >
                    Apply
                  </button> */}
                </div>

                <div className="mt-4 space-y-2">
                  {/* Render Ratings */}
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div
                      key={rating}
                      className="flex items-center justify-between gap-x-2"
                    >
                      {rating}
                      <div className="flex w-full items-center justify-between">
                        {/* Stars */}
                        <div className="flex items-center">
                          {[...Array(5)].map((_, index) => (
                            <>
                              <span
                                key={index}
                                className={`text-lg ${
                                  index < rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              >
                                &#9733; {/* Star */}
                              </span>
                            </>
                          ))}
                        </div>

                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-400"
                          checked={selectedRatings.includes(rating)}
                          onChange={() => toggleRating(rating)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-3">
                  <Button>Apply</Button>
                </div>
              </div>
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};

export default RatingFilter;
