import { apiSlice } from "../../../api/apiSlice";

const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVariationProducts: builder.query({
      query: (filterQuery) => `/product-search${filterQuery}`,
      providesTags: ["products"],
    }),
    getProducts: builder.query({
      query: (filterQuery) => `/products${filterQuery}`,
      providesTags: ["products"],
    }),
    getProduct: builder.query({
      query: (productId) => `/products/${productId}`,
      // providesTags: (result, error, arg) => [{ type: "Video", id: arg }],
      providesTags: ["products"],
    }),
    addProducts: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products", "warehouse"],
    }),
    editProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    multiDeleteProduct: builder.mutation({
      query: (data) => ({
        url: "/product/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetVariationProductsQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductsMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useMultiDeleteProductMutation,
} = productsApi;
