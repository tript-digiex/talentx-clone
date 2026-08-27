import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { InputType } from "../Input.types";

export const usePasswordInput = (type: InputType) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordInput = type === "password";
  const inputType = isPasswordInput && isPasswordVisible ? "text" : type;
  const PasswordIcon = isPasswordVisible ? EyeOff : Eye;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((isVisible) => !isVisible);
  };

  return {
    isPasswordInput,
    inputType,
    PasswordIcon,
    togglePasswordVisibility,
  };
}
