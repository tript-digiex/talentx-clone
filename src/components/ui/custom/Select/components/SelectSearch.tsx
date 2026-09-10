import { Search } from "lucide-react";
import Input from "@/components/ui/custom/Input";

type SelectSearchProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const SelectSearch = ({ value, placeholder, onChange }: SelectSearchProps) => {
  return (
    <div className="px-3 pb-2 pt-1">
      <Input
        type="search"
        value={value}
        placeholder={placeholder}
        leftIcon={<Search className="size-5" />}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          event.stopPropagation();
        }}
      />
    </div>
  );
};

export default SelectSearch;
