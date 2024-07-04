import { apiSlice } from "../../../api/apiSlice";

const salesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query({
      query: (filterQuery) => `/sale${filterQuery}`,
      providesTags: ["sales"],
    }),
    getSale: builder.query({
      query: (saleId) => `/sale/${saleId}`,
      providesTags: ["sales"],
    }),
    addSale: builder.mutation({
      query: (data) => ({
        url: "/sale",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sales", "products", "party", "due-list"],
    }),
    editSale: builder.mutation({
      query: ({ id, data }) => ({
        url: `/sale/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["sales", "products", "party", "due-list"],
    }),
    deleteSale: builder.mutation({
      query: (id) => ({
        url: `/sale/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["sales", "products"],
    }),
    multiDeleteSales: builder.mutation({
      query: (data) => ({
        url: "/sale/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sales", "products"],
    }),
  }),
});

export const {
  useGetSalesQuery,
  useGetSaleQuery,
  useAddSaleMutation,
  useEditSaleMutation,
  useDeleteSaleMutation,
  useMultiDeleteSalesMutation,
} = salesApi;
