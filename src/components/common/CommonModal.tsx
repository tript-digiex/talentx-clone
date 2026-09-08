import Button from "@/components/ui/custom/Button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, useId, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";

type CommonModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  description?: string;
  icon?: ReactNode;
  footer?: ReactNode;
  className?: string;
  bodyClassName?: string;
  closeOnOverlayClick?: boolean;
};

export const CommonModal = ({
  open,
  onOpenChange,
  title,
  description,
  icon,
  children,
  footer,
  className,
  bodyClassName,
  closeOnOverlayClick = true,
}: CommonModalProps) => {
  const titleId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOpenChange, open]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onOpenChange(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 px-4 py-8"
      onMouseDown={handleOverlayClick}
    >
      <section
        role="dialog"
        aria-labelledby={titleId}
        className={cn(
          "flex max-h-[calc(100vh-4rem)] w-[min(696px,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl",
          className,
        )}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div className="flex min-w-0 items-center gap-4">
            {icon && (
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-700">
                {icon}
              </div>
            )}

            <div className="min-w-0 pt-1">
              <h2 id={titleId} className="text-lg font-bold text-slate-950">
                {title}
              </h2>

              {description && (
                <p className="mt-1 text-sm text-slate-700">{description}</p>
              )}
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            leftIcon={<X className="size-6" />}
            className="text-slate-400 hover:text-slate-700"
            onClick={() => onOpenChange(false)}
          />
        </header>

        <div
          className={cn(
            "min-h-0 flex-1 overflow-y-auto px-6 py-5",
            bodyClassName,
          )}
        >
          {children}
        </div>

        {footer && (
          <footer className="flex shrink-0 justify-end gap-3 border-t border-slate-200 px-6 py-4">
            {footer}
          </footer>
        )}
      </section>
    </div>,
    document.body,
  );
};
