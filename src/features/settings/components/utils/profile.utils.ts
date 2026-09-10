import type { UserProfilePayload } from "../../types/profile.types";

export const getProfileFormValues = (
  firstName: string,
  lastName: string,
): UserProfilePayload => ({
  first_name: firstName === "-" ? "" : firstName,
  last_name: lastName === "-" ? "" : lastName,
});
