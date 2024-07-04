import { apiSlice } from "../../api/apiSlice";

const warehouseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWarehouse: builder.query({
      query: (filterQuery) =>
        `/warehouse${filterQuery === undefined ? "" : `/${filterQuery}`}`,
      providesTags: ["warehouse"],
    }),
    addWarehouse: builder.mutation({
      query: (data) => ({
        url: "/warehouse",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["warehouse"],
    }),
    editWarehouse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/warehouse/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["warehouse"],
    }),
    deleteWarehouse: builder.mutation({
      query: (id) => ({
        url: `/warehouse/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["warehouse"],
    }),
    updateWarehouseStatus: builder.mutation({
      query: (data) => ({
        url: "/warehouse-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["warehouse"],
    }),
    multiDeleteWarehouse: builder.mutation({
      query: (data) => ({
        url: "/warehouse/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["warehouse"],
    }),
  }),
});

export const {
  useGetWarehouseQuery,
  useAddWarehouseMutation,
  useEditWarehouseMutation,
  useDeleteWarehouseMutation,
  useUpdateWarehouseStatusMutation,
  useMultiDeleteWarehouseMutation,
} = warehouseApi;
