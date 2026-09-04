import { cva } from "class-variance-authority";

export const tabsListVariants = cva("flex", {
  variants: {
    variant: {
      underline: "gap-6",
      segmented: "w-fit overflow-hidden rounded-lg border border-[#D0D5DD]",
    },
  },

  defaultVariants: {
    variant: "underline",
  },
});

export const tabsTriggerVariants = cva(
  [
    "relative flex items-center justify-center",
    "whitespace-nowrap font-semibold",
    "transition-colors",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        underline: ["h-12 px-0 text-[#667085]", "hover:text-purple-700"],
        segmented: [
          "h-11 border-r border-[#D0D5DD]",
          "px-5",
          "last:border-r-0",
        ],
      },

      active: {
        true: "",
        false: "",
      },
    },

    compoundVariants: [
      {
        variant: "underline",
        active: true,
        className: [
          "text-purple-700",
          "after:absolute",
          "after:inset-x-0",
          "after:bottom-0",
          "after:h-0.5",
          "after:bg-purple-700",
        ],
      },

      {
        variant: "segmented",
        active: true,
        className: ["bg-purple-700", "text-white"],
      },
    ],

    defaultVariants: {
      variant: "underline",
      active: false,
    },
  },
);
