import React from "react";

interface PriceFormatterProps {
  price: number;
  currency?: string;
}

const PriceFormatter: React.FC<PriceFormatterProps> = ({
  price,
  currency = "₦",
}) => {
  const formattedPrice = price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <span className="text-gray-700 font-semibold">
      {currency}
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;
