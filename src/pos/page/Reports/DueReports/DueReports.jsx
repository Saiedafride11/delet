import React, { useState } from "react";
// import moneyMillsIcon from "../../../assets/images/actions/money-bills.svg";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import PaginationLocal from "../../../components/common/PaginationLocal";
import TableTopFromToDate from "../../../components/common/TableTopFromToDate";
import TableTopPartyFilter from "../../../components/common/TableTopPartyFilter";
import TableTopSearch from "../../../components/common/TableTopSearch";
import { getCurrentDateWithLastYear } from "../../../components/function/getCurrentDateAndTime";
import { getMonthDayYearFormat } from "../../../components/function/getMonthDayYearFormat";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import { partyTypeMap } from "../../../components/types/partyTypeMap";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import { handleSuccessToast } from "../../../components/ui/Toast/handleSuccessToast";
import { handleFormattedDate } from "../../../components/utils/TableTopButtons/handleFormattedDate";
import useFilterFromToDate from "../../../hooks/useFilterFromToDate";
import { useGetDueListQuery } from "../../../redux/features/due/dueApi";
import ReportsTableTopButtons from "../components/ReportsTableTopButtons";
import ReportsMobileMenu from "../components/Sidebar/ReportsMobileMenu";
import ReportsSidebarMenu from "../components/Sidebar/ReportsSidebarMenu";
import DueReportsPdf from "./DueReportsPdf";
import DueReportsTableUI from "./DueReportsTableUI";

