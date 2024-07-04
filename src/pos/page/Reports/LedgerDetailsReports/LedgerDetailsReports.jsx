import React from "react";
// import moneyMillsIcon from "../../../assets/images/actions/money-bills.svg";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useParams } from "react-router-dom";
import Pagination from "../../../components/common/Pagination";
import TableTopFromToDate from "../../../components/common/TableTopFromToDate";
import TableTopSearch from "../../../components/common/TableTopSearch";
import { getCurrentDateWithLastYear } from "../../../components/function/getCurrentDateAndTime";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import { handleSuccessToast } from "../../../components/ui/Toast/handleSuccessToast";
import { handleFormattedDate } from "../../../components/utils/TableTopButtons/handleFormattedDate";
import useFilterFromToDate from "../../../hooks/useFilterFromToDate";
import useFilterSearchQuery from "../../../hooks/useFilterSearchQuery";
import { useGetLedgerQuery } from "../../../redux/features/ledger/ledgerApi";
import ReportsTableTopButtons from "../components/ReportsTableTopButtons";
import ReportsMobileMenu from "../components/Sidebar/ReportsMobileMenu";
import ReportsSidebarMenu from "../components/Sidebar/ReportsSidebarMenu";
import LedgerDetailsReportsPdf from "./LedgerDetailsReportsPdf";
import LedgerDetailsReportsTableUI from "./LedgerDetailsReportsTableUI";

const LedgerDetailsReports = () => {
  const { ledgerId } = useParams();

  // -----------------------------------------------
  // All Data Show
  // -----------------------------------------------

  const {
    filterPerPage,
    handlePerPageFilter,
    searchText,
    setSearchText,
    selectedPage,
    setSelectedPage,
    filterQuery,
  } = useFilterSearchQuery("ReportLedgerDetails");

  const { dateFilter, dateFilterParams, handleDateFilter } =
    useFilterFromToDate();

  const newFilterQuery = filterQuery
    ? filterQuery + `&${dateFilterParams}`
    : `?${dateFilterParams}`;

  const {
    data: ledgerData,
    isLoading,
    isError,
    isFetching,
  } = useGetLedgerQuery(`${ledgerId + newFilterQuery}&filter_report=Report`);

  // -----------------------------------------------
  // Make Excel, CSV data
  // -----------------------------------------------
  // const tableData = ledgerData?.data?.data?.map((data) => ({
  //   "Party Name": data?.name,
  //   "Phone Number": data?.phone,
  //   "Party Type": partyTypeMap[data?.party_type] || "",
  //   "Total Amount": `$${getNumberWithCommas(
  //     twoDigitFixed(data?.party_total_transaction)
  //   )}`,
  //   Paid: `$${getNumberWithCommas(twoDigitFixed(data?.party_total_paid))}`,
  //   Due: `$${getNumberWithCommas(twoDigitFixed(data?.party_total_due))}`,
  //   Remarks: "N/A",
  // }));

  const tableData = [{ id: 1 }, { id: 2 }];

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
    addCenteredText(`Party Ledger`, 11, 14, 12);
    addCenteredText(`Data: ${getCurrentDateWithLastYear()}`, 8, 19, 9);

    autoTable(pdf, {
      html: "#ledger-report-details-table",
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
          lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0 },
        },
        6: {
          lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0 },
        },
        7: {
          lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0 },
          halign: "center",
        },
        8: {
          lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0 },
          halign: "center",
        },
        9: {
          lineWidth: { top: 0.1, right: 0.1, bottom: 0.1, left: 0 },
          halign: "center",
        },
      },
      didParseCell: function (data) {
        var rowCount = data.table.body?.length;
        if (data.row.index === rowCount - 1) {
          data.cell.styles.fontStyle = "bold";
        }

        data.cell.styles.halign = [3, 4, 7, 8, 9].includes(data.column.index)
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
  // -----------------------------------------------
  // Document title
  // -----------------------------------------------
  document.title = ledgerData?.data?.party?.name || "Ledger Details Reports";

  // console.log("selectedPage", selectedPage);
  return (
    <>
      <LedgerDetailsReportsPdf
        ledgerData={ledgerData}
        isLoading={isLoading}
        isError={isError}
        selectedPage={selectedPage}
        dateFilter={dateFilter}
      />
      <div className="acnoo-dashboard-main-section acnoo-reports-section active">
        {(isLoading || isFetching) && <LineLoader />}

        <ReportsSidebarMenu />
        <div className="acnoo-dashboard-wrapper reports-wrapper">
          <div className="acnoo-dashboard-details-wrapper">
            <div className="details-header print-d-none">
              <div className="title">
                <h4 className="padY-2">
                  {ledgerData?.data?.party?.name || "Ledger Details Reports"}
                </h4>
              </div>
            </div>

            <ReportsMobileMenu />

            <div className="dashboard-details-table-wrapper">
              <div className="total-count-area mt-2">
                <div className="count-item light-blue">
                  <h5>
                    $
                    {getNumberWithCommas(
                      twoDigitFixed(ledgerData?.data?.salePurchaseTotal || 0)
                    )}
                  </h5>
                  <p>Total Sale</p>
                </div>
                <div className="count-item light-green">
                  <h5>
                    $
                    {getNumberWithCommas(
                      twoDigitFixed(ledgerData?.data?.collectPaymentDue || 0)
                    )}
                  </h5>
                  <p>Total Paid</p>
                </div>
                <div className="count-item light-orange">
                  <h5>
                    $
                    {getNumberWithCommas(
                      twoDigitFixed(ledgerData?.data?.currentDue || 0)
                    )}
                  </h5>
                  <p>Total Due</p>
                </div>
                <div className="count-item light-blue-sm">
                  <h5>
                    $
                    {getNumberWithCommas(
                      twoDigitFixed(
                        ledgerData?.data?.party?.balance_info
                          ?.opening_balance || 0
                      )
                    )}
                  </h5>
                  <p>Opening Balance</p>
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
                          <option value={selectedPage === 1 ? "19" : "20"}>
                            20
                          </option>
                          <option value={selectedPage === 1 ? "49" : "50"}>
                            50
                          </option>
                          <option value={selectedPage === 1 ? "99" : "100"}>
                            100
                          </option>
                          <option value={selectedPage === 1 ? "499" : "500"}>
                            500
                          </option>
                        </select>
                        <span></span>
                      </div>
                      <TableTopSearch
                        searchText={searchText}
                        setSearchText={setSearchText}
                      />
                    </div>
                    <TableTopFromToDate
                      dateFilter={dateFilter}
                      handleDateFilter={handleDateFilter}
                      page="reports"
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
                  <LedgerDetailsReportsTableUI
                    ledgerData={ledgerData}
                    isLoading={isLoading}
                    isError={isError}
                    selectedPage={selectedPage}
                    dateFilter={dateFilter}
                  />
                </table>
              </div>
              {ledgerData !== undefined &&
                ledgerData?.data?.transaction?.data?.length > 0 && (
                  <Pagination
                    pagination={ledgerData?.data?.transaction}
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

export default LedgerDetailsReports;
