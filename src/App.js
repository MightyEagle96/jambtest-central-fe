import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CentrePage from "./pages/private/CentrePage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <CentrePage />
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
