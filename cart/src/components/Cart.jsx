import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
        Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center' }}>
          <Typography>Your cart is empty.</Typography>
          <CardMedia
            component="img"
            height="150"
            image="https://th.bing.com/th/id/OIP.eUSVoabMqQhdjIrpfspHvgHaHa?w=212&h=211&c=7&r=0&o=5&pid=1.7"
            alt="Empty Cart"
            sx={{
              width: '150px',
              height: '150px',
              margin: '16px auto',
              objectFit: 'contain',
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {cartItems.map((product) => (
            <Card
              key={product.id}
              variant="outlined"
              sx={{
                flex: '1 1 calc(33.33% - 16px)',
                boxSizing: 'border-box',
                minWidth: 275,
                maxWidth: 'calc(33.33% - 16px)',
                margin: '10px 0px',
              }}
            >
              <CardContent>
                <CardMedia
                  component="img"
                  height="150"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                  }}
                />
                <Typography variant="h6" component="div" sx={{ marginTop: 1 }}>
                  {product.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  Quantity: {product.quantity}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                  <Typography>{product.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => onUpdateQuantity(product.id, product.quantity - 1)}
                    disabled={product.quantity <= 1}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onRemoveFromCart(product.id)}
                  sx={{ marginTop: 1 }}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Cart;
