import { instance } from "./axios";
import axios from "axios";
import { getDataInCookie } from "@/data-helpers/auth-session";

export const updateUserProfile = async (payload) => {
  const { data } = await instance.put(`/profile/buyer/update-profile`, payload);

  return data;
};

export const updateProfileImage = async (payload) => {
  const userToken =
    typeof window !== "undefined" ? getDataInCookie("access_token") : null;

  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/profile/buyer/profile-image`,
    payload,
    {
      headers: {
        ...(userToken ? { Authorization: `Bearer ${userToken}` } : {}),
      },
    }
  );

  return data;
};

export const changeUserPassword = async (payload) => {
  const { data } = await instance.post(
    `/profile/buyer/change-password`,
    payload
  );

  return data;
};
