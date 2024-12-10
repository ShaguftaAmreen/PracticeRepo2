import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const YupLogin = () => {
  
    const validationSchema = Yup.object({
        email: Yup.string()
        .lowercase()
        .trim()
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/,
            "Please enter a valid email address (e.g., example@gmail.com)"
          )
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .matches(/[0-9]/, "Password must contain at least one number")
          .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
          .required("Password is required"),
        terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions").required("Terms acceptance is required")
      });
      
      
      const { handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log("form submitted",data)
    alert("Form Submitted", data);
     reset();
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="normal"
            />
          )}
        />
        {/* Password Field */}
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              margin="normal"
            />
          )}
        />
        {/* Terms and Conditions Checkbox */}
        <Controller
          name="terms"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} />}
              label="I agree to the Terms and Conditions"
            />
          )}
        />
        {/* Display error for terms */}
        {errors.terms && <Typography color="error" variant="body2">{errors.terms.message}</Typography>}

        {/* Submit Button */}
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default YupLogin;

