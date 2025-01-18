import Button from "@/components/shared/Button";
import { useNavigate } from "react-router-dom";

const EmptyState = ({
  title = "Your cart is empty",
  description = "Looks like you haven’t added anything to your cart yet.",
  actionLabel = "Shop Now",
  onActionClick,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onActionClick?: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto border shadow-lg p-10">
      {/* Inline SVG for Empty Cart */}
      <div className="w-44 h-44 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full"
        >
          <path
            d="M16 11V6a4 4 0 10-8 0v5"
            stroke="#1e90ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="4"
            y="11"
            width="16"
            height="11"
            rx="2"
            stroke="#1e90ff"
            strokeWidth="2"
          />
          <circle cx="9" cy="17" r="1" fill="#1e90ff" />
          <circle cx="15" cy="17" r="1" fill="#1e90ff" />
        </svg>
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      <Button onClick={onActionClick || (() => navigate("/"))}>
        {actionLabel}
      </Button>
    </div>
  );
};

export default EmptyState;
