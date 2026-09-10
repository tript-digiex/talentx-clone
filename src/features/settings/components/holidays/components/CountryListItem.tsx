import Button from "@/components/ui/custom/Button";
import { getCountryInfo } from "@/features/settings/utils/setting.utils";
import { cn } from "@/lib/utils";
import { PencilLine, X } from "lucide-react";

type CountryListItemProps = {
  active: boolean;
  country_code: string;
  onClick: () => void;
};

export const CountryListItem = ({
  active,
  country_code,
  onClick,
}: CountryListItemProps) => {
  return (
    <div className="w-full flex items-center gap-1 my-2">
      <div
        onClick={onClick}
        className={cn(
          "flex-1 flex items-center justify-between border px-2 py-1 rounded-md",
          active && "bg-gray-300",
        )}
      >
        <div className="font-semibold">
          {getCountryInfo(country_code)?.name}
        </div>
        <div>
          <Button
            leftIcon={<PencilLine className="size-4" />}
            size="sm"
            variant="secondary"
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
