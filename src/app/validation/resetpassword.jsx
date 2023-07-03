import * as Yup from "yup";

export const ResetPasswordScehma = Yup.object({
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "New Password must be at least 8 characters long"),
});
