import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Validation schema using Yup
const schema = Yup.object().shape({
  fruit: Yup.string()
    .oneOf(['apple', 'banana'], 'Must be apple or banana')
    .required('Selecting a fruit is required'),
});

const FruitForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fruit: '',
    },
  });

  const onSubmit = (data) => {
    alert(`You selected: ${data.fruit}`);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 3,
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Select Your Favorite Fruit
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="fruit"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Fruit"
              select
              fullWidth
              margin="normal"
              error={!!errors.fruit}
              helperText={errors.fruit ? errors.fruit.message : ''}
            >
              {/* Dropdown options */}
              <MenuItem value="apple">Apple</MenuItem>
              <MenuItem value="banana">Banana</MenuItem>
              <MenuItem value="orange">Orange</MenuItem> {/* Invalid option */}
            </TextField>
          )}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default FruitForm;
