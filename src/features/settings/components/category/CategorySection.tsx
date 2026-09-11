import { SettingContainerSection } from "@/components/common/SettingContainerSection";
import Button from "@/components/ui/custom/Button/Button";
import type { CategoryData } from "../../types/category/category.types";
import { SettingSectionListItem } from "@/components/common/SettingSectionListItem";
import { SpinnerLoader } from "@/components/common/SpinnerLoader";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { useEffect, useState } from "react";
import { CategoryFormModal } from "./components/CategoryFormModal";
import { MODAL_MODE } from "@/constants/modal.constants";
import { DeleteCategoryModal } from "./components/DeleteCategoryModal";
import Input from "@/components/ui/custom/Input";

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
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(
    null,
  );
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [searchCategoryName, setSearchCategoryName] = useState("");


  const handleOpenAddCountryModal = () => {
    setSelectedCategory(null);
    setModalMode(MODAL_MODE.ADD);
  };

  const handleOpenEditCountryModal = (category: CategoryData) => {
    setSelectedCategory(category);
    setModalMode(MODAL_MODE.EDIT);
  };


  const handleCloseModal = () => {
    setSelectedCategory(null);
    setModalMode(null);
  };

  const handleOpenDeleteConfirm = (category: CategoryData) => {
    setSelectedCategory(category);
    setIsDeleteConfirmOpen(true);
  };

  const handleCloseDeleteConfirm = () => {
    setSelectedCategory(null);
    setIsDeleteConfirmOpen(false);
  };

  const filteredCategories = searchCategoryName.trim()
    ? categories.filter((category) =>
      category.name
        .toLowerCase()
        .includes(searchCategoryName.trim().toLowerCase()),
    )
    : categories;

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
        <div className="flex justify-between items-center">
           <Input
          type="search"
          placeholder="Search by category name..."
          value={searchCategoryName}
          onChange={(e) => setSearchCategoryName(e.target.value)}
        />
          <Button type="button" className="font-normal p-4 my-2" onClick={handleOpenAddCountryModal}>
          Add Category
        </Button>
       
        </div>

        <div className="flex-1">
          {filteredCategories.map((category) => (
            <SettingSectionListItem
              key={category.id}
              label={category.name}
              active={activeCategoryId === category.id}
              onClick={() => setActiveCategoryId(category.id)}
              onEdit={() => handleOpenEditCountryModal(category)}
              onDelete={() => handleOpenDeleteConfirm(category)}
            />
          ))}
        </div>
      </SettingContainerSection>

      <CategoryFormModal
        open={modalMode !== null}
        mode={modalMode}
        category={selectedCategory}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setModalMode(null);
          }
        }}
        setActiveCategoryId={setActiveCategoryId}
      />

      <DeleteCategoryModal
        open={isDeleteConfirmOpen}
        categoryId={selectedCategory?.id}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            handleCloseDeleteConfirm();
          }
        }}
        onDeleted={() => handleCloseDeleteConfirm()}
      />
    </>
  );
};
