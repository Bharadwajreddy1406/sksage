import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.tsx";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <React.StrictMode>
        <Toaster />
        <App />
      </React.StrictMode>
    </AuthProvider>
  </BrowserRouter>
);
