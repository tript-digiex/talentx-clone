import { useState } from "react";
import { useCategoryList } from "../../hooks/category/useCategoryList";
import { CategorySection } from "./CategorySection";
import { SkillSection } from "./SkillSection";

export const CategoryTab = () => {
  const {
    categories,
    isLoading: isCategoryListLoading,
    isError: isCategoryListError,
    errorMessage,
  } = useCategoryList();
  const [activeCategoryId, setActiveCategoryId] = useState("");

  const activeCategory = categories.find(
    (category) => category.id === activeCategoryId,
  );

  return (
    <div className="flex gap-4">
      <CategorySection
        categories={categories}
        isLoading={isCategoryListLoading}
        isError={isCategoryListError}
        errorMessage={errorMessage}
        activeCategoryId={activeCategoryId}
        setActiveCategoryId={setActiveCategoryId}
      />
      <SkillSection categoryId={activeCategory?.id ?? ""} />
    </div>
  );
};
