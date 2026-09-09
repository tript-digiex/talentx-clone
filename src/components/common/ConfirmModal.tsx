import Button from "@/components/ui/custom/Button";
import { cn } from "@/lib/utils";
import { Trash2, X } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { useId } from "react";
import { createPortal } from "react-dom";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: ReactNode;
  loading?: boolean;
  className?: string;
  closeOnOverlayClick?: boolean;
};

export const ConfirmModal = ({
  open,
  title,
  description,
  onOpenChange,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  icon = <Trash2 className="size-5" />,
  loading = false,
  className,
  closeOnOverlayClick = true,
}: ConfirmModalProps) => {
  const titleId = useId();

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
      className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/30 px-4"
      onMouseDown={handleOverlayClick}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "w-[min(364px,calc(100vw-2rem))] rounded-2xl bg-white px-6 py-6 shadow-xl",
          className,
        )}
      >
        <div className="flex items-start justify-between">
          <div className="flex size-11 items-center justify-center rounded-full bg-red-100 text-red-600">
            {icon}
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="size-8 text-slate-400 hover:text-slate-700"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-5" />
          </Button>
        </div>

        <div className="mt-4">
          <h2 id={titleId} className="text-lg font-bold text-slate-950">
            {title}
          </h2>
          <p className="mt-1 text-sm leading-5 text-slate-600">{description}</p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9 w-full"
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel}
          </Button>

          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="h-9 w-full bg-red-600 text-white hover:bg-red-700"
            loading={loading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </section>
    </div>,
    document.body,
  );
};
