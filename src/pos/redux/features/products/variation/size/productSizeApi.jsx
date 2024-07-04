import { apiSlice } from "../../../../api/apiSlice";

const productSizeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductSize: builder.query({
      query: () => "/size",
      providesTags: ["product-size"],
    }),
    addProductSize: builder.mutation({
      query: (data) => ({
        url: "/size",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-size"],
    }),
    editProductSize: builder.mutation({
      query: ({ id, data }) => ({
        url: `/size/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product-size"],
    }),
    deleteProductSize: builder.mutation({
      query: (id) => ({
        url: `/size/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product-size"],
    }),
    updatePdSizeStatus: builder.mutation({
      query: (data) => ({
        url: "/size-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-size"],
    }),
    multiDeleteProductSize: builder.mutation({
      query: (data) => ({
        url: "/size/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-size"],
    }),
  }),
});

export const {
  useGetProductSizeQuery,
  useAddProductSizeMutation,
  useEditProductSizeMutation,
  useDeleteProductSizeMutation,
  useUpdatePdSizeStatusMutation,
  useMultiDeleteProductSizeMutation,
} = productSizeApi;
