import React, { useEffect, useState } from "react";
import { useAppUser } from "../../contexts/AppUserContext";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import {
  CloudDoneOutlined,
  DesktopMacOutlined,
  ErrorOutline,
  FileUpload,
  HolidayVillage,
  KeyboardArrowRight,
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
      <div className="mb-4 bg-dark text-white p-4 bg-dark">
        <Typography variant="">
          Welcome back{" "}
          <strong>
            {user.fullName}{" "}
            {loading && <CircularProgress size={20} color="primary" />}
          </strong>
        </Typography>
      </div>
      {dashboardData && (
        <div className="row">
          <div className="col-lg-3  rounded border p-3   m-1">
            <Stack direction={"row"} spacing={2}>
              <div>
                <HolidayVillage
                  sx={{
                    mr: 1,
                    height: "50px",
                    width: "50px",
                    color: "#6892D5",
                  }}
                />
              </div>
              <div className="text-muted">
                <Typography variant="caption">CBT Centres</Typography>
                <Typography variant="h5">{dashboardData.centres}</Typography>
              </div>
            </Stack>

            <div className="text-end">
              <Button
                sx={{ textTransform: "capitalize" }}
                endIcon={<KeyboardArrowRight />}
              >
                View centres
              </Button>
            </div>
          </div>
          <div className="col-lg-4  rounded border p-3   m-1">
            <Stack direction={"row"} spacing={2}>
              <div>
                <DesktopMacOutlined
                  sx={{
                    mr: 1,
                    height: "50px",
                    width: "50px",
                    color: "#79D1C3",
                  }}
                />
              </div>
              <div className="text-muted">
                <Typography variant="caption">Registered Computers</Typography>
                <Typography variant="h5">
                  {dashboardData.computers}/{dashboardData.totalCapacity}
                </Typography>
              </div>
            </Stack>

            <div className="text-end">
              <Button
                sx={{ textTransform: "capitalize" }}
                endIcon={<KeyboardArrowRight />}
              >
                View Computers
              </Button>
            </div>
          </div>

          <div className="col-lg-3  rounded border p-3   m-1">
            <Stack direction={"row"} spacing={2}>
              <div>
                <ErrorOutline
                  sx={{
                    mr: 1,
                    height: "50px",
                    width: "50px",
                    color: "#FF3796",
                  }}
                />
              </div>
              <div className="text-muted">
                <Typography variant="caption">Infractions</Typography>
                <Typography variant="h5">
                  {dashboardData.flaggedComputers}
                </Typography>
              </div>
            </Stack>

            <div className="text-end">
              <Button
                sx={{ textTransform: "capitalize" }}
                endIcon={<KeyboardArrowRight />}
              >
                View Infractions
              </Button>
            </div>
          </div>
          <div className="col-lg-3  rounded border p-3   m-1">
            <Stack direction={"row"} spacing={2}>
              <div>
                <CloudDoneOutlined
                  sx={{
                    mr: 1,
                    height: "50px",
                    width: "50px",
                    color: "#2EA1D9",
                  }}
                />
              </div>
              <div className="text-muted">
                <Typography variant="caption">Network Tests</Typography>
                <Typography variant="h5">
                  {dashboardData.networkTests}
                </Typography>
              </div>
            </Stack>

            <div className="text-end">
              <Button
                sx={{ textTransform: "capitalize" }}
                endIcon={<KeyboardArrowRight />}
              >
                View network tests
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeDashboard;
