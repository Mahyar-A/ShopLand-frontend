import { API } from "../utils";
import { API_URLS } from "../urls";
import { UserType } from "../types";

export async function getCurrentUser() {
  const url = API_URLS.user.get;
  const res = await API.get<UserType>(url);

  return res.data;
}
