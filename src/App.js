import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ToastContainer } from "react-toastify";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <div>
      <MainRoutes />
      {/* <CentrePage /> */}
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
