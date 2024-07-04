import React from "react";
// import moneyMillsIcon from "../../../assets/images/actions/money-bills.svg";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Pagination from "../../../components/common/Pagination";
import { getCurrentDateWithLastYear } from "../../../components/function/getCurrentDateAndTime";
import { getMonthDayYearFormat } from "../../../components/function/getMonthDayYearFormat";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import { handleSuccessToast } from "../../../components/ui/Toast/handleSuccessToast";
import { handleFormattedDate } from "../../../components/utils/TableTopButtons/handleFormattedDate";
import useFilterFromToDate from "../../../hooks/useFilterFromToDate";
import useFilterSearchQuery from "../../../hooks/useFilterSearchQuery";
import { useGetLossProfitQuery } from "../../../redux/features/lossProfit/lossProfitApi";
import ReportsTableTopButtons from "../components/ReportsTableTopButtons";
import ReportsTableTopFilter from "../components/ReportsTableTopFilter";
import ReportsMobileMenu from "../components/Sidebar/ReportsMobileMenu";
import ReportsSidebarMenu from "../components/Sidebar/ReportsSidebarMenu";
import LossProfitReportsPdf from "./LossProfitReportsPdf";
import LossProfitReportsTableUI from "./LossProfitReportsTableUI";

const LossProfitReports = () => {
  document.title = "Loss Profit Reports";

  // -----------------------------------------------
  // All Data Show
  // -----------------------------------------------
  const {
    filterPerPage,
    handlePerPageFilter,
    searchText,
    setSearchText,
    setSelectedPage,
    filterQuery,
  } = useFilterSearchQuery();

  const { dateFilter, dateFilterParams, handleDateFilter } =
    useFilterFromToDate();

  const newFilterQuery = filterQuery
    ? filterQuery + `&${dateFilterParams}`
    : `?${dateFilterParams}`;

  const {
    data: lossProfitData,
    isLoading,
    isError,
    isFetching,
  } = useGetLossProfitQuery(`${newFilterQuery}&filter_report=Report`);

  // -----------------------------------------------
  // Make Excel, CSV data
  // -----------------------------------------------
  const tableData = lossProfitData?.data?.data?.loss_profit?.map((data) => ({
    Date:
      data?.sale_date !== null ? getMonthDayYearFormat(data?.sale_date) : "",
    Invoice: data?.prefix + data?.invoice,
    "Party Name": data?.party?.name,
    "Sale Amount": `$${getNumberWithCommas(twoDigitFixed(data?.grand_total))}`,
    Paid: `$${getNumberWithCommas(twoDigitFixed(data?.paid_amount))}`,
    Due: `$${getNumberWithCommas(twoDigitFixed(data?.due_amount))}`,
    "Profit (+)": `$${
      data?.sale_details_sum_profit > 0 ? "+" : ""
    }${getNumberWithCommas(twoDigitFixed(data?.sale_details_sum_profit))}`,
    "Loss (-)": `$${getNumberWithCommas(
      twoDigitFixed(data?.sale_details_sum_loss)
    )}`,
  }));
  // -----------------------------------------------
  // Make pdf data
  // -----------------------------------------------
  const handleTablePdfDownload = () => {
    const pdf = new jsPDF();

    const docWidth = pdf.internal.pageSize.width;
    const docHeight = pdf.internal.pageSize.height;

    const addCenteredText = (text, Position, yPosition, fontSize) => {
      const textWidth =
        (pdf.getStringUnitWidth(text) * Position) / pdf.internal.scaleFactor;
      const xPosition = (docWidth - textWidth) / 2;
      pdf.setFontSize(fontSize);
      pdf.text(text, xPosition, yPosition);
    };
    addCenteredText("Acnoo POS", 16, 9, 18);
    addCenteredText(`Loss/Profit Reports`, 11, 14, 12);
    addCenteredText(`Data: ${getCurrentDateWithLastYear()}`, 7, 19, 9);

    autoTable(pdf, {
      html: "#loss-profit-report-table",
      headStyles: {
        fillColor: "#dedede",
        textColor: "#2e2e3e",
        lineColor: "#dedede",
        fontSize: 8,
        lineWidth: 0.5,
        // halign: "center",
      },
      bodyStyles: {
        fillColor: "white",
        textColor: "#2e2e3e",
        fontSize: 8,
        // lineWidth: { top: 0, right: 0, bottom: 1, left: 0 },
      },
      theme: "grid",
      margin: { top: 5, right: 5, bottom: 8, left: 5 },
      startY: pdf.setPage(1) != 1 ? 25 : 5,
      columnStyles: {
        0: { lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0.1 } },
        1: { lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0 } },
        2: { lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0 } },

        3: {
          lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0 },
        },
        4: {
          lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0 },
          halign: "center",
        },
        5: {
          lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0 },
        },
        6: {
          lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0 },
          halign: "center",
        },
        7: {
          lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0 },
          halign: "center",
        },
        8: {
          lineWidth: { top: 0.1, right: 0.1, bottom: 0.1, left: 0 },
          halign: "center",
        },
      },
      didParseCell: function (data) {
        var rowCount = data.table.body?.length;
        if (data.row.index === rowCount - 1) {
          data.cell.styles.fontStyle = "bold";
        }

        data.cell.styles.halign = [4, 5, 6, 7, 8].includes(data.column.index)
          ? "center"
          : "left";
      },
      didDrawPage: function (data) {
        const currentPage = data.pageNumber;
        const leftText = "Development By:acnoo.com";
        const rightText = `Page-${currentPage}`;

        pdf.setFontSize(9);
        pdf.setTextColor(141, 134, 134);

        // Calculate positions
        const leftX = data.settings.margin.left;
        const rightX = pdf.internal.pageSize.width - data.settings.margin.right;
        const y = pdf.internal.pageSize.height - 5;

        // Draw left text
        pdf.text(leftText, leftX, y);

        // Draw right text
        const rightTextWidth =
          (pdf.getStringUnitWidth(rightText) * pdf.internal.getFontSize()) /
          pdf.internal.scaleFactor;
        pdf.text(rightText, rightX - rightTextWidth, y);
      },
    });

    // handleFormattedDate function import another page
    pdf.save(`${handleFormattedDate()}-acnoo.pdf`);
    //Toast
    handleSuccessToast("Downloaded Successfully");
  };

  const lossProfitCalculation = lossProfitData?.data?.data;

  return (
    <>
      <LossProfitReportsPdf
        lossProfitData={lossProfitData}
        isLoading={isLoading}
        isError={isError}
        totalSale={lossProfitCalculation?.overall_total_sale || 0}
      />
      <div className="acnoo-dashboard-main-section acnoo-reports-section active">
        {(isLoading || isFetching) && <LineLoader />}

        <ReportsSidebarMenu />
        <div className="acnoo-dashboard-wrapper reports-wrapper">
          <div className="acnoo-dashboard-details-wrapper">
            <div className="details-header print-d-none">
              <div className="title">
                <h4 className="padY-2">Loss Profit Reports</h4>
              </div>
            </div>

            <ReportsMobileMenu />

            <div className="dashboard-details-table-wrapper">
              <div className="total-count-area mt-2">
                <div className="count-item light-blue">
                  <h5>
                    $
                    {getNumberWithCommas(
                      twoDigitFixed(
                        lossProfitCalculation?.overall_total_sale || 0
                      )
                    )}
                  </h5>
                  <p>Total Sale</p>
                </div>
                <div className="count-item light-green">
                  <h5>
                    $
                    {getNumberWithCommas(
                      twoDigitFixed(
                        lossProfitCalculation?.overall_total_paid || 0
                      )
                    )}
                  </h5>
                  <p>Total Paid</p>
                </div>
                <div className="count-item light-orange">
                  <h5>
                    $
                    {getNumberWithCommas(
                      twoDigitFixed(
                        lossProfitCalculation?.overall_total_due || 0
                      )
                    )}
                  </h5>
                  <p>Total Unpaid</p>
                </div>
                <div className="count-item light-blue-sm">
                  <h5>
                    $
                    {getNumberWithCommas(
                      twoDigitFixed(
                        lossProfitCalculation?.overall_total_profit || 0
                      )
                    )}
                  </h5>
                  <p>Total Profit</p>
                </div>
                <div className="count-item light-red">
                  <h5>
                    $
                    {getNumberWithCommas(
                      twoDigitFixed(
                        lossProfitCalculation?.overall_total_loss || 0
                      )
                    )}
                  </h5>
                  <p>Total Loss</p>
                </div>
              </div>
              <div className="table-top-form daily-transaction-between-wrapper top-filter-wrapper">
                <ReportsTableTopFilter
                  filterPerPage={filterPerPage}
                  handlePerPageFilter={handlePerPageFilter}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  dateFilter={dateFilter}
                  handleDateFilter={handleDateFilter}
                />
                <div className="table-top-btn-group">
                  <ReportsTableTopButtons
                    arrayData={tableData}
                    pdfDownloadFunc={handleTablePdfDownload}
                  />
                </div>
              </div>

              <div className="responsive-table">
                <table className="table">
                  <LossProfitReportsTableUI
                    lossProfitData={lossProfitData}
                    isLoading={isLoading}
                    isError={isError}
                  />
                </table>
              </div>
              {lossProfitData !== undefined &&
                lossProfitData?.data?.data?.loss_profit?.length > 0 && (
                  <Pagination
                    pagination={lossProfitData?.data?.pagination}
                    setSelectedPage={setSelectedPage}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LossProfitReports;
