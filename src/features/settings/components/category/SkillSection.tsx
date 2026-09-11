import { SettingContainerSection } from "@/components/common/SettingContainerSection";
import { useSkills } from "../../hooks/category/useSkills";
import { SpinnerLoader } from "@/components/common/SpinnerLoader";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import Button from "@/components/ui/custom/Button";
import { MODAL_MODE } from "@/constants/modal.constants";
import { useState } from "react";
import { SettingSectionListItem } from "@/components/common/SettingSectionListItem";

type SkillSectionProps = {
  categoryId: string;
};

export const SkillSection = ({ categoryId }: SkillSectionProps) => {
  const { skills, isLoading, isError, errorMessage } = useSkills(categoryId);

  const [modalMode, setModalMode] = useState<MODAL_MODE | null>(null);

  const handleOpenAddHolidayModal = () => {
    setModalMode(MODAL_MODE.ADD);
  };

  if (!categoryId) {
    return (
      <div className="py-3 text-sm text-muted-foreground">
        Select a country to view holidays
      </div>
    );
  }

  if (categoryId && isLoading) {
    return <SpinnerLoader />;
  }

  if (categoryId && isError) {
    return (
      <ErrorMessage errorMessage={errorMessage || "Error loading holidays"} />
    );
  }

  return <>
    <SettingContainerSection title="Items">
      <Button
        type="button"
        className="font-normal p-4 my-2"
        onClick={handleOpenAddHolidayModal}
      >
        Add Holiday
      </Button>
      {categoryId && !isLoading && !isError && skills.length > 0 ? (
        <div className="flex-1">
          {skills.map((skill) => (
            <SettingSectionListItem
              key={skill.id}
              imageSrc={skill.icon}
              label={skill.name}
            />
          ))}
        </div>
      ) : null}
    </SettingContainerSection>

    {/* <HolidayFormModal
            countryHolidayId={countryHolidayId}
            open={modalMode !== null}
            mode={modalMode}
            holiday={selectedHoliday}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                handleCloseHolidayModal();
              }
            }}
          /> */}
  </>;
};
