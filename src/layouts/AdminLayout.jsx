import React, { useState } from "react";
import { useAppUser } from "../contexts/AppUserContext";
import { HolidayVillage, Home, Logout, ShowChart } from "@mui/icons-material";
import { Link, Outlet } from "react-router";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CircularProgress } from "@mui/material";
import { httpService } from "../httpService";
import { toast } from "react-toastify";

function AdminLayout() {
  const [loading, setLoading] = useState(false);
  const logout = async () => {
    setLoading(true);
    const { data, error } = await httpService.get("auth/logout");
    if (data) {
      window.location.assign("/");
    }
    if (error) {
      toast.error(error);
    }
    setLoading(false);
  };
  const { user } = useAppUser();

  const navLinks = [
    { name: "Home", path: "/", icon: <Home /> },
    { name: "Centres", path: "/centres", icon: <HolidayVillage /> },
    { name: "Network Tests", path: "/networktests", icon: <ShowChart /> },
  ];
  return (
    <div className="row m-0" style={{ minHeight: "90vh" }}>
      <div
        className="col-lg-2 bg-light d-flex flex-column "
        style={{
          height: "100vh",
          position: "sticky",
          top: 0,
          overflowY: "auto",
        }}
      >
        <div className="pt-5 mb-auto">
          <div className="mb-5">
            <div className="d-flex justify-content-center mb-3">
              <Avatar
                src="https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fHww"
                sx={{ width: 100, height: 100 }}
              ></Avatar>
            </div>
            <div className="text-center mb-3 text-muted">
              <Typography fontWeight={700}>Hello, {user.fullName}</Typography>
            </div>
          </div>
          <div>
            <List>
              {navLinks.map((c, i) => (
                <ListItemButton key={i} as={Link} to={c.path}>
                  <ListItemIcon>{c.icon}</ListItemIcon>
                  <ListItemText primary={c.name} sx={{ color: "GrayText" }} />
                </ListItemButton>
              ))}
            </List>
          </div>
        </div>
        <div className="" style={{ minHeight: "40vh" }}>
          <List>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                {loading ? (
                  <CircularProgress size={20} color="dark" />
                ) : (
                  <Logout />
                )}
              </ListItemIcon>
              <ListItemText primary={"Logout"} sx={{ color: "GrayText" }} />
            </ListItemButton>
          </List>
        </div>
      </div>
      <div
        className="col-lg-10"
        style={{
          height: "100vh",
          overflowY: "auto",
          paddingTop: "2rem",
          paddingLeft: "1rem",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
