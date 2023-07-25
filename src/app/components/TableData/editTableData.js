import React, { useEffect } from "react";
import { useFormik } from "formik";
import { FaTimes } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import show_Toast from "../../helpers/toast.helper";
import { EdittabledataScehma } from "../../validation/edittabledata";
import httpRequest from "../../axios/index";
import axios from "axios";

const uploadToCloudinary = async (imageFile) => {
  const cloudName = process.env.REACT_APP_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", uploadPreset);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData
  );

  if (response.status === 200) {
    const data = response.data;
    return data;
  } else {
    throw new Error("Image upload to Cloudinary failed.");
  }
};

const initialValues = {
  name: "",
  email: "",
  image: null,
  title: "",
  department: "",
  status: "",
  position: "",
};

const EditTableData = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const response = await httpRequest.get(`/api/auth/tabledata/${id}`);
      const data = response.data.data;
      setValues(data);
    } catch (error) {
      show_Toast({
        status: false,
        message: error?.response?.data?.message || "Something went wrong",
      });
    }
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: EdittabledataScehma,

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);
        const cloudinaryResponse = await uploadToCloudinary(values.image);
        const imageUrl = cloudinaryResponse.secure_url;

        values.image = imageUrl;
        const response = await httpRequest.put(
          `/api/auth/edittabledata/${id}`,
          values
        );
        if (response?.data?.success === true) {
          navigate("/dashboard/tableData");
        }
        show_Toast({
          status: true,
          message: response?.data?.message || "Success",
        });
        resetForm();
      } catch (error) {
        show_Toast({
          status: false,
          message: error?.response?.data?.message || "Something went wrong",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    const maxSize = 4 * 1024 * 1024; // 4MB
    const allowedExtensions = [".jpg", ".jpeg", ".png"];

    try {
      if (!file) {
        throw new Error("No image selected.");
      }

      if (file.size > maxSize) {
        throw new Error("Image size exceeds the limit.");
      }

      const fileExtension = file.name.toLowerCase();

      if (
        !allowedExtensions.some((extension) =>
          fileExtension.endsWith(extension)
        )
      ) {
        throw new Error(
          "Invalid file extension. Allowed extensions are .jpg, .jpeg, and .png."
        );
      }

      reader.onloadend = () => {
        setFieldValue("image", reader.result);
      };

      reader.onerror = (error) => {
        throw new Error("Error occurred while reading the image file.");
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleRemoveImage = () => {
    setFieldValue("image", null);
  };

  return (
    <>
      {" "}
      <Helmet>
        <title> Dashboard | EditTableData </title>
      </Helmet>
      <Container className="d-flex align-items-center justify-content-center">
        <Card style={{ maxWidth: "1000px", width: "100%" }}>
          <Card.Header>Create Table Data</Card.Header>
          <Card.Body className="d-flex flex-column">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name" className="mb-4">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.name && errors.name}
                />
                {touched.name && errors.name && (
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="email" className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && errors.email}
                />
                {touched.email && errors.email && (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="image" className="mb-4">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
                  onBlur={handleBlur}
                  isInvalid={touched.image && errors.image}
                />
                {values.image && (
                  <div className="d-flex align-items-center">
                    <img
                      src={values.image}
                      alt="Selected"
                      style={{ maxWidth: "200px", marginTop: "10px" }}
                    />
                    <FaTimes
                      className="ml-2"
                      onClick={handleRemoveImage}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                )}
                {touched.image && errors.image && (
                  <Form.Control.Feedback type="invalid">
                    {errors.image}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="title" className="mb-4">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.title && errors.title}
                />
                {touched.title && errors.title && (
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="department" className="mb-4">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  name="department"
                  value={values.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.department && errors.department}
                />
                {touched.department && errors.department && (
                  <Form.Control.Feedback type="invalid">
                    {errors.department}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="status" className="mb-4">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={values.status}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.status && errors.status}
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="InActive">InActive</option>
                </Form.Control>
                {touched.status && errors.status && (
                  <Form.Control.Feedback type="invalid">
                    {errors.status}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="position" className="mb-4">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  name="position"
                  value={values.position}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.position && errors.position}
                />
                {touched.position && errors.position && (
                  <Form.Control.Feedback type="invalid">
                    {errors.position}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <div className="d-grid">
                <Button
                  className="mb-4"
                  variant="dark"
                  size="lg"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default EditTableData;
