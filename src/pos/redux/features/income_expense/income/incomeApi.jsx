import { apiSlice } from "../../../api/apiSlice";

const incomeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllIncome: builder.query({
      query: (filterQuery) => `/income${filterQuery}`,
      providesTags: ["income"],
    }),
    getIncome: builder.query({
      query: (incomeId) => `/income/${incomeId}`,
      providesTags: ["income"],
    }),
    addIncome: builder.mutation({
      query: (data) => ({
        url: "/income",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["income"],
    }),
    editIncome: builder.mutation({
      query: ({ id, data }) => ({
        url: `/income/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["income"],
    }),
    deleteIncome: builder.mutation({
      query: (id) => ({
        url: `/income/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["income"],
    }),
    multiDeleteIncome: builder.mutation({
      query: (data) => ({
        url: "/income/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["income"],
    }),
  }),
});

export const {
  useGetAllIncomeQuery,
  useGetIncomeQuery,
  useAddIncomeMutation,
  useEditIncomeMutation,
  useDeleteIncomeMutation,
  useMultiDeleteIncomeMutation,
} = incomeApi;
