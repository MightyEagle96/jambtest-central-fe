import React from "react";
import { Button, Typography } from "@mui/material";
import { httpService } from "../../httpService";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";

function CentrePage() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid uses 0-based index
    pageSize: 50, // rows per page
  });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const getData = async () => {
    const { data, error } = await httpService("centre/viewallcentres", {
      params: {
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      },
    });

    if (data) {
      setRowCount(data.total);
      setRows(data.results);
      console.log(data);
    }

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [paginationModel]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "ReferenceNumber", headerName: "Reference Number", width: 200 },

    { field: "CentreName", headerName: "Centre Name", width: 300 },
    { field: "State", headerName: "State", width: 200 },
    { field: "CentreCapacity", headerName: "Centre Capacity", width: 200 },
    { field: "AdminName", headerName: "Admin Name", width: 250 },
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
      <div className="container mb-4">
        <div className="">
          <Typography variant="h4" fontWeight={700}>
            REGISTERED CENTRES
          </Typography>
        </div>
        <div>
          <Button onClick={importCentres} loading={loading}>
            import new centres
          </Button>
        </div>
      </div>
      <div style={{ height: "60vh" }} className="p-3">
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
