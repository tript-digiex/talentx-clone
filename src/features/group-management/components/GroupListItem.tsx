import type { GroupItemResponse } from "../types/group.types";
import Button from "@/components/ui/custom/Button";
import { PenLine } from "lucide-react";

type GroupListItemProps = {
  group: GroupItemResponse;
  onEdit?: (groupId: string) => void;
};

export const GroupListItem = ({ group, onEdit }: GroupListItemProps) => {
  return (
    <div className="border p-4 rounded-lg my-2 flex justify-between items-center shadow-md">
      <h2 className="font-medium">{group.name}</h2>
      <Button
        variant="secondary"
        size="icon-lg"
        leftIcon={<PenLine />}
        onClick={() => onEdit?.(group.id)}
      />
    </div>
  );
};
