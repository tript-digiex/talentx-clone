import { Checkbox as CheckboxShadcn } from "@/components/ui/shadcn/checkbox";
import type { GroupPermissionListResponse } from "../types/group.types";
import { cn } from "@/lib/utils";
import {
  NAME_PERMISSION_LABELS,
  PERMISSION_LABELS,
} from "../types/group.constants";

type GroupPermissionsAccessProps = {
  permissions: GroupPermissionListResponse[];
  selectedPermissions: string[];
  onPermissionChange: (permission: string, checked: boolean) => void;
};

export const GroupPermissionsAccess = ({
  permissions,
  selectedPermissions,
  onPermissionChange,
}: GroupPermissionsAccessProps) => {
  if (permissions.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h3 className="font-semibold">Permissions Access <span className="text-red-500">*</span></h3>

      <div className="space-y-0">
        {permissions.map((permissionGroup, index) => (
          <div
            key={permissionGroup.name}
            className="grid grid-cols-2 gap-8 py-4 first:pt-0"
          >
            <p className="pt-1 text-right text-sm font-bold text-slate-950">
              {NAME_PERMISSION_LABELS[permissionGroup.name]}
            </p>

            <div
              className={cn(
                index > 0
                  ? "space-y-4 border-t border-slate-200 pt-6"
                  : "space-y-4",
              )}
            >
              {permissionGroup.permissions.map((permission) => {
                const checkboxId = `${permissionGroup.name}-${permission}`
                  .toLowerCase()
                  .replace(/\s+/g, "-");

                return (
                  <label
                    key={permission}
                    htmlFor={checkboxId}
                    className="flex w-fit items-center gap-3 text-sm font-medium text-slate-950"
                  >
                    <CheckboxShadcn
                      id={checkboxId}
                      checked={selectedPermissions.includes(permission)}
                      onCheckedChange={(checked) =>
                        onPermissionChange(permission, checked === true)
                      }
                    />
                    {PERMISSION_LABELS[permission]}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
