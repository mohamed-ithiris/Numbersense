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
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function CourseTable(props) {
  const history = useHistory();

  const [tableRow, setTableRow] = useState([]);
  const { listAllCourses } = useSelector((state) => state.data);

  function createData(id, SubjectName, SubjectDesc, Image) {
    return {
      id,
      SubjectName,
      SubjectDesc,
      Image,
    };
  }
  useEffect(() => {
    const row = listAllCourses;
    const tempTableRow = [];
    row.map((data) => {
      const rowData = createData(
        data.SubjectID,
        data.SubjectName,
        data.SubjectDesc,
        data.Image
      );
      tempTableRow.push(rowData);
      return null;
    });
    setTableRow(tempTableRow);
  }, [listAllCourses]);

  // column

  const COLUMNS = [
    {
      field: "Image",
      headerName: "#",
      width: 300,
      description: "Image",
      sortable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            boxShadow: 7,
            width: "50px",
            height: "50px",
            borderRadius: "7px",
          }}
        >
          <img
            src={params.value}
            style={{
              borderRadius: "7px",
              width: "100%",
              height: "100%",
            }}
            alt="SubImg"
          />
        </Box>
      ), // renderCell will render the component
    },
    {
      field: "SubjectName",
      headerName: "Course Name",
      minWidth: 300,
      description: "Course Name",
      sortable: false,
    },
    {
      field: "SubjectDesc",
      headerName: "Course Description",
      width: 300,
      description: "Course Description",
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
            history.push(`manageCourse/update/${params.id}`);
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
            fileName: "CourseList",
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
export default CourseTable;
