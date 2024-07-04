import { apiSlice } from "../../../../api/apiSlice";

const productWeightApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductWeight: builder.query({
      query: () => "/weight",
      providesTags: ["product-weight"],
    }),
    addProductWeight: builder.mutation({
      query: (data) => ({
        url: "/weight",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-weight"],
    }),
    editProductWeight: builder.mutation({
      query: ({ id, data }) => ({
        url: `/weight/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product-weight"],
    }),
    deleteProductWeight: builder.mutation({
      query: (id) => ({
        url: `/weight/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product-weight"],
    }),
    updatePdWeightStatus: builder.mutation({
      query: (data) => ({
        url: "/weight-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-weight"],
    }),
    multiDeleteProductWeight: builder.mutation({
      query: (data) => ({
        url: "/weight/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-weight"],
    }),
  }),
});

export const {
  useGetProductWeightQuery,
  useAddProductWeightMutation,
  useEditProductWeightMutation,
  useDeleteProductWeightMutation,
  useUpdatePdWeightStatusMutation,
  useMultiDeleteProductWeightMutation,
} = productWeightApi;
