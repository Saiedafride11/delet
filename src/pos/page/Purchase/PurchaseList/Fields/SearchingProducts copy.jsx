import React, { useState } from "react";
import { useSelector } from "react-redux";
import searchIcon from "../../../../assets/images/icons/search.svg";
import crossIcon from "../../../../assets/images/icons/x-red.svg";
import useScrollPagination from "../../../../hooks/useScrollPagination";
import { useGetProductsQuery } from "../../../../redux/features/products/products/productsApi";

const SearchingProducts = ({ formValue, setFormValue }) => {
  const [searchText, setSearchText] = useState("");
  const [tableOpen, setTableOpen] = useState(false);
  const globalSettings = useSelector(
    (state) =>
      state?.settings?.globalSettings?.value?.purchase_settings?.item_info
  );
  const { perPage } = useScrollPagination("overflow-auto", searchText);

  const filterQuery = `?search=${searchText}&page=1&per_page=${perPage}`;
  const {
    data: productsData,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductsQuery(filterQuery);

  const handleProductClick = (data) => {
    setTableOpen(false);
    setSearchText("");

    const isExist = formValue?.items?.find(
      (item) => item.product_id === data.id
    );
    if (isExist) {
    } else {
      const totalAmount =
        formValue?.items?.reduce(
          (total, item) => total + item.purchase_price * item.quantity,
          0
        ) +
        data.purchase_price * data.quantity;

      setFormValue((prev) => ({
        ...prev,
        items: [
          ...prev.items,
          {
            product_id: data?.id,
            name: data?.name,
            purchase_price: data?.purchase_price,
            sale_price: data?.sale_price,
            wholesale_price: data?.wholesale_price,
            dealer_price: data?.dealer_price,
            exist_serial_no: data?.serial_no,
            serial_no: [],
            quantity: 0,
            free_quantity: data?.free_quantity,
            variation: data?.product_stocks,
            unit_name: data?.unit?.name,
            discount: data?.discount,
            //   variation: data?.product_stocks?.map(item => ({
            //     color_id: item.color_id,
            //     size_id: item.size_id,
            //     quantity: item.quantity
            // }))
          },
        ],
        total_amount: totalAmount,
        grand_total:
          totalAmount + prev?.vat + prev?.service_charge - prev?.discount,
        due_amount:
          totalAmount +
          prev?.vat +
          prev?.service_charge -
          prev?.discount -
          prev?.paid_amount,
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

  return (
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
                  <th>Item name</th>
                  <th>Purchase Price</th>
                  <th>Retail / MRP Price</th>
                  {globalSettings?.wholesale_price && <th>Wholesale Price</th>}
                  {globalSettings?.dealer_price && <th>Dealer Price</th>}
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {productsData?.data?.products?.data?.length === 0 ||
                productsData?.data?.products?.data === undefined ||
                isLoading ||
                isError ? (
                  <tr>
                    <td className="p-2 text-start">No Data Found!</td>
                  </tr>
                ) : (
                  productsData?.data?.products?.data?.map((data, index) => (
                    <tr key={index} onClick={() => handleProductClick(data)}>
                      <td>{data?.sku_code}</td>
                      <td>{data?.name}</td>
                      <td>${data?.purchase_price}</td>
                      <td>${data?.sale_price}</td>
                      {globalSettings?.wholesale_price && (
                        <td>${data?.wholesale_price}</td>
                      )}
                      {globalSettings?.dealer_price && (
                        <td>${data?.dealer_price}</td>
                      )}
                      <td>{data?.quantity}</td>
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
  );
};

export default SearchingProducts;
