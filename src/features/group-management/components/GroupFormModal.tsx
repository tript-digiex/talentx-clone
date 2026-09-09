import { CommonModal } from "@/components/common/CommonModal";
import { SpinnerLoader } from "@/components/common/SpinnerLoader";
import Button from "@/components/ui/custom/Button";
import Input from "@/components/ui/custom/Input";
import Textarea from "@/components/ui/custom/Textarea";
import { GroupPermissionsAccess } from "@/features/group-management/components/GroupPermissionsAccess";
import { useCreateGroup } from "@/features/group-management/hooks/useCreateGroup";
import { useGetGroupDetail } from "@/features/group-management/hooks/useGetGroupDetail";
import { useGroupPermission } from "@/features/group-management/hooks/useGroupPermission";
import { useUpdateGroup } from "@/features/group-management/hooks/useUpdateGroup";
import {
  GROUP_MODAL_MODE_CONFIG,
  DEFAULT_GROUP_FORM_VALUES,
} from "@/features/group-management/types/group.constants";
import type { CreateGroupPayload } from "@/features/group-management/types/group.types";
import { createGroupSchema } from "@/features/group-management/schemas/group.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardList } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MODAL_MODE } from "@/constants/modal.constants";

type GroupFormModalProps = {
  open: boolean;
  mode: MODAL_MODE | null;
  groupId: string | null;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
};

export function GroupFormModal({
  open,
  mode,
  groupId,
  onOpenChange,
  onDelete,
}: GroupFormModalProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const {
    groupDetail,
    errorMessage: groupDetailErrorMessage,
    isLoading: isGroupDetailLoading,
  } = useGetGroupDetail(groupId, mode === MODAL_MODE.EDIT);

  const {
    listPermissions,
    errorMessage: permissionErrorMessage,
    isLoading: isPermissionLoading,
  } = useGroupPermission(mode !== null);

  const createGroupMutation = useCreateGroup();
  const updateGroupMutation = useUpdateGroup();

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors: createGroupErrors },
  } = useForm<CreateGroupPayload>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: DEFAULT_GROUP_FORM_VALUES,
    mode: "onSubmit",
  });

  const handleCloseModal = () => {
    onOpenChange(false);
    setSelectedPermissions([]);
    reset(DEFAULT_GROUP_FORM_VALUES);
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setSelectedPermissions((currentPermissions) => {
      const nextPermissions = checked
        ? currentPermissions.includes(permission)
          ? currentPermissions
          : [...currentPermissions, permission]
        : currentPermissions.filter(
            (currentPermission) => currentPermission !== permission,
          );

      setValue("permissions", nextPermissions, {
        shouldValidate: true,
        shouldDirty: true,
      });

      return nextPermissions;
    });
  };

  const handleSubmitGroup = (data: CreateGroupPayload) => {
    if (mode === MODAL_MODE.EDIT) {
      if (!groupId) {
        toast.error("Group id is required");
        return;
      }

      updateGroupMutation.mutate(
        {
          groupId,
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

    createGroupMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.success) {
          handleCloseModal();
        }
      },
    });
  };

  useEffect(() => {
    if (mode !== MODAL_MODE.EDIT || !groupDetail) return;

    const permissions = (groupDetail.module_access ?? []).flatMap(
      (module) => module.permissions,
    );

    reset({
      name: groupDetail.name,
      description: groupDetail.description ?? "",
      permissions,
    });

    setSelectedPermissions(permissions);
  }, [groupDetail, mode, reset]);

  if (!mode) {
    return null;
  }

  const modalConfig = GROUP_MODAL_MODE_CONFIG[mode];

  return (
    <CommonModal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleCloseModal();
        }
      }}
      icon={<ClipboardList className="size-6" />}
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

          {mode === MODAL_MODE.EDIT && (
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
              isGroupDetailLoading ||
              createGroupMutation.isPending ||
              updateGroupMutation.isPending
            }
            onClick={handleSubmit(handleSubmitGroup, (errors) => {
              const permissionError = errors.permissions?.message;

              if (permissionError) {
                toast.error(permissionError);
              }
            })}
          >
            {modalConfig.submitButton}
          </Button>
        </>
      }
    >
      {mode === MODAL_MODE.EDIT && isGroupDetailLoading ? (
        <div className="flex justify-center py-6">
          <SpinnerLoader />
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <Input
              {...register("name")}
              label="Group name"
              type="text"
              placeholder="Enter group name"
              required
              error={!!createGroupErrors.name}
              helperText={createGroupErrors.name?.message}
            />
          </div>

          <Textarea
            {...register("description")}
            label="Description"
            placeholder="Basic access to shared features"
          />

          {groupDetailErrorMessage && (
            <p className="text-sm font-medium text-red-500">
              {groupDetailErrorMessage}
            </p>
          )}

          {isPermissionLoading && (
            <p className="text-sm font-medium text-slate-500">
              Loading permissions...
            </p>
          )}

          {permissionErrorMessage && (
            <p className="text-sm font-medium text-red-500">
              {permissionErrorMessage}
            </p>
          )}

          {!isPermissionLoading &&
            !permissionErrorMessage &&
            !isGroupDetailLoading && (
              <GroupPermissionsAccess
                permissions={listPermissions}
                selectedPermissions={selectedPermissions}
                onPermissionChange={handlePermissionChange}
              />
            )}
        </>
      )}
    </CommonModal>
  );
}
