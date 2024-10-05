import { instance } from "./axios";
import axios from "axios";

export const signUpUser = async (payload) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/buyer/register`,
    payload
  );

  return data;
};

export const loginUser = async (payload) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/buyer/login`,
    payload
  );

  return data;
};

export const resendOTP = async (payload) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/buyer/resend-otp`,
    payload
  );

  return data;
};

export const confirmOTP = async (payload) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/buyer/confirm-otp`,
    payload
  );

  return data;
};

export const fetchUser = async () => {
  const { data } = await instance.get(`/auth/buyer/current-user`);

  return data;
};

export const forgotPassword = async (payload) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/buyer/request-reset-password`,
    payload
  );

  return data;
};

export const resetPassword = async (payload) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/buyer/confirm-reset-password`,
    payload
  );

  return data;
};


