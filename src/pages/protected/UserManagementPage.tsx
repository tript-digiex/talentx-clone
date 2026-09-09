import { MODAL_MODE } from "@/constants/modal.constants";
import { DEFAULT_PAGE_NUMBER } from "@/constants/pagination.constants";
import { UserFormModal } from "@/features/user-management/components/UserFormModal";
import { UserManagementList } from "@/features/user-management/components/UserManagementList";
import { useState } from "react";

export function UserManagementPage() {
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [modalMode, setModalMode] = useState<MODAL_MODE | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

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
  };

  const handleDeleteUser = () => {
    handleCloseModal();
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
        onDelete={handleDeleteUser}
      />
    </>
  );
}
