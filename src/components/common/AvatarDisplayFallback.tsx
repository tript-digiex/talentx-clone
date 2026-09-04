import { getDisplayUserAvatar } from "@/utils/user.utils";

export function AvatarDisplayFallback({ fullName }: { fullName: string }) {
  return (
    <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#d7dce5] bg-[#eef1f6] text-sm font-bold text-[#071124]">
      {getDisplayUserAvatar(fullName)}
    </div>
  );
}
