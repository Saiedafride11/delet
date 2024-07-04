import { apiSlice } from "../../../api/apiSlice";

const productWarrantyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductWarranty: builder.query({
      query: () => "/warranty",
      providesTags: ["product-warranty"],
    }),
    addProductWarranty: builder.mutation({
      query: (data) => ({
        url: "/warranty",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-warranty"],
    }),
    editProductWarranty: builder.mutation({
      query: ({ id, data }) => ({
        url: `/warranty/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product-warranty"],
    }),
    deleteProductWarranty: builder.mutation({
      query: (id) => ({
        url: `/warranty/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product-warranty"],
    }),
    updatePdWarrantyStatus: builder.mutation({
      query: (data) => ({
        url: "/warranty-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-warranty"],
    }),
    multiDeleteProductWarranty: builder.mutation({
      query: (data) => ({
        url: "/warranty/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-warranty"],
    }),
  }),
});

export const {
  useGetProductWarrantyQuery,
  useAddProductWarrantyMutation,
  useEditProductWarrantyMutation,
  useDeleteProductWarrantyMutation,
  useUpdatePdWarrantyStatusMutation,
  useMultiDeleteProductWarrantyMutation,
} = productWarrantyApi;
