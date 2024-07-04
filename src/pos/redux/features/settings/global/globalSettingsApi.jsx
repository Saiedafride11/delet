import { apiSlice } from "../../../api/apiSlice";

const globalSettingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGlobalSettings: builder.query({
      query: () => "/business-setting",
      providesTags: ["global-settings"],
    }),
    updateGlobalSettings: builder.mutation({
      query: (data) => ({
        url: "/business-setting",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["global-settings"],
    }),
    updateQuickGlobalSettings: builder.mutation({
      query: (data) => ({
        url: "/quick-business-setting",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["global-settings"],
    }),
  }),
});

export const {
  useGetGlobalSettingsQuery,
  useUpdateGlobalSettingsMutation,
  useUpdateQuickGlobalSettingsMutation,
} = globalSettingsApi;
