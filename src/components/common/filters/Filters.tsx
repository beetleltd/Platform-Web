import React from "react";
import { VscSettings } from "react-icons/vsc";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import { useFilterStore } from "@/store/filters";
import { BiX } from "react-icons/bi";

const FilterBar: React.FC = () => {
  const {
    resetFilters,
    filters: { showReset },
  } = useFilterStore();
  return (
    <div className="flex gap-x-4 py-5 overflow-x-auto scrollbar-hide relative">
      {/* All Filters */}
      <div className="flex gap-x-2 text-gray-600 !text-sm items-center shrink-0">
        <VscSettings />
        <span>All Filters</span>
      </div>

      {/* Price Filter */}
      <div className="shrink-0">
        <PriceFilter />
      </div>

      {/* Rating Filter */}
      <div className="shrink-0">
        <RatingFilter />
      </div>

      {/* Category Filter */}
      <div className="shrink-0">
        <CategoryFilter />
      </div>

      {/* Reset Filters */}
      {showReset && (
        <button
          onClick={resetFilters}
          className="text-red-400 text-sm font-semibold hover:underline shrink-0 flex items-center gap-x-1"
        >
          <BiX className="inline-block" />
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default FilterBar;
