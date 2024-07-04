import React, { useState } from "react";
import { Link } from "react-router-dom";
import editIcon from "../../../assets/images/actions/edit.svg";
import eyeIcon from "../../../assets/images/actions/eye.svg";
import deleteIcon from "../../../assets/images/actions/trash.svg";
import MultipleDeleteItems from "../../../components/common/MultipleDeleteItems";
import Pagination from "../../../components/common/Pagination";
import StatusSwitch from "../../../components/common/StatusSwitch";
import TableTopPageFilter from "../../../components/common/TableTopPageFilter";
import TableTopSearch from "../../../components/common/TableTopSearch";
import DeleteModal from "../../../components/modal/DeleteModal";
import ProductWarehouseModal from "../../../components/modal/Warehouse/ProductWarehouseModal";
import TableNoData from "../../../components/ui/NoData/TableNoData";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import TableTopButtons from "../../../components/utils/TableTopButtons/TableTopButtons";
import useSingleDataDelete from "../../../hooks/useSingleDataDelete";
import useStatusChange from "../../../hooks/useStatusChange";
import {
  useDeleteProductWarehouseMutation,
  useGetProductWarehouseQuery,
  useUpdatePdWarehouseStatusMutation,
} from "../../../redux/features/products/warehouse/productWarehouseApi";
import ProductsFilterTabs from "../ProductsFilterTabs";
import ProductWarehouseViewModal from "../components/Modal/ProductWarehouseViewModal";
import WarehouseProductsModal from "../components/modal/WarehouseProductsModal";

