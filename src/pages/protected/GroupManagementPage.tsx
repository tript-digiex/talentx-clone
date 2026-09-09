import { ErrorMessage } from "@/components/common/ErrorMessage";
import { CommonModal } from "@/components/common/CommonModal";
import { ManagementPagination } from "@/components/common/ManagementPagination";
import { SpinnerLoader } from "@/components/common/SpinnerLoader";
import Button from "@/components/ui/custom/Button";
import Input from "@/components/ui/custom/Input";
import Textarea from "@/components/ui/custom/Textarea";
import { GroupListItem } from "@/features/group-management/components/GroupListItem";
import { GroupPermissionsAccess } from "@/features/group-management/components/GroupPermissionsAccess";
import { useGroupManagementList } from "@/features/group-management/hooks/useGroupManagementList";
import {
  DEFAULT_GROUP_FORM_VALUES,
  DEFAULT_GROUP_MANAGEMENT_PAGE_SIZE,
  GROUP_MODAL_MODE_CONFIG,
} from "@/features/group-management/types/group.constants";
import type { CreateGroupPayload } from "@/features/group-management/types/group.types";
import { ClipboardList, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { MODAL_MODE } from "@/types/modal.constants";
import { useGroupPermission } from "@/features/group-management/hooks/useGroupPermission";
import { useCreateGroup } from "@/features/group-management/hooks/useCreateGroup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGroupSchema } from "@/features/group-management/schemas/group.schema";
import { toast } from "sonner";
import { useGetGroupDetail } from "@/features/group-management/hooks/useGetGroupDetail";
import { useUpdateGroup } from "@/features/group-management/hooks/useUpdateGroup";

export function GroupManagementPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(DEFAULT_GROUP_MANAGEMENT_PAGE_SIZE);
  const [modalMode, setModalMode] = useState<MODAL_MODE | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const { groups, pagination, errorMessage, isLoading } =
    useGroupManagementList(pageNumber, pageSize);

  const {
    groupDetail,
    errorMessage: groupDetailErrorMessage,
    isLoading: isGroupDetailLoading,
  } = useGetGroupDetail(selectedGroup, modalMode === MODAL_MODE.EDIT);

  const {
    listPermissions,
    errorMessage: permissionErrorMessage,
    isLoading: isPermissionLoading,
  } = useGroupPermission(modalMode !== null);

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

  const handleOpenAddModal = () => {
    setSelectedGroup(null);
    setSelectedPermissions([]);
    reset(DEFAULT_GROUP_FORM_VALUES);
    setModalMode(MODAL_MODE.ADD);
  };

  const handleEditGroup = (groupId: string) => {
    setSelectedGroup(groupId);
    setSelectedPermissions([]);
    setModalMode(MODAL_MODE.EDIT);
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setSelectedGroup(null);
    setSelectedPermissions([]);
    reset(DEFAULT_GROUP_FORM_VALUES);
  };

  const handlePageChange = (nextPageNumber: number) => {
    setPageNumber(nextPageNumber);
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
    if (modalMode === MODAL_MODE.EDIT) {
      if (!selectedGroup) {
        toast.error("Group id is required");
        return;
      }

      updateGroupMutation.mutate(
        {
          groupId: selectedGroup,
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
    if (modalMode !== MODAL_MODE.EDIT || !groupDetail) return;

    const permissions = (groupDetail.module_access ?? []).flatMap(
      (module) => module.permissions,
    );

    reset({
      name: groupDetail.name,
      description: groupDetail.description ?? "",
      permissions,
    });

    setSelectedPermissions(permissions);
  }, [groupDetail, modalMode, reset]);

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (errorMessage) {
    return <ErrorMessage errorMessage={errorMessage} />;
  }

  return (
    <>
      <section className="border bg-[#FBFCFE] px-4 py-6 rounded-xl">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Groups</h1>
          <Button
            size="lg"
            className="px-4"
            leftIcon={<PlusIcon />}
            onClick={handleOpenAddModal}
          >
            Add
          </Button>
        </div>
        <div className="mt-4 h-screen overflow-y-auto">
          {groups.map((group) => (
            <GroupListItem
              key={group.id}
              group={group}
              onEdit={handleEditGroup}
            />
          ))}
        </div>

        <ManagementPagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </section>

      <CommonModal
        key={selectedGroup ?? modalMode}
        open={modalMode !== null}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseModal();
          }
        }}
        icon={<ClipboardList className="size-6" />}
        title={
          modalMode === MODAL_MODE.EDIT
            ? GROUP_MODAL_MODE_CONFIG[MODAL_MODE.EDIT].title
            : GROUP_MODAL_MODE_CONFIG[MODAL_MODE.ADD].title
        }
        description={
          modalMode === MODAL_MODE.EDIT
            ? GROUP_MODAL_MODE_CONFIG[MODAL_MODE.EDIT].description
            : GROUP_MODAL_MODE_CONFIG[MODAL_MODE.ADD].description
        }
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

            {modalMode === MODAL_MODE.EDIT && (
              <Button type="button" variant="outline" size="sm">
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
              {modalMode === MODAL_MODE.EDIT
                ? GROUP_MODAL_MODE_CONFIG[MODAL_MODE.EDIT].submitButton
                : GROUP_MODAL_MODE_CONFIG[MODAL_MODE.ADD].submitButton}
            </Button>
          </>
        }
      >
        {modalMode === MODAL_MODE.EDIT && isGroupDetailLoading ? (
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
    </>
  );
}
