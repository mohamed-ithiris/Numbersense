import {
  Dialog,
  DialogActions,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import AddCommentIcon from "@mui/icons-material/AddComment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CloseIcon from "@mui/icons-material/Close";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { MENU } from "../../constants";
import Images from "../../images";
import allActions from "../../redux/ducks/actions";
import ROUTES from "../../routes";
import Header from "../Header/Header";
import "./layout.css";
const useStyles = makeStyles(() => ({
  backDrop: {
    backdropFilter: "blur(4px)",
    backgroundColor: "rgba(30,41,51,.45)",
  },
}));

function UserScreen() {
  const history = useHistory(); //   HIstory
  const { url } = useRouteMatch(); //   Route
  const location = useLocation();
  const CurrentURL = location.pathname.split("/")[2];
  const state = useSelector((state) => state.data); // from redux state
  console.log(state);

  //   Menu's
  const MenuList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List sx={style} component="nav" aria-label="mailbox folders">
        <Box
          component="span"
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {drawer ? (
            <img style={{ width: "85%" }} alt="Logo" src={Images.knom_logo} />
          ) : null}
        </Box>

        {MENU.map((item, index) =>
          item.layout === url ? (
            <ListItem
              id={index}
              key={index}
              sx={{
                "&.MuiListItem-root": {
                  background:
                    item.menuURL === CurrentURL ? "#f9f4ff" : undefined,
                  borderRadius: "12px",
                  marginBottom: "6px",
                },
                "&.MuiListItem-root:hover": {
                  background: "#f9f4ff",
                },
              }}
              button
              onClick={() => history.push(item.layout + "/" + item.menuURL)}
            >
              <ListItemIcon>
                <Avatar
                  sx={{
                    background: "transparent",
                    color: item.menuURL === CurrentURL ? "#0e1318" : "#000000",
                  }}
                >
                  {item.menuName === "Recent Activity" ? (
                    <AddCommentIcon
                      sx={{
                        color:
                          item.menuURL === CurrentURL ? "#8d39fa" : "#0e1318",
                      }}
                    />
                  ) : item.menuName === "Home" ? (
                    <HomeOutlinedIcon
                      sx={{
                        color:
                          item.menuURL === CurrentURL ? "#8d39fa" : "#0e1318",
                      }}
                    />
                  ) : item.menuName === "Studio Bot" ? (
                    <VideoCameraFrontIcon
                      sx={{
                        color:
                          item.menuURL === CurrentURL ? "#8d39fa" : "#0e1318",
                      }}
                    />
                  ) : item.menuName === "Activated Bot" ? (
                    <AssignmentTurnedInIcon
                      sx={{
                        color:
                          item.menuURL === CurrentURL ? "#8d39fa" : "#0e1318",
                      }}
                    />
                  ) : null}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={item.menuName}
                disableTypography
                sx={{
                  color: item.menuURL === CurrentURL ? "#8d39fa" : "#0e1318",
                  fontWeight: item.menuURL === CurrentURL ? 700 : undefined,
                }}
              />
            </ListItem>
          ) : null
        )}
      </List>
    </Box>
  );

  // Delete Model
  const classes = useStyles();
  const [deleteModel, setDeleteModel] = useState(false);
  const handleDeleteModelOpen = () => setDeleteModel(true);
  const handleDeleteModelClose = () => setDeleteModel(false);

  const { userInfo, checkData } = useSelector((state) => state.data); // from redux state
  const dispatch = useDispatch(); // from dispatch state

  // Menu
  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  // Drawer
  const [drawer, setDrawer] = React.useState(false);
  const toggleDrawer = (drawer) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(drawer);
  };

  // route config
  const getUserRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/user") {
        return (
          <Route
            exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    dispatch(allActions.getAllCourseList(userInfo.DomainID)); //passing districtId or domainid
    dispatch(allActions.getAllLessonList(userInfo.LoginID)); //passing LoginId
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (sessionStorage.Role !== "BotCreator") {
      history.push("/error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid">
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
        <DialogTitle>
          Are you sure you wish to delete these lessons ?
        </DialogTitle>
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
            <span>Cancel</span>
          </Button>

          <Button
            variant="contained"
            onClick={handleDeleteModelClose}
            sx={{
              bgcolor: "#db1436",
              color: "#fff",
              "&.MuiButton-root:hover": {
                bgcolor: "#db1436",
              },
            }}
          >
            <span>Delete</span>
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer open={drawer} onClose={toggleDrawer(false)}>
        {MenuList()}
      </Drawer>

      <div className="main-parent">
        <div className="main-child">
          {/* Header */}
          <Header userName={userInfo.FName} toggleDrawer={toggleDrawer} />
          {/* Menu */}
          <div className="menu-parent">
            <div className="menu-child">{MenuList()}</div>
          </div>

          {/* Main Content */}
          <div className="main-child2">
            <div className="child-content">
              <Switch>
                {getUserRoutes(ROUTES)}
                <Redirect from="*" to="/user/dashboard" />
              </Switch>
            </div>

            {/* Footer */}
            {checkData.length !== 0 ? (
              <div className="selected-lesson">
                <div className="selected-lesson-child">
                  <div>({checkData.length}) selected</div>
                  <Button
                    variant="text"
                    onClick={() => {
                      handleDeleteModelOpen();
                    }}
                    sx={{
                      background: "#fff",
                      color: "#000",
                      minWidth: "0px",
                      cursor: "pointer",
                      "&.MuiButton-root:hover": {
                        bgcolor: "rgba(64,87,109,.07)",
                      },
                    }}
                  >
                    <Tooltip title="Delete">
                      <DeleteRoundedIcon
                        sx={{
                          color: "#f44336",
                        }}
                      />
                    </Tooltip>
                  </Button>

                  <Button
                    variant="text"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      dispatch(allActions.setCheckData([]));
                    }}
                    sx={{
                      background: "#ffe9e9",
                      color: "#f44336",
                      minWidth: "0px",
                      "&.MuiButton-root:hover": {
                        background: "#ffe9e9",
                        color: "#f44336",
                      },
                    }}
                  >
                    <Tooltip title="Close">
                      <CloseIcon />
                    </Tooltip>
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserScreen;
