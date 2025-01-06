import { Menu } from "@headlessui/react";
import FilterButton from "./FilterButton";
import { CiBag1 } from "react-icons/ci";

const CategoryFilter = ({ categories }: { categories: string[] }) => {
  return (
    <div className="relative">
      {/* Category Filter Button */}
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button>
              <FilterButton>
                <div className="flex gap-x-2 items-center">
                  <CiBag1 size={17} />
                  <span>Category</span>
                </div>
              </FilterButton>
            </Menu.Button>

            {/* Category Filter Popup */}
            <Menu.Items
              as="div"
              className="absolute mt-2 right-0 w-64 bg-white border border-gray-200 rounded-xl shadow-lg focus:outline-none z-10"
            >
              <div className="p-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold text-gray-800">
                    Categories
                  </span>
                  <button
                    className="text-reseller-primary hover:underline text-xs font-medium"
                    onClick={() => console.log("Apply filter")}
                  >
                    Apply
                  </button>
                </div>

                {/* Category List */}
                <div className="mt-4 flex flex-col gap-2">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center justify-between gap-2"
                    >
                      <span className="text-sm">{cat}</span>
                      <input
                        type="checkbox"
                        className="accent-reseller-primary"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};

export default CategoryFilter;
