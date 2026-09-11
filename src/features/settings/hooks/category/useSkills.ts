import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "../../types/category/category.constants";
import { getSkillsByCategoryId } from "../../api/category.api";

export const useSkills = (categoryId: string) => {
  const query = useQuery({
    queryKey: categoryKeys.skills(categoryId),
    queryFn: () => getSkillsByCategoryId(categoryId),
  });

  const response = query.data;
  const skills = response?.success ? response.data : [];
  const errorMessage =
    response && !response.success
      ? response.error.message
      : query.error?.message;

  return {
    ...query,
    skills,
    errorMessage,
  };
};
