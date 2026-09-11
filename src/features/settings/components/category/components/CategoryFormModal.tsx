import { CommonModal } from "@/components/common/CommonModal";
import Button from "@/components/ui/custom/Button";
import Input from "@/components/ui/custom/Input";
import { MODAL_MODE } from "@/constants/modal.constants";
import { useCreateCategory } from "@/features/settings/hooks/category/useCreateCategory";
import { useUpdateCategory } from "@/features/settings/hooks/category/useUpdateCategory";
import { categorySchema } from "@/features/settings/schemas/cateogry.schemas";
import { CATEGORY_MODAL_MODE_CONFIG, DEFAULT_CATEGORY_FORM_VALUES } from "@/features/settings/types/category/category.constants";
import type { CategoryData, CategoryPayload } from "@/features/settings/types/category/category.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type CategoryFormModalProps = {
  open: boolean;
  mode: MODAL_MODE | null;
  category: CategoryData | null;
  onOpenChange: (open: boolean) => void;
  setActiveCategoryId: (categoryId: string) => void;
};

export const CategoryFormModal = ({
  open,
  mode,
  category,
  onOpenChange,
  setActiveCategoryId,
}: CategoryFormModalProps) => {
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: categoryErrors },
  } = useForm<CategoryPayload>({
    resolver: zodResolver(categorySchema),
    defaultValues: DEFAULT_CATEGORY_FORM_VALUES,
    mode: "onSubmit",
  });

  const handleCloseModal = () => {
    onOpenChange(false);
    reset(DEFAULT_CATEGORY_FORM_VALUES);
  };

  const handleSubmitCountry = (data: CategoryPayload) => {
    if (mode === MODAL_MODE.EDIT) {
      if (!category?.id) {
        toast.error("Category id is required");
        return;
      }

      updateCategoryMutation.mutate(
        { categoryId: category.id, payload: data },
        {
          onSuccess: (response) => {
            if (response.success) {
              handleCloseModal();
              setActiveCategoryId(response.data.id);
            }
          },
        },
      )
      return;
    }

    createCategoryMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.success) {
          handleCloseModal();
          setActiveCategoryId(response.data.id);
        }
      },
    });
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    reset({
      name: category?.name ?? DEFAULT_CATEGORY_FORM_VALUES.name,
    });
  }, [category, open, reset]);

  if (!mode) {
    return null;
  }

  const modalConfig = CATEGORY_MODAL_MODE_CONFIG[mode];

  return (
    <CommonModal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleCloseModal();
        }
      }}
      title={modalConfig.title}
      bodyClassName="space-y-5"
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={handleCloseModal}
            size="sm"
          >
            Cancel
          </Button>

          <Button
            type="button"
            size="sm"
            loading={createCategoryMutation.isPending}
            onClick={handleSubmit(handleSubmitCountry, (errors) => {
              const firstError = Object.values(errors)[0]?.message;

              if (firstError) {
                toast.error(firstError);
              }
            })}
          >
            {modalConfig.submitButton}
          </Button>
        </>
      }
    >
      <Input
        {...register("name")}
        label="Category name"
        required
        placeholder="New category name"
        type="text"
        error={!!categoryErrors.name}
        helperText={categoryErrors.name?.message}
      />
    </CommonModal>
  );
};
