import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

const RhfMui = () => {
  const { register, handleSubmit, formState, control } = useForm();
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    console.log(data);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} width={400}>
          <TextField
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address"
              }
            })}
          />
          <TextField
            label="Password"
            error={!!errors.password}
            helperText={errors.password?.message}
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character"
              }
            })}
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

export default RhfMui;


/*import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

const RhfMui = () => {
//   const form = useForm({
//     // defaultValues: {
//     //   email: "",
//     //   password: "",
//     // },
//   });

  const { register, handleSubmit, formState, control } = useForm();
  const { errors,isSubmitting } = formState;

  const onSubmit =async (data) => {
    await new Promise((resolve)=>setTimeout(resolve,4000));
    console.log(data);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} width={400}>
          <TextField
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          <TextField
            label="Password"
            error={!!errors.password}
            helperText={errors.password?.message}
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          <Button type="submit" disabled={isSubmitting}
          
          >{isSubmitting?"Logining":"Login"}</Button>
        </Stack>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default RhfMui;*/





// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import React from 'react'
// import { useForm } from 'react-hook-form';
// import {devTool} from "@hookform/devTool"


// type FormValues={
// email:string;
// password:string;
// }

// const RhfMui = () => {

// const form=useForm<FormValues>({
//     defaultValues:{
//         email:"",
//         password:"",
//     },
// })

// const {register,handleSubmit,formState,control}=form
// const {errors}=formState;

// const onSubmit=(data:FormValues)=>{
// console.log(data);
// };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit(onSubmit)} noValidate>
//         <Stack spacing={2} width={400}>
//             <TextField label="Email" 
//             error={!!errors.email}
//             helperText={errors.email?.message}
//             type="email" {...register("email",{ required:"Email is required" })}/>
//             <TextField label="Password" 
//             error={!!errors.password}
//             helperText={errors.password?.message}
//             type="password" {...register("password",{ required:"Password is required" })} />
//             <Button type="submit">Login</Button>
//         </Stack>
//       </form>
//       <devTool control={control} />
//     </div>
//   )
// }

// export default RhfMui
