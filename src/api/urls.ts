export const API_URLS = {
  auth: {
    signup: "/api/Account/api/Register",
    login: "/api/Account/Login",
    logout: "/api/Account/Logout",
  },
  user: {
    get: "/api/Account/GetCurrentUser",
  },
} as const;
