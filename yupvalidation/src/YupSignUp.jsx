import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const schema = Yup.object({
    userName: Yup.string()
      .min(6, 'Must be minimum 6 characters')
      .max(20, 'Must be maximum 20 characters')
      .required('Required'),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|mail\.com)$/,
        'Email must be either gmail.com or mail.com'
      )
      .required('Required'),
    password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
    dateOfBirth: Yup.date()
      .max(new Date(), 'Date of birth must not be in the future')
    //   .test('age', 'You must be at least 18 years old', (value) => {
    //     const today = new Date();
    //     const birthDate = new Date(value);
    //     const age = today.getFullYear() - birthDate.getFullYear();
    //     const monthDiff = today.getMonth() - birthDate.getMonth();
    //     // Check if the person is at least 18 years old
    //     return age > 18 || (age === 18 && monthDiff >= 0);
     // })
      .required('Required'),


    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
      .required('Required'),
    acceptTerms: Yup.boolean().oneOf([true], 'You must accept the terms').required("Required"),
  });
  const YupSignUp = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      dateOfBirth: '',
      phoneNumber: '',
      acceptTerms: false,
    }
  });

  const onSubmit = (data) => {
    console.log("data",data)
    alert(`Form Submitted successfully! ${data.phoneNumber}`);
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: 'auto',
        padding: 3,
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <Controller 
          name="userName"
          control={control}
          render={({ field,fieldState:{error,isTouched},formState:{touchedFields} }) => (
            <>
            {console.log("field State",touchedFields)}
            <TextField
              {...field}
              label="Username"
              fullWidth
              margin="normal"
              error={!!errors.userName}
              helperText={errors.userName ? errors.userName.message : ''}
            />   </>
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />
          )}
        />

        {/* Password Confirmation */}
        <Controller
          name="passwordConfirmation"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password Confirmation"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.passwordConfirmation}
              helperText={errors.passwordConfirmation ? errors.passwordConfirmation.message : ''}
            />
          )}
        />

        {/* Date of Birth */}
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Date of Birth"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
            />
          )}
        />

        {/* Phone Number */}
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              type="text"
              fullWidth
              margin="normal"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
            />
          )}
        />

        {/* Accept Terms */}
        <Controller
          name="acceptTerms"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} />}
              label="I accept the terms and conditions"
            />
          )}
        />
        {errors.acceptTerms && (
          <Typography color="error" variant="body2">
            {errors.acceptTerms.message}
          </Typography>
        )}

        {/* Submit Button */}
        <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default YupSignUp;
