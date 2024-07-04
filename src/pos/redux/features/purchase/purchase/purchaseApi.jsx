import { apiSlice } from "../../../api/apiSlice";

const purchaseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPurchases: builder.query({
      query: (filterQuery) => `/purchase${filterQuery}`,
      providesTags: ["purchase"],
    }),
    getPurchase: builder.query({
      query: (purchaseId) => `/purchase/${purchaseId}`,
      providesTags: ["purchase"],
    }),
    addPurchase: builder.mutation({
      query: (data) => ({
        url: "/purchase",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["purchase", "products", "party", "due-list"],
    }),
    editPurchase: builder.mutation({
      query: ({ id, data }) => ({
        url: `/purchase/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["purchase", "products", "party", "due-list"],
    }),
    deletePurchase: builder.mutation({
      query: (id) => ({
        url: `/purchase/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["purchase", "products"],
    }),
    multiDeletePurchase: builder.mutation({
      query: (data) => ({
        url: "/purchase/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["purchase", "products"],
    }),
  }),
});

export const {
  useGetPurchasesQuery,
  useGetPurchaseQuery,
  useAddPurchaseMutation,
  useEditPurchaseMutation,
  useDeletePurchaseMutation,
  useMultiDeletePurchaseMutation,
} = purchaseApi;
