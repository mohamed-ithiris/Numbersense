import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Alert,
  Button,
  Checkbox,
  Divider,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  ITEM_HEIGHT,
  LESSONPOD_DESCRIPTION_EMPTY,
  LESSONPOD_NAME_EMPTY,
  ROW_RENAME_SUCCESS_MESSAGE,
  ROW_COPY_SUCCESS_MESSAGE,
  ROW_DELETE_WARNING_MESSAGE,
  LESSON_DELETED_SUCCESS_MESSAGE,
} from "../../constants";
import {
  default as allActions,
  default as Creators,
} from "../../redux/ducks/actions";
import "./ListAllLessons.css";

function CreatedBot() {
  const useStyles = makeStyles(() => ({
    backDrop: {
      backdropFilter: "blur(4px)",
      backgroundColor: "rgba(30,41,51,.45)",
    },
  }));
  const { checkData, userInfo, listAllLessons } = useSelector(
    (state) => state.data
  ); // From Redux
  const dispatch = useDispatch(); //From Dispatch
  const history = useHistory();

  // Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [idanchor, setIdanchor] = useState(-1);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setIdanchor(event.currentTarget.id);
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setIdanchor(null);
  };

  // Unsetting check Data
  useEffect(() => {
    dispatch(allActions.getAllLessonList(userInfo.LoginID)); //passing LoginId
    return function () {
      dispatch(allActions.setCheckData([]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // rename form
  const [form, setForm] = useState({
    loginId: "",
    lessonUnitId: "",
    lessonPodName: "",
    lessonPodDescription: "",
    accessType: "",
  });
  const [emptyError, setEmptyError] = useState({
    lessonPodName: false,
    lessonPodDescription: false,
  });

  // Copy form
  const [formCopy, setFormCopy] = useState({
    loginId: "",
    lessonUnitId: "",
    lessonPodName: "",
    lessonPodDescription: "",
    accessType: "",
  });
  const [emptyErrorCopy, setEmptyErrorCopy] = useState({
    lessonPodName: false,
    lessonPodDescription: false,
  });

  const { lessonPodName, lessonPodDescription } = form;

  // rename lesson Dialog
  const [renameLesson, setRenameLesson] = useState(false);
  const handleDialogOpen = (lesson) => {
    handleMenuClose();
    setRenameLesson(true);
    setForm((state) => ({
      ...state,
      loginId: lesson.AuthorID,
      lessonUnitId: lesson.LessonUnitID,
      lessonPodName: lesson.LessonName,
      lessonPodDescription: lesson.LessonDesc,
      accessType: "Private",
    }));
  };
  const handleDialogClose = () => {
    setRenameLesson(false);
    setForm((state) => ({
      ...state,
      loginId: "",
      lessonUnitId: "",
      lessonPodName: "",
      lessonPodDescription: "",
      accessType: "",
    }));
    setEmptyError((state) => ({
      ...state,
      lessonPodName: false,
      lessonPodDescription: false,
    }));
  };

  // Rename on changes
  const handleRenameOnChanges = (e) => {
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

  // rename click
  const handleRenameClick = () => {
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
    } else {
      dispatch(
        Creators.renameLessonPod(form, (response) => {
          if (response.MessageID === 0) {
            // Rename Success Message
            setRenameLesson(false);
            handleSnackbarClick("rename");
            dispatch(allActions.getAllLessonList(userInfo.LoginID)); //passing LoginId
          } else {
            console.error(response, "response");
            //  Error
            return null;
          }
        })
      );
    }
  };

  // Copy lesson Dialog
  const [copyLesson, setCopyLesson] = useState(false);
  const handleCopyDialogOpen = (lesson) => {
    handleMenuClose();
    setCopyLesson(true);
    setFormCopy((state) => ({
      ...state,
      loginId: lesson.AuthorID,
      lessonUnitId: lesson.LessonUnitID,
      lessonPodName: lesson.LessonName,
      lessonPodDescription: lesson.LessonDesc,
      accessType: "Private",
    }));
  };
  const handleCopyDialogClose = () => {
    setCopyLesson(false);
    setFormCopy((state) => ({
      ...state,
      loginId: "",
      lessonUnitId: "",
      lessonPodName: "",
      lessonPodDescription: "",
      accessType: "",
    }));
    setEmptyErrorCopy((state) => ({
      ...state,
      lessonPodName: false,
      lessonPodDescription: false,
    }));
  };

  // Copy onchanges
  const handleCopyOnChanges = (e) => {
    if (e.target.value !== "") {
      setEmptyErrorCopy((state) => ({
        ...state,
        [e.target.id]: false,
      }));
    }
    setFormCopy((state) => ({
      ...state,
      [e.target.id]: e.target.value,
    }));
  };

  // Copy click
  const handleCopyClick = () => {
    const checkEmptyValue = { ...emptyErrorCopy };
    let submit = true;
    // Checking empty data
    for (let items in formCopy) {
      if (formCopy[items] === "") {
        submit = false;
        checkEmptyValue[items] = true;
      }
    }
    if (!submit) {
      setEmptyErrorCopy(checkEmptyValue);
    } else {
      dispatch(
        Creators.copyLessonbot(formCopy, (response) => {
          if (response.MessageID === 0) {
            // copy Success Message
            setCopyLesson(false);
            handleSnackbarClick("copy");
            dispatch(allActions.getAllLessonList(userInfo.LoginID)); //passing LoginId
          } else {
            console.error(response, "response");
            //  Error
            return null;
          }
        })
      );
    }
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

  // Delete Dialog
  const classes = useStyles();
  const [deleteModel, setDeleteModel] = useState(false);
  const [currentDeleteData, setCurrentDeleteData] = useState({});
  const handleDeleteModelOpen = () => setDeleteModel(true);
  const handleDeleteModelClose = () => setDeleteModel(false);
  const handleDeleteClick = () => {
    const deleteData = {
      lessonUnitId: currentDeleteData.LessonUnitID,
      loginId: currentDeleteData.AuthorID,
    };
    dispatch(
      allActions.deleteCreatedLessonPod(deleteData, (response) => {
        if (response.MessageID === 0) {
          // Created Delete Success Message
          handleSnackbarClick("delete");
          handleDeleteModelClose();
          dispatch(allActions.getAllLessonList(userInfo.LoginID)); //passing LoginId
        } else {
          //  Error
          console.error(response, "response");
          handleDeleteModelClose();
          return null;
        }
      })
    );
  };

  return (
    <>
      {/* Rename Modal */}
      <Dialog
        open={renameLesson}
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <DialogTitle>
          <b>Rename Lesson</b>
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
            onChange={handleRenameOnChanges}
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
            onChange={handleRenameOnChanges}
            error={emptyError.lessonPodDescription}
            helperText={
              emptyError.lessonPodDescription ? LESSONPOD_DESCRIPTION_EMPTY : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDialogClose} color="error">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleRenameClick}
          >
            Rename
          </Button>
        </DialogActions>
      </Dialog>
      {/* Make a copy Modal */}
      <Dialog
        open={copyLesson}
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <DialogTitle>
          <b>Copy Lesson</b>
        </DialogTitle>
        <DialogContent>
          <TextField
            id="lessonPodName"
            label="Lessonbot Name"
            type="text"
            fullWidth
            variant="standard"
            sx={{ padding: "3% 0" }}
            value={formCopy.lessonPodName}
            onChange={handleCopyOnChanges}
            error={emptyErrorCopy.lessonPodName}
            helperText={
              emptyErrorCopy.lessonPodName ? LESSONPOD_NAME_EMPTY : ""
            }
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
            value={formCopy.lessonPodDescription}
            onChange={handleCopyOnChanges}
            error={emptyErrorCopy.lessonPodDescription}
            helperText={
              emptyErrorCopy.lessonPodDescription
                ? LESSONPOD_DESCRIPTION_EMPTY
                : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleCopyDialogClose}
            color="error"
          >
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleCopyClick}>
            Copy
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Modal */}
      <Dialog
        open={deleteModel}
        keepMounted
        onClose={handleDeleteModelClose}
        aria-describedby="alert-dialog-slide-description"
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
        PaperProps={{
          style: {
            padding: "2%",
          },
        }}
      >
        <DialogTitle>{ROW_DELETE_WARNING_MESSAGE}</DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleDeleteModelClose}
            sx={{
              bgcolor: "rgba(64,87,109,.07)",
              color: "#000",
              "&.MuiButton-root:hover": {
                bgcolor: "rgba(64,87,109,.07)",
                color: "#000",
              },
            }}
          >
            <span>No</span>
          </Button>

          <Button
            variant="contained"
            onClick={handleDeleteClick}
            sx={{
              bgcolor: "#db1436",
              color: "#fff",
              "&.MuiButton-root:hover": {
                bgcolor: "#db1436",
              },
            }}
          >
            <span>Yes</span>
          </Button>
        </DialogActions>
      </Dialog>
      {/* Action Status */}
      <Stack spacing={2} sx={{ maxWidth: 1000 }}>
        <Snackbar
          key="SnackBar"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackStatus}
          onClose={handleSnackbarClose}
        >
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
            {snackMessageFor === "rename"
              ? ROW_RENAME_SUCCESS_MESSAGE
              : snackMessageFor === "copy"
              ? ROW_COPY_SUCCESS_MESSAGE
              : LESSON_DELETED_SUCCESS_MESSAGE}
          </Alert>
        </Snackbar>
      </Stack>
      <div className="lesson-grid-align">
        <div className="lesson-grid">
          {listAllLessons &&
            listAllLessons.LessonUnits &&
            listAllLessons.LessonUnits.length !== 0 &&
            listAllLessons.LessonUnits.map((lesson, index) => (
              <ImageListItem
                key={index}
                sx={{
                  boxShadow:
                    "rgb(0 0 0 / 20%) 0px 3px 25px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px",
                  borderRadius: "12px",
                  border:
                    checkData.indexOf(lesson.LessonUnitID) !== -1
                      ? "3px solid #8d39fa"
                      : "3px solid #fff",
                  "&.MuiImageListItemBar-titleWrap": {
                    color: "#8d39fa",
                  },
                }}
              >
                <img
                  style={{
                    borderRadius: "12px",
                    borderTopRightRadius: "12px",
                    borderTopLeftRadius: "12px",
                  }}
                  src={
                    index === 5
                      ? "https://studiousguy.com/wp-content/uploads/2019/10/maths-applications.jpg"
                      : index === 3
                      ? "https://img.freepik.com/free-vector/hand-drawn-science-education-background_23-2148499325.jpg?size=626&ext=jpg"
                      : index === 8
                      ? "https://img.freepik.com/free-vector/hand-drawn-science-education-background_23-2148499325.jpg?size=626&ext=jpg"
                      : index === 10
                      ? "https://www.socialchangecentral.com/wp-content/uploads/2021/04/3-Steps-to-Engaging-Others-in-Your-Social-Change-Mission.jpg"
                      : index === 14
                      ? "https://thumbs.dreamstime.com/b/language-school-adult-kids-english-courses-class-language-school-adult-kids-english-courses-class-141377421.jpg"
                      : "https://i.pinimg.com/736x/47/a2/ab/47a2abe6971777da197f9907e50baa6d.jpg"
                  }
                  alt={lesson.LessonName}
                  loading="lazy"
                />

                <ImageListItemBar
                  sx={{
                    background: "#efe6ff",
                    borderTopRightRadius: "12px",
                    borderTopLeftRadius: "12px",
                  }}
                  position="top"
                  actionPosition="left"
                  actionIcon={
                    <Tooltip title="select" arrow>
                      <Checkbox
                        checked={
                          checkData.indexOf(lesson.LessonUnitID) !== -1
                            ? true
                            : false
                        }
                        sx={{
                          color: "#8d39fa",
                          "&.Mui-checked": {
                            color: "#8d39fa",
                          },
                        }}
                        onChange={(event) => {
                          if (event.target.checked) {
                            dispatch(
                              allActions.setCheckData([
                                ...checkData,
                                lesson.LessonUnitID,
                              ])
                            );
                          } else {
                            const data = checkData.filter(
                              (item) => item !== lesson.LessonUnitID
                            );
                            dispatch(allActions.setCheckData(data));
                          }
                        }}
                      />
                    </Tooltip>
                  }
                />
                {checkData.length === 0 ? (
                  <ImageListItemBar
                    sx={{
                      background: "none",
                      borderBottomRightRadius: "12px",
                      borderBottomLeftRadius: "12px",
                    }}
                    position="top"
                    actionPosition="right"
                    actionIcon={
                      <>
                        <Tooltip title="More" arrow>
                          <IconButton
                            aria-label="more"
                            id={index}
                            aria-controls="long-menu"
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={handleMenuClick}
                            sx={{
                              color: "#8d39fa",
                              cursor: "pointer",
                              transform: "scale(0.9)",
                              "&.MuiIconButton-root:hover": {
                                bgcolor: "#8d39fa",
                                color: "#fff",
                                transition: "300ms",
                              },
                            }}
                          >
                            <MoreVertIcon fontSize="medium" />
                          </IconButton>
                        </Tooltip>
                        <Menu
                          id="long-menu"
                          MenuListProps={{
                            "aria-labelledby": "long-button",
                          }}
                          // eslint-disable-next-line eqeqeq
                          anchorEl={idanchor == index ? anchorEl : null}
                          // eslint-disable-next-line eqeqeq
                          open={idanchor == index ? open : false}
                          onClose={handleMenuClose}
                          PaperProps={{
                            style: {
                              maxHeight: ITEM_HEIGHT * 6,
                              boxShadow: undefined,
                            },
                          }}
                        >
                          <MenuItem key="1" onClick={handleMenuClose}>
                            <ListItemText
                              sx={{
                                paddingLeft: "2%",
                              }}
                              primary={lesson.LessonName}
                              primaryTypographyProps={{
                                fontWeight: 700,
                              }}
                              secondary={`by ${userInfo.FName}`}
                            />
                          </MenuItem>
                          <Divider />
                          <MenuItem
                            onClick={() => {
                              window.open(
                                `https://studiolessonbot.knomadixapp.com/?LessonUnitID=${lesson.LessonUnitID}&LessonID=${lesson.LessonID}&LoginID=${lesson.AuthorID}&LoginName=${lesson.LoginName}&DomainID=${userInfo.DomainID}`,
                                "_self"
                              );
                              handleMenuClose();
                            }}
                          >
                            <ListItemIcon>
                              <EditIcon
                                sx={{
                                  color: "#ffc107",
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary="Edit"
                              sx={{
                                color: "#0e1318",
                              }}
                            />
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleDialogOpen(lesson);
                            }}
                          >
                            <ListItemIcon>
                              <DriveFileRenameOutlineIcon
                                sx={{
                                  color: "#db32c6",
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary="Rename"
                              sx={{
                                color: "#0e1318",
                              }}
                            />
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleCopyDialogOpen(lesson);
                            }}
                          >
                            <ListItemIcon>
                              <ContentCopyIcon
                                sx={{
                                  color: "#2196f3",
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary="Make a copy"
                              sx={{
                                color: "#0e1318",
                              }}
                            />
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleMenuClose();
                              history.push(
                                `dashboard/activateBot/${lesson.LessonUnitID}`
                              );
                            }}
                          >
                            <ListItemIcon>
                              <AssignmentTurnedInIcon
                                sx={{
                                  color: "#4286f4",
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary="Activate Bot"
                              sx={{
                                color: "#0e1318",
                              }}
                            />
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleMenuClose();
                              handleDeleteModelOpen();
                              setCurrentDeleteData(lesson);
                            }}
                          >
                            <ListItemIcon>
                              <DeleteOutlineOutlinedIcon
                                sx={{
                                  color: "#f44336",
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary="Move to Trash"
                              sx={{
                                color: "#0e1318",
                              }}
                            />
                          </MenuItem>
                        </Menu>
                      </>
                    }
                  />
                ) : null}
                <ImageListItemBar
                  sx={{
                    background: "#000",
                    borderBottomRightRadius: "12px",
                    borderBottomLeftRadius: "12px",
                    textTransform: "capitalize",
                  }}
                  title={lesson.LessonName}
                  position="bottom"
                />
              </ImageListItem>
            ))}
        </div>
      </div>
    </>
  );
}

export default CreatedBot;
