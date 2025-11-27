import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import JambTestHomePage from "../pages/public/JambTestHomePage";
import CentrePage from "../pages/private/CentrePage";
import RegisterPage from "../pages/public/RegisterPage";
import HomeDashboard from "../pages/private/HomeDashboard";
import { useAuth } from "./useAuth";
import LoadingPage from "../components/LoadingPage";
import AdminLayout from "../layouts/AdminLayout";
import NotFound from "../pages/NotFound";

function MainRoutes() {
  const publicRoutes = [
    { path: "/", element: <JambTestHomePage /> },
    { path: "/register", element: <RegisterPage /> },

    { path: "*", element: <NotFound /> },
  ];

  const privateRoutes = [
    { path: "/", element: <HomeDashboard /> },
    { path: "/centres", element: <CentrePage /> },
    { path: "*", element: <NotFound /> },
  ];

  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <>
            <Route element={<AdminLayout />}>
              {privateRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
          </>
        ) : (
          <>
            {publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
