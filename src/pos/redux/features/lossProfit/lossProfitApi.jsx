import { apiSlice } from "../../api/apiSlice";

const lossProfitApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLossProfit: builder.query({
      query: (filterQuery) => `/sale-loss-profit${filterQuery}`,
      providesTags: ["loss-profit"],
    }),
  }),
});

export const { useGetLossProfitQuery } = lossProfitApi;
