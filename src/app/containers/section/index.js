import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TableData from "../../components/TableData/tableData";
import CreateTableData from "../../components/TableData/createTableData";
import EditTableData from "../../components/TableData/editTableData";
import Details from "../../components/Details";
import Cart from "../../components/Cart/Cart";
import ProductsPage from "../../pages/ProductsPage";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-content">
        <Routes>
          <Route
            path=""
            element={<Navigate to={"/dashboard/product"} replace={true} />}
          />
          <Route path="product" element={<ProductsPage />} />
          <Route path="details" element={<Details />} />
          <Route path="cart" element={<Cart />} />
          <Route path="tableData" element={<TableData />} />
          <Route path="createTableData" element={<CreateTableData />} />
          <Route path="/editTableData/:id" element={<EditTableData />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </>
  );
};

export default Dashboard;
