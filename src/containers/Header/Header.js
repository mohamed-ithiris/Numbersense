import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Settings from "@mui/icons-material/Settings";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Images from "../../images";
import allActions from "../../redux/ducks/actions";
import "../Layout/layout.css";
import "./Header.css";

function Header(props) {
  const { userName, toggleDrawer } = props; //all props
  const dispatch = useDispatch(); // dispatch

  const history = useHistory(); // History

  // Avatar Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // color for settings
  const settingColor = "#8d39fa";

  return (
    <Fragment>
      <div className="main-child1">
        <div className="navbar">
          <div className="nav-flex">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <img className="logo_style" alt="Logo" src={Images.knom_logo} />
              <div style={{ display: "none" }} className="mobile-menu">
                <IconButton
                  style={{
                    cursor: "pointer",
                  }}
                  sx={{
                    background: "rgb(237, 231, 246)",
                    color: "rgb(94, 53, 177)",
                    "&.MuiIconButton-root:hover": {
                      background: "rgb(94, 53, 177)",
                      color: "#fff",
                    },
                  }}
                  aria-label="add an alarm"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon fontSize="medium" />
                </IconButton>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="nav-flex" style={{ justifyContent: "flex-end" }}>
                <div style={{ cursor: "pointer" }}>
                  <Avatar
                    aria-expanded={open ? "true" : undefined}
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    alt="Remy Sharp"
                    src={Images.man}
                    onClick={handleClick}
                  />
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 2,
                      sx: {
                        background: "#fff",
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          background: "#e3f2fd",
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "& .MuiAvatar-root:hover": {
                          background: "",
                          color: "",
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem>
                      <Avatar />
                      <ListItemText primary={userName} />
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Settings
                          className="setting"
                          sx={{
                            color: settingColor,
                          }}
                          fontSize="small"
                        />
                      </ListItemIcon>
                      <ListItemText primary="Settings" />
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        dispatch(
                          allActions.userLogout(() => {
                            sessionStorage.Username = "";
                            sessionStorage.Password = "";
                            sessionStorage.Userdomain = "";
                            history.push("/");
                          })
                        );
                      }}
                    >
                      <ListItemIcon>
                        <Logout
                          sx={{
                            color: settingColor,
                          }}
                          fontSize="small"
                        />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Header;
