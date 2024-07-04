import { apiSlice } from "../../../api/apiSlice";

const expenseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllExpense: builder.query({
      query: (filterQuery) => `/expense${filterQuery}`,
      providesTags: ["expense"],
    }),
    getExpense: builder.query({
      query: (expenseId) => `/expense/${expenseId}`,
      providesTags: ["expense"],
    }),
    addExpense: builder.mutation({
      query: (data) => ({
        url: "/expense",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["expense"],
    }),
    editExpense: builder.mutation({
      query: ({ id, data }) => ({
        url: `/expense/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["expense"],
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/expense/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expense"],
    }),
    multiDeleteExpense: builder.mutation({
      query: (data) => ({
        url: "/expense/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["expense"],
    }),
  }),
});

export const {
  useGetAllExpenseQuery,
  useGetExpenseQuery,
  useAddExpenseMutation,
  useEditExpenseMutation,
  useDeleteExpenseMutation,
  useMultiDeleteExpenseMutation,
} = expenseApi;
