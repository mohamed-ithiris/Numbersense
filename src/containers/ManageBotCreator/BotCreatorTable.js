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
import "../ManageDistrict/ManageDistrict.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function BotCreatorTable(props) {
  const history = useHistory();
  const [tableRow, setTableRow] = useState([]);
  const { listAllBotCreator } = useSelector((state) => state.data);

  function createData(id, FirstName, LastName, Location) {
    return {
      id,
      FirstName,
      LastName,
      Location,
    };
  }
  useEffect(() => {
    const row = listAllBotCreator;
    const tempTableRow = [];
    row.map((data) => {
      const rowData = createData(
        data.ID,
        data.FirstName,
        data.LastName,
        data.Location
      );
      tempTableRow.push(rowData);
      return null;
    });
    setTableRow(tempTableRow);
  }, [listAllBotCreator]);

  // column
  const COLUMNS = [
    {
      field: "FirstName",
      headerName: "First Name",
      width: 300,
      description: "First Name",
      sortable: false,
    },
    {
      field: "LastName",
      headerName: "Last Name",
      width: 300,
      description: "Last Name",
      sortable: false,
    },
    {
      field: "Location",
      headerName: "Location",
      minWidth: 300,
      description: "Location",
      sortable: false,
    },
    {
      field: "Action",
      type: "actions",
      headerName: "Actions",
      width: 300,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditRoundedIcon sx={{ color: "#8d39fa" }} />}
          label="Edit"
          //   showInMenu
          onClick={() => {
            history.push(`manageBotCreator/update/${params.id}`);
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
            fileName: "BotCreatorsList",
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
export default BotCreatorTable;
