import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Checkbox,
  Divider,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ITEM_HEIGHT, COPIED_TO_CLIPBOARD } from "../../constants";
import allActions from "../../redux/ducks/actions";
import "./ListAllLessons.css";

function ActivatedBot() {
  const { checkData, userInfo, listAllLessons } = useSelector(
    (state) => state.data
  ); // From Redux
  const dispatch = useDispatch(); //From Dispatch
  const history = useHistory();

  // console.log(checkData, "checkData");

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

  return (
    <>
      {/* Action Status */}
      <Stack spacing={2} sx={{ maxWidth: 1000 }}>
        <Snackbar
          key="SnackBar"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
          >
            {snackMessageFor === "copied" ? COPIED_TO_CLIPBOARD : ""}
          </Alert>
        </Snackbar>
      </Stack>
      <div className="lesson-grid-align">
        <div className="lesson-grid">
          {listAllLessons &&
            listAllLessons.SharedLessonUnits &&
            listAllLessons.SharedLessonUnits.length !== 0 &&
            listAllLessons.SharedLessonUnits.map((lesson, index) => (
              <ImageListItem
                key={index}
                sx={{
                  boxShadow:
                    "rgb(0 0 0 / 20%) 0px 3px 25px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px",
                  borderRadius: "12px",
                  border:
                    checkData.indexOf(lesson.LessonUnitDistID) !== -1
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
                          checkData.indexOf(lesson.LessonUnitDistID) !== -1
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
                                lesson.LessonUnitDistID,
                              ])
                            );
                          } else {
                            const data = checkData.filter(
                              (item) => item !== lesson.LessonUnitDistID
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
                              maxHeight: ITEM_HEIGHT * 5,
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
                              history.push(
                                `dashboard/editActivatedBot/${lesson.LessonUnitDistID}`
                              );
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
                              navigator.clipboard.writeText(
                                lesson.LessonUnitDistID
                                // `https://backpacklessonbot.knomadixapp.com/content?LessonUnitID=${lesson.LessonUnitDistID}`
                                // https://teacherlessonbot.knomadixapp.com/
                                // https://classroomlessonbot.knomadixapp.com/
                              );
                              handleMenuClose();
                              handleSnackbarClick("copied");
                              setTimeout(() => {
                                handleSnackbarClose();
                              }, 2500);
                            }}
                          >
                            <ListItemIcon>
                              <LogoutIcon
                                sx={{
                                  color: "#4286f4",
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary="Copy Lesson Id"
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

export default ActivatedBot;
