import { AvatarDisplayFallback } from "@/components/common/AvatarDisplayFallback";

type UserProfileSummaryProps = {
  fullName: string;
  email: string;
};

export const UserProfileSummary = ({
  fullName,
  email,
}: UserProfileSummaryProps) => {
  return (
    <div className="min-w-sm flex flex-col items-center border py-12 rounded-md gap-6">
      <AvatarDisplayFallback
        fullName={fullName}
        className="size-40 text-3xl shrink-0"
      />
      <div className="flex flex-col items-center gap-2">
        <div className="font-semibold text-lg">{fullName}</div>
        <div className="text-gray-500">{email}</div>
      </div>
    </div>
  );
};
