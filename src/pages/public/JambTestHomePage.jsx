import React from "react";
import { Avatar, Button, Stack, TextField, Typography } from "@mui/material";
import {
  Wifi,
  SettingsEthernet,
  DesktopMacRounded,
  LaptopOutlined,
  Login,
} from "@mui/icons-material";
import { appLogo } from "../../assets/appTheme";

function JambTestHomePage() {
  return (
    <div
      style={{ height: "100vh", backgroundColor: "#F9F8F6" }}
      className="d-flex align-items-center"
    >
      <div className="w-100 bg-white pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 border-end d-flex flex-row align-items-center">
              <div className="me-4">
                <img src={appLogo} alt="App logo" width="120" height="100" />
              </div>
              <div>
                <div className="mb-1">
                  <Typography variant="h2" fontWeight={900}>
                    JAMB Test 2.0
                  </Typography>
                </div>
                <div>
                  <Stack direction={"row"} spacing={4}>
                    <LaptopOutlined sx={{ height: 50, width: 50 }} />
                    <Wifi sx={{ height: 50, width: 50 }} />
                    <DesktopMacRounded sx={{ height: 50, width: 50 }} />
                    <SettingsEthernet sx={{ height: 50, width: 50 }} />
                  </Stack>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <form>
                <div className="mb-3">
                  <TextField fullWidth label="Username" />
                </div>
                <div className="mb-3">
                  <TextField fullWidth label="Password" />
                </div>
                <div className="mb-3">
                  <Button endIcon={<Login />} fullWidth>
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JambTestHomePage;