const DueReports = () => {
  document.title = "Due Reports";
  const [selectedPage, setSelectedPage] = useState(1);
  const [filterPerPage, setFilterPerPage] = useState(20);
  const [searchText, setSearchText] = useState("");
  const [partyType, setPartyType] = useState("");

  // -----------------------------------------------
  // All Data Show
  // -----------------------------------------------

  let filterQuery;
  if (searchText !== "" && partyType === "") {
    filterQuery = `?search=${searchText}`;
  } else if (searchText === "" && partyType !== "") {
    filterQuery = `?filter=${partyType}`;
  } else {
    filterQuery = `?search=${searchText}&filter=${partyType}`;
  }
  const { dateFilter, dateFilterParams, handleDateFilter } =
    useFilterFromToDate();

  const newFilterQuery = filterQuery
    ? filterQuery + `&${dateFilterParams}`
    : `?${dateFilterParams}`;

  const {
    data: dueData,
    isLoading,
    isError,
    isFetching,
  } = useGetDueListQuery(`${newFilterQuery}&filter_report=Report`);

  // -----------------------------------------------
  // Local Modified Data
  // -----------------------------------------------

  const dueListData = dueData?.data["due-list"]?.map((data) => ({
    id: data?.id,
    name: data?.name,
    date:
      (data?.sales?.[0]?.sale_date &&
        getMonthDayYearFormat(data.sales[0].sale_date)) ||
      (data?.purchase?.[0]?.purchase_date &&
        getMonthDayYearFormat(data.purchase[0].purchase_date)),
    party_type: data?.party_type,
    balance: data?.balance,
    totalDue: data?.party_total_due,
    dueType: data?.purchase?.length > 0 ? "purchase" : "sales",
    invoiceList: data?.purchase?.length > 0 ? data?.purchase : data?.sales,
    due_date:
      (data?.sales?.[0]?.due_date &&
        getMonthDayYearFormat(data.sales[0].due_date)) ||
      (data?.purchase?.[0]?.due_date &&
        getMonthDayYearFormat(data.purchase[0].due_date)),
  }));

  const updateDueList = dueListData?.slice(
    (selectedPage - 1) * filterPerPage,
    filterPerPage === "all" ? dueListData?.length : selectedPage * filterPerPage
  );
  const updatePerPage =
    filterPerPage === "all" ? dueListData?.length : filterPerPage;

  const dataFrom = (selectedPage - 1) * updatePerPage + 1;

  const handlePerPageFilter = (e) => {
    setFilterPerPage(e.target.value);
    setSelectedPage(1);
  };

  // -----------------------------------------------
  // Make Excel, CSV data
  // -----------------------------------------------
  const tableData = dueData?.data["due-list"]?.map((data) => ({
    "Party Name": data?.name,
    "Party Type": partyTypeMap[data?.party_type],
    "Total Due": `$${getNumberWithCommas(
      twoDigitFixed(data?.party_total_due || 0)
    )}`,
    "Due Date":
      (data?.sales?.[0]?.due_date &&
        getMonthDayYearFormat(data.sales[0].due_date)) ||
      (data?.purchase?.[0]?.due_date &&
        getMonthDayYearFormat(data.purchase[0].due_date)),
    "Due Type": data?.purchase?.length > 0 ? "purchase" : "sales",
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
    addCenteredText(`Due Reports`, 10, 14, 12);
    addCenteredText(`Data: ${getCurrentDateWithLastYear()}`, 7, 19, 9);

    autoTable(pdf, {
      html: "#due-report-table",
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
          halign: "center",
        },
        4: {
          lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0 },
          halign: "center",
        },
        5: {
          lineWidth: { top: 0.1, right: 0.1, bottom: 0.1, left: 0 },
          halign: "center",
        },
      },
      didParseCell: function (data) {
        var rowCount = data.table.body?.length;
        if (data.row.index === rowCount - 1) {
          data.cell.styles.fontStyle = "bold";
        }

        data.cell.styles.halign = [3, 4, 5, 6].includes(data.column.index)
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

  // console.log("salesData", salesData?.data?.sale?.data);

  // const sale_filter = salesData?.data?.sale_filter_total?.[0];

  const total_due =
    dueData?.data?.["sale-due"] + dueData?.data?.["purchase-due"];

  return (
    <>
      <DueReportsPdf
        updateDueList={updateDueList}
        isLoading={isLoading}
        isError={isError}
        dataFrom={dataFrom}
        total_due={total_due}
      />
      <div className="acnoo-dashboard-main-section acnoo-reports-section active">
        {(isLoading || isFetching) && <LineLoader />}

        <ReportsSidebarMenu />
        <div className="acnoo-dashboard-wrapper reports-wrapper">
          <div className="acnoo-dashboard-details-wrapper">
            <div className="details-header print-d-none">
              <div className="title">
                <h4 className="padY-2">Due Reports</h4>
              </div>
            </div>

            <ReportsMobileMenu />

            <div className="dashboard-details-table-wrapper">
              <div className="total-count-area mt-2">
                <div className="count-item light-red">
                  <h5>${getNumberWithCommas(twoDigitFixed(total_due || 0))}</h5>
                  <p>Total Due</p>
                </div>
              </div>
              <div className="table-top-form daily-transaction-between-wrapper top-filter-wrapper">
                <form>
                  <div className="d-flex align-items-center gap-2 custom-flex-wrap">
                    <div className="d-flex align-items-center gap-2 section-one">
                      <div className="input-wrapper pos-up-down-arrow w-130 report-select">
                        <select
                          name="filter-per-page"
                          className="form-control m-0"
                          value={filterPerPage}
                          onChange={handlePerPageFilter}
                        >
                          <option value="20">20</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                          <option value="500">500</option>
                        </select>
                        <span></span>
                      </div>
                      <TableTopSearch
                        searchText={searchText}
                        setSearchText={setSearchText}
                      />
                    </div>
                    <TableTopPartyFilter
                      partyType={partyType}
                      setPartyType={setPartyType}
                    />
                    <TableTopFromToDate
                      dateFilter={dateFilter}
                      handleDateFilter={handleDateFilter}
                      page="reports"
                      component="dueReports"
                    />
                  </div>
                </form>
                <div className="table-top-btn-group">
                  <ReportsTableTopButtons
                    arrayData={tableData}
                    pdfDownloadFunc={handleTablePdfDownload}
                  />
                </div>
              </div>

              <div className="responsive-table">
                <table className="table">
                  <DueReportsTableUI
                    updateDueList={updateDueList}
                    isLoading={isLoading}
                    isError={isError}
                    dataFrom={dataFrom}
                  />
                </table>
              </div>
              {dueListData?.length > 0 && (
                <PaginationLocal
                  items={dueListData}
                  filterPerPage={
                    filterPerPage === "all"
                      ? dueListData?.length
                      : filterPerPage
                  }
                  selectedPage={selectedPage}
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

export default DueReports;
