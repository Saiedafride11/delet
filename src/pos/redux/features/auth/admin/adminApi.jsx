import { apiSlice } from "../../../api/apiSlice";
import { adminInfo, adminLoggedIn } from "./adminSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminInfo: builder.query({
      query: () => "/user-info",
      keepUnusedDataFor: 600,
      providesTags: ["admin-info"],
    }),
    adminRegister: builder.mutation({
      query: (data) => ({
        url: "/user-registration",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            adminInfo({
              email: result?.data?.data?.email,
            })
          );
        } catch (err) {
          console.log("Admin register Error", err);
        }
      },
    }),
    adminVerification: builder.mutation({
      query: (data) => ({
        url: "/user-verification",
        method: "POST",
        body: data,
      }),
    }),
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/user-login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage?.setItem(
            "adminToken",
            JSON.stringify(result?.data?.data?.token)
          );
          dispatch(
            adminLoggedIn({
              adminToken: result?.data?.data?.token,
            })
          );
        } catch (err) {
          console.log("Admin Login Error", err);
        }
      },
      // invalidatesTags: getAllApiTag,
    }),
    adminSignOut: builder.query({
      query: () => "/sign-out",
      providesTags: ["admin-info"],
    }),

    adminProfileUpdate: builder.mutation({
      query: (data) => ({
        url: "/profile-update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admin-info"],
    }),
    adminResetOtp: builder.mutation({
      query: (data) => ({
        url: "/send-reset-otp",
        method: "POST",
        body: data,
      }),
    }),
    adminResetVerification: builder.mutation({
      query: (data) => ({
        url: "/verify-reset-otp",
        method: "POST",
        body: data,
      }),
    }),
    adminResetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    adminResendOtp: builder.mutation({
      query: (data) => ({
        url: "/user-otp-resend",
        method: "POST",
        body: data,
      }),
    }),
    getBusinessCategories: builder.query({
      query: () => "/business-categories",
    }),
  }),
});

export const {
  useGetAdminInfoQuery,
  useAdminRegisterMutation,
  useAdminVerificationMutation,
  useAdminLoginMutation,
  useAdminSignOutQuery,
  useAdminProfileUpdateMutation,
  useAdminResetOtpMutation,
  useAdminResetVerificationMutation,
  useAdminResetPasswordMutation,
  useAdminResendOtpMutation,
  useGetBusinessCategoriesQuery,
} = adminApi;
