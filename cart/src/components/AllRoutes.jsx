import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Products from "./Products";
import Cart from "./Cart";

const AllRoutes = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingProduct = prevCartItems.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCartItems, product];
      }
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== productId)
    );
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Products
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        }
      />
      <Route
        path="/cart"
        element={
          <Cart
            cartItems={cartItems}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        }
      />
    </Routes>
  );
};

export default AllRoutes;



// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Products from "./Products";
// import Cart from "./Cart";
// import useCart from "./hooks/useCart"; // Import the custom hook

// const AllRoutes = () => {
//   const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <Products
//             cartItems={cartItems}
//             onAddToCart={addToCart}
//             onRemoveFromCart={removeFromCart}
//             onUpdateQuantity={updateQuantity}
//           />
//         }
//       />
//       <Route
//         path="/cart"
//         element={
//           <Cart
//             cartItems={cartItems}
//             onRemoveFromCart={removeFromCart}
//             onUpdateQuantity={updateQuantity}
//           />
//         }
//       />
//     </Routes>
//   );
// };

// export default AllRoutes;













