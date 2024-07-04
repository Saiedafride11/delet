import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AllMonthDropdown from "../../components/dropdown/AllMonthDropdown";
import useContentOffsetWidth from "../../hooks/useContentOffsetWidth";

const StatisticCharts = ({ LineChartData }) => {
  const { contentWidth } = useContentOffsetWidth("custom-line-chart");
  return (
    <div className="acnoo-dashboard-wrapper">
      <div className="acnoo-dashboard-details-wrapper dashboard-home-content">
        <div className="d-flex align-items-center justify-content-between flex-wrap border-bottom px-3 pb-2 pt-0">
          <h6>
            Statistic <span>(Sales & Purchasae)</span>
          </h6>
          <AllMonthDropdown />
        </div>
        <div className="px-3 pt-3">
          <div className="dashboard-graph custom-line-chart">
            <LineChart
              width={contentWidth}
              height={window.innerWidth > 450 ? 275 : 240}
              data={LineChartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Sales"
                stroke="#2DB0F6"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="Purchase" stroke="#FF3030" />
              <Scatter name="red" dataKey="Purchase" fill="red" />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticCharts;
