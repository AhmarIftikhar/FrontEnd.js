import React, { useEffect, useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

const EditTableData = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    title: "",
    department: "",
    status: "",
    position: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const response = await client.get(`/api/auth/tabledata/${id}`);
      const data = response.data.data;
      console.log(data);
      setFormData({
        name: data.name,
        email: data.email,
        image: data.image,
        title: data.title,
        department: data.department,
        status: data.status,
        position: data.position,
      });
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    const maxSize = 4 * 1024 * 1024; // 4MB

    if (file && file.size > maxSize) {
      console.error("Image size exceeds the limit.");
      return;
    }

    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        image: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    client
      .put(`/api/auth/edittabledata/${id}`, formData)
      .then((response) => {
        console.log(response.data);
        navigate("/tableData");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Card style={{ maxWidth: "1000px", width: "100%" }}>
        <Card.Header>Edit Table Data</Card.Header>
        <Card.Body className="d-flex flex-column">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mb-4">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="image" className="mb-4">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="title" className="mb-4">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="department" className="mb-4">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="status" className="mb-4">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="InActive">InActive</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="position" className="mb-4">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button className="mb-4" variant="dark" size="lg" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditTableData;
