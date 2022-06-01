// import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
  DataGrid,
  GridActionsCellItem,
  gridClasses,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./ManageDistrict.css";
import { useSelector } from "react-redux";

function DistrictTable(props) {
  const history = useHistory();
  const { listAllDomain } = useSelector((state) => state.data);
  // const { handleDeleteModelOpen } = props;
  const [tableRow, setTableRow] = useState([]);

  function createData(id, Name, Desc, FirstName, LastName) {
    return {
      id,
      Name,
      Desc,
      FirstName,
      LastName,
    };
  }
  useEffect(() => {
    const row = listAllDomain;
    const tempTableRow = [];
    row &&
      row.map((data) => {
        const rowData = createData(
          data.DistrictID,
          data.DistrictName,
          data.Desc,
          data.FirstName,
          data.LastName
        );
        tempTableRow.push(rowData);
        return null;
      });
    setTableRow(tempTableRow);
  }, [listAllDomain]);

  // column

  const COLUMNS = [
    {
      field: "Name",
      headerName: "District Name",
      minWidth: 250,
      description: "District Name",
      sortable: false,
    },
    {
      field: "Desc",
      headerName: "Description",
      width: 250,
      description: "Description",
      sortable: false,
    },
    {
      field: "FirstName",
      headerName: "First Name",
      width: 250,
      description: "First Name",
      sortable: false,
    },
    {
      field: "LastName",
      headerName: "Last Name",
      width: 250,
      description: "Last Name",
      sortable: false,
    },
    {
      field: "Action",
      type: "actions",
      headerName: "Actions",
      width: 200,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditRoundedIcon sx={{ color: "#8d39fa" }} />}
          label="Edit"
          //   showInMenu
          onClick={() => {
            history.push(`manageDistrict/update/${params.id}`);
          }}
        />,
        // <GridActionsCellItem
        //   icon={<DeleteRoundedIcon sx={{ color: "#f00" }} />}
        //   label="Delete"
        //   //   showInMenu
        //   onClick={() => {
        //     handleDeleteModelOpen();
        //   }}
        // />,
      ],
    },
  ];

  // Export
  function CustomToolbar() {
    return (
      <GridToolbarContainer
        style={{ padding: "12px", flexWrap: "wrap" }}
        className={gridClasses.toolbarContainer}
      >
        <GridToolbarExport
          variant="contained"
          printOptions={{ disableToolbarButton: true }}
          csvOptions={{
            fileName: "BotAdmins",
          }}
          sx={{
            background: "#00c853",
            color: "#fff",
            marginRight: "1%",
            "&.MuiButtonBase-root:hover": {
              background: "#00c853",
              color: "#fff",
            },
          }}
        />
        <GridToolbarFilterButton
          variant="contained"
          sx={{
            background: "#2196f3",
            color: "#fff",
            marginRight: "1%",
            "&.MuiButtonBase-root:hover": {
              background: "#2196f3",
              color: "#fff",
            },
          }}
        />
        <GridToolbarColumnsButton
          variant="contained"
          sx={{
            background: "#d84315",
            color: "#fff",
            marginRight: "1%",
            "&.MuiButtonBase-root:hover": {
              background: "#d84315",
              color: "#fff",
            },
          }}
        />
        <GridToolbarDensitySelector
          variant="contained"
          sx={{
            background: "#ffc107",
            color: "#fff",
            marginRight: "1%",
            "&.MuiButtonBase-root:hover": {
              background: "#ffc107",
              color: "#fff",
            },
          }}
        />
      </GridToolbarContainer>
    );
  }

  const [pageSize, setPageSize] = React.useState(5);
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flexGrow: 1, justifyContent: "center" }}>
        <DataGrid
          // rows from server
          rows={tableRow}
          // column from client
          columns={COLUMNS}
          // checkbox enabled
          // checkboxSelection
          // padding for row
          density="comfortable"
          // rows per page (Max is 100)
          pagination
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          // Header buttons
          components={{
            Toolbar: CustomToolbar,
          }}
          componentsProps={{
            panel: {
              sx: {
                "&.MuiButtonBase-root:hover": {
                  background: "#8d65f6",
                  color: "#fff",
                },
                "& .MuiTypography-root": {
                  color: "#0e1318",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
export default DistrictTable;
