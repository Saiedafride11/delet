import { apiSlice } from "../../api/apiSlice";

const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentType: builder.query({
      query: () => "/payment-type",
      providesTags: ["payment-type"],
    }),
  }),
});

export const { useGetPaymentTypeQuery } = paymentApi;
