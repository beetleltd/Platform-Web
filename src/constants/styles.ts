import { cva } from "class-variance-authority";

// Define the Button styles
export const buttonStyles = cva(
  "inline-flex items-center justify-center font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
      variant: {
        solid: "",
        outline: "border",
        ghost: "bg-transparent",
      },
      theme: {
        business:
          "bg-business-primary text-white hover:bg-business-dark focus:ring-purple-500",
        reseller:
          "bg-reseller-primary text-white hover:bg-reseller-dark focus:ring-blue-500",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "solid",
      theme: "business",
      disabled: false,
    },
  }
);
