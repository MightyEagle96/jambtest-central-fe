import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JambTestHomePage from "../pages/public/JambTestHomePage";
import CentrePage from "../pages/private/CentrePage";

function MainRoutes() {
  const publicRoutes = [
    { path: "/", element: <JambTestHomePage /> },
    { path: "/jambtest", element: <CentrePage /> },
  ];
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
