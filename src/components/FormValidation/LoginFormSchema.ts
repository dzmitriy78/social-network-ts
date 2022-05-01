import * as Yup from "yup";

const loginFormSchema = Yup.object().shape({
    /*name: Yup.string()
        //минимальная длина - 2 символа
        .min(2, "Must be longer than 2 characters")
        //максимальная длина - 20 символов
        .max(20, "Nice try, nobody has a first name that long")
        .required("Required"),*/
    password: Yup.string()
        .min(8, "Must be longer than 8 characters")
        .required("Required")
});
export default loginFormSchema