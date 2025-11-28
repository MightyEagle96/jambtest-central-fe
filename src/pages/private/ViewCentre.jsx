import React, { useEffect, useState } from "react";
import { ApplicationNavigation } from "../../routes/MainRoutes";
import { httpService } from "../../httpService";
import { Link, useParams } from "react-router";
import { Button, CircularProgress, Typography } from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";

function ViewCentre() {
  const [centreData, setCentreData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const getData = async () => {
    setLoading(true);
    const { data } = await httpService("centre/viewcentre", {
      params: { centre: id },
    });

    if (data) {
      setCentreData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <ApplicationNavigation
        links={[{ name: "Centres", path: "/centres" }]}
        pageTitle={centreData && centreData?.centre?.CentreName?.toUpperCase()}
      />

      {loading && (
        <div className="text-center">
          <CircularProgress size={20} />
        </div>
      )}

      {centreData && (
        <div className="row">
          <div className="col-lg-3 bg-light  text-muted shadow-sm p-3 m-1 d-flex justify-content-between align-items-end">
            <div>
              <Typography variant="caption">Registered Computers</Typography>
              <Typography variant="h5" fontWeight={700}>
                {centreData.computers}
              </Typography>
            </div>
            <div>
              <Button
                as={Link}
                to={`/centrecomputers?centre=${id}`}
                sx={{ textTransform: "unset", textDecoration: "none" }}
                endIcon={<KeyboardArrowRight />}
              >
                View computers
              </Button>
            </div>
          </div>
          <div className="col-lg-3 bg-light text-muted p-3 shadow-sm m-1">
            <Typography variant="caption">Network Tests</Typography>
            <Typography variant="h5" fontWeight={700}>
              {centreData.networkTests}
            </Typography>
          </div>
          <div className="col-lg-3 bg-light  text-muted p-3 shadow-sm m-1">
            <Typography variant="caption">Infractions</Typography>
            <Typography variant="h5" fontWeight={700}>
              {centreData.infractions}
            </Typography>
          </div>
          <div className="col-lg-3 bg-light text-muted p-3 shadow-sm m-1">
            <Typography variant="caption">
              Average Response Throughput
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              {centreData.averageResponseThroughput}%
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewCentre;
