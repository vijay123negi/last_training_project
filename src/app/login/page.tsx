"use client"
import React from "react";
import { loginSchema } from "./yup";
import { Form, Formik, Field, FieldProps } from "formik";
import { Box, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { Users } from "@/redux/loginSlice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

interface LoginFormValues {
  username: string;
  password: string;
}

const initialValues: LoginFormValues = {
  username: "",
  password: "",
};

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (values: LoginFormValues, action: any) => {
    if (values.username !== "john" || values.password !== "admin@123") {
      alert("Invalid username or password. Please try again.");
      return;
    }

    try {
      await dispatch(Users(values));
      localStorage.setItem("username", values.username);
      action.resetForm();
      router.push("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "20px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              borderRadius: "8px",
            }}
          >
            <h2 style={{marginBottom: "40px"}}>Login Page</h2>
            <div style={{ marginBottom: "20px" }}>
              <Field name="username">
                {({ field }: FieldProps) => (
                  <TextField
                    {...field}
                    type="text"
                    label="Username"
                    variant="outlined"
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                    fullWidth
                  />
                )}
              </Field>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Field name="password">
                {({ field }: FieldProps) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Password"
                    variant="outlined"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    fullWidth
                  />
                )}
              </Field>
            </div>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;