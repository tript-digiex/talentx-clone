import { ErrorMessage } from "@/components/common/ErrorMessage";
import { ManagementPagination } from "@/components/common/ManagementPagination";
import { SpinnerLoader } from "@/components/common/SpinnerLoader";
import Button from "@/components/ui/custom/Button";
import { GroupListItem } from "@/features/group-management/components/GroupListItem";
import { useGroupManagementList } from "@/features/group-management/hooks/useGroupManagementList";
import { DEFAULT_GROUP_MANAGEMENT_PAGE_SIZE } from "@/features/group-management/types/group.constants";
import { PlusIcon } from "lucide-react";

type GroupManagementListProps = {
  pageNumber: number;
  onPageChange: (page: number) => void;
  onAdd: () => void;
  onEdit: (groupId: string) => void;
};

export function GroupManagementList({
  pageNumber,
  onPageChange,
  onAdd,
  onEdit,
}: GroupManagementListProps) {
  const pageSize = DEFAULT_GROUP_MANAGEMENT_PAGE_SIZE;

  const { groups, pagination, errorMessage, isLoading } =
    useGroupManagementList(pageNumber, pageSize);

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (errorMessage) {
    return <ErrorMessage errorMessage={errorMessage} />;
  }

  return (
    <section className="rounded-xl border bg-[#FBFCFE] px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Groups</h1>

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
        {groups.map((group) => (
          <GroupListItem key={group.id} group={group} onEdit={onEdit} />
        ))}
      </div>

      <ManagementPagination
        pagination={pagination}
        onPageChange={onPageChange}
      />
    </section>
  );
}
