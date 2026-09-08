import { ErrorMessage } from "@/components/common/ErrorMessage";
import { ManagementPagination } from "@/components/common/ManagementPagination";
import { SpinnerLoader } from "@/components/common/SpinnerLoader";
import Button from "@/components/ui/custom/Button";
import { GroupListItem } from "@/features/group-management/components/GroupListItem";
import { useGroupManagementList } from "@/features/group-management/hooks/useGroupManagementList";
import { DEFAULT_GROUP_MANAGEMENT_PAGE_SIZE } from "@/features/group-management/types/group.constants";
import type { GroupItemResponse } from "@/features/group-management/types/group.types";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function GroupManagementPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(DEFAULT_GROUP_MANAGEMENT_PAGE_SIZE);

  const { groups, pagination, errorMessage, isLoading } =
    useGroupManagementList(pageNumber, pageSize);

  const handleEditGroup = (_group: GroupItemResponse) => {};

  const handlePageChange = (nextPageNumber: number) => {
    setPageNumber(nextPageNumber);
  };

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (errorMessage) {
    return <ErrorMessage errorMessage={errorMessage} />;
  }

  return (
    <section className="border bg-[#FBFCFE] px-4 py-6 rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Group</h1>
        <Button size="lg" className="px-4" leftIcon={<PlusIcon />}>
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
  );
}
