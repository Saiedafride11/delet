import { apiSlice } from "../../../api/apiSlice";

const productCategoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductCategories: builder.query({
      query: () => "/product-category",
      providesTags: ["product-category"],
    }),
    addProductCategories: builder.mutation({
      query: (data) => ({
        url: "/product-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-category"],
    }),
    editProductCategories: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product-category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product-category"],
    }),
    deleteProductCategories: builder.mutation({
      query: (id) => ({
        url: `/product-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product-category"],
    }),
    updatePdCategoryStatus: builder.mutation({
      query: (data) => ({
        url: "/product-category-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-category"],
    }),
    multiDeleteProductCategories: builder.mutation({
      query: (data) => ({
        url: "/product-category/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-category"],
    }),
  }),
});

export const {
  useGetProductCategoriesQuery,
  useAddProductCategoriesMutation,
  useEditProductCategoriesMutation,
  useDeleteProductCategoriesMutation,
  useUpdatePdCategoryStatusMutation,
  useMultiDeleteProductCategoriesMutation,
} = productCategoriesApi;
