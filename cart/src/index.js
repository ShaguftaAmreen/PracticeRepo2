import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import {BrowserRouter} from "react-router-dom"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter><App /></BrowserRouter>
</QueryClientProvider>
);