const ProductWarehouse = () => {
  document.title = "Warehouse";
  const [selectItems, setSelectItems] = useState([]);
  const [checkedItems, setCheckedItem] = useState(false);
  const [filterPerPage, setFilterPerPage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [deleteId, setDeleteId] = useState(0);
  const [updateData, setUpdateData] = useState({});
  const [error, setError] = useState("");
  const [warehouseProducts, setWarehouseProducts] = useState([]);

  const {
    data: productWarehouse,
    isLoading,
    isError,
  } = useGetProductWarehouseQuery();

  const [
    deleteProductWarehouse,
    {
      isSuccess: deleteIsSuccess,
      isLoading: deleteIsLoading,
      error: deleteError,
    },
  ] = useDeleteProductWarehouseMutation();

  const { handleDelete } = useSingleDataDelete(
    deleteProductWarehouse,
    deleteError,
    deleteIsSuccess,
    setError,
    "Warehouse"
  );

  const handleItemsSelect = (itemId) => {
    // const itemIndex = selectItems.findIndex((selectItem) => selectItem === id);
    // if (itemIndex !== -1) {
    //   const newSelectItems = [...selectItems];
    //   newSelectItems.splice(itemIndex, 1);
    //   setSelectItems(newSelectItems);
    // } else {
    //   setSelectItems([...selectItems, id]);
    // }

    const isSelected = selectItems.includes(itemId);
    const newItems = isSelected
      ? selectItems?.filter((id) => id !== itemId)
      : [...selectItems, itemId];
    setSelectItems(newItems);
    setCheckedItem(false);
  };

  const handleMultipleSelect = () => {
    // const allSelected =
    //   selectItems.length === productsData?.data?.products.length;
    // const newItems = allSelected
    //   ? []
    //   : productsData?.data?.products.map((data) => data.id);
    // setSelectItems(newItems);
    // setCheckedItem(!checkedItems);
  };

  // -----------------------------------------------
  // Data status on or off
  // -----------------------------------------------
  const [
    updatePdWarehouseStatus,
    {
      data: responseStatusData,
      isSuccess: responseStatusSuccess,
      isLoading: responseStatusLoading,
      error: responseStatusError,
    },
  ] = useUpdatePdWarehouseStatusMutation();

  const { handleStatusChange } = useStatusChange(
    updatePdWarehouseStatus,
    responseStatusError,
    responseStatusSuccess,
    responseStatusData
  );
  // -----------------------------------------------
  // Make Excel, CSV and pdf data
  // -----------------------------------------------
  const tableData = productWarehouse?.data?.warehouse?.map((data, index) => ({
    SL: index < 9 ? `0${index + 1}` : index + 1,
    Name: data?.name,
    Phone: data?.phone,
    Email: data?.email,
    Address: data?.address,
    City: data?.city,
    "Zip code": data?.zip_code,
  }));

  return (
    <div className="acnoo-dashboard-main-section">
      {isLoading && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper">
          <div className="details-header print-d-none">
            <div className="title">
              <h4>Warehouse</h4>
              <Link
                data-bs-toggle="modal"
                data-bs-target="#product-warehouse-modal"
                className="btn custom-btn"
              >
                <span>+</span> Add Warehouse
              </Link>
            </div>
          </div>
          {/* Filter Tab start */}
          <ProductsFilterTabs />

          <div className="dashboard-details-table-wrapper">
            <div className="table-top-form daily-transaction-between-wrapper pt-0">
              <form>
                <div className="d-flex align-items-center gap-2">
                  <TableTopPageFilter setFilterPerPage={setFilterPerPage} />
                  <TableTopSearch
                    searchText={searchText}
                    setSearchText={setSearchText}
                  />
                </div>
              </form>
              <div className="table-top-btn-group">
                <TableTopButtons arrayData={tableData} />
              </div>
            </div>
            {selectItems?.length > 0 && (
              <MultipleDeleteItems selectItems={selectItems} />
            )}

            <div className="responsive-table">
              <table className="table">
                <thead>
                  <tr>
                    <th className="">
                      <div className="d-flex align-items-center">
                        <input
                          type="checkbox"
                          checked={checkedItems}
                          onChange={handleMultipleSelect}
                          className="print-d-none"
                        />
                        <span>SL.</span>
                      </div>
                    </th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Email Address</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Zip Code</th>
                    <th>Product</th>
                    <th>Status</th>
                    <th className="print-d-none">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productWarehouse?.data?.warehouse?.length === 0 ||
                  productWarehouse?.data?.warehouse === undefined ||
                  isLoading ||
                  isError ? (
                    <TableNoData />
                  ) : (
                    productWarehouse?.data?.warehouse?.map((data, index) => (
                      <tr key={index}>
                        <td className="">
                          <div className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="print-d-none"
                              checked={selectItems?.includes(data.id)}
                              onChange={() => handleItemsSelect(data.id)}
                            />
                            <span>
                              {index < 9 ? `0${index + 1}` : index + 1}
                            </span>
                          </div>
                        </td>
                        <td>{data?.name}</td>
                        <td>{data?.phone}</td>
                        <td>{data?.email}</td>
                        <td>{data?.address}</td>
                        <td>{data?.city}</td>
                        <td>{data?.zip_code}</td>
                        <td className="text-sky">
                          {data?.product_stocks?.length === 0 ? (
                            0
                          ) : (
                            <Link
                              className="text-sky"
                              data-bs-toggle="modal"
                              data-bs-target="#warehouse-product-view-modal"
                              onClick={(e) =>
                                setWarehouseProducts(data?.product_stocks)
                              }
                            >
                              {data?.product_stocks?.length}
                            </Link>
                          )}
                        </td>
                        <td>
                          <StatusSwitch
                            id={data.id}
                            status={data.status}
                            loading={responseStatusLoading}
                            handleChange={handleStatusChange}
                          />
                        </td>
                        <td className="print-d-none">
                          <div className="dropdown shoplist-dropdown">
                            <Link
                              className="action-icon"
                              data-bs-toggle="dropdown"
                            >
                              <i className="fas fa-ellipsis-v"></i>
                            </Link>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <Link
                                  data-bs-toggle="modal"
                                  data-bs-target="#pos-view-modal"
                                  onClick={(e) =>
                                    setUpdateData({
                                      id: data?.id,
                                      name: data?.name,
                                      phone: data?.phone,
                                      email: data?.email,
                                      address: data?.address,
                                      city: data?.city,
                                      zip_code: data?.zip_code,
                                    })
                                  }
                                >
                                  <img src={eyeIcon} alt="icon" />
                                  View
                                </Link>
                              </li>
                              <li>
                                <Link
                                  data-bs-toggle="modal"
                                  data-bs-target="#product-warehouse-modal"
                                  onClick={(e) => setUpdateData(data)}
                                >
                                  <img src={editIcon} alt="icon" />
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <Link
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                  onClick={() => setDeleteId(data?.id)}
                                >
                                  <img src={deleteIcon} alt="icon" />
                                  Delete
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <Pagination />
          </div>
        </div>
      </div>

      <WarehouseProductsModal warehouseProducts={warehouseProducts} />

      <ProductWarehouseViewModal updateData={updateData} />

      <ProductWarehouseModal
        updateData={updateData}
        setUpdateData={setUpdateData}
      />
      <DeleteModal
        handleDelete={handleDelete}
        id={deleteId}
        error={error}
        setError={setError}
        isLoading={deleteIsLoading}
      />
    </div>
  );
};

export default ProductWarehouse;
