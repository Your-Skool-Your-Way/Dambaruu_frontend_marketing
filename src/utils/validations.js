import * as Yup from "yup";

const contactSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Email (Invalid format)"),
});

export default contactSchema;
