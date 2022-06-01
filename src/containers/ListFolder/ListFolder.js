import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
// import DriveFileMoveRoundedIcon from "@mui/icons-material/DriveFileMoveRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import {
  Breadcrumbs,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ITEM_HEIGHT } from "../../constants";
import allActions from "../../redux/ducks/actions";
import "./ListFolder.css";

function ListFolder() {
  const [viewType, setViewType] = useState(true);

  const { userInfo, courseName, listAllFolders } = useSelector(
    (state) => state.data
  ); //From Redux

  const dispatch = useDispatch(); //dispatch

  const history = useHistory();

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

  return (
    <div className="ListFolder">
      <div className="listFolderHeader">
        <Stack direction="row" spacing={1}>
          <SchoolRoundedIcon
            sx={{
              color: "#8d39fa",
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
            {courseName[0]} Folders
          </Typography>
        </Stack>
        <div className="gridViewFolder">
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
              to="/user/dashboard"
            >
              <Tooltip title="Home">
                <HomeRoundedIcon sx={{ mr: 0.5 }} fontSize="medium" />
              </Tooltip>
              <span className="BreadcrumbName">Home</span>
            </Link>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Folders">
                <FolderRoundedIcon sx={{ mr: 0.5 }} fontSize="medium" />
              </Tooltip>
              <span className="BreadcrumbName">Folders</span>
            </Typography>
          </Breadcrumbs>
          {viewType ? (
            <Tooltip title="Grid View">
              <GridViewRoundedIcon
                sx={{ ml: 3, cursor: "pointer" }}
                onClick={() => setViewType((state) => !state)}
              />
            </Tooltip>
          ) : (
            <Tooltip title="List View">
              <ViewListRoundedIcon
                sx={{ ml: 3, cursor: "pointer" }}
                onClick={() => setViewType((state) => !state)}
              />
            </Tooltip>
          )}
        </div>
      </div>
      <div className="contentFolder">
        <div className={viewType ? "gridStyle" : "listStyle"}>
          {listAllFolders &&
            listAllFolders.map((folders, index) => (
              <ListItemButton
                id={index}
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderRadius: "8px",
                  zIndex: 5,
                }}
                onClick={() => {
                  dispatch(
                    allActions.setFolderName(
                      folders.LessonName,
                      folders.LessonID
                    )
                  );
                  dispatch(
                    allActions.getLessonsFromFolder(
                      userInfo.LoginID,
                      folders.LessonID
                    )
                  );
                  // history.push(`lessons/${folders.LessonID}`);
                }}
              >
                <>
                  <ListItemAvatar
                    onClick={() => history.push(`lessons/${folders.LessonID}`)}
                  >
                    <Avatar
                      sx={{
                        borderRadius: "10%",
                        height: "56px",
                        width: "56px",
                        background: "#ffc107",
                      }}
                    >
                      <FolderOpenIcon
                        sx={{
                          color: "#fff3cd",
                        }}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ paddingLeft: "2%" }}
                    primary={folders.LessonName}
                    // secondary={`${folders.items.length} items`}
                    onClick={() => history.push(`lessons/${folders.LessonID}`)}
                  />
                </>
                <div style={{ zIndex: 1 }}>
                  <IconButton
                    aria-label="more"
                    id={index}
                    aria-controls="long-menu"
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
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
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "30ch",
                        boxShadow: undefined,
                      },
                    }}
                  >
                    <MenuItem key="1" onClick={handleMenuClose}>
                      <ListItemText
                        sx={{
                          paddingLeft: "2%",
                        }}
                        primary={folders.LessonName}
                        primaryTypographyProps={{
                          fontWeight: 700,
                        }}
                        secondary={`by ${userInfo.FName}`}
                      />
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>
                        <DriveFileRenameOutlineRoundedIcon
                          fontSize="small"
                          sx={{
                            color: "#2196f3",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText>Rename</ListItemText>
                    </MenuItem>
                    {/* <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>
                        <DriveFileMoveRoundedIcon
                          fontSize="small"
                          sx={{
                            color: "#ffc107",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText>Move</ListItemText>
                    </MenuItem> */}
                    {/* <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>
                        <ShareRoundedIcon
                          fontSize="small"
                          sx={{
                            color: "#00c853",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText>Share</ListItemText>
                    </MenuItem> */}
                    <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>
                        <DeleteRoundedIcon
                          fontSize="small"
                          sx={{
                            color: "#f44336",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText>Delete</ListItemText>
                    </MenuItem>
                  </Menu>
                </div>
              </ListItemButton>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ListFolder;
