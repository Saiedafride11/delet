import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import searchIcon from "../../../../assets/images/icons/search.svg";
import useScrollPagination from "../../../../hooks/useScrollPagination";
import { useGetProductsQuery } from "../../../../redux/features/products/products/productsApi";

const SearchingProducts = ({ formValue, setFormValue }) => {
  const [searchText, setSearchText] = useState("");
  const globalSettings = useSelector(
    (state) => state?.settings?.globalSettings?.value?.product?.price
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
          data.purchase_price * data.quantity || 1;

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

  // console.log("totalPrice", formValue);
  // console.log("globalSettings", productsData);
  // console.log("isSuccess", isSuccess);
  // console.log("data", productsData?.data?.products?.data);
  const [selectedRow, setSelectedRow] = useState(null);
  // const rows = [
  //   { id: 1, name: "John Doe" },
  //   { id: 2, name: "Jane Doe" },
  //   { id: 3, name: "Bob Smith" },
  //   { id: 4, name: "Bob Smit fg e h" },
  //   { id: 5, name: "Bob Smitre reterh" },
  //   { id: 6, name: "Bob Smi erertth" },
  // ];

  const rows = productsData?.data?.products?.data;

  // const handleKeyDown = (event) => {
  //   if (event.key === "ArrowUp") {
  //     setSelectedRow((prev) => (prev !== null ? Math.max(prev - 1, 0) : 0));
  //   } else if (event.key === "ArrowDown") {
  //     setSelectedRow((prev) =>
  //       prev !== null ? Math.min(prev + 1, rows?.length - 1) : 0
  //     );
  //   } else if (event.key === "Enter") {
  //     if (selectedRow !== null) {
  //       const closeButtons = document.querySelectorAll(`.delta-${selectedRow}`);
  //       closeButtons.forEach((button) => {
  //         button.click();
  //       });
  //     }
  //   }
  // };

  const handleKeyDown = (event) => {
    if (
      (selectedRow === null && event.key === "ArrowUp") ||
      (selectedRow === null && event.key === "ArrowDown")
    ) {
      setSelectedRow(0);

      const inputBlurs = document.querySelectorAll("input");
      inputBlurs.forEach((input) => {
        input?.blur();
      });

      const closeButtons2 = document.querySelectorAll(".product-search");
      closeButtons2.forEach((button) => {
        button?.click();
        button?.focus();
      });
    } else {
      if (event.key === "ArrowUp") {
        setSelectedRow((prev) => Math.max(prev - 1, 0));
      } else if (event.key === "ArrowDown") {
        setSelectedRow((prev) => Math.min(prev + 1, rows?.length - 1));
      } else if (event.key === "Enter") {
        const closeButtons = document.querySelectorAll(`.delta-${selectedRow}`);
        closeButtons.forEach((button) => {
          button?.click();
        });
      }
    }
  };

  const handleRowClick = (rowData) => {
    console.log(`Row clicked. Data:`, rowData);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedRow]);

  // console.log("selectedRow", selectedRow);
  return (
    <div className="inventory-product-search position-relative">
      <div className="position-relative">
        <input
          type="search"
          className="form-control ps-5"
          placeholder="Search Product by code or name"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <span className="position-absolute top-50 translate-middle-y ps-3">
          <img src={searchIcon} className="w-75" alt="icon" />
        </span>
      </div>
      {searchText !== "" && (
        <div className="product-search shadow">
          <div className="overflow-auto max-h-300">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {rows?.map((row, index) => (
                  <tr
                    key={row.id}
                    onClick={() => handleRowClick(row)}
                    style={{
                      backgroundColor: index === selectedRow ? "lightblue" : "",
                    }}
                    className={`delta-${index}`}
                  >
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchingProducts;
