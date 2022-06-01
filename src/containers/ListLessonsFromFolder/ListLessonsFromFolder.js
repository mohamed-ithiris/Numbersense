import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import ShareIcon from "@mui/icons-material/Share";
import {
  Breadcrumbs,
  Checkbox,
  ImageListItem,
  ImageListItemBar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEM_HEIGHT } from "../../constants";
import allActions from "../../redux/ducks/actions";
import "./ListLessonsFromFolder.css";

function ListLessonsFromFolder() {
  const { folderName, courseName, checkData, userInfo, listLessonsFromFolder } =
    useSelector((state) => state.data); // From Redux
  const dispatch = useDispatch(); //From Dispatch

  const goBackToFolder = `/user/dashboard/folders/${courseName[1]}`;

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
    return function () {
      dispatch(allActions.setCheckData([]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ListLessonsFromFolder">
      <div className="listLessonHeaderFromFolder">
        <Stack direction="row" spacing={1}>
          <FolderRoundedIcon
            sx={{
              color: "#ffc107",
              display: "flex",
              alignSelf: "center",
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
            {folderName[0]} - Lessons
          </Typography>
        </Stack>
        <div className="gridViewLessonFromFolder">
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
          >
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
              to="/user/dashboard"
              onClick={() => dispatch(allActions.setCheckData([]))}
            >
              <Tooltip title="Home">
                <HomeRoundedIcon
                  fontSize="small"
                  sx={{
                    mr: 0.5,
                    color: "#2196f3",
                  }}
                />
              </Tooltip>
              <span className="BreadcrumbName">Home</span>
            </Link>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
              to={goBackToFolder}
              onClick={() => dispatch(allActions.setCheckData([]))}
            >
              <Tooltip title="Folders">
                <FolderRoundedIcon
                  fontSize="small"
                  sx={{ mr: 0.5, color: "#ffc107" }}
                />
              </Tooltip>
              <span className="BreadcrumbName">Folders</span>
            </Link>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Lessons">
                <AssignmentRoundedIcon sx={{ mr: 0.5 }} fontSize="small" />
              </Tooltip>
              <span className="BreadcrumbName">Lessons</span>
            </Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="contentLessonFromFolder">
        <div className="grid-align-lesson-from-folder">
          <div className="lessonFromFolderGrid">
            {listLessonsFromFolder &&
              listLessonsFromFolder.map((item, index) => {
                return (
                  <ImageListItem
                    key={index}
                    sx={{
                      boxShadow:
                        "rgb(0 0 0 / 20%) 0px 3px 25px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      border:
                        checkData.indexOf(item.LessonUnitID) !== -1
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
                      alt={item.lessonName}
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
                              checkData.indexOf(item.LessonUnitID) !== -1
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
                              if (checkData.indexOf(item.LessonUnitID) === -1) {
                                dispatch(
                                  allActions.setCheckData([
                                    ...checkData,
                                    item.LessonUnitID,
                                  ])
                                );
                              } else {
                                const data = checkData.filter(
                                  (lesid) => lesid !== item.LessonUnitID
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
                                  "&.MuiIconButton-root:hover": {
                                    bgcolor: "#8d39fa",
                                    color: "#fff",
                                  },
                                }}
                              >
                                <MoreVertIcon />
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
                                  primary={item.LessonName}
                                  primaryTypographyProps={{
                                    fontWeight: 700,
                                  }}
                                  secondary={`by ${userInfo}`}
                                />
                              </MenuItem>
                              <Divider />
                              <MenuItem>
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
                              <MenuItem>
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
                              <MenuItem>
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
                      }}
                      title={item.LessonName}
                      position="bottom"
                    />
                  </ImageListItem>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListLessonsFromFolder;
