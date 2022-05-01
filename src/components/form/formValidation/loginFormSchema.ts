import * as Yup from "yup";

export const loginFormSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Must be longer than 8 characters")
        .required("Required")
});

export const postFormSchema = Yup.object().shape({
    text: Yup.string()
        .min(2, "Must be longer than 2 characters!")
        .max(50, "Post length no more than 50 characters!")
        .required("Required")
})