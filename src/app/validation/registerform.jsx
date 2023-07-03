import * as Yup from "yup";

export const RegisterUserScehma = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .matches(/^[^@]+@gmail\.com$/, "Email must end with gmail.com")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});
