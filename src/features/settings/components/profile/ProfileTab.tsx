import { USER_ROLES } from "@/features/user-management/types/user.constants";
import { UserProfileDetail } from "./UserProfileDetail";
import { UserProfileSummary } from "./UserProfileSummary";
import { useAuthStore } from "@/stores/auth.store";

export const ProfileTab = () => {
  const user = useAuthStore((state) => state.user);
  const fullName = user ? `${user.first_name} ${user.last_name}` : "-";

  return (
    <div className="flex items-stretch gap-4">
      <UserProfileSummary fullName={fullName} email={user?.email || "-"} />
      <UserProfileDetail
        firstName={user?.first_name || "-"}
        lastName={user?.last_name || "-"}
        email={user?.email || "-"}
        role={user?.role || USER_ROLES.ADMIN}
      />
    </div>
  );
};
