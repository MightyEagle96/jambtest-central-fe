import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { httpService } from "../../httpService";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { ApplicationNavigation } from "../../routes/MainRoutes";
import { HolidayVillage, Sync } from "@mui/icons-material";

function CentrePage() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid uses 0-based index
    pageSize: 50, // rows per page
  });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const getData = async () => {
    setLoading(true);
    const { data, error } = await httpService("centre/viewallcentres", {
      params: {
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      },
    });

    if (data) {
      setRowCount(data.total);
      setRows(data.results);
    }

    if (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [paginationModel]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "ReferenceNumber",
      headerName: "Reference Number",
      width: 200,
      renderCell: (params) => (
        <span className="text-uppercase">{params.value}</span>
      ),
    },

    {
      field: "CentreName",
      headerName: "Centre Name",
      width: 300,
      renderCell: (params) => (
        <span className="text-capitalize">{params.value}</span>
      ),
    },
    {
      field: "State",
      headerName: "State",
      width: 200,
      renderCell: (params) => (
        <span className="text-uppercase">{params.value}</span>
      ),
    },
    { field: "CentreCapacity", headerName: "Centre Capacity", width: 200 },
    {
      field: "AdminName",
      headerName: "Admin Name",
      width: 250,
      renderCell: (params) => (
        <span className="text-capitalize">{params.value}</span>
      ),
    },
    { field: "AdminPhone", headerName: "Admin Phone", width: 200 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "lastCentreUpload",
      headerName: "Last Centre Upload",
      width: 200,
      renderCell: (params) =>
        params.value ? new Date(params.value).toLocaleString() : "-",
    },
  ];

  const importCentres = async () => {
    setLoading(true);
    const { data, error } = await httpService.get("centre/importcentres");
    if (data) {
      toast.success(
        `${data.message}. \nTotal Fetched: ${data.totalFetched}, \nAlready Exists: ${data.alreadyExists}, \nNewly Imported: ${data.newlyImported}`
      );
      getData();
    }

    if (error) {
      toast.error(
        `${error.message}. \nTotal Fetched: ${error.totalFetched}, \nAlready Exists: ${error.alreadyExists}, \nNewly Imported: ${error.newlyImported}`
      );
    }
    setLoading(false);
  };
  return (
    <div>
      <ApplicationNavigation links={[]} pageTitle={"Centres"} />

      <div className="row">
        <div className="col-lg-2 p-3 bg-light m-1">
          <Stack
            direction={"row"}
            spacing={3}
            className="text-muted d-flex align-items-center"
          >
            <div>
              <HolidayVillage />
            </div>
            <div>
              <Typography variant="caption">Centres</Typography>
              <Typography fontWeight={700}>{rowCount}</Typography>
            </div>
          </Stack>
        </div>
        <div className="col-lg-2 p-3 bg-light m-1">
          <Stack
            direction={"row"}
            spacing={3}
            className="text-muted d-flex align-items-center"
          >
            <div>
              <HolidayVillage />
            </div>
            <div>
              <Typography variant="caption">Blacklisted Centres</Typography>
              <Typography fontWeight={700}>{rowCount}</Typography>
            </div>
          </Stack>
        </div>
        <div className="col-lg-2 p-3 bg-light m-1 d-flex align-items-center">
          <Button
            onClick={importCentres}
            loading={loading}
            variant="contained"
            endIcon={<Sync />}
            loadingPosition="end"
          >
            import new centres
          </Button>
        </div>
      </div>

      <div className="p-3">
        <DataGrid
          loading={loading}
          columns={columns}
          rows={rows}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[50, 100]}
          pagination
          rowSelection={false}
          paginationMode="server"
          rowCount={rowCount}
        />
      </div>
    </div>
  );
}

export default CentrePage;
