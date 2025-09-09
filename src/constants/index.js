const DEV_URL = import.meta.env.VITE_DEV_URL;
const PROD_URL = import.meta.env.VITE_PROD_URL;
export const BASE_URL = DEV_URL;

export const ApiRoutes = {
  user: {
    login: BASE_URL + "auth/login",
    register: BASE_URL + "auth/register",
    updateProfile: BASE_URL + "user/update-profile",
    forgotPassword: BASE_URL + "password/forgot-password",
    resetPassword: BASE_URL + "user/reset-password",
    updatePassword: BASE_URL + "user/update-password",
    getAllUsers: BASE_URL + "user/get-users",
    getUser: BASE_URL + "user/get-user",
  },
};
