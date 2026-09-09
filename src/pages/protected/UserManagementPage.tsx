import { MODAL_MODE } from "@/constants/modal.constants";
import { DEFAULT_PAGE_NUMBER } from "@/constants/pagination.constants";
import { DeleteUserModal } from "@/features/user-management/components/DeleteUserModal";
import { UserFormModal } from "@/features/user-management/components/UserFormModal";
import { UserManagementList } from "@/features/user-management/components/UserManagementList";
import { useState } from "react";

export function UserManagementPage() {
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [modalMode, setModalMode] = useState<MODAL_MODE | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleOpenAddModal = () => {
    setSelectedUserId(null);
    setModalMode(MODAL_MODE.ADD);
  };

  const handleEditUser = (userId: string) => {
    setSelectedUserId(userId);
    setModalMode(MODAL_MODE.EDIT);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
    setModalMode(null);
    setIsDeleteConfirmOpen(false);
  };

  const handleOpenDeleteConfirm = () => {
    setIsDeleteConfirmOpen(true);
  };

  return (
    <>
      <UserManagementList
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
        onAdd={handleOpenAddModal}
        onEdit={handleEditUser}
      />

      <UserFormModal
        open={modalMode !== null}
        mode={modalMode}
        userId={selectedUserId}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseModal();
          }
        }}
        onDelete={handleOpenDeleteConfirm}
      />

      <DeleteUserModal
        open={isDeleteConfirmOpen}
        userId={selectedUserId}
        onOpenChange={setIsDeleteConfirmOpen}
        onDeleted={handleCloseModal}
      />
    </>
  );
}
