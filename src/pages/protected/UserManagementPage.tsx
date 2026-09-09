import { DEFAULT_PAGE_NUMBER } from "@/constants/pagination.constants";
import { UserManagementList } from "@/features/user-management/components/UserManagementList";
import { useState } from "react";

export function UserManagementPage() {
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);

  return (
    <>
      <UserManagementList
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
      />
    </>
  );
}
