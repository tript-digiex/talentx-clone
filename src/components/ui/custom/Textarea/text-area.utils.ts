import type { TextareaProps } from "./Textarea.types";

export const getTextLength = (value: TextareaProps["value"]) => {
  if (typeof value === "string") {
    return value.length;
  }

  return 0;
};
