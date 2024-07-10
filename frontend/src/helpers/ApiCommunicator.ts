import axios from "axios";
import { Endpoints } from "./Endpoints";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(Endpoints.LOGIN, { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post(Endpoints.SIGNUP, { name, email, password });
  if (res.status !== 200) {
    throw new Error("Unable to signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get(Endpoints.AUTHSTATUS);
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post(Endpoints.NEWCHAT, { message: message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};
