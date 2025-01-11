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
    <div className="flex gap-x-4 py-5">
      <div className="flex gap-x-2 text-gray-600 !text-sm items-center">
        <VscSettings />
        <span>All Filters</span>
      </div>
      <PriceFilter />
      <RatingFilter />
      <CategoryFilter />
      {showReset && (
        <button
          onClick={resetFilters}
          className="text-red-400 text-sm font-semibold hover:underline"
        >
          <BiX className="inline-block" />
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default FilterBar;
