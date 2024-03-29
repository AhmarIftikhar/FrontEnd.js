import React, { useEffect, useState } from "react";
import { Badge, Container, Table, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

import { Tabledata } from "../../services/index";
import show_Toast from "../../helpers/toast.helper";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import httpRequest from "../../axios/index";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function TableData() {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const response = await Tabledata();
      const data = response?.data?.tableData;
      setTableData(data);
      show_Toast({
        status: true,
        message: response?.data?.message || "Success",
      });
    } catch (error) {
      show_Toast({
        status: false,
        message: error?.response?.data?.message || "Something went wrong",
      });
    }
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await httpRequest.delete(
                `/api/auth/deletetable/${id}`
              );
              setTableData((prevData) =>
                prevData.filter((item) => item._id !== id)
              );

              show_Toast({
                status: true,
                message: response?.data?.message || "Success",
              });
            } catch (error) {
              show_Toast({
                status: false,
                message:
                  error?.response?.data?.message || "Something went wrong",
              });
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            // If the user clicks "No", do nothing (cancel the deletion)
          },
        },
      ],
    });
  };

  return (
    <>
      {" "}
      <Helmet>
        <title> Dashboard | TableData </title>
      </Helmet>
      <Container className="align-items-center justify-content-center p-5">
        <Table striped bordered responsive>
          <thead style={{ backgroundColor: "silver" }}>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Status</th>
              <th>Position</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={row.image}
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{row.name}</p>
                      <p className="text-muted mb-0">{row.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1">{row.title}</p>
                  <p className="text-muted mb-0">{row.department}</p>
                </td>
                <td>
                  <Badge bg={row.statusColor} pill>
                    {row.status}
                  </Badge>
                </td>
                <td>{row.position}</td>
                <td>
                  <Link
                    to={`/dashboard/editTableData/${row._id}`}
                    variant="link"
                    size="sm"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <FaPencilAlt className="edit-icon" />
                  </Link>
                </td>
                <td>
                  <Button
                    variant="link"
                    size="sm"
                    style={{
                      textDecoration: "none",
                    }}
                    onClick={() => handleDelete(row._id)}
                  >
                    <FaTrashAlt className="delete-icon" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
