import { apiSlice } from "../../api/apiSlice";

const dueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDueList: builder.query({
      query: (filterQuery) => `/due-list${filterQuery}`,
      providesTags: ["due-list", "party"],
    }),
    getInvoiceList: builder.query({
      query: ({ partyId }) => `/due-list/${partyId}`,
      providesTags: ["due-list"],
    }),
    getInvoiceSlipList: builder.query({
      query: ({ invoiceId, invoiceType }) =>
        `/invoice-due-collect/${invoiceId}?collect_data=${invoiceType}`,
      providesTags: ["due-list"],
    }),
    getAllInvoiceSlipList: builder.query({
      query: (filterQuery) => `/due-payment-collect${filterQuery}`,
      providesTags: ["due-list"],
    }),
    getSalesDueSlip: builder.query({
      query: (id) => `/due-collect/${id}`,
      providesTags: ["due-list"],
    }),
    getPurchaseDueSlip: builder.query({
      query: (id) => `/due-purchase/${id}`,
      providesTags: ["due-list"],
    }),
    addDueCollect: builder.mutation({
      query: (data) => ({
        url: "/due-collect",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["due-list", "sales", "party"],
    }),
    addDuePurchase: builder.mutation({
      query: (data) => ({
        url: "/due-purchase",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["due-list", "purchase", "party"],
    }),
  }),
});

export const {
  useGetDueListQuery,
  useGetInvoiceListQuery,
  useGetInvoiceSlipListQuery,
  useGetAllInvoiceSlipListQuery,
  useGetSalesDueSlipQuery,
  useGetPurchaseDueSlipQuery,
  useAddDueCollectMutation,
  useAddDuePurchaseMutation,
} = dueApi;
