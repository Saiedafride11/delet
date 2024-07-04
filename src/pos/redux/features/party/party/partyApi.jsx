import { apiSlice } from "../../../api/apiSlice";

const partyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllParty: builder.query({
      query: (filterQuery) => `/party${filterQuery}`,
      providesTags: ["party"],
    }),
    getParty: builder.query({
      query: (partyId) => `/party/${partyId}`,
      providesTags: ["party"],
    }),
    addParty: builder.mutation({
      query: (data) => ({
        url: "/party",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["party", "due-list"],
    }),
    editParty: builder.mutation({
      query: ({ id, data }) => ({
        url: `/party/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["party", "due-list"],
    }),
    deleteParty: builder.mutation({
      query: (id) => ({
        url: `/party/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["party"],
    }),
    multiDeleteParty: builder.mutation({
      query: (data) => ({
        url: "/party/multi-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["party"],
    }),
  }),
});

export const {
  useGetAllPartyQuery,
  useGetPartyQuery,
  useAddPartyMutation,
  useEditPartyMutation,
  useDeletePartyMutation,
  useMultiDeletePartyMutation,
} = partyApi;
