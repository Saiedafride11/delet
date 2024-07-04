import { apiSlice } from "../../../api/apiSlice";

const countriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => "/countries",
      providesTags: ["countries"],
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;
