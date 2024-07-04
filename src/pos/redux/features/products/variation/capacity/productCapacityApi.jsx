import { apiSlice } from "../../../../api/apiSlice";

const productCapacityApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductCapacity: builder.query({
      query: () => "/capacity",
      providesTags: ["product-capacity"],
    }),
    addProductCapacity: builder.mutation({
      query: (data) => ({
        url: "/capacity",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-capacity"],
    }),
    editProductCapacity: builder.mutation({
      query: ({ id, data }) => ({
        url: `/capacity/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["product-capacity"],
    }),
    deleteProductCapacity: builder.mutation({
      query: (id) => ({
        url: `/capacity/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product-capacity"],
    }),
    updatePdCapacityStatus: builder.mutation({
      query: (data) => ({
        url: "/capacity-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-capacity"],
    }),
    multiDeleteProductCapacity: builder.mutation({
      query: (data) => ({
        url: "/capacity/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-capacity"],
    }),
  }),
});

export const {
  useGetProductCapacityQuery,
  useAddProductCapacityMutation,
  useEditProductCapacityMutation,
  useDeleteProductCapacityMutation,
  useUpdatePdCapacityStatusMutation,
  useMultiDeleteProductCapacityMutation,
} = productCapacityApi;
