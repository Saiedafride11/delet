import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../components/env/envApi";
import { adminLoggedOut } from "../features/auth/admin/adminSlice";
// import { adminLoggedOut } from "../features/auth/admin/adminSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const stringWithQuotes = localStorage?.getItem("adminToken");
    const localStorageToken = stringWithQuotes?.replace(/"/g, "");
    const token = localStorageToken || getState()?.admin?.adminToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "application/json");
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (
      result?.error?.status === 401 ||
      result?.error?.data?.message === "Unauthenticated"
    ) {
      api?.dispatch(adminLoggedOut());
      localStorage?.clear();
    }

    return result;
  },

  tagTypes: [],
  endpoints: (builder) => ({}),
});
