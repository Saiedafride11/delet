import React, { useState } from "react";
import { getMonthDayYearFormat } from "../../../components/function/getMonthDayYearFormat";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import { paymentTypeMap } from "../../../components/types/paymentTypeMap";
import TableNoData from "../../../components/ui/NoData/TableNoData";

const LedgerDetailsReportsTableUI = ({
  ledgerData,
  isLoading,
  isError,
  page,
  selectedPage,
  dateFilter,
}) => {
  const [lastLedgerData, setLastLedgerData] = useState("");

  const filterCreatedDate =
    new Date(dateFilter?.selectedStartDate) >=
    new Date(ledgerData?.data?.party?.created_at);

  const updateLedgerData = [];
  // let balance = 16892;
  let balance = filterCreatedDate
    ? Number(ledgerData?.data?.currentBalance)
    : ledgerData?.data?.party?.balance_info?.opening_balance_type === "Due"
    ? Number(ledgerData?.data?.party?.balance_info?.opening_balance)
    : Number(-ledgerData?.data?.party?.balance_info?.opening_balance);

  // let balance =
  //   selectedPage == 1 &&
  //   (filterCreatedDate
  //     ? Number(ledgerData?.data?.currentBalance)
  //     : ledgerData?.data?.party?.balance_info?.opening_balance_type === "Due"
  //     ? Number(ledgerData?.data?.party?.balance_info?.opening_balance)
  //     : Number(-ledgerData?.data?.party?.balance_info?.opening_balance));

  for (let i = 0; i < ledgerData?.data?.transaction?.data?.length; i++) {
    const data = ledgerData?.data?.transaction?.data[i];

    // Calculate date
    const date =
      data?.transactionable_date &&
      getMonthDayYearFormat(data?.transactionable_date);

    // Calculate transactionable_type
    const transactionable_type = data?.transactionable_type;

    // Calculate invoice
    const invoice =
      data?.transactionable?.prefix + data?.transactionable?.invoice;

    // Calculate payment_type
    const payment_type =
      paymentTypeMap[data?.transactionable?.payment_type_id] || "";

    // Calculate debit
    const debit =
      data?.transactionable_type === "Sale"
        ? Number(data?.transactionable?.grand_total)
        : 0;

    // Calculate credit
    const credit =
      data?.transactionable_type !== "Sale"
        ? Number(data?.transactionable?.amount)
        : 0;

    // Calculate balance
    balance =
      transactionable_type === "Sale" ? balance + debit : balance - credit;

    console.log("balance", balance);

    updateLedgerData.push({
      date,
      transactionable_type,
      invoice,
      payment_type,
      payment_type_id: data?.transactionable?.payment_type_id || "",
      cheque: "Coming...",
      user_name: data?.transactionable?.user?.name,
      debit,
      credit,
      balance,
    });
  }

  const totalDebit = updateLedgerData?.reduce(
    (total, item) => total + item?.debit,
    0
  );
  const totalCredit = updateLedgerData?.reduce(
    (total, item) => total + item?.credit,
    0
  );

  // console.log("totalDebit", totalDebit);
  // console.log("totalCredit", totalCredit);
  // console.log("balance", balance);

  // console.log("currentBalance", Number(ledgerData?.data?.currentBalance));
  // console.log(
  //   "totalCredit",
  //   ledgerData?.data?.party?.balance_info?.opening_balance
  // );

  // console.log("balance", balance);

  // useEffect(() => {
  //   setLastLedgerData(updateLedgerData[updateLedgerData?.length - 1]?.balance);
  // }, [selectedPage, updateLedgerData]);

  // console.log("lastLedgerData", lastLedgerData);
  return (
    <>
      <thead>
        <tr>
          <th>SL.</th>
          <th>Date</th>
          <th>TransactionMode</th>
          <th>Voucher</th>
          <th className="text-center">Payment Method</th>
          <th>Cheque</th>
          <th>Received By</th>
          <th className="text-center">Debit</th>
          <th className="text-center">Credit</th>
          <th className="text-center">Balance</th>
        </tr>
      </thead>
      <tbody>
        {updateLedgerData?.length === 0 ||
        updateLedgerData === undefined ||
        isLoading ||
        isError ? (
          <TableNoData />
        ) : (
          <>
            {selectedPage == 1 && (
              <tr>
                <td>01</td>
                <td>
                  {filterCreatedDate
                    ? getMonthDayYearFormat(dateFilter?.selectedStartDate)
                    : getMonthDayYearFormat(
                        ledgerData?.data?.party?.created_at
                      )}
                </td>
                <td>
                  {filterCreatedDate ? "Last Balance" : "Opening Balance"}
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-center">
                  $
                  {filterCreatedDate && ledgerData?.data?.currentBalance >= 0
                    ? getNumberWithCommas(
                        twoDigitFixed(ledgerData?.data?.currentBalance)
                      )
                    : ledgerData?.data?.party?.balance_info
                        ?.opening_balance_type === "Due"
                    ? getNumberWithCommas(
                        twoDigitFixed(
                          ledgerData?.data?.party?.balance_info?.opening_balance
                        )
                      )
                    : 0}
                </td>
                <td className="text-center">
                  $
                  {filterCreatedDate && ledgerData?.data?.currentBalance <= 0
                    ? getNumberWithCommas(
                        twoDigitFixed(ledgerData?.data?.currentBalance)
                      )
                    : ledgerData?.data?.party?.balance_info
                        ?.opening_balance_type !== "Due"
                    ? getNumberWithCommas(
                        twoDigitFixed(
                          ledgerData?.data?.party?.balance_info?.opening_balance
                        )
                      )
                    : 0}
                </td>
                <td className="text-center">
                  $
                  {filterCreatedDate
                    ? getNumberWithCommas(
                        twoDigitFixed(ledgerData?.data?.currentBalance)
                      )
                    : ledgerData.data.party.balance_info
                        .opening_balance_type === "Due"
                    ? getNumberWithCommas(
                        twoDigitFixed(
                          ledgerData.data.party.balance_info.opening_balance
                        )
                      )
                    : getNumberWithCommas(
                        twoDigitFixed(
                          -ledgerData.data.party.balance_info.opening_balance
                        )
                      )}
                </td>
              </tr>
            )}
            {updateLedgerData?.map((data, index) => (
              <tr key={index}>
                <td>
                  <span className="ms-0">
                    {ledgerData?.data?.transaction?.from < 8 && index < 8
                      ? `0${ledgerData?.data?.transaction?.from + index + 1}`
                      : ledgerData?.data?.transaction?.from + index + 1}
                  </span>
                </td>
                <td>{data?.date}</td>
                <td>
                  {data?.transactionable_type === "Sale" ||
                  data?.transactionable_type === "Purchase"
                    ? `Credit ${data?.transactionable_type}`
                    : data?.transactionable_type === null
                    ? "N/A"
                    : `Received By ${
                        paymentTypeMap[data?.payment_type_id] || ""
                      }`}
                </td>
                <td>{data?.invoice}</td>
                <td className="text-center">{data?.payment_type}</td>
                <td>{data?.cheque}</td>
                <td>{data?.user_name}</td>
                <td className="text-center">
                  ${getNumberWithCommas(twoDigitFixed(data?.debit))}
                </td>
                <td className="text-center">
                  ${getNumberWithCommas(twoDigitFixed(data?.credit))}
                </td>
                <td className="text-center">
                  ${getNumberWithCommas(twoDigitFixed(data?.balance))}
                </td>
              </tr>
            ))}
          </>
        )}
        {page === "pdf" && (
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="fw-bold text-center">GrandTotal:</td>
            <td>
              $
              {getNumberWithCommas(
                twoDigitFixed(
                  totalDebit +
                    Number(
                      filterCreatedDate && ledgerData?.data?.currentBalance >= 0
                        ? ledgerData?.data?.currentBalance
                        : ledgerData?.data?.party?.balance_info
                            ?.opening_balance_type === "Due"
                        ? ledgerData?.data?.party?.balance_info?.opening_balance
                        : 0
                    )
                )
              )}
            </td>
            <td>
              $
              {getNumberWithCommas(
                twoDigitFixed(
                  totalCredit +
                    Number(
                      filterCreatedDate && ledgerData?.data?.currentBalance <= 0
                        ? ledgerData?.data?.currentBalanc
                        : ledgerData?.data?.party?.balance_info
                            ?.opening_balance_type !== "Due"
                        ? ledgerData?.data?.party?.balance_info?.opening_balance
                        : 0
                    )
                )
              )}
            </td>
            <td>${updateLedgerData[updateLedgerData?.length - 1]?.balance}</td>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default LedgerDetailsReportsTableUI;
