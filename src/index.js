import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./Context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider,createMuiTheme } from '@mui/material';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
  

const queryClient = new QueryClient();
const theme = createMuiTheme({
  breakpoints: {
  
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
        <ToastContainer />
      </QueryClientProvider>
    </UserProvider>
  </React.StrictMode>
);
reportWebVitals();
