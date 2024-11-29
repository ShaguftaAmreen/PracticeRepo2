import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  name: z
    .string()
    .nonempty("Name is required")
    .min(4, "Name must be at least 4 characters long")
    .regex(/[A-Z]/, "Name must include at least one uppercase letter"),
  age: z
    .string()
    .transform((val) => Number(val)) // Convert input to a number
    .refine((val) => !isNaN(val), { message: "Age must be a valid number" }) // Ensure valid number
    .refine((val) => val > 18, { message: "Age must be greater than 18" }) // Custom check for >18
    .refine((val) => val < 40, { message: "Age must be less than 40" }),

  password: z
    .string()
    .nonempty("Password is required")

    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/\d/, "Password must include at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must include at least one special characterghjkl"
    ),
});

// type FormData = z.infer<typeof schema>;

// type FormData = {
//     email: string;
//     password: string;
//   };

// hello
const MuirhfController = () => {
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });
  const { isSubmitting, errors } = formState;

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulating delay
    console.log(data);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} width={400}>
          {/* Email Field */}
          <Controller
            name="email"
            control={control}
            defaultValue=""
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
          {/*Name field*/}
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                type="text"
              />
            )}
          />
          {/* Age Field */}
          <Controller
            name="age"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Age"
                error={!!errors.age}
                helperText={errors.age?.message}
                type="number"
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
                label="Password"
                error={!!errors.password}
                helperText={errors.password?.message}
                type="password"
              />
            )}
          />

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in" : "Login"}
          </Button>
        </Stack>
      </form>
      <DevTool control={control} />
      <p>It&apos;s a beautiful day!</p>
    </div>
  );
};

export default MuirhfController;
