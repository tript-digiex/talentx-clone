import { cn } from "@/lib/utils";
import { getDisplayUserAvatar } from "@/utils/user.utils";

type AvatarDisplayFallbackProps = {
  fullName: string;
  className?: string;
};

export function AvatarDisplayFallback({
  fullName,
  className,
}: AvatarDisplayFallbackProps) {
  return (
    <div
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-full border border-[#d7dce5] bg-[#eef1f6] text-sm font-bold text-[#071124]",
        className,
      )}
    >
      {getDisplayUserAvatar(fullName)}
    </div>
  );
}
