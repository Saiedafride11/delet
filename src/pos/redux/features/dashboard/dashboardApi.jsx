import { apiSlice } from "../../api/apiSlice";

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query({
      query: () => "/dashboard-overview",
      providesTags: ["dashboard-overview"],
    }),
  }),
});

export const { useGetDashboardOverviewQuery } = dashboardApi;
