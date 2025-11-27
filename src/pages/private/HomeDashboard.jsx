import React from "react";
import { useAppUser } from "../../contexts/AppUserContext";
import { Typography } from "@mui/material";
import {
  DesktopMac,
  DesktopMacOutlined,
  FileUpload,
  HolidayVillage,
} from "@mui/icons-material";

function HomeDashboard() {
  const { user } = useAppUser();
  return (
    <div>
      <div className="mb-4">
        <Typography>
          Welcome back <strong>{user.fullName}</strong>
        </Typography>
      </div>
      <div className="row">
        <div
          className="col-lg-3 p-3 rounded text-white m-1"
          style={{ backgroundColor: "#6892D5" }}
        >
          <div>
            <HolidayVillage sx={{ mr: 1 }} />
            <Typography variant="caption">CBT Centres</Typography>
          </div>
          <div className="text-end">
            <Typography variant="h5">800</Typography>
          </div>
        </div>
        <div
          className="col-lg-3 p-3 rounded text-white m-1"
          style={{ backgroundColor: "#79D1C3" }}
        >
          <div>
            <DesktopMacOutlined sx={{ mr: 1 }} />
            <Typography variant="caption">Registered Computers</Typography>
          </div>
          <div className="text-end">
            <Typography variant="h5">259,999/ 300,000</Typography>
          </div>
        </div>
        <div
          className="col-lg-3 p-3 rounded text-muted m-1"
          style={{ backgroundColor: "#C9FDD7" }}
        >
          <div>
            <HolidayVillage sx={{ mr: 1 }} />
            <Typography variant="caption">Infractions</Typography>
          </div>
          <div className="text-end">
            <Typography variant="h5">5</Typography>
          </div>
        </div>
        <div
          className="col-lg-3 p-3 rounded  m-1"
          style={{ backgroundColor: "#F8FCFB", color: "#00649F" }}
        >
          <div>
            <FileUpload sx={{ mr: 1 }} />
            <Typography variant="caption">Network Tests</Typography>
          </div>
          <div className="text-end">
            <Typography variant="h5">10</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard;
