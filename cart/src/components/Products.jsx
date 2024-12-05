import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import toast, { Toaster } from 'react-hot-toast';
import { useToast } from "./useToast"; 


const fetchProducts = async () => {
  const response = await axios.get("https://dummyjson.com/products");
  return response.data;
};

const Products = ({ cartItems, onAddToCart, onRemoveFromCart, onUpdateQuantity }) => {
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["products"],
//     queryFn: fetchProducts,
//     staleTime: 20000,
//   });

const {data}=useToast(fetchProducts);
 // useToast(fetchProducts);

  const getProductQuantity = (productId) => {
    const product = cartItems.find((item) => item.id === productId);
    return product ? product.quantity : 0;
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, padding: 2 }}>
      {data?.products?.map((product) => (
        <Card
          key={product.id}
          variant="outlined"
          sx={{
            flex: "1 1 calc(33.33% - 16px)",
            boxSizing: "border-box",
            minWidth: 275,
            maxWidth: "calc(33.33% - 16px)",
            margin: "10px 0px",
            boxShadow: 3,
            "&:hover": {
              boxShadow: 6,
            },
          }}
        >
          <CardMedia
            component="img"
            height="150"
            image={product.thumbnail}
            alt={product.title}
            style={{ width: "50%", objectFit: "cover" }}
          />
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              {product.brand}
            </Typography>
            <Typography variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              ${product.price}
            </Typography>
          </CardContent>
          <CardActions>
            {!getProductQuantity(product.id) ? (
              <Button
                size="medium"
                variant="contained"
                onClick={() => onAddToCart({ ...product, quantity: 1 })}
              >
                Add to Cart
              </Button>
            ) : (
              <>
                <IconButton onClick={() => onUpdateQuantity(product.id, getProductQuantity(product.id) + 1)}>
                  <AddIcon />
                </IconButton>
                <Typography>{getProductQuantity(product.id)}</Typography>
                <IconButton onClick={() => onUpdateQuantity(product.id, getProductQuantity(product.id) - 1)}>
                  <RemoveIcon />
                </IconButton>
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={() => onRemoveFromCart(product.id)}
                >
                  Remove
                </Button>
              </>
            )}
          </CardActions>
        </Card>
      ))}
      <Toaster />
    </Box>
  );
};

export default Products;





//   React.useEffect(() => {
//     const myPromise = fetchProducts();

//     toast.promise(myPromise, {
//       loading: 'Loading products...',
//     //   success: 'Got the products data!',
//     success:(res)=> "got the products data"
//       ,error: `Error when fetching: ${error?.message}`,
//     });
//   }, [isLoading, isError, data, error]);





