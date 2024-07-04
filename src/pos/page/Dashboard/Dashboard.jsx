import shoesImage from "../../assets/images/shoes.png";
import LineLoader from "../../components/ui/Spinner/LineLoader";
import { useGetDashboardOverviewQuery } from "../../redux/features/dashboard/dashboardApi";
import DashboardCard from "./DashboardCard";
import EarningReportsCharts from "./EarningReportsCharts";
import StatisticCharts from "./StatisticCharts";
import StockInventory from "./StockInventory";
import TodayCollectedLoan from "./TodayCollectedLoan";
import TodayCollectedLoanDate from "./TodayCollectedLoanDate";
import TodayDueCollection from "./TodayDueCollection";
import TopFiveParty from "./TopFiveParty";
import TopFiveProducts from "./TopFiveProducts";

const LineChartData = [
  {
    name: "01",
    Sales: 4000,
    Purchase: 2400,
    amt: 2400,
  },
  {
    name: "04",
    Sales: 3000,
    Purchase: 1398,
    amt: 2210,
  },
  {
    name: "07",
    Sales: 2000,
    Purchase: 9800,
    amt: 2290,
  },
  {
    name: "10",
    Sales: 2780,
    Purchase: 3908,
    amt: 2000,
  },
  {
    name: "13",
    Sales: 1890,
    Purchase: 4800,
    amt: 2181,
  },
  {
    name: "16",
    Sales: 2390,
    Purchase: 3800,
    amt: 2500,
  },
  {
    name: "19",
    Sales: 3490,
    Purchase: 4300,
    amt: 2100,
  },
  {
    name: "22",
    Sales: 3490,
    Purchase: 4300,
    amt: 2100,
  },
  {
    name: "25",
    Sales: 3490,
    Purchase: 4300,
    amt: 2100,
  },
  {
    name: "28",
    Sales: 3490,
    Purchase: 4300,
    amt: 2100,
  },
  {
    name: "30",
    Sales: 3490,
    Purchase: 4300,
    amt: 2100,
  },
];

const BarChartData = [
  {
    name: "Jan",
    Income: 4000,
    Expenses: 2400,
    Profit: 2400,
  },
  {
    name: "Feb",
    Income: 3000,
    Expenses: 1398,
    Profit: 2210,
  },
  {
    name: "Mar",
    Income: 2000,
    Expenses: 9800,
    Profit: 2290,
  },
  {
    name: "Apr",
    Income: 2780,
    Expenses: 3908,
    Profit: 2000,
  },
  {
    name: "May",
    Income: 1890,
    Expenses: 4800,
    Profit: 2181,
  },
  {
    name: "Jun",
    Income: 2390,
    Expenses: 3800,
    Profit: 2500,
  },
  {
    name: "Jul",
    Income: 3490,
    Expenses: 4300,
    Profit: 2100,
  },
  {
    name: "Aug",
    Income: 3490,
    Expenses: 4300,
    Profit: 2100,
  },
  {
    name: "Sep",
    Income: 3490,
    Expenses: 4300,
    Profit: 2100,
  },
  {
    name: "Oct",
    Income: 3490,
    Expenses: 4300,
    Profit: 2100,
  },
  {
    name: "Nov",
    Income: 3490,
    Expenses: 4300,
    Profit: 2100,
  },
  {
    name: "Dec",
    Income: 3490,
    Expenses: 4300,
    Profit: 2100,
  },
];

const loanCollectedData = [
  {
    image: shoesImage,
    title: "Jerome Bell",
    subTitle: "Jerome Bell",
    amount: 200,
    percent: 50,
    collectUpper: true,
  },
  {
    image: shoesImage,
    title: "Jerome Bell",
    subTitle: "Jerome Bell",
    amount: 200,
    percent: 50,
    collectUpper: false,
  },
  {
    image: shoesImage,
    title: "Jerome Bell",
    subTitle: "Jerome Bell",
    amount: 200,
    percent: 50,
    collectUpper: true,
  },
  {
    image: shoesImage,
    title: "Jerome Bell",
    subTitle: "Jerome Bell",
    amount: 200,
    percent: 50,
    collectUpper: false,
  },
  {
    image: shoesImage,
    title: "Jerome Bell",
    subTitle: "Jerome Bell",
    amount: 200,
    percent: 50,
    collectUpper: true,
  },
];

const loanCollectedDate = [
  {
    image: shoesImage,
    title: "Jerome Bell",
    date: "25 July 2023",
    amount: 200,
    paid: true,
  },
  {
    image: shoesImage,
    title: "Jerome Bell",
    date: "25 July 2023",
    amount: 200,
    paid: false,
  },
  {
    image: shoesImage,
    title: "Jerome Bell",
    date: "25 July 2023",
    amount: 200,
    paid: true,
  },
  {
    image: shoesImage,
    title: "Jerome Bell",
    date: "25 July 2023",
    amount: 200,
    paid: false,
  },
  {
    image: shoesImage,
    title: "Jerome Bell",
    date: "25 July 2023",
    amount: 200,
    paid: true,
  },
];

const totalDueCollections = [
  {
    image: shoesImage,
    title: "Darlene Robertson",
    subTitle: "Retailer",
    amount: 2000,
  },
  {
    image: shoesImage,
    title: "Marvin McKinney",
    subTitle: "Retailer",
    amount: 3000,
  },
  {
    image: shoesImage,
    title: "Courtney Henry",
    subTitle: "Retailer",
    amount: 3000,
  },
  {
    image: shoesImage,
    title: "Eleanor Pena",
    subTitle: "Retailer",
    amount: 2000,
  },
  {
    image: shoesImage,
    title: "Bessie Cooper",
    subTitle: "Retailer",
    amount: 2000,
  },
];

const Dashboard = () => {
  document.title = "Acnoo POS";

  const {
    data: dashboardData,
    isError,
    isLoading,
    isFetching,
  } = useGetDashboardOverviewQuery();

  // console.log("dashboardData", dashboardData?.data);
  return (
    <div className="acnoo-dashboard-main-section">
      {isLoading && <LineLoader />}
      <DashboardCard totalHistoryData={dashboardData?.data} />
      <div className="row">
        <div className="col-xl-8 mt-3">
          <StatisticCharts LineChartData={LineChartData} />
        </div>
        <div className="col-xl-4 mt-4 mt-xl-3">
          <StockInventory
            lowStockData={dashboardData?.data?.["low-stock-item"]}
          />
        </div>
        <div className="col-xxl-4 col-md-6 mt-4">
          <TopFiveParty topFiveParty={dashboardData?.data?.["top-party"]} />
        </div>
        <div className="col-xxl-4 col-md-6 mt-4">
          <TopFiveProducts
            topFiveProducts={dashboardData?.data?.["top-product"]}
          />
        </div>
        <div className="col-xxl-4 col-md-6 mt-4">
          <EarningReportsCharts BarChartData={BarChartData} />
        </div>
        <div className="col-xxl-4 col-md-6 mt-4">
          <TodayDueCollection
            totalDueCollections={dashboardData?.data?.["due-collect"]}
          />
        </div>
        <div className="col-xxl-4 col-md-6 mt-4">
          <TodayCollectedLoan
            loanCollectedData={dashboardData?.data?.["installment-collect"]}
          />
        </div>
        <div className="col-xxl-4 col-md-6 mt-4 dashboard-mb-12">
          <TodayCollectedLoanDate loanCollectedDate={loanCollectedDate} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
