import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useGetAdminInfoQuery } from "../redux/features/auth/admin/adminApi";
import {
  adminInfo,
  adminLoggedIn,
} from "../redux/features/auth/admin/adminSlice";
import { useGetCurrenciesQuery } from "../redux/features/global/currencies/currenciesApi";
import { useGetGlobalSettingsQuery } from "../redux/features/settings/global/globalSettingsApi";
import {
  setGlobalCurrencies,
  setGlobalSettings,
} from "../redux/features/settings/settingsSlice";

export default function useAdminAuthCheck() {
  const location = useLocation();
  const [adminAuthChecked, setAdminAuthChecked] = useState(false);
  const {
    data: adminData,
    isLoading,
    isSuccess: adminIsSuccess,
    refetch: adminRefetch,
  } = useGetAdminInfoQuery();
  const { data: currenciesData } = useGetCurrenciesQuery();

  const { data: globalSettingsData, isSuccess: SettingsIsSuccess } =
    useGetGlobalSettingsQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    const localAuth = localStorage?.getItem("adminToken");
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (
        auth &&
        adminIsSuccess &&
        adminData?.data?.user_info?.role === "admin"
      ) {
        dispatch(adminLoggedIn({ adminToken: auth }));
        dispatch(adminInfo(adminData?.data?.user_info));
      }
      if (SettingsIsSuccess && globalSettingsData !== undefined) {
        dispatch(setGlobalSettings(globalSettingsData?.data));
      }
    }
    setAdminAuthChecked(true);
  }, [
    dispatch,
    setAdminAuthChecked,
    adminIsSuccess,
    adminData,
    SettingsIsSuccess,
    globalSettingsData,
  ]);

  useEffect(() => {
    if (currenciesData !== undefined && globalSettingsData !== undefined) {
      const matchedCurrencies = currenciesData?.data?.currencies?.find(
        (data) =>
          data?.iso_code ===
          globalSettingsData?.data?.value?.product?.application?.currency
      );
      dispatch(
        setGlobalCurrencies(
          matchedCurrencies === undefined ? { symbol: "$" } : matchedCurrencies
        )
      );
    }
  }, [dispatch, currenciesData, globalSettingsData]);

  useEffect(() => {
    if (location?.pathname === "/") {
      adminRefetch();
    }
  }, [location?.pathname]);

  return adminAuthChecked;
}
