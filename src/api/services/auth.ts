import { API } from "../utils";
import { API_URLS } from "../urls";
import { AuthTokenType, LoginType, SignupType } from "../types";

export async function signup(data: SignupType) {
  const url = API_URLS.auth.signup;
  const res = await API.post(url, data);

  return res.data;
}

export async function login(data: LoginType) {
  const url = API_URLS.auth.login;
  const res = await API.post<AuthTokenType>(url, data);

  return res.data;
}

export async function logout(data: string) {
  const url = API_URLS.auth.logout;
  const res = await API.post(url, { userId: data });

  return res.data;
}
