import { cva } from "class-variance-authority";

export const tagVariants = cva(
  [
    "inline-flex items-center",
    "border",
    "h-8 min-w-0 rounded-full",
    "gap-1.5 px-3",
    "text-sm font-medium leading-none",
  ],
  {
    variants: {
      variant: {
        default: "bg-[#F9FAFB] text-[#344054] border-[#EAECF0]",
        blue: "bg-[#F0F9FF] text-[#027EC3] border-[#B9E6FE]",
        green: "bg-[#ECFDF3] text-[#067647] border-[#BEF2D2]",
        purple: "bg-[#F9F5FF] text-[#7655C8] border-[#E9D7FE]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
