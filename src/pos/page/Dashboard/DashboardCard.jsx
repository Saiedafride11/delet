import React from "react";
import arrowDownIcon from "../../assets/images/icons/arrow-down-small.svg";
import arrowUpIcon from "../../assets/images/icons/arrow-up-small.svg";
import { numberWithCommas } from "../../components/function/numberWithCommas";
const DashboardCard = ({ totalHistoryData }) => {
  const totalHistoryData2 = [
    {
      icon: arrowUpIcon,
      title: "Total Customers",
      total: Math.floor(totalHistoryData?.["total-customer"]) || 0,
      amount: 0,
    },
    {
      icon: arrowUpIcon,
      title: "Total Sale",
      total: Math.floor(totalHistoryData?.["sale-info"]?.[0]?.grand_total) || 0,
      amount:
        Math.floor(totalHistoryData?.["sale-this-month"]?.[0]?.grand_total) ||
        0,
    },
    {
      icon: arrowUpIcon,
      title: "Total Purchase",
      total:
        Math.floor(totalHistoryData?.["purchase-info"]?.[0]?.grand_total) || 0,
      amount:
        Math.floor(
          totalHistoryData?.["purchase-this-month"]?.[0]?.grand_total
        ) || 0,
    },
    {
      icon: arrowDownIcon,
      title: "Total Income",
      total: Math.floor(totalHistoryData?.["income-total"]) || 0,
      amount: Math.floor(totalHistoryData?.["income-this-month"]) || 0,
    },
    {
      icon: arrowUpIcon,
      title: "Total Expense",
      total: Math.floor(totalHistoryData?.["expense-total"]) || 0,
      amount: Math.floor(totalHistoryData?.["expense-this-month"]) || 0,
    },
    {
      icon: arrowUpIcon,
      title: "Customer Due",
      total: Math.floor(totalHistoryData?.["sale-info"]?.[0]?.due_total) || 0,
      amount:
        Math.floor(totalHistoryData?.["sale-this-month"]?.[0]?.due_total) || 0,
    },
  ];
  return (
    <div className="dashboard-card-total-count">
      {totalHistoryData2?.map((data, index) => (
        <div className="count-item" key={index}>
          <h5>${numberWithCommas(data?.total)}</h5>
          <p>{data?.title}</p>
          <div className="arrow-content">
            <img src={data?.icon} alt="icon" />
            <p className="text-green">${numberWithCommas(data?.amount)}</p>
            <p>This Month </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCard;
