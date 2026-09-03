import { LoaderCircle } from "lucide-react";

export const showRightIcon = (loading: boolean, rightIcon?: React.ReactNode) => {
  if (loading) {
    return <LoaderCircle className="ml-1 h-4 w-4 animate-spin" />;
  }

  return rightIcon;
}
