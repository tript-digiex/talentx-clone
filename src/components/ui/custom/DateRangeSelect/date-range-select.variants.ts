import { cva } from "class-variance-authority";

export const dateRangeSelectTriggerVariants = cva(
  [
    "inline-flex h-11 min-w-72 items-center gap-2 rounded-lg border px-4",
    "text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-purple-300/50",
  ],
  {
    variants: {
      selected: {
        true: "border-blue-200 bg-blue-100 text-blue-700",
        false: "border-gray-300 bg-white text-gray-500 hover:bg-gray-50",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
    },
  },
);

export const dateRangeSelectDayVariants = cva(
  [
    "flex size-11 items-center justify-center rounded-full text-sm font-medium cursor-pointer",
    "transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-purple-300/50",
  ],
  {
    variants: {
      state: {
        default: "text-gray-950 hover:bg-blue-50",
        muted: "text-gray-400 hover:bg-blue-50",
        weekend: "text-red-500 hover:bg-blue-50",
        inRange: "bg-blue-100 text-gray-950",
        today: "bg-blue-100 text-blue-700 hover:bg-blue-200",
        selected: "bg-blue-600 text-white hover:bg-blue-700",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);
