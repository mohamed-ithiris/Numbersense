import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Box, FormControl, MenuItem, Select, InputLabel } from "@mui/material";
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
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../ManageDistrict/ManageDistrict.css";

function FolderTable(props) {
  const { handleCurrentCourse } = props; //props
  const history = useHistory();
  const [tableRow, setTableRow] = useState([]);
  const [course, setCourse] = useState(0);
  const handleChange = (event) => {
    setCourse(event.target.value);
    handleCurrentCourse(event.target.value);
  };

  const { listAllFolders, listAllCourses } = useSelector((state) => state.data);

  function createData(id, folderName, folderDescription, subjectName) {
    return {
      id,
      folderName,
      folderDescription,
      subjectName,
    };
  }
  useEffect(() => {
    const row = listAllFolders;
    const tempTableRow = [];
    row.map((data) => {
      const rowData = createData(
        data.LessonID,
        data.LessonName,
        data.LessonDesc,
        data.SubjectName
      );
      tempTableRow.push(rowData);
      return null;
    });
    setTableRow(tempTableRow);
  }, [listAllFolders]);

  useEffect(() => {
    if (listAllCourses.length !== 0) {
      setCourse(listAllCourses[0].SubjectID);
      handleCurrentCourse(listAllCourses[0].SubjectID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // column
  const COLUMNS = [
    // {
    //   field: "id",
    //   headerName: "Id",
    //   width: 150,
    //   description: "id",
    //   sortable: false,
    // },
    {
      field: "folderName",
      headerName: "Folder Name",
      minWidth: 300,
      description: "Folder Name",
      sortable: false,
    },
    {
      field: "folderDescription",
      headerName: "Folder Description",
      minWidth: 300,
      description: "Folder Description",
      sortable: false,
    },
    {
      field: "subjectName",
      headerName: "Course Name",
      minWidth: 300,
      description: "Subject Name",
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
            history.push(`manageFolder/update/${params.id}`);
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
        style={{
          padding: "12px",
          display: "inline-flex",
          width: "100%",
          flexWrap: "wrap",
        }}
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
        <Box className="courseSelectParent">
          <FormControl variant="standard" fullWidth sx={{ minWidth: 150 }}>
            <InputLabel id="Course">Choose Course</InputLabel>
            <Select
              id="Course"
              value={course}
              onChange={handleChange}
              sx={{ textTransform: "capitalize" }}
              label="Course"
            >
              {listAllCourses.map((item, index) => (
                <MenuItem
                  key={index}
                  sx={{ textTransform: "capitalize" }}
                  value={item.SubjectID}
                >
                  {item.SubjectName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
export default FolderTable;
