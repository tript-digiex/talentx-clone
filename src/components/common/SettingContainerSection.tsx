import { type ReactNode } from "react";

type SettingContainerSectionProps = {
  title: string;
  children: ReactNode;
}

export const SettingContainerSection = ({title, children}: SettingContainerSectionProps) => {
  return (
    <div className="flex-1 border rounded-md">
      <div className="font-bold border-b px-4 py-2">{title}</div>
      <div className="px-4 p-2">{children}</div>
    </div>
  );
};
