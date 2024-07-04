import { apiSlice } from "../../../api/apiSlice";

const currenciesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrencies: builder.query({
      query: () => "/currencies",
      providesTags: ["currencies"],
    }),
  }),
});

export const { useGetCurrenciesQuery } = currenciesApi;
