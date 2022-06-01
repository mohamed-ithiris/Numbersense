import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  COURSE_NAME_EMPTY,
  FOLDER_NAME_EMPTY,
  LESSONPOD_DESCRIPTION_EMPTY,
  LESSONPOD_NAME_EMPTY,
} from "../../constants";
import allActions from "../../redux/ducks/actions";
import ActivatedBot from "./ActivatedBot";
import CreatedBot from "./CreatedBot";
import ListAllCoursesTabs from "./ListAllCoursesTab";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";

export default function LabTabs() {
  const { userInfo, listAllCourses, listAllFolders } = useSelector(
    (state) => state.data
  ); //from redux
  // create lesson Dialog
  const dispatch = useDispatch(); // dispatch
  const [createLesson, setCreateLesson] = useState(false);
  const [form, setForm] = useState({
    lessonPodName: "",
    lessonPodDescription: "",
    subjectId: "",
    folderId: "",
  });

  const [emptyError, setEmptyError] = useState({
    lessonPodName: false,
    lessonPodDescription: false,
    subjectId: false,
    folderId: false,
  });

  const { lessonPodName, lessonPodDescription } = form;

  const clearFolderId = () => {
    setForm((state) => ({
      ...state,
      folderId: "",
    }));
    setFolderId({
      DisplayOrder: 0,
      LessonDesc: "",
      LessonID: 0,
      LessonName: "",
      SubjectID: 0,
      SubjectName: "",
    });
  };

  const handleLessonPodOnChange = (e) => {
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

  const handleCreateLessonClick = () => {
    const checkEmptyValue = { ...emptyError };
    let submit = true;
    for (let items in form) {
      if (form[items] === "") {
        submit = false;
        checkEmptyValue[items] = true;
      }
    }
    if (!submit) {
      setEmptyError(checkEmptyValue);
    } else {
      window.open(
        `https://studiolessonbot.knomadixapp.com/?LoginID=${userInfo.LoginID}&SubjectID=${form.subjectId}&LessonID=${form.folderId}&LessonUnitName=${form.lessonPodName}&LoginName=${userInfo.LoginName}&LessonUnitDesc=${form.lessonPodDescription}&DomainID=${userInfo.DomainID}`,
        "_self"
      );
      handleCancelLessonClick();
      setCreateLesson(false);
    }
  };

  const handleCancelLessonClick = () => {
    setCreateLesson(false);
    setCourseId({
      GradeID: 0,
      Image: "",
      SubjectDesc: "",
      SubjectID: 0,
      SubjectName: "",
    });
    setFolderId({
      DisplayOrder: 0,
      LessonDesc: "",
      LessonID: 0,
      LessonName: "",
      SubjectID: 0,
      SubjectName: "",
    });
    setForm({
      lessonPodName: "",
      lessonPodDescription: "",
      subjectId: "",
      folderId: "",
    });
    setEmptyError({
      lessonPodName: false,
      lessonPodDescription: false,
      subjectId: false,
      folderId: false,
    });
  };

  // course and folder select
  const [courseId, setCourseId] = useState({
    GradeID: 0,
    Image: "",
    SubjectDesc: "",
    SubjectID: "",
    SubjectName: "",
  });

  const [folderId, setFolderId] = useState({
    DisplayOrder: 0,
    LessonDesc: "",
    LessonID: 0,
    LessonName: "",
    SubjectID: 0,
    SubjectName: "",
  });

  useEffect(() => {
    if (courseId && courseId.SubjectID && courseId.SubjectID !== "") {
      dispatch(allActions.getFolderList(courseId.SubjectID, userInfo.LoginID));
    }
  }, [dispatch, courseId, userInfo]);

  return (
    <div style={{ display: "block", position: "relative", height: "95%" }}>
      <Dialog open={createLesson}>
        <DialogTitle>
          <b>Create New Lessonbot</b>
        </DialogTitle>
        <DialogContent>
          <TextField
            id="lessonPodName"
            label="Lessonbot Name"
            type="text"
            fullWidth
            variant="standard"
            sx={{ padding: "3% 0" }}
            value={lessonPodName}
            onChange={handleLessonPodOnChange}
            error={emptyError.lessonPodName}
            helperText={emptyError.lessonPodName ? LESSONPOD_NAME_EMPTY : ""}
          />
          <TextField
            id="lessonPodDescription"
            label="Lessonbot Description"
            type="text"
            multiline
            rows={3}
            fullWidth
            variant="standard"
            sx={{ padding: "3% 0" }}
            value={lessonPodDescription}
            onChange={handleLessonPodOnChange}
            error={emptyError.lessonPodDescription}
            helperText={
              emptyError.lessonPodDescription ? LESSONPOD_DESCRIPTION_EMPTY : ""
            }
          />
          <Autocomplete
            id="subjectId"
            className="fieldStyle"
            sx={{ padding: "3% 0" }}
            options={listAllCourses}
            value={courseId}
            onChange={(_, y) => {
              setCourseId(y);
              clearFolderId();
            }}
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
          <Autocomplete
            id="folderId"
            className="fieldStyle"
            sx={{ padding: "3% 0" }}
            options={listAllFolders}
            value={folderId}
            onChange={(_, y) => setFolderId(y)}
            getOptionLabel={(option) => option.LessonName}
            onBlur={(e) => {
              if (e.target.value !== "") {
                const present = listAllFolders.some(
                  (item) => item.LessonName === e.target.value
                );
                if (present) {
                  setEmptyError((state) => ({
                    ...state,
                    folderId: false,
                  }));
                  setForm((state) => ({
                    ...state,
                    folderId: folderId.LessonID,
                  }));
                } else {
                  setForm((state) => ({
                    ...state,
                    folderId: "",
                  }));
                }
              } else {
                setForm((state) => ({
                  ...state,
                  folderId: "",
                }));
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Folder Name"
                variant="standard"
                error={emptyError.folderId}
                helperText={emptyError.folderId ? FOLDER_NAME_EMPTY : ""}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleCancelLessonClick}
            color="error"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleCreateLessonClick}
          >
            Open
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <div className="ListAllCourse-Header">
          <div className="ListAllCourseContent">
            <Stack direction="row" spacing={1}>
              <SchoolRoundedIcon
                sx={{
                  color: "#db32c6",
                  display: "flex",
                  alignSelf: "center",
                  marginLeft: "1%",
                }}
              />
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
                My Courses
              </Typography>
            </Stack>
          </div>
        </div>
        <div className="ListAllCourse-Main">
          <div className="content">
            <ListAllCoursesTabs />
          </div>
        </div>
      </div>
      <div>
        <div className="ListAllLesson-Header">
          <div className="lessonBotContent">
            <div
              style={{
                display: "flex",
                dlexDirection: "row",
                width: "50%",
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={1} style={{ width: "100%" }}>
                <AssignmentRoundedIcon
                  sx={{
                    color: "#8d39fa",
                    display: "flex",
                    alignSelf: "center",
                    marginLeft: "1%",
                  }}
                />
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
                  My Lessonbots
                </Typography>
              </Stack>
            </div>
            <div
              style={{
                display: "flex",
                dlexDirection: "row",
                justifyContent: "flex-end",
                width: "50%",
              }}
            >
              <Tooltip
                title="Add Lesson"
                onClick={() => {
                  setCreateLesson(true);
                }}
              >
                <IconButton>
                  <AddCircleIcon
                    fontSize="large"
                    style={{
                      color: "#8d39fa",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="ListAllLesson-Main">
          <div className="ListAllLesson-Header" style={{ marginTop: "1%" }}>
            <div className="content">
              <Stack direction="row" spacing={1}>
                <b>Studio Bot</b>
              </Stack>
            </div>
          </div>
          <div className="ListAllLesson-Main">
            <div className="content">
              <CreatedBot />
            </div>
          </div>
          <div className="ListAllLesson-Header">
            <div className="content">
              <Stack direction="row" spacing={1}>
                <b>Activated Bot</b>
              </Stack>
            </div>
          </div>
          <div className="ListAllLesson-Main">
            <div className="content">
              <ActivatedBot />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
