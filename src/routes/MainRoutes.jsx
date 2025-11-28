import React from "react";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router";
import JambTestHomePage from "../pages/public/JambTestHomePage";
import CentrePage from "../pages/private/CentrePage";
import RegisterPage from "../pages/public/RegisterPage";
import HomeDashboard from "../pages/private/HomeDashboard";
import { useAuth } from "./useAuth";
import LoadingPage from "../components/LoadingPage";
import AdminLayout from "../layouts/AdminLayout";
import NotFound from "../pages/NotFound";
import ViewNetworkTests from "../pages/private/ViewNetworkTests";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import RegisteredComputers from "../pages/private/RegisteredComputers";
import Infractions from "../pages/private/Infractions";

function MainRoutes() {
  const publicRoutes = [
    { path: "/", element: <JambTestHomePage /> },
    { path: "/register", element: <RegisterPage /> },

    { path: "*", element: <NotFound /> },
  ];

  const privateRoutes = [
    { path: "/", element: <HomeDashboard /> },
    { path: "/centres", element: <CentrePage /> },
    { path: "/networktests", element: <ViewNetworkTests /> },
    { path: "/computers", element: <RegisteredComputers /> },
    { path: "/infractions", element: <Infractions /> },
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

export function ApplicationNavigation({ links, pageTitle }) {
  return (
    <Stack spacing={2} className="mb-4">
      <Breadcrumbs separator={<NavigateNext />}>
        <Link
          style={{ color: "GrayText", textDecoration: "none" }}
          component={Router}
          to="/"
          color="inherit"
        >
          Home
        </Link>
        {links.map((link) => (
          <Link
            underline="hover"
            component={Router}
            to={link.path}
            color="inherit"
          >
            {link.name}
          </Link>
        ))}
        <Typography color="text.secondary">{pageTitle}</Typography>
      </Breadcrumbs>
    </Stack>
  );
}
