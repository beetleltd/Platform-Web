import React from "react";
import { FaStar } from "react-icons/fa";

type RatingFilterProps = {
  selectedRatings: number[];
  onChange: (ratings: number[]) => void;
};

const RatingFilter: React.FC<RatingFilterProps> = ({
  selectedRatings,
  onChange,
}) => {
  const ratings = [5, 4, 3, 2, 1];

  const toggleRating = (rating: number) => {
    const newRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating];
    onChange(newRatings);
  };

  return (
    <div className="relative bg-white shadow-lg rounded-md p-4 w-full max-w-sm">
      <h4 className="text-lg font-semibold mb-2">Rating</h4>
      <ul className="space-y-2">
        {ratings.map((rating) => (
          <li
            key={rating}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleRating(rating)}
          >
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <input
              type="checkbox"
              checked={selectedRatings.includes(rating)}
              readOnly
              className="form-checkbox"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RatingFilter;
