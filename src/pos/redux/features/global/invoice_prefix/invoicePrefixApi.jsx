import { apiSlice } from "../../../api/apiSlice";

const invoicePrefixApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrefixInvoice: builder.query({
      query: () => "/prefix-invoice",
      providesTags: ["prefix-invoice"],
    }),
  }),
});

export const { useGetPrefixInvoiceQuery } = invoicePrefixApi;
