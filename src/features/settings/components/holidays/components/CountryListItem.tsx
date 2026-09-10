import Button from "@/components/ui/custom/Button";
import type { CountryData } from "@/features/settings/types/holidays/holidays.types";
import { getCountryInfo } from "@/features/settings/utils/setting.utils";
import { cn } from "@/lib/utils";
import { PencilLine, X } from "lucide-react";

type CountryListItemProps = {
  active: boolean;
  country: CountryData;
  onClick: () => void;
  onEdit: () => void;
};

export const CountryListItem = ({
  active,
  country,
  onClick,
  onEdit,
}: CountryListItemProps) => {
  return (
    <div className="w-full flex items-center gap-1 my-2">
      <div
        onClick={onClick}
        className={cn(
          "flex-1 flex items-center justify-between border px-4 py-1 rounded-md",
          active && "bg-gray-300",
        )}
      >
        <div className="font-semibold">
          {getCountryInfo(country.country_code)?.name}
        </div>
        <div>
          <Button
            type="button"
            leftIcon={<PencilLine className="size-4" />}
            size="sm"
            variant="secondary"
            onClick={(event) => {
              event.stopPropagation();
              onEdit();
            }}
          />
        </div>
      </div>
      <Button
        leftIcon={<X className="size-6" />}
        size="sm"
        variant="secondary"
      />
    </div>
  );
};
