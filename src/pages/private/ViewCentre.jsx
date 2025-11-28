import React, { useEffect, useState } from "react";
import { ApplicationNavigation } from "../../routes/MainRoutes";
import { httpService } from "../../httpService";
import { useParams } from "react-router";
import { CircularProgress, Typography } from "@mui/material";

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
          <div className="col-lg-3 bg-light  text-muted shadow-sm p-3 m-1">
            <Typography variant="caption">Registered Computers</Typography>
            <Typography variant="h5">{centreData.computers}</Typography>
          </div>
          <div className="col-lg-3 bg-light text-muted p-3 shadow-sm m-1">
            <Typography variant="caption">Network Tests</Typography>
            <Typography variant="h5">{centreData.networkTests}</Typography>
          </div>
          <div className="col-lg-3 bg-light  text-muted p-3 shadow-sm m-1">
            <Typography variant="caption">Infractions</Typography>
            <Typography variant="h5">{centreData.infractions}</Typography>
          </div>
          <div className="col-lg-3 bg-light text-muted p-3 shadow-sm m-1">
            <Typography variant="caption">
              Average Response Throughput
            </Typography>
            <Typography variant="h5">
              {centreData.averageResponseThroughput}%
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewCentre;
