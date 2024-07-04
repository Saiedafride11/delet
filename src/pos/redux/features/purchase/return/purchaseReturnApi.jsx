import { apiSlice } from "../../../api/apiSlice";

const purchaseReturnApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPurchasesReturn: builder.query({
      query: (filterQuery) => `/purchase-return${filterQuery}`,
      providesTags: ["purchase-return"],
    }),
    getPurchaseReturn: builder.query({
      query: (purchaseReturnId) => `/purchase-return/${purchaseReturnId}`,
      providesTags: ["purchase-return"],
    }),
    addPurchaseReturn: builder.mutation({
      query: (data) => ({
        url: "/purchase-return",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["purchase-return", "purchase", "products", "party"],
    }),
    editPurchaseReturn: builder.mutation({
      query: ({ id, data }) => ({
        url: `/purchase-return/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["purchase-return", "purchase", "products", "party"],
    }),
    deletePurchaseReturn: builder.mutation({
      query: (id) => ({
        url: `/purchase-return/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["purchase-return"],
    }),
    multiDeletePurchaseReturn: builder.mutation({
      query: (data) => ({
        url: "/purchase-return/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["purchase-return"],
    }),
  }),
});

export const {
  useGetPurchasesReturnQuery,
  useGetPurchaseReturnQuery,
  useAddPurchaseReturnMutation,
  useEditPurchaseReturnMutation,
  useDeletePurchaseReturnMutation,
  useMultiDeletePurchaseReturnMutation,
} = purchaseReturnApi;
