import * as Yup from "yup";

export const CreatetabledataScehma = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  image: Yup.mixed().required("Image is required"),
  title: Yup.string().required("Title is required"),
  department: Yup.string().required("Department is required"),
  status: Yup.string().required("Status is required"),
  position: Yup.string().required("Position is required"),
});
