import EditIcon from "@mui/icons-material/Edit";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Button,
  Box,
  Breadcrumbs,
  Stack,
  TextField,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  COURSE_NAME_EMPTY,
  IMAGE_EMPTY,
  COURSE_DESCRIPTION_EMPTY,
  ROW_UPDATE_SUCCESS_MESSAGE,
  ROW_DELETE_SUCCESS_MESSAGE,
  ROW_CREATE_SUCCESS_MESSAGE,
  COURSE_NAME_EXIST,
} from "../../constants";
import Creators from "../../redux/ducks/actions";
import "../ManageDistrict/ManageDistrict.css";
import { useHistory, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";

function UpdateCourse(props) {
  const dispatch = useDispatch(); // Dispatch
  const history = useHistory();
  const { listAllCourses } = useSelector((state) => state.data); // from Redux
  // Snack Message
  const [snackbar, setSnackbar] = React.useState({
    snackStatus: false,
    snackMessageFor: "update",
  });
  const { snackStatus, snackMessageFor } = snackbar;
  const handleSnackbarClick = (msg) => {
    setSnackbar((state) => ({
      ...state,
      snackStatus: true,
      snackMessageFor: msg,
    }));
  };
  const handleSnackbarClose = () => {
    setSnackbar((state) => ({
      ...state,
      snackStatus: false,
      snackMessageFor: "",
    }));
  };
  const url = useParams(); //URl

  const [form, setForm] = useState({
    courseName: "",
    courseDescription: "",
    image: "",
  });
  const [emptyError, setEmptyError] = useState({
    courseName: false,
    courseDescription: false,
    image: false,
  });
  const { courseName, courseDescription, image } = form;

  //   update Button
  const [updateLoading, setUpdateLoading] = useState(false);
  const handleUpdateClick = () => {
    setUpdateLoading(true);
    const checkEmptyValue = { ...emptyError };
    let submit = true;
    // Checking empty data
    for (let items in form) {
      if (form[items] === "") {
        submit = false;
        checkEmptyValue[items] = true;
      }
    }

    if (!submit) {
      setEmptyError(checkEmptyValue);
      setUpdateLoading(false);
    } else {
      dispatch(
        Creators.updateCourseList(form, (response) => {
          console.log(response, "response");
          if (response.MessageID === 1) {
            // Course name already exist Error
            setUpdateLoading(false);
            handleSnackbarClick("duplicateError");
            return null;
          } else if (response.MessageID === 0) {
            // Course Update Success Message
            handleSnackbarClick("update");
            setUpdateLoading(false);
            setTimeout(() => {
              history.push("/admin/manageCourse");
            }, 1000);
          } else {
            console.error(response, "response");
          }
        })
      );
    }
  };

  // For Image
  const Input = styled("input")({
    display: "none",
  });

  // handle onchange Course
  const handleOnChangeUpdateDistrict = (e) => {
    if (e.target.value !== "") {
      setEmptyError((state) => ({
        ...state,
        [e.target.id]: false,
      }));
    }
    if (e.target.id === "imageInput") {
      const imageFile = e.target.files[0];
      let form = new FormData();
      form.append("file", imageFile);
      fetch("https://nodeserver.learnpods.com/upload", {
        method: "POST",
        credentials: "same-origin",
        body: form,
      })
        .then((response) => {
          if (response.status === 200 && response.ok) {
            response.text().then((data) => {
              setForm((state) => ({
                ...state,
                image: JSON.parse(data).url,
              }));
            });
          } else {
            throw response;
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      setForm((state) => ({
        ...state,
        [e.target.id]: e.target.value,
      }));
    }
  };

  //   setting data in field
  useEffect(() => {
    const getRow = listAllCourses.filter(
      (item) => item.SubjectID === Number(url.id)
    );
    const rowData = getRow[0];
    setForm((state) => ({
      ...state,
      subjectId: rowData.SubjectID,
      gradeId: rowData.GradeID,
      activityId: 1,
      courseName: rowData.SubjectName,
      courseDescription: rowData.SubjectDesc,
      image: rowData.Image,
    }));
  }, [url, listAllCourses]);

  return (
    <>
      {/* Action Status */}
      <Stack spacing={2} sx={{ maxWidth: 1000 }}>
        <Snackbar
          key="SnackBar"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackStatus}
          onClose={handleSnackbarClose}
        >
          {snackMessageFor === "duplicateError" ? (
            <Alert
              variant="filled"
              severity="warning"
              sx={{
                "&.MuiPaper-root": {
                  background: "#ffc107",
                  color: "#fff",
                },
              }}
              action={
                <CloseRoundedIcon
                  sx={{ cursor: "pointer", color: "#fff" }}
                  onClick={() => handleSnackbarClose()}
                  color="inherit"
                  size="small"
                />
              }
            >
              {COURSE_NAME_EXIST}
            </Alert>
          ) : (
            <Alert
              variant="filled"
              severity="success"
              sx={{
                "&.MuiPaper-root": {
                  background: "#00c853",
                  color: "#fff",
                },
              }}
              action={
                <CloseRoundedIcon
                  sx={{ cursor: "pointer", color: "#fff" }}
                  onClick={() => handleSnackbarClose()}
                  color="inherit"
                  size="small"
                />
              }
            >
              {snackMessageFor === "update"
                ? ROW_UPDATE_SUCCESS_MESSAGE
                : snackMessageFor === "delete"
                ? ROW_DELETE_SUCCESS_MESSAGE
                : snackMessageFor === "create"
                ? ROW_CREATE_SUCCESS_MESSAGE
                : ""}
            </Alert>
          )}
        </Snackbar>
      </Stack>
      <div className="LessonBotAdmin">
        <div className="LessonBotHeader">
          <Stack direction="row" spacing={1}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{
                "&.MuiTypography-h6": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                },
              }}
            >
              Update Course
            </Typography>
          </Stack>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
          >
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                color: "inherit",
                textDecoration: "none",
              }}
              to="/admin/manageCourse"
            >
              <Tooltip title="Manage Course">
                <LocationOnIcon sx={{ mr: 0.5 }} fontSize="medium" />
              </Tooltip>
              <span className="BreadcrumbName">Manage Course</span>
            </Link>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Update Course">
                <EditIcon sx={{ mr: 0.5 }} fontSize="medium" />
              </Tooltip>
              <span className="BreadcrumbName">Update Course</span>
            </Typography>
          </Breadcrumbs>
        </div>
        <div className="createDomainParent">
          <div className="LessonBotContent">
            <div className="fieldCourseParent">
              <div className="fieldChildImage">
                <TextField
                  variant="standard"
                  id="courseName"
                  label="Course Name"
                  className="fieldStyle"
                  value={courseName}
                  onChange={handleOnChangeUpdateDistrict}
                  error={emptyError.courseName}
                  helperText={emptyError.courseName ? COURSE_NAME_EMPTY : ""}
                />
              </div>
              <div className="fieldChildImage">
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        boxShadow: 7,
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={image}
                        style={{
                          borderRadius: "50%",
                          width: "100%",
                          height: "100%",
                        }}
                        alt="CourseImage"
                      />
                    </Box>
                    <label htmlFor="imageInput">
                      <Button variant="outlined" component="span">
                        <Input
                          accept="image/*"
                          id="imageInput"
                          type="file"
                          onChange={handleOnChangeUpdateDistrict}
                        />
                        Upload
                      </Button>
                      <div
                        style={{
                          fontWeight: "400",
                          fontSize: "0.75rem",
                          lineHeight: "1.66",
                          letterSpacing: "0.03333em",
                          color: emptyError.image ? "#d32f2f" : "none",
                        }}
                      >
                        {emptyError.image ? IMAGE_EMPTY : ""}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="fieldCourseParent">
              <div className="fieldChild">
                <TextField
                  variant="standard"
                  id="courseDescription"
                  label="Course Description"
                  multiline
                  rows={4}
                  sx={{
                    width: "100%",
                  }}
                  value={courseDescription}
                  onChange={handleOnChangeUpdateDistrict}
                  error={emptyError.courseDescription}
                  helperText={
                    emptyError.courseDescription ? COURSE_DESCRIPTION_EMPTY : ""
                  }
                />
              </div>
            </div>

            <div className="createButtonParent" style={{ height: "18%" }}>
              <div className="createButtonChild">
                <LoadingButton
                  sx={{
                    background: updateLoading ? "#bb87ff" : "#8d39fa",
                    "&.MuiLoadingButton-root": {
                      background: updateLoading ? "#bb87ff" : "#8d39fa",
                      color: "#fff",
                    },
                  }}
                  onClick={handleUpdateClick}
                  loading={updateLoading}
                  loadingPosition="start"
                  startIcon={<EditIcon />}
                >
                  Update
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateCourse;
