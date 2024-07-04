import { apiSlice } from "../../../api/apiSlice";

const productBrandApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductBrand: builder.query({
      query: () => "/brand",
      providesTags: ["product-brand"],
    }),
    addProductBrand: builder.mutation({
      query: (data) => ({
        url: "/brand",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-brand"],
    }),
    editProductBrand: builder.mutation({
      query: ({ id, data }) => ({
        url: `/brand/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["product-brand"],
    }),
    deleteProductBrand: builder.mutation({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product-brand"],
    }),
    updatePdBrandStatus: builder.mutation({
      query: (data) => ({
        url: "/brand-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-brand"],
    }),
    multiDeleteProductBrand: builder.mutation({
      query: (data) => ({
        url: "/brand/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-brand"],
    }),
  }),
});

export const {
  useGetProductBrandQuery,
  useAddProductBrandMutation,
  useEditProductBrandMutation,
  useDeleteProductBrandMutation,
  useUpdatePdBrandStatusMutation,
  useMultiDeleteProductBrandMutation,
} = productBrandApi;
