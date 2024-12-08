import { Button as HeadlessButton } from "@headlessui/react";
import clsx from "clsx";
import { buttonStyles } from "../../constants/styles";
import { useTheme } from "../../contexts/ThemeContext";

type TButton = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "ghost" | "outline";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

const Button = ({
  children,
  size,
  variant,
  disabled,
  className,
  onClick,
  ...props
}: TButton) => {
  const { theme } = useTheme();

  return (
    <HeadlessButton
      onClick={onClick}
      disabled={disabled}
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
      {children}
    </HeadlessButton>
  );
};

export default Button;
