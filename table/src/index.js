import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import {BrowserRouter} from "react-router-dom"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from "./App";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <Toaster
      toastOptions={{
        duration: 900,
        className: "",
        style: {
          // border: "1px solid #713200",
          padding: "16px",
          // color: "#713200",
        },
      }}
    />
    <App />
  </QueryClientProvider>
  // </BrowserRouter>
);
