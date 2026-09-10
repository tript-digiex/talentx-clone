import { CommonModal } from "@/components/common/CommonModal";
import Button from "@/components/ui/custom/Button";
import Input from "@/components/ui/custom/Input";
import Tag from "@/components/ui/custom/Tag";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPen } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateProfile } from "../../hooks/profile/useUpdateProfile";
import { updateUserProfileSchema } from "../../schemas/profile.schemas";
import type { USER_ROLES } from "@/features/user-management/types/user.constants";
import type { UserProfilePayload } from "../../types/profile/profile.types";
import { getProfileFormValues } from "../../utils/profile.utils";

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
  const [isEditModeOpen, setIsEditModeOpen] = useState(false);
  const updateProfileMutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProfilePayload>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: getProfileFormValues(firstName, lastName),
    mode: "onSubmit",
  });

  const handleCloseModal = () => {
    setIsEditModeOpen(false);
    reset(getProfileFormValues(firstName, lastName));
  };

  const handleEditSubmit = (data: UserProfilePayload) => {
    updateProfileMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.success) {
          setIsEditModeOpen(false);
          reset({
            first_name: response.data.first_name,
            last_name: response.data.last_name,
          });
        }
      },
    });
  };

  useEffect(() => {
    if (!isEditModeOpen) {
      return;
    }

    reset(getProfileFormValues(firstName, lastName));
  }, [firstName, isEditModeOpen, lastName, reset]);

  return (
    <>
      <div className="flex-1 border rounded-md px-4 py-6">
        <div className="text-end">
          <Button
            size="lg"
            className="px-10 font-normal text-sm"
            onClick={() => setIsEditModeOpen(true)}
          >
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

      <CommonModal
        open={isEditModeOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseModal();
          }
        }}
        icon={<UserPen className="size-6" />}
        title="Edit Profile"
        bodyClassName="space-y-4"
        footer={
          <>
            <Button
              size="sm"
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              type="button"
              variant="default"
              loading={updateProfileMutation.isPending}
              onClick={handleSubmit(handleEditSubmit)}
            >
              Save
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            {...register("first_name")}
            label="First Name"
            type="text"
            placeholder="Enter first name"
            required
            error={!!errors.first_name}
            helperText={errors.first_name?.message}
          />

          <Input
            {...register("last_name")}
            label="Last Name"
            type="text"
            placeholder="Enter last name"
            required
            error={!!errors.last_name}
            helperText={errors.last_name?.message}
          />
        </div>
      </CommonModal>
    </>
  );
};
