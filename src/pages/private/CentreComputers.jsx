import React, { useEffect, useState } from "react";
import { ApplicationNavigation } from "../../routes/MainRoutes";
import { useSearchParams } from "react-router";
import { httpService } from "../../httpService";
import { CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function CentreComputers() {
  const [searchParams] = useSearchParams();

  const centre = searchParams.get("centre");

  const centreName = searchParams.get("centrename");

  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid uses 0-based index
    pageSize: 50, // rows per page
  });
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const { data } = await httpService("centre/centrecomputersadmin", {
      params: {
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        centre,
      },
    });

    if (data) {
      setRowCount(data.total);
      setRows(data.results);
    }

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [paginationModel]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "manufacturer",
      headerName: "Manufacturer",
      width: 200,
      renderCell: (params) => (
        <span className="text-uppercase">{params.value}</span>
      ),
    },
    {
      field: "operatingSystem",
      headerName: "Operating System",
      width: 200,
      renderCell: (params) => (
        <span className="text-capitalize">{params.value}</span>
      ),
    },
    {
      field: "model",
      headerName: "Model",
      width: 200,
      renderCell: (params) => (
        <span className="text-capitalize">{params.value}</span>
      ),
    },
    {
      field: "macAddresses",
      headerName: "Mac Address",
      width: 200,
      renderCell: (params) => (
        <span className="text-capitalize">{params.value.join(", ")}</span>
      ),
    },
    {
      field: "serialNumber",
      headerName: "Serial Number",
      width: 200,
      renderCell: (params) => (
        <span className="text-uppercase">{params.value}</span>
      ),
    },
    {
      field: "processorId",
      headerName: "Processor ID",
      width: 200,
      renderCell: (params) => (
        <span className="text-uppercase">{params.value}</span>
      ),
    },
    {
      field: "ramMB",
      headerName: "RAM",
      width: 200,
      renderCell: (params) => (
        <span className="text-uppercase">
          {Math.ceil(params.value / 1024)} GB
        </span>
      ),
    },
  ];
  return (
    <div>
      <ApplicationNavigation
        links={[
          { name: "Centres", path: "/centres" },
          { name: "View Centre", path: "/centres/" + centre },
        ]}
        pageTitle={"Registered Computers"}
      />

      {loading && (
        <div className="text-center">
          <CircularProgress size={20} />
        </div>
      )}
      <div>
        <div className="alert alert-primary border-0">
          <div>
            <Typography variant="caption">Centre:</Typography>
            <Typography variant="h6" textTransform={"uppercase"}>
              {centreName}
            </Typography>
            <hr />
          </div>
          <div>
            <Typography variant="overline">
              Registered Computers: <strong>{rowCount}</strong>
            </Typography>
          </div>
        </div>
        <DataGrid
          loading={loading}
          rows={rows}
          columns={columns}
          pageSizeOptions={[50, 100]}
          rowCount={rowCount}
          pagination
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </div>
    </div>
  );
}

export default CentreComputers;
