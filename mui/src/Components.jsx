import React from "react";
import Button from '@mui/material/Button';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
const Components = () => {
  return (
    <div>
      <IconButton color="primary" aria-label="add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton><br></br>
     <Button color="primary" style={{backgroundColor:"pink"}} disableRipple disableElevation size="large" variant="outlined" startIcon={<SendIcon />} endIcon={<DeleteIcon/>}>Click Me</Button>

    </div>
  );
};

export default Components;
