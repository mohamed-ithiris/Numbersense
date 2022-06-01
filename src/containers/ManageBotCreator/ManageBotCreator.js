import { makeStyles } from "@material-ui/core";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CreateIcon from "@mui/icons-material/Create";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../redux/ducks/actions";
import {
  COUNTRIES,
  ROW_UPDATE_SUCCESS_MESSAGE,
  ROW_DELETE_SUCCESS_MESSAGE,
} from "../../constants";
import BotCreatorTable from "./BotCreatorTable";
import "../ManageDistrict/ManageDistrict.css";
import { useHistory } from "react-router-dom";

function ManageBotCreator() {
  const { userInfo } = useSelector((state) => state.data); // from Redux
  const history = useHistory();
  const [form, setForm] = useState({
    districtName: "",
    location: "",
    country: "",
    userName: "",
    emailId: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [emptyError, setEmptyError] = useState({
    districtName: false,
    location: false,
    country: false,
    userName: false,
    emailId: false,
    firstName: false,
    lastName: false,
    password: false,
  });

  // create District Modal
  const [createDialog, setCreateDialog] = useState(false);
  const handleCreateDialogClose = () => setCreateDialog(false);

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
      setTimeout(() => {
        setCreateLoading(false);
      }, 5000);
    }
  };

  // update Distict Modal
  const [updateDialog, setUpdateDialog] = useState(false);
  const [rowData, setRowData] = useState({
    firstName: "",
    lastName: "",
    districtName: "",
  });
  const { firstName, lastName, districtName } = rowData;
  const handleUpdateDialogOpen = (row) => {
    setRowData((state) => ({
      ...state,
      firstName: row.FirstName,
      lastName: row.LastName,
      districtName: row.Name,
    }));
    setUpdateDialog(true);
  };

  const handleUpdateDialogClose = () => setUpdateDialog(false);

  // Update Button
  const [updateLoading, setUpdateLoading] = useState(false);
  const handleUpdateClick = () => {
    setUpdateLoading(true);
    // console.log("updated");
    setTimeout(() => {
      setUpdateLoading(false);
      handleUpdateDialogClose();
      handleSnackbarClick("update");
      setTimeout(() => {
        handleSnackbarClose();
      }, 4000);
    }, 2000);
  };

  // delete District Modal
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

  // cancel Button
  const handleCancelButton = () => {
    setCreateDialog(false);
    setForm((state) => ({
      ...state,
      districtName: "",
      location: "",
      country: "",
      userName: "",
      emailId: "",
      firstName: "",
      lastName: "",
      password: "",
    }));
    setEmptyError((state) => ({
      ...state,
      districtName: false,
      location: false,
      country: false,
      userName: false,
      emailId: false,
      firstName: false,
      lastName: false,
      password: false,
    }));
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
    dispatch(allActions.getBotCreatorList(userInfo.DomainID, userInfo.LoginID)); //passing subjectId and loginId
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Create Modal */}
      <Dialog
        fullWidth
        // fullScreen
        open={createDialog}
        onClose={handleCreateDialogClose}
        PaperProps={{
          style: {
            padding: "12px",
            // minWidth: screenWidth > 1100 ? "900px" : undefined,
          },
        }}
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <DialogTitle>
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
              Create Bot Creator
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="LessonBotBG">
              <div className="LessonBotContent">
                <div className="LessonBotField">
                  <div className="fieldParent">
                    <div className="fieldChild">
                      <TextField
                        size="small"
                        id="districtName"
                        label="District Name"
                        className="fieldStyle"
                        value={form.districtName}
                        onChange={(e) => {
                          if (e.target.value !== "") {
                            setEmptyError((state) => ({
                              ...state,
                              districtName: false,
                            }));
                          }
                          setForm((state) => ({
                            ...state,
                            districtName: e.target.value,
                          }));
                        }}
                        error={emptyError.districtName}
                        helperText={
                          emptyError.districtName
                            ? "District Name is required"
                            : ""
                        }
                      />
                    </div>
                    <div className="fieldChild">
                      <TextField
                        size="small"
                        id="location"
                        label="Location"
                        className="fieldStyle"
                        value={form.location}
                        onChange={(e) => {
                          if (e.target.value !== "") {
                            setEmptyError((state) => ({
                              ...state,
                              location: false,
                            }));
                          }
                          setForm((state) => ({
                            ...state,
                            location: e.target.value,
                          }));
                        }}
                        error={emptyError.location}
                        helperText={
                          emptyError.location ? "Location is required" : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="fieldParent">
                    <div className="fieldChild">
                      <Autocomplete
                        size="small"
                        id="country"
                        options={COUNTRIES}
                        getOptionLabel={(option) => option.label}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                          >
                            <img
                              loading="lazy"
                              width="20"
                              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                              alt=""
                            />
                            {option.label} ({option.code}) +{option.phone}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            {...params}
                            label="Choose a country"
                            inputProps={{
                              ...params.inputProps,
                              //   autoComplete: "new-password", // disable autocomplete and autofill
                            }}
                            value={form.country}
                            onBlur={(e) => {
                              if (e.target.value !== "") {
                                setEmptyError((state) => ({
                                  ...state,
                                  country: false,
                                }));
                              }
                              setForm((state) => ({
                                ...state,
                                country: e.target.value,
                              }));
                            }}
                            error={emptyError.country}
                            helperText={
                              emptyError.country ? "Country is required" : ""
                            }
                          />
                        )}
                      />
                    </div>
                    <div className="fieldChild" />
                  </div>
                  <div className="sub-heading">
                    <Typography
                      variant="button"
                      gutterBottom
                      component="div"
                      sx={{
                        "&.MuiTypography-button": {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                        },
                      }}
                    >
                      Bot Creator Details
                    </Typography>
                  </div>
                  <div className="fieldParent">
                    <div className="fieldChild">
                      <TextField
                        size="small"
                        id="firstName"
                        label="First Name"
                        className="fieldStyle"
                        value={form.firstName}
                        onChange={(e) => {
                          if (e.target.value !== "") {
                            setEmptyError((state) => ({
                              ...state,
                              firstName: false,
                            }));
                          }
                          setForm((state) => ({
                            ...state,
                            firstName: e.target.value,
                          }));
                        }}
                        error={emptyError.firstName}
                        helperText={
                          emptyError.firstName ? "First Name is required" : ""
                        }
                      />
                    </div>
                    <div className="fieldChild">
                      <TextField
                        size="small"
                        id="lastName"
                        label="Last Name"
                        className="fieldStyle"
                        value={form.lastName}
                        onChange={(e) => {
                          if (e.target.value !== "") {
                            setEmptyError((state) => ({
                              ...state,
                              lastName: false,
                            }));
                          }
                          setForm((state) => ({
                            ...state,
                            lastName: e.target.value,
                          }));
                        }}
                        error={emptyError.lastName}
                        helperText={
                          emptyError.lastName ? "Last Name is required" : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="fieldParent">
                    <div className="fieldChild">
                      <TextField
                        size="small"
                        id="email"
                        label="Email"
                        type="email"
                        className="fieldStyle"
                        value={form.emailId}
                        onChange={(e) => {
                          if (e.target.value !== "") {
                            setEmptyError((state) => ({
                              ...state,
                              emailId: false,
                            }));
                          }
                          setForm((state) => ({
                            ...state,
                            emailId: e.target.value,
                          }));
                        }}
                        error={emptyError.emailId}
                        helperText={
                          emptyError.emailId ? "Email is required" : ""
                        }
                      />
                    </div>
                    <div className="fieldChild">
                      <TextField
                        size="small"
                        id="userName"
                        label="User Name"
                        className="fieldStyle"
                        autoComplete="off"
                        value={form.userName}
                        onChange={(e) => {
                          if (e.target.value !== "") {
                            setEmptyError((state) => ({
                              ...state,
                              userName: false,
                            }));
                          }
                          setForm((state) => ({
                            ...state,
                            userName: e.target.value,
                          }));
                        }}
                        error={emptyError.userName}
                        helperText={
                          emptyError.userName ? "User Name is required" : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="fieldParent">
                    <div className="fieldChild">
                      <TextField
                        size="small"
                        id="password"
                        type="password"
                        label="Password"
                        className="fieldStyle"
                        autoComplete="off"
                        value={form.password}
                        onChange={(e) => {
                          if (e.target.value !== "") {
                            setEmptyError((state) => ({
                              ...state,
                              password: false,
                            }));
                          }
                          setForm((state) => ({
                            ...state,
                            password: e.target.value,
                          }));
                        }}
                        error={emptyError.password}
                        helperText={
                          emptyError.password ? "Password is required" : ""
                        }
                      />
                    </div>
                    <div className="fieldChild" />
                  </div>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleCancelButton}
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
        </DialogActions>
      </Dialog>
      {/* Update Modal */}
      <Dialog
        // fullScreen
        fullWidth
        open={updateDialog}
        onClose={handleUpdateDialogClose}
        PaperProps={{
          style: {
            padding: "1%",
          },
        }}
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <DialogTitle>
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
              Edit Bot Creator
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="LessonBotBG">
              <div className="LessonBotContent">
                <div className="LessonBotField">
                  <div className="fieldParent">
                    <div className="fieldChild">
                      <TextField
                        id="districtName"
                        label="District Name"
                        className="fieldStyle"
                        value={districtName}
                        // value={form.districtName}
                        // onChange={(e) => {
                        //   if (e.target.value !== "") {
                        //     setEmptyError((state) => ({
                        //       ...state,
                        //       districtName: false,
                        //     }));
                        //   }
                        //   setForm((state) => ({
                        //     ...state,
                        //     districtName: e.target.value,
                        //   }));
                        // }}
                        // error={emptyError.districtName}
                        // helperText={
                        //   emptyError.districtName
                        //     ? "District Name is required"
                        //     : ""
                        // }
                      />
                    </div>
                    <div className="fieldChild">
                      <TextField
                        id="firstName"
                        label="First Name"
                        className="fieldStyle"
                        value={firstName}
                        //   value={form.userName}
                        //   onChange={(e) => {
                        //     if (e.target.value !== "") {
                        //       setEmptyError((state) => ({
                        //         ...state,
                        //         userName: false,
                        //       }));
                        //     }
                        //     setForm((state) => ({
                        //       ...state,
                        //       userName: e.target.value,
                        //     }));
                        //   }}
                        //   error={emptyError.userName}
                        //   helperText={
                        //     emptyError.userName ? "User Name is required" : ""
                        //   }
                      />
                    </div>
                  </div>
                  <div className="fieldParent">
                    <div className="fieldChild">
                      <TextField
                        id="lastName"
                        label="Last Name"
                        className="fieldStyle"
                        value={lastName}
                        // value={form.emailId}
                        // onChange={(e) => {
                        //   if (e.target.value !== "") {
                        //     setEmptyError((state) => ({
                        //       ...state,
                        //       emailId: false,
                        //     }));
                        //   }
                        //   setForm((state) => ({
                        //     ...state,
                        //     emailId: e.target.value,
                        //   }));
                        // }}
                        // error={emptyError.emailId}
                        // helperText={
                        //   emptyError.emailId ? "Email is required" : ""
                        // }
                      />
                    </div>
                    <div className="fieldChild" />
                  </div>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={updateLoading}
            variant="contained"
            onClick={handleUpdateDialogClose}
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
            startIcon={<CreateIcon />}
          >
            Update
          </LoadingButton>
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
          <Alert
            variant="filled"
            severity="success"
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
              : ""}
          </Alert>
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
              Bot Creator Details
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
            onClick={() => history.push("/admin/manageBotCreator/create")}
          >
            New
          </Button>
        </div>
        <div className="tableParent">
          <BotCreatorTable
            handleUpdateDialogOpen={handleUpdateDialogOpen}
            handleDeleteModelOpen={handleDeleteModelOpen}
          />
        </div>
      </div>
    </>
  );
}
export default ManageBotCreator;
