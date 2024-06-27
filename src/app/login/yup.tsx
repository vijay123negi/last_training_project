import * as Yup from "yup";

export const loginSchema = Yup.object({
    username: Yup.string().min(2).max(25).required("Please enter your name"),
    password: Yup.string().min(6).required("Please enter your password")
})