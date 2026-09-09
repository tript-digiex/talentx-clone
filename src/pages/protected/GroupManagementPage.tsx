import { MODAL_MODE } from "@/constants/modal.constants";
import { DEFAULT_PAGE_NUMBER } from "@/constants/pagination.constants";
import { DeleteGroupModal } from "@/features/group-management/components/DeleteGroupModal";
import { GroupFormModal } from "@/features/group-management/components/GroupFormModal";
import { GroupManagementList } from "@/features/group-management/components/GroupManagementList";
import { useState } from "react";

export function GroupManagementPage() {
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [modalMode, setModalMode] = useState<MODAL_MODE | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleOpenAddModal = () => {
    setSelectedGroup(null);
    setModalMode(MODAL_MODE.ADD);
  };

  const handleEditGroup = (groupId: string) => {
    setSelectedGroup(groupId);
    setModalMode(MODAL_MODE.EDIT);
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setSelectedGroup(null);
    setIsDeleteConfirmOpen(false);
  };

  const handleOpenDeleteConfirm = () => {
    setIsDeleteConfirmOpen(true);
  };

  return (
    <>
      <GroupManagementList
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
        onAdd={handleOpenAddModal}
        onEdit={handleEditGroup}
      />

      <GroupFormModal
        open={modalMode !== null}
        mode={modalMode}
        groupId={selectedGroup}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseModal();
          }
        }}
        onDelete={handleOpenDeleteConfirm}
      />

      <DeleteGroupModal
        open={isDeleteConfirmOpen}
        groupId={selectedGroup}
        onOpenChange={setIsDeleteConfirmOpen}
        onDeleted={handleCloseModal}
      />
    </>
  );
}
