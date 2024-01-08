import { instance } from "./axios";
import axios from "axios";

export const signUpUser = async (payload) => {
  const { data } = await instance.post("/auth/buyer/register", payload);

  return data;
};

export const loginUser = async (payload) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/buyer/login`,
    payload
  );

  return data;
};
