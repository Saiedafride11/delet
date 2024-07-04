import React, { useState } from "react";
import { useSelector } from "react-redux";
import searchIcon from "../../../../assets/images/icons/search.svg";
import crossIcon from "../../../../assets/images/icons/x-red.svg";
import { twoDigitFixed } from "../../../../components/function/twoDigitFixed";
import LineLoader from "../../../../components/ui/Spinner/LineLoader";
import useClickOutside from "../../../../hooks/useClickOutside";
import useScrollPagination from "../../../../hooks/useScrollPagination";
import { useGetVariationProductsQuery } from "../../../../redux/features/products/products/productsApi";

const SearchingProducts = ({ formValue, setFormValue }) => {
  const [searchText, setSearchText] = useState("");
  const [tableOpen, setTableOpen] = useState(false);
  const globalSettings = useSelector(
    (state) => state?.settings?.globalSettings?.value?.sale_settings?.item_info
  );
  const { perPage } = useScrollPagination("overflow-auto", searchText);
  const {} = useClickOutside(setTableOpen, "inventory-product-search");

  const filterQuery = `?search=${searchText}&warehouse_id=${formValue?.warehouse_id}&per_page=30&filter=Sale`;

  const {
    data: productsData,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetVariationProductsQuery(filterQuery);

  const custom_sale_price =
    formValue?.party_type == 2
      ? "dealer_price"
      : formValue?.party_type == 4
      ? "wholesale_price"
      : "sale_price";

  const handleProductClick = (data) => {
    setTableOpen(false);
    setSearchText("");

    const isExist = formValue?.items?.find(
      (item) => item.stock_code === data?.stock_code
    );

    if (isExist) {
    } else {
      const totalAmount =
        formValue?.items?.reduce(
          (total, item) => total + item[custom_sale_price] * item.quantity,
          0
        ) +
        data[custom_sale_price] * 0; // 0 means data?.quantity

      setFormValue((prev) => ({
        ...prev,
        items: [
          ...prev.items,
          {
            product_id: data?.id,
            stock_code: data?.stock_code,
            warehouse_id: data?.warehouse_id,
            // warehouse_name: data?.warehouse, //name
            // warehouse_open: false,
            name: data?.name,
            exist_unit_price: data?.unit_price,
            purchase_price: data?.purchase_price,
            sale_price: data[custom_sale_price],
            old_sale_price: data?.sale_price,
            wholesale_price: data?.wholesale_price,
            dealer_price: data?.dealer_price,
            exist_serial_no: data?.serial_no,
            serial_no: [],
            exist_free_serial_no: data?.free_serial_no,
            free_serial_no: [],
            sale_free_serial_no: [],
            exist_quantity: data?.quantity,
            quantity: 0,
            exist_free_quantity: data?.free_quantity,
            free_quantity: 0,
            sale_free_quantity: 0,
            exist_total_quantity: data?.quantity + data?.free_quantity,
            unit_name: data?.unit,
            // discount:
            //   data?.discount_type === "Fixed"
            //     ? data?.discount
            //     : data?.discount_percent,

            discount:
              formValue?.party_type == 3
                ? data?.discount_type === "Fixed"
                  ? data?.unit_price - data[custom_sale_price]
                  : twoDigitFixed(
                      100 - (data[custom_sale_price] / data?.unit_price) * 100
                    )
                : 0,

            discount_type: data?.discount_type || "Fixed",
            variation:
              data?.product_type === "Standard"
                ? []
                : [
                    {
                      color_id: data.color_id,
                      size_id: data.size_id,
                      capacity_id: data.capacity_id,
                      type_id: data.type_id,
                      weight_id: data.weight_id,
                    },
                  ],
            exist_variation:
              data?.product_type === "Standard"
                ? {}
                : {
                    color: data?.color,
                    size: data?.size,
                    warehouse: data?.warehouse,
                    capacity: data?.capacity,
                    type: data?.type,
                    weight: data?.weight,
                  },
          },
        ],
        total_amount: totalAmount,
        grand_total: twoDigitFixed(
          totalAmount +
            Number(prev?.vat) +
            Number(prev?.service_charge) -
            Number(prev?.discount)
        ),
        due_amount: twoDigitFixed(
          totalAmount +
            Number(prev?.vat) +
            Number(prev?.service_charge) -
            Number(prev?.discount) -
            Number(prev?.paid_amount)
        ),
      }));
    }
  };

  const handleTableClose = () => {
    setTableOpen(false);
    setSearchText("");
  };

  // console.log("totalPrice", formValue);
  // console.log("globalSettings", productsData);
  // console.log("isSuccess", isSuccess);
  // console.log("data", productsData?.data?.products?.data);
  // console.log("productsData", productsData);

  return (
    <>
      {tableOpen && (isLoading || isFetching) && <LineLoader />}
      <div className="inventory-product-search position-relative">
        <div className="position-relative">
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Search Product by code or name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onClick={() => setTableOpen(true)}
          />
          <span className="position-absolute top-50 translate-middle-y ps-3">
            <img src={searchIcon} className="w-75" alt="icon" />
          </span>
          {tableOpen && (
            <span
              onClick={handleTableClose}
              className="position-absolute top-50 end-0 translate-middle-y ps-3 cursor-pointer"
            >
              <img src={crossIcon} className="w-75" alt="icon" />
            </span>
          )}
        </div>
        {tableOpen && (
          <div className="product-search shadow">
            <div className="overflow-auto max-h-300">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>name</th>
                    <th>Model</th>
                    <th className="d-none-max-xxl">Color</th>
                    <th className="d-none-max-xxl">Size</th>
                    <th className="d-none-max-xxl">Capacity</th>
                    <th className="d-none-max-xxl">Weight</th>
                    <th className="d-none-max-xxl">Type</th>
                    <th>Purchase Price</th>
                    <th>Sale Price</th>
                    {formValue?.party_type != "4" &&
                      globalSettings?.wholesale_price && (
                        <th>Wholesale Price</th>
                      )}
                    {formValue?.party_type != "2" &&
                      globalSettings?.dealer_price && <th>Dealer Price</th>}
                    <th>Stock</th>
                    <th>Free</th>
                  </tr>
                </thead>
                <tbody>
                  {productsData?.data?.products?.length === 0 ||
                  productsData?.data?.products === undefined ||
                  isLoading ||
                  isError ? (
                    <tr>
                      <td className="p-2 text-start">No Data Found!</td>
                    </tr>
                  ) : (
                    productsData?.data?.products?.map((data, index) => (
                      <tr key={index} onClick={() => handleProductClick(data)}>
                        <td>{data?.sku_code}</td>
                        <td>{data?.name}</td>
                        <td>{data?.p_model}</td>
                        <td className="d-none-max-xxl">{data?.color}</td>
                        <td className="d-none-max-xxl">{data?.size}</td>
                        <td className="d-none-max-xxl">{data?.capacity}</td>
                        <td className="d-none-max-xxl">{data?.weight}</td>
                        <td className="d-none-max-xxl">{data?.type}</td>
                        <td>${data?.purchase_price}</td>
                        <td>${data[custom_sale_price]}</td>
                        {formValue?.party_type != "4" &&
                          globalSettings?.wholesale_price && (
                            <td>${data?.wholesale_price}</td>
                          )}
                        {formValue?.party_type != "2" &&
                          globalSettings?.dealer_price && (
                            <td>${data?.dealer_price}</td>
                          )}
                        <td>{data?.quantity}</td>
                        <td>{data?.free_quantity}</td>
                      </tr>
                    ))
                  )}
                  {/* {productsData?.data?.products?.data !== undefined &&
                  isLoading === false &&
                  isSuccess === false && (
                    <tr>
                      <td className="bg-sky">Loading...</td>
                    </tr>
                  )} */}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchingProducts;
