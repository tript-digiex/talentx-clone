import { SettingContainerSection } from "@/components/common/SettingContainerSection";
import Button from "@/components/ui/custom/Button/Button";
import type { CategoryData } from "../../types/category/category.types";
import { SettingSectionListItem } from "@/components/common/SettingSectionListItem";
import { SpinnerLoader } from "@/components/common/SpinnerLoader";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { useEffect, useState } from "react";
import { CategoryFormModal } from "./components/CategoryFormModal";
import { MODAL_MODE } from "@/constants/modal.constants";

type CategorySectionProps = {
  categories: CategoryData[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | undefined;
  activeCategoryId: string;
  setActiveCategoryId: (categoryId: string) => void;
};

export const CategorySection = ({
  categories,
  isLoading,
  isError,
  errorMessage,
  activeCategoryId,
  setActiveCategoryId,
}: CategorySectionProps) => {
  const [modalMode, setModalMode] = useState<MODAL_MODE | null>(null);

  const handleOpenAddCountryModal = () => {
    setModalMode(MODAL_MODE.ADD);
  }

  useEffect(() => {
    if (categories.length > 0 && !activeCategoryId) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories, activeCategoryId]);

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (isError) {
    return (
      <ErrorMessage errorMessage={errorMessage || "Error loading countries"} />
    );
  }

  return (
    <>
      <SettingContainerSection title="Categories">
        <Button type="button" className="font-normal p-4 my-2" onClick={handleOpenAddCountryModal}>
          Add Category
        </Button>

        <div className="flex-1">
          {categories.map((category) => (
            <SettingSectionListItem
              key={category.id}
              label={category.name}
              active={activeCategoryId === category.id}
              onClick={() => setActiveCategoryId(category.id)}
            />
          ))}
        </div>
      </SettingContainerSection>

      <CategoryFormModal
        open={modalMode !== null}
        mode={modalMode}
        category={null}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setModalMode(null);
          }
        }}
        setActiveCategoryId={setActiveCategoryId}
      />
    </>
  );
};
