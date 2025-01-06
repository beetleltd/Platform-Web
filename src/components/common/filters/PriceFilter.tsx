import { Menu } from "@headlessui/react";
import { TbCurrencyNaira } from "react-icons/tb";
import { useState } from "react";
import FilterButton from "./FilterButton";

const PriceFilter = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <div className="relative">
      {/* Price Filter Button */}
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button>
              <FilterButton>
                <div className="flex gap-x-2 items-center">
                  <TbCurrencyNaira />
                  <span>Price</span>
                </div>
              </FilterButton>
            </Menu.Button>

            {/* Price Filter Popup */}
            <Menu.Items
              as="div"
              className="absolute mt-2 left-0 w-64 bg-white border border-gray-200 rounded-xl shadow-lg focus:outline-none z-10"
            >
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">Price (₦)</span>
                  <button
                    className="text-reseller-primary hover:underline text-xs"
                    onClick={() => console.log("Apply filter")}
                  >
                    Apply
                  </button>
                </div>

                {/* Price Slider */}
                <div className="mt-4">
                  <input
                    type="range"
                    className="w-full accent-reseller-primary"
                    min="0"
                    max="100000"
                    step="1000"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <input
                    type="range"
                    className="w-full accent-reseller-primary mt-2"
                    min="0"
                    max="100000"
                    step="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>

                {/* Price Inputs */}
                <div className="flex items-center mt-4 gap-x-2">
                  <input
                    type="number"
                    className="w-full border border-reseller-primary rounded-md p-2 text-center"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    className="w-full border border-reseller-primary rounded-md p-2 text-center"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};

export default PriceFilter;
