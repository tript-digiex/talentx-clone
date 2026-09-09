import Button from "@/components/ui/custom/Button";
import { PenLine } from "lucide-react";
import type { UserItemResponse } from "../types/user.types";
import { AvatarDisplayFallback } from "@/components/common/AvatarDisplayFallback";
import { USER_STATUS } from "../types/user.constants";

type UserListItemProps = {
  user: UserItemResponse;
  onEdit?: (userId: string) => void;
};

export const UserListItem = ({ user, onEdit }: UserListItemProps) => {
  return (
    <div className="border p-4 rounded-lg my-2 flex justify-between items-center shadow-md">
      <div className="flex gap-4 items-center">
        <AvatarDisplayFallback
          fullName={`${user.first_name} ${user.last_name}`}
          className="bg-red-600 text-white"
        />
        <div className="flex flex-col items-start gap-1">
          <h2 className="font-medium">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p className="font-bold">
          {user.status === USER_STATUS.PENDING
            ? USER_STATUS.PENDING
            : user.role}
        </p>
        <Button
          variant="secondary"
          size="icon-lg"
          leftIcon={<PenLine />}
          onClick={() => onEdit?.(user.id)}
        />
      </div>
    </div>
  );
};
