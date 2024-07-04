import { apiSlice } from "../../../api/apiSlice";

const productUnitApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductUnit: builder.query({
      query: () => "/unit",
      providesTags: ["product-unit"],
    }),
    addProductUnit: builder.mutation({
      query: (data) => ({
        url: "/unit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-unit"],
    }),
    editProductUnit: builder.mutation({
      query: ({ id, data }) => ({
        url: `/unit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product-unit"],
    }),
    deleteProductUnit: builder.mutation({
      query: (id) => ({
        url: `/unit/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product-unit"],
    }),
    updatePdUnitStatus: builder.mutation({
      query: (data) => ({
        url: "/unit-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-unit"],
    }),
    multiDeleteProductUnit: builder.mutation({
      query: (data) => ({
        url: "/unit/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-unit"],
    }),
  }),
});

export const {
  useGetProductUnitQuery,
  useAddProductUnitMutation,
  useEditProductUnitMutation,
  useDeleteProductUnitMutation,
  useUpdatePdUnitStatusMutation,
  useMultiDeleteProductUnitMutation,
} = productUnitApi;
