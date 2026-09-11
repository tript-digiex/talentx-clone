import { SettingContainerSection } from "@/components/common/SettingContainerSection";

type SkillSectionProps = {
  categoryId: string;
};

export const SkillSection = ({ categoryId }: SkillSectionProps) => {
  return <SettingContainerSection title="Items">
    Skills
  </SettingContainerSection>;
};
