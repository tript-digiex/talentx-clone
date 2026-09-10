import { CommonModal } from "@/components/common/CommonModal";
import { SpinnerLoader } from "@/components/common/SpinnerLoader";
import Button from "@/components/ui/custom/Button";
import Input from "@/components/ui/custom/Input";
import RadioGroup from "@/components/ui/custom/RadioGroup";
import Select from "@/components/ui/custom/Select";
import { MODAL_MODE } from "@/constants/modal.constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { useCreateUser } from "../hooks/useCreateUser";
import { useGetUserDetail } from "../hooks/useGetUserDetail";
import { useGetGroupMember } from "../hooks/useGetGroupMember";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { createUserSchema } from "../schemas/user.schemas";
import {
  DEFAULT_CREATE_USER_FORM_VALUES,
  USER_MODAL_MODE_CONFIG,
  USER_ROLE_OPTIONS,
  USER_ROLES,
} from "../types/user.constants";
import type { CreateUserPayload } from "../types/user.types";

type UserFormModalProps = {
  open: boolean;
  mode: MODAL_MODE | null;
  userId: string | null;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
};

export function UserFormModal({
  open,
  mode,
  userId,
  onOpenChange,
  onDelete,
}: UserFormModalProps) {
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const {
    userDetail,
    errorMessage: userDetailErrorMessage,
    isLoading: isUserDetailLoading,
  } = useGetUserDetail(userId, mode === MODAL_MODE.EDIT);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors: createUserErrors },
  } = useForm<CreateUserPayload>({
    resolver: zodResolver(createUserSchema),
    defaultValues: DEFAULT_CREATE_USER_FORM_VALUES,
    mode: "onSubmit",
  });

  const selectedRole = useWatch({
    control,
    name: "role",
  });
  const isMemberRole = selectedRole === USER_ROLES.ADMIN_MEMBER;

  const {
    groupMembers,
    errorMessage: groupMemberErrorMessage,
    isLoading: isGroupMemberLoading,
  } = useGetGroupMember(open && isMemberRole);

  const handleCloseModal = () => {
    onOpenChange(false);
    reset(DEFAULT_CREATE_USER_FORM_VALUES);
  };

  const handleSubmitUser = (data: CreateUserPayload) => {
    if (mode === MODAL_MODE.EDIT) {
      if (!userId) {
        toast.error("User id is required");
        return;
      }

      updateUserMutation.mutate(
        {
          userId,
          data,
        },
        {
          onSuccess: (response) => {
            if (response.success) {
              handleCloseModal();
            }
          },
        },
      );

      return;
    }

    createUserMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.success) {
          handleCloseModal();
        }
      },
    });
  };

  useEffect(() => {
    if (!isMemberRole) {
      setValue("group_member_id", "", {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [isMemberRole, setValue]);

  useEffect(() => {
    if (mode !== MODAL_MODE.EDIT || !userDetail) {
      return;
    }

    reset({
      first_name: userDetail.first_name,
      last_name: userDetail.last_name,
      email: userDetail.email,
      role: userDetail.role,
      group_member_id: userDetail.group_member?.id ?? "",
      permissions: [],
    });
  }, [mode, reset, userDetail]);

  if (!mode) {
    return null;
  }

  const isEditMode = mode === MODAL_MODE.EDIT;
  const modalConfig = USER_MODAL_MODE_CONFIG[mode];

  return (
    <CommonModal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleCloseModal();
        }
      }}
      icon={<UserPlus className="size-6" />}
      title={modalConfig.title}
      description={modalConfig.description}
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

          {mode === MODAL_MODE.EDIT && userId && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onDelete}
            >
              Delete
            </Button>
          )}

          <Button
            type="button"
            size="sm"
            loading={
              isUserDetailLoading ||
              createUserMutation.isPending ||
              updateUserMutation.isPending
            }
            onClick={handleSubmit(handleSubmitUser, (errors) => {
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
      {isEditMode && isUserDetailLoading ? (
        <div className="flex justify-center py-6">
          <SpinnerLoader />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            <Input
              {...register("first_name")}
              label="First Name"
              type="text"
              placeholder="Enter first name"
              required
              error={!!createUserErrors.first_name}
              helperText={createUserErrors.first_name?.message}
            />

            <Input
              {...register("last_name")}
              label="Last Name"
              type="text"
              placeholder="Enter last name"
              required
              error={!!createUserErrors.last_name}
              helperText={createUserErrors.last_name?.message}
            />
          </div>

          <Input
            {...register("email")}
            label="Email"
            type="email"
            placeholder="Enter email"
            disabled={isEditMode}
            required
            error={!!createUserErrors.email}
            helperText={createUserErrors.email?.message}
          />

          {userDetailErrorMessage && (
            <p className="text-sm font-medium text-red-500">
              {userDetailErrorMessage}
            </p>
          )}

          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <RadioGroup
                name={field.name}
                label="Role"
                required
                options={USER_ROLE_OPTIONS}
                value={field.value}
                error={!!createUserErrors.role}
                helperText={createUserErrors.role?.message}
                onValueChange={field.onChange}
              />
            )}
          />

          {isMemberRole && (
            <Controller
              control={control}
              name="group_member_id"
              render={({ field }) => (
                <Select
                  name={field.name}
                  label="Group"
                  required
                  placeholder="Choose group"
                  loading={isGroupMemberLoading}
                  options={groupMembers.map((groupMember) => ({
                    value: groupMember.id,
                    label: groupMember.name,
                  }))}
                  value={field.value}
                  error={
                    !!createUserErrors.group_member_id ||
                    !!groupMemberErrorMessage
                  }
                  helperText={
                    createUserErrors.group_member_id?.message ??
                    groupMemberErrorMessage
                  }
                  maxVisibleItems={5}
                  menuPlacement="top"
                  onBlur={field.onBlur}
                  onValueChange={field.onChange}
                />
              )}
            />
          )}
        </>
      )}
    </CommonModal>
  );
}
