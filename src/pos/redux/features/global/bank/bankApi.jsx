import { apiSlice } from "../../../api/apiSlice";

const bankApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanks: builder.query({
      query: () => "/bank",
      providesTags: ["bank"],
    }),
    addBank: builder.mutation({
      query: (data) => ({
        url: "/bank",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bank"],
    }),
    editBank: builder.mutation({
      query: ({ id, data }) => ({
        url: `/bank/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["bank"],
    }),
  }),
});

export const { useGetBanksQuery, useAddBankMutation, useEditBankMutation } =
  bankApi;
