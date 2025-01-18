import React from "react";
import { Button as HeadlessButton } from "@headlessui/react";
import clsx from "clsx";
import { FaSpinner } from "react-icons/fa";
import { buttonStyles } from "@/constants/styles";
import { useTheme } from "@/contexts/ThemeContext";

type TButton = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "ghost" | "outline";
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
};

const Button = ({
  children,
  size,
  variant,
  disabled,
  className,
  isLoading,
  onClick,
  ...props
}: TButton) => {
  const { theme } = useTheme();

  return (
    <HeadlessButton
      onClick={onClick}
      disabled={disabled || isLoading}
      className={clsx(
        buttonStyles({
          size,
          variant,
          theme,
          disabled,
        }),
        className
      )}
      {...props}
    >
      {isLoading ? <FaSpinner className="animate-spin py-2" /> : children}
    </HeadlessButton>
  );
};

export default Button;
