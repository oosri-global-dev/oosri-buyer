import { instance } from "./axios";

export const updateUserProfile = async (payload) => {
  const { data } = await instance.put(`/profile/buyer/update-profile`, payload);

  return data;
};

export const updateProfileImage = async (payload) => {
  const { data } = await instance.post(`/profile/buyer/profile-image`, payload);

  return data;
};

export const changeUserPassword = async (payload) => {
  const { data } = await instance.post(
    `/profile/buyer/change-password`,
    payload
  );

  return data;
};
