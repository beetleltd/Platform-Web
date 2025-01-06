type TRatings = {
  rating: number | string;
  maxStars?: number;
};

const Ratings = ({ rating, maxStars = 5 }: TRatings) => {
  // Convert the rating to a number if it's passed as a string
  const numericRating = Number(rating);

  // Ensure the rating is valid
  const validRating =
    !isNaN(numericRating) && numericRating >= 0 ? numericRating : 0;

  // Calculate stars
  const fullStars = Math.floor(validRating);
  const hasHalfStar = validRating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-x-1 text-sm sm:text-base">
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <span
          key={`full-${index}`}
          aria-label="full star"
          className="text-yellow-400"
        >
          &#9733; {/* Full Star */}
        </span>
      ))}

      {/* Render half star */}
      {hasHalfStar && (
        <span
          aria-label="half star"
          className="relative inline-block text-yellow-500 w-[1em] h-[1em]"
        >
          <span className="text-gray-300">&#9734;</span> {/* Empty star */}
          <span className="absolute left-0 top-0 overflow-hidden w-1/2 text-yellow-400">
            &#9733; {/* Half-filled star */}
          </span>
        </span>
      )}

      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <span
          key={`empty-${index}`}
          aria-label="empty star"
          className="text-gray-300"
        >
          &#9734; {/* Empty Star */}
        </span>
      ))}

      {/* Numeric Rating */}
      {/* <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700">
        {numericRating.toFixed(2)}
      </span> */}
    </div>
  );
};

export default Ratings;
