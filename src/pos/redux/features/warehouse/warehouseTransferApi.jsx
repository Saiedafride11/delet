import { apiSlice } from "../../api/apiSlice";

const warehouseTransferApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWarehouseTransfers: builder.query({
      query: (filterQuery) => `/stock-transfer${filterQuery}`,
      providesTags: ["warehouse"],
    }),
    getWarehouseTransfer: builder.query({
      query: (stockTransferId) => `/stock-transfer/${stockTransferId}`,
      providesTags: ["warehouse"],
    }),
    addWarehouseTransfer: builder.mutation({
      query: (data) => ({
        url: "/stock-transfer",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["warehouse"],
    }),
    editWarehouseTransfer: builder.mutation({
      query: ({ id, data }) => ({
        url: `/stock-transfer/${id}`,
        method: "PUT",
        body: new URLSearchParams(data).toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
      invalidatesTags: ["warehouse"],
    }),
    deleteWarehouseTransfer: builder.mutation({
      query: (id) => ({
        url: `/stock-transfer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["warehouse"],
    }),
    multiDeleteWarehouseTransfer: builder.mutation({
      query: (data) => ({
        url: "/stock-transfer/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["warehouse"],
    }),
  }),
});

export const {
  useGetWarehouseTransfersQuery,
  useGetWarehouseTransferQuery,
  useAddWarehouseTransferMutation,
  useEditWarehouseTransferMutation,
  useDeleteWarehouseTransferMutation,
  useMultiDeleteWarehouseTransferMutation,
} = warehouseTransferApi;
