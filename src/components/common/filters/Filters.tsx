import React from "react";
import FilterButton from "./FilterButton";
import { VscSettings } from "react-icons/vsc";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import CategoryFilter from "./CategoryFilter";

const FilterBar: React.FC = () => {
  const categories = ["Electronics", "Fashion", "Home", "Books", "Toys"];
  return (
    <div className="flex gap-x-4 py-5">
      <FilterButton>
        <div className="flex gap-x-2 items-center">
          <VscSettings />
          <span>All Filters</span>
        </div>
      </FilterButton>
      <PriceFilter />
      <RatingFilter />
      <CategoryFilter categories={categories} />
    </div>
  );
};

export default FilterBar;
