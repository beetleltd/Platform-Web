import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";

type PriceFilterProps = {
  priceRange: { min: number; max: number };
  onChange: (range: { min: number; max: number }) => void;
};

const PriceFilter: React.FC<PriceFilterProps> = ({ priceRange, onChange }) => {
  const STEP = 1000; // Step size for the slider
  const MIN = 0; // Minimum price
  const MAX = 100000; // Maximum price

  const [values, setValues] = useState([priceRange.min, priceRange.max]);

  const handleApply = () => {
    onChange({ min: values[0], max: values[1] });
  };

  return (
    <div className="bg-white shadow-lg rounded-md p-4 w-full max-w-sm">
      <h4 className="text-lg font-semibold mb-4">Price (₦)</h4>
      <div className="space-y-4">
        {/* Range Slider */}
        <Range
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => setValues(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-1 w-full rounded-lg"
              style={{
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#1E3A8A", "#ccc"],
                  min: MIN,
                  max: MAX,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="h-4 w-4 bg-blue-600 rounded-full shadow-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          )}
        />
        {/* Inputs */}
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={values[0]}
            onChange={(e) =>
              setValues([Math.max(Number(e.target.value), MIN), values[1]])
            }
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary px-2 py-1"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            value={values[1]}
            onChange={(e) =>
              setValues([values[0], Math.min(Number(e.target.value), MAX)])
            }
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary px-2 py-1"
          />
        </div>
        {/* Apply Button */}
        <button
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;
