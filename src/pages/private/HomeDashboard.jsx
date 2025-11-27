import React, { useEffect, useState } from "react";
import { useAppUser } from "../../contexts/AppUserContext";
import { CircularProgress, Typography } from "@mui/material";
import {
  DesktopMacOutlined,
  FileUpload,
  HolidayVillage,
} from "@mui/icons-material";
import { httpService } from "../../httpService";

function HomeDashboard() {
  const { user } = useAppUser();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const { data, error } = await httpService.get("/dashboard");

    if (data) {
      setDashboardData(data);
      console.log(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="mb-4">
        <Typography>
          Welcome back{" "}
          <strong>
            {user.fullName}{" "}
            {loading && <CircularProgress size={20} color="primary" />}
          </strong>
        </Typography>
      </div>
      {dashboardData && (
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
              <Typography variant="h5">{dashboardData.centres}</Typography>
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
              <Typography variant="h5">
                {dashboardData.computers}/{dashboardData.totalCapacity}
              </Typography>
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
              <Typography variant="h5">
                {dashboardData.flaggedComputers}
              </Typography>
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
              <Typography variant="h5">{dashboardData.networkTests}</Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeDashboard;
