import React from "react";
import { Link } from "react-router-dom";
import { getMonthDayYearFormat } from "../../../components/function/getMonthDayYearFormat";
import { useGetInvoiceSlipListQuery } from "../../../redux/features/due/dueApi";

const DueSlipListModal = ({ slipInfo, setSlipInfo, currencySymbol }) => {
  const {
    data: slipData,
    isLoading,
    isError,
  } = useGetInvoiceSlipListQuery(
    {
      invoiceId: slipInfo?.invoiceId,
      invoiceType: slipInfo?.invoiceType,
    },
    { skip: Object.keys(slipInfo).length === 0 ? true : false }
    // { skip: !slipInfo?.invoiceId ? true : false }
  );
  const initialData = slipData?.data;

  return (
    <div
      className="modal fade modal-custom-design"
      id="pos-view-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg-600">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
              Invoice {initialData?.prefix + initialData?.invoice}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setSlipInfo({})}
            ></button>
          </div>
          <div className="modal-body">
            <div className="overflow-auto max-h-400">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th>SL.</th>
                    <th>Date</th>
                    <th>Payment Slip</th>
                    <th className="text-center">Amount</th>
                    <th className="text-start">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {initialData?.due_collects?.length === 0 ||
                  initialData?.due_payments?.length === 0 ||
                  isLoading ||
                  isError ? (
                    <tr>
                      <td className="py-2 px-0">No Data Found!</td>
                    </tr>
                  ) : (
                    (
                      initialData?.due_collects || initialData?.due_payments
                    )?.map((data, index) => (
                      <tr key={index}>
                        <td>{index < 9 ? `0${index + 1}` : index + 1}</td>
                        <td>{getMonthDayYearFormat(data?.collect_date)}</td>
                        <td>#{data?.prefix + data?.invoice}</td>
                        <td className="text-center">
                          {currencySymbol + data?.amount}
                        </td>
                        <td className="text-start">
                          <Link
                            to={`${
                              initialData?.due_collects
                                ? `/due/sale/slip/${data?.id}`
                                : `/due/purchase/slip/${data?.id}`
                            }`}
                            target="_blank"
                            className="text-sky"
                          >
                            View Slip {">"}
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DueSlipListModal);
