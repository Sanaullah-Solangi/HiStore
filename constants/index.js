const DEV_URL = process.env.DEV_URL;
const PROD_URL = process.env.PROD_URL;

export const BASE_URL = DEV_URL;

export const ApiRoutes = {
  user: {
    login: BASE_URL + "api/user/login-user",
    register: BASE_URL + "api/user/register-user",
    updateProfile: BASE_URL + "api/user/update-profile",
    forgotPassword: BASE_URL + "api/user/forgot-password",
    resetPassword: BASE_URL + "api/user/reset-password",
    updatePassword: BASE_URL + "api/user/update-password",
    getAllUsers: BASE_URL + "api/user/get-users",
    getUser: BASE_URL + "api/user/get-user",
  },
};
