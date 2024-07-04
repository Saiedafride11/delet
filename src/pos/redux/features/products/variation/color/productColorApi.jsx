import { apiSlice } from "../../../../api/apiSlice";

const productColorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductColor: builder.query({
      query: () => "/color",
      providesTags: ["product-color"],
    }),
    addProductColor: builder.mutation({
      query: (data) => ({
        url: "/color",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-color"],
    }),
    editProductColor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/color/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product-color"],
    }),
    deleteProductColor: builder.mutation({
      query: (id) => ({
        url: `/color/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product-color"],
    }),
    updatePdColorStatus: builder.mutation({
      query: (data) => ({
        url: "/color-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-color"],
    }),
    multiDeleteProductColor: builder.mutation({
      query: (data) => ({
        url: "/color/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-color"],
    }),
  }),
});

export const {
  useGetProductColorQuery,
  useAddProductColorMutation,
  useEditProductColorMutation,
  useDeleteProductColorMutation,
  useUpdatePdColorStatusMutation,
  useMultiDeleteProductColorMutation,
} = productColorApi;
