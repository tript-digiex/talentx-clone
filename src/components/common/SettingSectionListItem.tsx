import Button from "@/components/ui/custom/Button";
import { cn } from "@/lib/utils";
import { PencilLine, X } from "lucide-react";

type SettingSectionListItemProps = {
  imageSrc?: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const SettingSectionListItem = ({
  imageSrc,
  label,
  active = false,
  onClick,
  onEdit,
  onDelete,
}: SettingSectionListItemProps) => {
  return (
    <div className="w-full flex items-center gap-1 my-2">
      <div
        onClick={onClick}
        className={cn(
          "flex-1 flex items-center justify-between border px-4 py-1 rounded-md",
          active && "bg-gray-300",
        )}
      >
        <div className="flex items-center gap-2">
          {imageSrc && (
            <img
              src={imageSrc}
              alt="image"
              className="size-6 rounded-full object-cover"
            />
          )}

          <div className="font-semibold">{label}</div>
        </div>

        <Button
          type="button"
          leftIcon={<PencilLine className="size-4" />}
          size="sm"
          variant="secondary"
          onClick={(event) => {
            event.stopPropagation();
            onEdit?.();
          }}
        />
      </div>
      <Button
        type="button"
        leftIcon={<X className="size-6" />}
        size="sm"
        variant="secondary"
        onClick={(event) => {
          event.stopPropagation();
          onDelete?.();
        }}
      />
    </div>
  );
};
