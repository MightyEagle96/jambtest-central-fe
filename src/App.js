import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ToastContainer } from "react-toastify";
import MainRoutes from "./routes/MainRoutes";
import { AppUserProvider } from "./contexts/AppUserContext";

function App() {
  return (
    <div>
      <AppUserProvider>
        <MainRoutes />
        <ToastContainer />
      </AppUserProvider>
    </div>
  );
}

export default App;
