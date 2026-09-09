import { SpinnerLoader } from "@/components/common/SpinnerLoader";
import { useUserManagementList } from "../hooks/useUserManagementList";
import { DEFAULT_USER_MANAGEMENT_PAGE_SIZE } from "../types/user.constants";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import Button from "@/components/ui/custom/Button";
import { PlusIcon } from "lucide-react";
import { UserListItem } from "./UserListItem";
import { ManagementPagination } from "@/components/common/ManagementPagination";

type GroupManagementListProps = {
  pageNumber: number;
  onPageChange: (page: number) => void;
  onAdd: () => void;
  onEdit: (userId: string) => void;
};

export const UserManagementList = ({
  pageNumber,
  onPageChange,
  onAdd,
  onEdit,
}: GroupManagementListProps) => {
  const pageSize = DEFAULT_USER_MANAGEMENT_PAGE_SIZE;

  const { users, pagination, errorMessage, isLoading } = useUserManagementList(
    pageNumber,
    pageSize,
  );

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (errorMessage) {
    return <ErrorMessage errorMessage={errorMessage} />;
  }

  return (
    <section className="rounded-xl border bg-[#FBFCFE] px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>

        <Button
          size="lg"
          className="px-4"
          leftIcon={<PlusIcon />}
          onClick={onAdd}
        >
          Add
        </Button>
      </div>

      <div className="mt-4 h-screen overflow-y-auto">
        {users.map((user) => (
          <UserListItem key={user.id} user={user} onEdit={onEdit} />
        ))}
      </div>

      <ManagementPagination
        pagination={pagination}
        onPageChange={onPageChange}
      />
    </section>
  );
};
