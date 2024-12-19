type TProductCounter = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
};

const ProductCounter = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
}: TProductCounter) => {
  return (
    <div className="flex items-center border rounded-md w-36">
      {/* Decrease Button */}
      <button
        onClick={onDecrease}
        className={`flex-1 py-2 text-2xl font-bold ${
          quantity <= min
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-200"
        }`}
      >
        −
      </button>

      {/* Quantity Display */}
      <span className="flex-1 py-2 text-center text-lg font-semibold">
        {quantity}
      </span>

      {/* Increase Button */}
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className={`flex-1 py-2 text-2xl font-bold ${
          quantity >= max
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-200"
        }`}
      >
        +
      </button>
    </div>
  );
};

export default ProductCounter;
