import { cva } from "class-variance-authority";

export const dateSelectTriggerVariants = cva(
  [
    "flex h-11 w-full items-center gap-3 rounded-lg border bg-white px-4",
    "text-left text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-purple-300/50",
  ],
  {
    variants: {
      error: {
        true: "border-red-500 focus-visible:ring-red-500/20",
        false: "border-slate-300 hover:border-purple-300",
      },
      disabled: {
        true: "cursor-not-allowed bg-input/50 opacity-50",
        false: "",
      },
      open: {
        true: "border-purple-300 ring-3 ring-purple-300/50",
        false: "",
      },
    },
    compoundVariants: [
      {
        error: true,
        open: true,
        className: "border-red-500 ring-0",
      },
    ],
    defaultVariants: {
      error: false,
      disabled: false,
      open: false,
    },
  },
);

export const dateSelectPopupVariants = cva([
  "relative z-[100] w-83.5 rounded-md border border-slate-200 bg-white px-4 py-3 shadow-lg outline-none",
  "transition duration-100",
  "data-ending-style:scale-95 data-ending-style:opacity-0",
  "data-starting-style:scale-95 data-starting-style:opacity-0",
]);

export const dateSelectNavigationButtonVariants = cva([
  "flex size-8 cursor-pointer items-center justify-center rounded-full",
  "text-slate-300 transition-colors",
  "hover:bg-slate-100 hover:text-slate-500",
  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-purple-300/50",
]);

export const dateSelectDayVariants = cva([
  "mx-auto flex size-10 cursor-pointer items-center justify-center rounded-full",
  "text-sm font-semibold transition-colors",
  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-purple-300/50",
]);

export const dateSelectDayStateVariants = cva("", {
  variants: {
    currentMonth: {
      true: "text-slate-600 hover:bg-slate-100",
      false: "text-slate-300",
    },
    today: {
      true: "bg-slate-200 text-slate-700 hover:bg-slate-200",
      false: "",
    },
    selected: {
      true: "bg-slate-700 text-white hover:bg-slate-700",
      false: "",
    },
  },
  defaultVariants: {
    currentMonth: true,
    today: false,
    selected: false,
  },
});

export const dateSelectLabelVariants = cva(
  "block px-1 text-sm font-medium text-slate-700",
);

export const dateSelectHelperTextVariants = cva(
  "px-1 text-xs text-muted-foreground",
  {
    variants: {
      error: {
        true: "text-red-500",
        false: "",
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);
