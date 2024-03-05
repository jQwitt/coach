"use client";

import { FunctionComponent } from "@/types";

export interface ButtonProps {
  text: String;
  onClick?: Function;
}

export const Button: FunctionComponent<ButtonProps> = ({ text, onClick }) => {
  return (
    <span
      className="py-2 px-4 rounded border-2 border-secondary hover:bg-secondary hover:text-white transition-colors duration-200"
      onClick={() => onClick?.()}
    >
      {text}
    </span>
  );
};
