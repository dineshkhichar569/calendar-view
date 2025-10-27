import React, { PropsWithChildren, ButtonHTMLAttributes } from "react";

export interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  size?: "small" | "medium" | "large";
  primary?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  size = "medium",
  primary = false,
  className = "",
  children,
  ...rest
}) => {
  const sizeClasses =
    size === "small"
      ? "text-xs px-2 py-1"
      : size === "large"
      ? "text-base px-4 py-2"
      : "text-sm px-3 py-1.5";

  const styleClasses = primary
    ? "bg-blue-600 text-white hover:bg-blue-700"
    : "bg-gray-100 text-gray-800 hover:bg-gray-200";

  return (
    <button
      type="button"
      {...rest}
      className={`rounded font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${sizeClasses} ${styleClasses} ${className}`}
    >
      {children}
    </button>
  );
};
