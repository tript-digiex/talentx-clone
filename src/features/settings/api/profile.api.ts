import { apiClient } from "@/lib/axios";
import type {
  UserProfilePayload,
  UserProfileResponse,
} from "../types/profile.types";

export const updateUserProfileApi = async (
  payload: UserProfilePayload,
): Promise<UserProfileResponse> => {
  const response = await apiClient.put<UserProfileResponse>(
    "/v1/users/profile-info",
    payload,
  );
  return response.data;
};
