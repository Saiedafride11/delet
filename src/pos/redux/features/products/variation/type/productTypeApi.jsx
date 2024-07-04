import { apiSlice } from "../../../../api/apiSlice";

const productTypeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductType: builder.query({
      query: () => "/type",
      providesTags: ["product-type"],
    }),
    addProductType: builder.mutation({
      query: (data) => ({
        url: "/type",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-type"],
    }),
    editProductType: builder.mutation({
      query: ({ id, data }) => ({
        url: `/type/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product-type"],
    }),
    deleteProductType: builder.mutation({
      query: (id) => ({
        url: `/type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product-type"],
    }),
    updatePdTypeStatus: builder.mutation({
      query: (data) => ({
        url: "/type-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-type"],
    }),
    multiDeleteProductType: builder.mutation({
      query: (data) => ({
        url: "/type/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-type"],
    }),
  }),
});

export const {
  useGetProductTypeQuery,
  useAddProductTypeMutation,
  useEditProductTypeMutation,
  useDeleteProductTypeMutation,
  useUpdatePdTypeStatusMutation,
  useMultiDeleteProductTypeMutation,
} = productTypeApi;
