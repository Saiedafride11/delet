import React, { useState } from "react";
import { useSelector } from "react-redux";
import searchIcon from "../../../../assets/images/icons/search.svg";
import crossIcon from "../../../../assets/images/icons/x-red.svg";
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

  // const filterQuery = `?search=${searchText}&page=1&per_page=${perPage}`;
  // const {
  //   data: productsData,
  // } = useGetProductsQuery(filterQuery);

  const warehouseId =
    formValue?.from_warehouse_id === null ? "" : formValue?.from_warehouse_id;
  const filterQuery = `?search=${searchText}&warehouse_id=${warehouseId}&per_page=30&filter=Sale`;
  // const filterQuery = `?search=${searchText}&per_page=30&filter=Sale`;
  const {
    data: productsData,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetVariationProductsQuery(filterQuery);

  const handleProductClick = (data) => {
    setTableOpen(false);
    setSearchText("");

    const isExist = formValue?.items?.find(
      (item) => item?.stock_id === data?.stock_id
    );

    if (isExist) {
    } else {
      const totalAmount =
        formValue?.items?.reduce(
          (total, item) => total + item?.purchase_price * item?.quantity,
          0
        ) +
        data?.purchase_price * 0; // 0 means data?.quantity

      const totalQuantity =
        formValue?.items?.reduce((total, item) => total + item?.quantity, 0) +
        0;

      const totalFreeQuantity =
        formValue?.items?.reduce(
          (total, item) => total + item?.free_quantity,
          0
        ) + 0;

      setFormValue((prev) => ({
        ...prev,
        items: [
          ...prev.items,
          {
            stock_id: data?.stock_id,
            name: data?.name,
            purchase_price: data?.purchase_price,
            // sale_price: data?.sale_price,
            exist_serial_no:
              data?.serial_no?.[0] === null ? [] : data?.serial_no,
            serial_no: [],
            exist_free_serial_no:
              data?.free_serial_no?.[0] === null ? [] : data?.free_serial_no,
            free_serial_no: [],
            exist_quantity: data?.quantity,
            quantity: 0,
            exist_free_quantity: data?.free_quantity,
            free_quantity: 0,
            exist_variation:
              data?.product_type === "Standard"
                ? {}
                : {
                    color: data?.color,
                    size: data?.size,
                    capacity: data?.capacity,
                    type: data?.type,
                    weight: data?.weight,
                  },
          },
        ],
        amount: totalAmount,
        quantity: totalQuantity,
        free_quantity: totalFreeQuantity,
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
                    {globalSettings?.wholesale_price && (
                      <th>Wholesale Price</th>
                    )}
                    {globalSettings?.dealer_price && <th>Dealer Price</th>}
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
                        <td>${data?.sale_price}</td>
                        {globalSettings?.wholesale_price && (
                          <td>${data?.wholesale_price}</td>
                        )}
                        {globalSettings?.dealer_price && (
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
