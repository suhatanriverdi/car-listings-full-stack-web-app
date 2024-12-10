import React from "react";

interface ButtonProps {
  onClick?: () => void; // Function to handle click event
  children: React.ReactNode; // Content of the button
  className?: string; // Additional custom classes
  disabled?: boolean; // Disable button for Logged In Users
  type?: "button" | "submit" | "reset"; // Button type
}

const Button = ({
  onClick,
  children,
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-[12rem] sm:w-[16rem] md:w-[18rem] h-[4rem] sm:h-[4.5rem] md:h-[5rem] px-4 rounded-[40px] text-xl transition duration-50 ${
        disabled
          ? "bg-gray-100 cursor-not-allowed text-gray-300"
          : "bg-button-bg hover:bg-button-bg-light text-gray"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
