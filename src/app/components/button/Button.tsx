"use client";

import styles from "./Button.module.css";

interface ButtonProps {
  label: string;
  onClick: () => void;
  primary?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  label,
  onClick,
  primary = false,
  type = "button",
}: ButtonProps): JSX.Element => {
  return (
    <button
      type={type}
      className={`${styles.button} ${primary ? styles.primary : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
