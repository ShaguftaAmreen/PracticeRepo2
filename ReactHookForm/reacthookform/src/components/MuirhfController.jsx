import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

const MuirhfController = () => {
  const { control, handleSubmit, formState } = useForm();
  const { isSubmitting, errors } = formState;  // Correctly destructure 'errors' from formState

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    console.log(data);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} width={400}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                type="email"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                error={!!errors.password}
                helperText={errors.password?.message}
                type="password"
              />
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in" : "Login"}
          </Button>
        </Stack>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default MuirhfController;


