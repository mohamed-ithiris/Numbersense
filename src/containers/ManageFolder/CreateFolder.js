import CreateIcon from "@mui/icons-material/Create";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Autocomplete,
  Breadcrumbs,
  Stack,
  TextField,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  COURSE_NAME_EMPTY,
  FOLDER_NAME_EMPTY,
  FOLDER_DESCRIPTION_EMPTY,
  LESSON_NAME_EXIST,
  ROW_UPDATE_SUCCESS_MESSAGE,
  ROW_DELETE_SUCCESS_MESSAGE,
  ROW_CREATE_SUCCESS_MESSAGE,
} from "../../constants";
import Creators from "../../redux/ducks/actions";
import "../ManageDistrict/ManageDistrict.css";
import { useHistory } from "react-router-dom";

function CreateFolder() {
  const dispatch = useDispatch(); //dispatch
  const history = useHistory(); //history
  const { listAllCourses } = useSelector((state) => state.data);

  const [form, setForm] = useState({
    subjectId: "",
    folderName: "",
    folderDescription: "",
    activityBy: 1,
  });
  const [emptyError, setEmptyError] = useState({
    subjectId: false,
    folderName: false,
    folderDescription: false,
    activityBy: false,
  });

  //   create Button
  const [createLoading, setCreateLoading] = useState(false);
  const handleCreateClick = () => {
    setCreateLoading(true);
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
      setCreateLoading(false);
    } else {
      dispatch(
        Creators.putFolder(form, (response) => {
          console.log(response, "response");
          if (response.MessageID === 1) {
            // Lesson Duplicate Error
            setCreateLoading(false);
            handleSnackbarClick("duplicateError");
            return null;
          } else if (response.MessageID === 0) {
            // Folder Success Message
            setCreateLoading(false);
            handleCancelButton();
            handleSnackbarClick("create");
            setTimeout(() => {
              history.push("/admin/manageFolder");
            }, 1000);
          } else {
            console.error(response, "response");
          }
        })
      );
    }
  };

  // cancel Button
  const handleCancelButton = () => {
    setForm((state) => ({
      ...state,
      subjectId: 0,
      folderName: "",
      folderDescription: "",
      activityBy: 1,
    }));
    setEmptyError((state) => ({
      ...state,
      subjectId: false,
      folderName: false,
      folderDescription: false,
      activityBy: false,
    }));
  };
  // handle Create Domain
  const handleOnChangeCreateFolder = (e) => {
    if (e.target.value !== "") {
      setEmptyError((state) => ({
        ...state,
        [e.target.id]: false,
      }));
    }

    setForm((state) => ({
      ...state,
      [e.target.id]: e.target.value,
    }));
  };

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

  const [courseId, setCourseId] = useState({
    GradeID: 0,
    Image: "",
    SubjectDesc: "",
    SubjectID: 0,
    SubjectName: "",
  });
  return (
    <>
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
              {LESSON_NAME_EXIST}
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
              Create Folder
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
              to="/admin/manageFolder"
            >
              <Tooltip title="Manage Folder">
                <LocationOnIcon sx={{ mr: 0.5 }} fontSize="medium" />
              </Tooltip>
              <span className="BreadcrumbName">Manage Folder</span>
            </Link>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Create Folder">
                <CreateIcon sx={{ mr: 0.5 }} fontSize="medium" />
              </Tooltip>
              <span className="BreadcrumbName">Create Folder</span>
            </Typography>
          </Breadcrumbs>
        </div>
        <div className="createDomainParent">
          <div className="LessonBotContent">
            <div className="fieldParent">
              <div className="fieldChild">
                <Autocomplete
                  id="subjectId"
                  className="fieldStyle"
                  options={listAllCourses}
                  value={courseId}
                  onChange={(_, y) => setCourseId(y)}
                  getOptionLabel={(option) => option.SubjectName}
                  onBlur={(e) => {
                    if (e.target.value !== "") {
                      const present = listAllCourses.some(
                        (item) => item.SubjectName === e.target.value
                      );
                      if (present) {
                        setEmptyError((state) => ({
                          ...state,
                          subjectId: false,
                        }));
                        setForm((state) => ({
                          ...state,
                          subjectId: courseId.SubjectID,
                        }));
                      } else {
                        setForm((state) => ({
                          ...state,
                          subjectId: "",
                        }));
                      }
                    } else {
                      setForm((state) => ({
                        ...state,
                        subjectId: "",
                      }));
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Course Name"
                      variant="standard"
                      error={emptyError.subjectId}
                      helperText={emptyError.subjectId ? COURSE_NAME_EMPTY : ""}
                    />
                  )}
                />
              </div>

              <div className="fieldChild">
                <TextField
                  variant="standard"
                  size="small"
                  id="folderName"
                  label="Folder Name"
                  type="text"
                  className="fieldStyle"
                  value={form.folderName}
                  onChange={handleOnChangeCreateFolder}
                  error={emptyError.folderName}
                  helperText={emptyError.folderName ? FOLDER_NAME_EMPTY : ""}
                />
              </div>
            </div>
            <div className="fieldParent">
              <div className="fieldChild">
                <TextField
                  variant="standard"
                  size="small"
                  id="folderDescription"
                  label="Folder Description"
                  multiline
                  rows={3}
                  value={form.folderDescription}
                  sx={{ width: "100%" }}
                  onChange={handleOnChangeCreateFolder}
                  error={emptyError.folderDescription}
                  helperText={
                    emptyError.folderDescription ? FOLDER_DESCRIPTION_EMPTY : ""
                  }
                />
              </div>
            </div>
            <div className="createButtonParent" style={{ height: "18%" }}>
              <div className="createButtonChild">
                <LoadingButton
                  sx={{
                    background: createLoading ? "#bb87ff" : "#8d39fa",
                    "&.MuiLoadingButton-root": {
                      background: createLoading ? "#bb87ff" : "#8d39fa",
                      color: "#fff",
                    },
                  }}
                  onClick={handleCreateClick}
                  loading={createLoading}
                  loadingPosition="start"
                  startIcon={<CreateIcon />}
                >
                  Create
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateFolder;
