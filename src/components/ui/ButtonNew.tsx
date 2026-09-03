import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "outline";
}

const ButtonNew = ({
  children,
  variant = "default",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "rounded-full text-base md:text-xl font-sans font-medium h-[35px] md:h-[42px] px-5 md:px-7 border-[1px] flex items-center justify-center tracking-[-0.4px] btn-hover cursor-pointer antialias ";
  const variants = {
    default: "bg-primary text-background border-primary active:bg-primary-dark",
    primary: "bg-primary text-background border-primary active:bg-primary-dark",
    outline:
      "bg-transparent border-dark-gray text-text-medium btn-hover-outline",
  };
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
};

export default ButtonNew;
