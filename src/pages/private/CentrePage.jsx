import React from "react";
import { Typography } from "@mui/material";
import { httpService } from "../../httpService";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

function CentrePage() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid uses 0-based index
    pageSize: 50, // rows per page
  });
  const [rows, setRows] = useState([]);
  const getData = async () => {
    const { data } = await httpService("centre/viewallcentres", {
      params: {
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      },
    });

    if (data) {
      setRows(data.results);
      console.log(data);
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
  ];
  return (
    <div>
      <div className="container mb-4">
        <Typography variant="h4" fontWeight={700}>
          REGISTERED CENTRES
        </Typography>
      </div>
      <div style={{ height: "60vh" }} className="p-3">
        <DataGrid columns={columns} rows={rows} />
      </div>
    </div>
  );
}

export default CentrePage;
