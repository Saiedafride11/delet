import { useState } from "react";
import { convertDateToISO } from "../components/function/convertDateToISO";
import { customISODate } from "../components/function/customISODate";

const useFilterFromToDate = (defaultSelected) => {
  const [dateFilter, setDateFilter] = useState({
    startDate: new Date(new Date()).toLocaleDateString("en-GB"),
    endDate: new Date(new Date()).toLocaleDateString("en-GB"),
    selectedStartDate: customISODate(),
    selectedEndDate: customISODate(),
    selectedFilter: defaultSelected === "Monthly" ? "Monthly" : "Daily",
  });

  const handleDateFilter = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    // Daily
    const todayDate = new Date(new Date()).toLocaleDateString("en-GB");
    //Weekly
    const distanceSixDays = new Date() - 6 * 24 * 60 * 60 * 1000;
    const sixDaysAgo = new Date(distanceSixDays).toLocaleDateString("en-GB");
    //Monthly
    const thisMonth = new Date().setDate(1);
    const firstDateOfMonth = new Date(thisMonth).toLocaleDateString("en-GB");
    //Yearly
    const thisYear = new Date().getFullYear();
    const firstDateOfYear = new Date(thisYear, 0, 1).toLocaleDateString(
      "en-GB"
    );
    //Custom Selected
    const selectedDate = new Date(new Date(fieldValue)).toLocaleDateString(
      "en-GB"
    );

    const dateMap = {
      Daily: todayDate,
      Weekly: sixDaysAgo,
      Monthly: firstDateOfMonth,
      Yearly: firstDateOfYear,
    };
    let filterDate = dateMap[fieldValue] || todayDate;

    if (fieldName === "form_date" || fieldName === "to_date") {
      if (fieldName === "form_date") {
        let filterType;
        if (
          (dateFilter?.endDate === todayDate &&
            selectedDate === "Invalid Date") ||
          (dateFilter?.endDate === todayDate && selectedDate === todayDate)
        ) {
          filterType = "Daily";
        } else if (
          dateFilter?.endDate === todayDate &&
          selectedDate === sixDaysAgo
        ) {
          filterType = "Weekly";
        } else if (
          dateFilter?.endDate === todayDate &&
          selectedDate === firstDateOfMonth
        ) {
          filterType = "Monthly";
        } else if (
          dateFilter?.endDate === todayDate &&
          selectedDate === firstDateOfYear
        ) {
          filterType = "Yearly";
        } else {
          filterType = "Custom";
        }
        setDateFilter((prev) => ({
          ...prev,
          selectedFilter: filterType,
          startDate: selectedDate === "Invalid Date" ? todayDate : selectedDate,
          selectedStartDate:
            selectedDate === "Invalid Date"
              ? convertDateToISO(todayDate)
              : fieldValue,
          endDate:
            selectedDate === "Invalid Date" || selectedDate > prev?.endDate
              ? todayDate
              : prev?.endDate,
          selectedEndDate:
            selectedDate === "Invalid Date" || selectedDate > prev?.endDate
              ? convertDateToISO(todayDate)
              : prev?.selectedEndDate,
        }));
      } else {
        let filterType;
        if (
          (dateFilter?.startDate === todayDate &&
            selectedDate === "Invalid Date") ||
          (dateFilter?.startDate === todayDate && selectedDate === todayDate)
        ) {
          filterType = "Daily";
        } else if (
          dateFilter?.startDate === sixDaysAgo &&
          selectedDate === todayDate
        ) {
          filterType = "Weekly";
        } else if (
          dateFilter?.startDate === firstDateOfMonth &&
          selectedDate === todayDate
        ) {
          filterType = "Monthly";
        } else if (
          dateFilter?.startDate === firstDateOfYear &&
          selectedDate === todayDate
        ) {
          filterType = "Yearly";
        } else {
          filterType = "Custom";
        }
        setDateFilter((prev) => ({
          ...prev,
          selectedFilter: filterType,
          endDate: selectedDate === "Invalid Date" ? todayDate : selectedDate,
          selectedEndDate:
            selectedDate === "Invalid Date"
              ? convertDateToISO(todayDate)
              : fieldValue,
        }));
      }
    } else {
      setDateFilter((prev) => ({
        ...prev,
        startDate: filterDate,
        endDate: todayDate,
        selectedFilter: fieldValue,
        selectedStartDate: convertDateToISO(filterDate),
        selectedEndDate: convertDateToISO(todayDate),
      }));
    }
  };

  const dateFilterParams = `from_date=${dateFilter?.startDate}&to_date=${dateFilter?.endDate}`;

  return {
    dateFilter,
    dateFilterParams,
    handleDateFilter,
  };
};

export default useFilterFromToDate;
