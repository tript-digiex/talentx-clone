import Button from "@/components/ui/custom/Button";
import Tag from "@/components/ui/custom/Tag";
import type { USER_ROLES } from "@/features/user-management/types/user.constants";

type UserProfileDetailProps = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: USER_ROLES;
  profileStatus?: string;
};

export const UserProfileDetail = ({
  firstName,
  lastName,
  email,
  phoneNumber = "-",
  role,
  profileStatus = "-",
}: UserProfileDetailProps) => {
  return (
    <div className="flex-1 border rounded-md px-4 py-6">
      <div className="text-end">
        <Button size="lg" className="px-10 font-normal text-sm">
          Edit
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="font-bold">First Name</div>
          <div className="text-sm">{firstName}</div>
        </div>
        <div>
          <div className="font-bold">Last Name</div>
          <div className="text-sm">{lastName}</div>
        </div>
        <div>
          <div className="font-bold">Email</div>
          <div className="text-sm">{email}</div>
        </div>
        <div>
          <div className="font-bold">Phone Number</div>
          <div className="text-sm">{phoneNumber}</div>
        </div>
        <div>
          <div className="font-bold">Role</div>
          <div className="text-sm">
            <Tag value={role} className="text-[10px] px-6" />
          </div>
        </div>
        <div>
          <div className="font-bold">Profile Status</div>
          <div className="text-sm">{profileStatus}</div>
        </div>
      </div>
    </div>
  );
};
