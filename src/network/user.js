import { getDataInCookie } from "@/data-helpers/auth-session";
import { instance } from "./axios";
import axios from "axios";

let userToken;

if (typeof window !== "undefined") {
  // Perform sessionStorage action
  userToken = getDataInCookie("access_token");
}

export const updateUserProfile = async (payload) => {
  const { data } = await instance.put(`/profile/buyer/update-profile`, payload);

  return data;
};

export const updateProfileImage = async (payload) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/profile/buyer/profile-image`,
    payload,
    {
      headers: {
        Authorization: `Bearer` + userToken || "",
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
