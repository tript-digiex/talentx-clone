import { cn } from "@/lib/utils";
import { tabsListVariants, tabsTriggerVariants } from "./tabs.variants";
import { TABS_VARIANT } from "./tabs.constants";
import type { TabsProps } from "./tabs.types";

const Tabs = ({
  items = [],
  value = "",
  onChange,
  variant = TABS_VARIANT.UNDERLINE,
  className,
  listClassName,
  triggerClassName,
}: TabsProps) => {
  return (
    <div className={className}>
      <div
        className={cn(
          tabsListVariants({
            variant,
          }),
          listClassName,
        )}
      >
        {items.map((item) => {
          const isActive = item.value === value;

          return (
            <button
              key={item.value}
              type="button"
              disabled={item.disabled}
              data-active={isActive}
              onClick={() => onChange(item.value)}
              className={cn(
                tabsTriggerVariants({
                  variant,
                  active: isActive,
                }),
                triggerClassName,
              )}
            >
              {item.icon && <span className="mr-2 shrink-0">{item.icon}</span>}

              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
