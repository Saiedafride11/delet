import { apiSlice } from "../../../api/apiSlice";

const salesReturnApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalesReturn: builder.query({
      query: (filterQuery) => `/sale-return${filterQuery}`,
      providesTags: ["sales-return"],
    }),
    getSaleReturn: builder.query({
      query: (saleReturnId) => `/sale-return/${saleReturnId}`,
      providesTags: ["sales-return"],
    }),
    addSaleReturn: builder.mutation({
      query: (data) => ({
        url: "/sale-return",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sales-return", "sales", "products", "party"],
    }),
    editSaleReturn: builder.mutation({
      query: ({ id, data }) => ({
        url: `/sale-return/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["sales-return", "sales", "products", "party"],
    }),
    deleteSaleReturn: builder.mutation({
      query: (id) => ({
        url: `/sale-return/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["sales-return"],
    }),
    multiDeleteSalesReturn: builder.mutation({
      query: (data) => ({
        url: "/sale-return/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sales-return"],
    }),
  }),
});

export const {
  useGetSalesReturnQuery,
  useGetSaleReturnQuery,
  useAddSaleReturnMutation,
  useEditSaleReturnMutation,
  useDeleteSaleReturnMutation,
  useMultiDeleteSalesReturnMutation,
} = salesReturnApi;
