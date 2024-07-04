import { apiSlice } from "../../../api/apiSlice";

const incomeExpenseCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllIncomeExpenseCategory: builder.query({
      query: (filterQuery) => `/income-expense-category${filterQuery}`,
      providesTags: ["income-expense-category"],
    }),
    getIncomeExpenseCategory: builder.query({
      query: (incomeId) => `/income-expense-category/${incomeId}`,
      providesTags: ["income-expense-category"],
    }),
    addIncomeExpenseCategory: builder.mutation({
      query: (data) => ({
        url: "/income-expense-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["income-expense-category"],
    }),
    editIncomeExpenseCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/income-expense-category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["income-expense-category"],
    }),
    deleteIncomeExpenseCategory: builder.mutation({
      query: (id) => ({
        url: `/income-expense-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["income-expense-category"],
    }),
    updateIncomeExpenseCategoryStatus: builder.mutation({
      query: (data) => ({
        url: "/income-expense-category-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["income-expense-category"],
    }),
    multiDeleteIncomeExpenseCategory: builder.mutation({
      query: (data) => ({
        url: "/income-expense-category/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["income-expense-category"],
    }),
  }),
});

export const {
  useGetAllIncomeExpenseCategoryQuery,
  useGetIncomeExpenseCategoryQuery,
  useAddIncomeExpenseCategoryMutation,
  useEditIncomeExpenseCategoryMutation,
  useDeleteIncomeExpenseCategoryMutation,
  useUpdateIncomeExpenseCategoryStatusMutation,
  useMultiDeleteIncomeExpenseCategoryMutation,
} = incomeExpenseCategoryApi;
