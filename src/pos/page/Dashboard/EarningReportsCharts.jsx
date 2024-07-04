import React from "react";
import { Bar, BarChart, Legend, XAxis } from "recharts";
import AllMonthDropdown from "../../components/dropdown/AllMonthDropdown";
import useContentOffsetWidth from "../../hooks/useContentOffsetWidth";

const EarningReportsCharts = ({ BarChartData }) => {
  const { contentWidth } = useContentOffsetWidth("custom-bar-chart");
  return (
    <div className="acnoo-dashboard-wrapper">
      <div className="acnoo-dashboard-details-wrapper dashboard-home-content">
        <div className="d-flex align-items-center justify-content-between flex-wrap border-bottom px-3 pb-2 pt-0">
          <h6>Earning Reports</h6>
          <AllMonthDropdown />
        </div>
        <div className="p-3">
          <div className="dashboard-graph custom-bar-chart">
            <BarChart
              width={contentWidth}
              height={275}
              data={BarChartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <Legend />
              <Bar dataKey="Income" stackId="a" fill="#2DB0F6" />
              <Bar dataKey="Expenses" stackId="a" fill="#FF3030" />
              <Bar dataKey="Profit" stackId="a" fill="#00AE1C" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningReportsCharts;
