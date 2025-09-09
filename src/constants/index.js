const DEV_URL = import.meta.env.VITE_DEV_URL;
const PROD_URL = import.meta.env.VITE_PROD_URL;
export const BASE_URL = DEV_URL;

export const ApiRoutes = {
  auth: {
    login: BASE_URL + "auth/login",
    register: BASE_URL + "auth/register",
  },
  verify: {
    verifyOtp: BASE_URL + "verify/verify-otp",
    resedOtp: BASE_URL + "verify/resend-otp",
  },
  password: {
    forgotPassword: BASE_URL + "password/forgot-password",
    resetPassword: BASE_URL + "password/reset-password",
  },
  user: {
    updateProfile: BASE_URL + "user/update-profile",
    getAllUsers: BASE_URL + "user/get-users",
    getUser: BASE_URL + "user/get-user",
  },
};
