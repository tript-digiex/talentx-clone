import { cn } from "@/lib/utils";
import { TAG_ICON_POSITION, TAG_VARIANTS } from "./tag.constants";
import type { TagProps } from "./tag.types";
import { tagVariants } from "./tag.variants";
import { shouldRenderTagIcon } from "./tag.utils";

const Tag = ({
  value = "Tag",
  variant = TAG_VARIANTS.DEFAULT,
  icon,
  iconPosition = TAG_ICON_POSITION.LEFT,
  className,
  title,
  ...props
}: TagProps) => {
  return (
    <span
      className={cn(tagVariants({ variant }), className)}
      title={title ?? value}
      {...props}
    >
      {shouldRenderTagIcon(iconPosition, TAG_ICON_POSITION.LEFT, icon) && (
        <span className="flex size-4 shrink-0 items-center justify-center">
          {icon}
        </span>
      )}
      <span className="truncate">{value}</span>
      {shouldRenderTagIcon(iconPosition, TAG_ICON_POSITION.RIGHT, icon) && (
        <span className="flex size-4 shrink-0 items-center justify-center">
          {icon}
        </span>
      )}
    </span>
  );
};

export default Tag;
