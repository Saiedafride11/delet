import { apiSlice } from "../../api/apiSlice";

const ledgerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLedger: builder.query({
      query: (filterQuery) => `/party-ledger${filterQuery}`,
      providesTags: ["ledger"],
    }),
    getLedger: builder.query({
      query: (ledgerId) => `/party-ledger-details/${ledgerId}`,
      providesTags: ["ledger"],
    }),
  }),
});

export const { useGetAllLedgerQuery, useGetLedgerQuery } = ledgerApi;
