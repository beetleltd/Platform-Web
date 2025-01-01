import React, { useState } from "react";
import { AiOutlineFilter } from "react-icons/ai";
// import { FaNairaSign } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import PriceFilter from "./PriceFilter"; // Assume PriceFilter is implemented
import RatingFilter from "./RatingFilter"; // Assume RatingFilter is implemented

const FilterBar: React.FC = () => {
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showRatingFilter, setShowRatingFilter] = useState(false);

  const handleCloseFilters = () => {
    setShowPriceFilter(false);
    setShowRatingFilter(false);
  };

  return (
    <div className="flex items-center gap-4 bg-gray-100 py-2 px-4 rounded-md">
      {/* All Filters Button */}
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 text-gray-700 shadow hover:bg-gray-300 transition"
        onClick={handleCloseFilters}
      >
        <AiOutlineFilter />
        All Filters
      </button>

      {/* Price Filter */}
      <div className="relative">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 text-gray-700 shadow hover:bg-gray-300 transition"
          onClick={() => setShowPriceFilter((prev) => !prev)}
        >
          {/* <FaNairaSign /> */}
          Price
        </button>
        {showPriceFilter && (
          <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md p-4 z-50">
            <PriceFilter
              priceRange={{ min: 0, max: 100000 }}
              onChange={(range) => console.log("Price Range:", range)}
            />
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="relative">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 text-gray-700 shadow hover:bg-gray-300 transition"
          onClick={() => setShowRatingFilter((prev) => !prev)}
        >
          <AiOutlineStar />
          Rating
        </button>
        {showRatingFilter && (
          <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md p-4 z-50">
            <RatingFilter
              selectedRatings={[5, 4]}
              onApply={(ratings) => console.log("Selected Ratings:", ratings)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
