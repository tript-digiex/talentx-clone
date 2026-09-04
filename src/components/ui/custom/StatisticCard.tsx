import { cn } from "@/lib/utils";
import { LayoutGrid } from "lucide-react";
import type { ReactNode } from "react";

export type StatisticCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;

  className?: string;
  iconWrapperClassName?: string;
  iconClassName?: string;
};

const StatisticCard = ({
  title = "Statistic Card",
  value = "0",
  icon = <LayoutGrid className="size-full" />,
  className,
  iconClassName,
  iconWrapperClassName,
}: StatisticCardProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-7",
        className,
      )}
    >
      <div className="min-w-0 flex-wrap">
        <p className="text-sm font-medium text-[#667085]">{title}</p>
        <p className="mt-3 truncate text-[28px] leading-none font-medium text-[#071124]">
          {value}
        </p>
      </div>

      <div
        className={cn(
          "flex size-20 shrink-0 items-center justify-center rounded-2xl",
          iconWrapperClassName,
        )}
      >
        <div className={cn("size-7", iconClassName)}>{icon}</div>
      </div>
    </div>
  );
};

export default StatisticCard;
