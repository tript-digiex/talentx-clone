import { useEffect, useState, type CSSProperties, type RefObject } from "react";
import { OPTION_HEIGHT } from "../select.constants";

type MenuPosition = {
  left: number;
  top: number;
  width: number;
  maxHeight: number;
};

type UseSelectMenuPositionProps = {
  triggerRef: RefObject<HTMLButtonElement | null>;
  open: boolean;
  menuPlacement: "top" | "bottom";
  maxVisibleItems: number;
  searchable: boolean;
};

export const useSelectMenuPosition = ({
  triggerRef,
  open,
  menuPlacement,
  maxVisibleItems,
  searchable,
}: UseSelectMenuPositionProps) => {
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);

  const menuMaxHeight = OPTION_HEIGHT * maxVisibleItems;
  const searchAreaHeight = searchable ? 56 : 0;
  const menuChromeHeight = 8;

  const desiredMenuHeight = menuMaxHeight + searchAreaHeight + menuChromeHeight;

  useEffect(() => {
    if (!open) {
      setMenuPosition(null);
      return;
    }

    const updateMenuPosition = () => {
      const triggerElement = triggerRef.current;

      if (!triggerElement) {
        return;
      }

      const triggerRect = triggerElement.getBoundingClientRect();

      const viewportPadding = 16;
      const menuOffset = 4;

      const menuWidth = Math.min(
        triggerRect.width,
        window.innerWidth - viewportPadding * 2,
      );

      const left = Math.min(
        Math.max(triggerRect.left, viewportPadding),
        window.innerWidth - menuWidth - viewportPadding,
      );

      const availableBelow =
        window.innerHeight - triggerRect.bottom - viewportPadding - menuOffset;

      const availableAbove = triggerRect.top - viewportPadding - menuOffset;

      const shouldOpenTop =
        menuPlacement === "top" ||
        (availableBelow < desiredMenuHeight && availableAbove > availableBelow);

      const availableSpace = shouldOpenTop ? availableAbove : availableBelow;

      const maxHeight = Math.max(
        OPTION_HEIGHT + searchAreaHeight + menuChromeHeight,
        Math.min(desiredMenuHeight, availableSpace),
      );

      setMenuPosition({
        left,
        top: shouldOpenTop
          ? Math.max(viewportPadding, triggerRect.top - maxHeight - menuOffset)
          : triggerRect.bottom + menuOffset,
        width: menuWidth,
        maxHeight,
      });
    };

    updateMenuPosition();

    window.addEventListener("resize", updateMenuPosition);

    window.addEventListener("scroll", updateMenuPosition, true);

    return () => {
      window.removeEventListener("resize", updateMenuPosition);

      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [triggerRef, open, menuPlacement, desiredMenuHeight, searchAreaHeight]);

  const optionsMaxHeight = menuPosition
    ? Math.max(
        OPTION_HEIGHT,
        Math.min(
          menuMaxHeight,
          menuPosition.maxHeight - searchAreaHeight - menuChromeHeight,
        ),
      )
    : menuMaxHeight;

  const menuStyle: CSSProperties | undefined = menuPosition
    ? {
        left: menuPosition.left,
        top: menuPosition.top,
        width: menuPosition.width,
        maxHeight: menuPosition.maxHeight,
      }
    : undefined;

  return {
    menuStyle,
    optionsMaxHeight,
  };
};
