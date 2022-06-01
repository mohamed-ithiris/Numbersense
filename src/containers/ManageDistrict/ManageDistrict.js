import { makeStyles } from "@material-ui/core";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../redux/ducks/actions";
import { useHistory } from "react-router-dom";
import {
  DOMAIN_NAME_EXIST,
  ROW_CREATE_SUCCESS_MESSAGE,
  ROW_DELETE_SUCCESS_MESSAGE,
  ROW_UPDATE_SUCCESS_MESSAGE,
} from "../../constants";
import DistrictTable from "./DistrictTable";
import "./ManageDistrict.css";

function ManageDistrict() {
  const { userInfo } = useSelector((state) => state.data); // From ReduxF
  const history = useHistory(); //History

  // delete Domain Modal
  const useStyles = makeStyles(() => ({
    backDrop: {
      backdropFilter: "blur(4px)",
      backgroundColor: "rgba(30,41,51,.45)",
    },
  }));
  const classes = useStyles();
  const [deleteModel, setDeleteModel] = useState(false);
  const handleDeleteModelOpen = () => setDeleteModel(true);
  const handleDeleteModelClose = () => {
    setDeleteModel(false);
    handleSnackbarClick("delete");
    setTimeout(() => {
      handleSnackbarClose();
    }, 4000);
  };

  // colors
  const Btncolor = "#8d39fa";

  // Action Status
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allActions.getAllDomainList(userInfo.LoginID)); //passing loginId
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
        <DialogTitle>Are you sure you wish to delete this row ?</DialogTitle>
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
              {DOMAIN_NAME_EXIST}
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
            <SmartToyIcon
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
              Bot Admin Details
            </Typography>
          </Stack>
          <Button
            variant="contained"
            sx={{
              color: "#fff",
              background: Btncolor,
              borderColor: Btncolor,
              "&.MuiButton-root:hover": {
                color: "#fff",
                background: Btncolor,
                borderColor: Btncolor,
              },
            }}
            onClick={() => history.push("/MAdmin/manageDistrict/create")}
          >
            New
          </Button>
        </div>
        <div className="tableParent">
          <DistrictTable handleDeleteModelOpen={handleDeleteModelOpen} />
        </div>
      </div>
    </>
  );
}
export default ManageDistrict;
