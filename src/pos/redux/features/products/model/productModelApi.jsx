import { apiSlice } from "../../../api/apiSlice";

const productModelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductModel: builder.query({
      query: () => "/pmodel",
      providesTags: ["product-model"],
    }),
    addProductModel: builder.mutation({
      query: (data) => ({
        url: "/pmodel",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-model", "product-brand"],
    }),
    editProductModel: builder.mutation({
      query: ({ id, data }) => ({
        url: `/pmodel/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["product-model"],
    }),
    deleteProductModel: builder.mutation({
      query: (id) => ({
        url: `/pmodel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product-model"],
    }),
    updatePdModelStatus: builder.mutation({
      query: (data) => ({
        url: "/pmodel-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-model"],
    }),
    multiDeleteProductModel: builder.mutation({
      query: (data) => ({
        url: "/pmodel/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-model"],
    }),
  }),
});

export const {
  useGetProductModelQuery,
  useAddProductModelMutation,
  useEditProductModelMutation,
  useDeleteProductModelMutation,
  useUpdatePdModelStatusMutation,
  useMultiDeleteProductModelMutation,
} = productModelApi;
