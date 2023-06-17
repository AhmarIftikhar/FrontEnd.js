import React, { useEffect, useState } from "react";
import { Badge, Button, Container, Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const client = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default function TableData() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const response = await client.get("/api/auth/tabledata");
      const data = response.data;
      setTableData(data.tableData);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <Container className="align-items-center justify-content-center p-5">
      <Table striped bordered responsive>
        <thead style={{ backgroundColor: "silver" }}>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Status</th>
            <th>Position</th>
            <th>Actions</th>
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
                  to={`/editTableData/${row._id}`}
                  variant="link"
                  size="sm"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
