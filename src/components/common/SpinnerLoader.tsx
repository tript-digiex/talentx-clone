import { LoaderCircle } from "lucide-react";

export function SpinnerLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <LoaderCircle className="size-6 animate-spin" aria-hidden="true" />
    </div>
  );
}
