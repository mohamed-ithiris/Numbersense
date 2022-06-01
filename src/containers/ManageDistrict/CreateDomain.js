import CreateIcon from "@mui/icons-material/Create";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Stack,
  TextField,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  COUNTRIES,
  COUNTRY_EMPTY,
  DESCRIPTION_EMPTY,
  DOMAIN_EMPTY,
  EMAIL_EMPTY,
  FIRST_NAME_EMPTY,
  LAST_NAME_EMPTY,
  LOCATION_EMPTY,
  PASSWORD_EMPTY,
  USER_NAME_EMPTY,
  EMAIL_INVALID,
  DOMAIN_NAME_EXIST,
  ROW_UPDATE_SUCCESS_MESSAGE,
  ROW_DELETE_SUCCESS_MESSAGE,
  ROW_CREATE_SUCCESS_MESSAGE,
} from "../../constants";
import Creators from "../../redux/ducks/actions";
import "./ManageDistrict.css";
import { useHistory } from "react-router-dom";

function CreateDomain(props) {
  const dispatch = useDispatch(); //dispatch
  const history = useHistory(); //history

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

  const [form, setForm] = useState({
    domainName: "",
    description: "",
    location: "",
    country: "",
    userName: "",
    emailId: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [emptyError, setEmptyError] = useState({
    domainName: false,
    description: false,
    location: false,
    country: false,
    userName: false,
    emailId: false,
    firstName: false,
    lastName: false,
    password: false,
  });
  const [countryData, setCountryData] = useState({
    code: "",
    label: "",
    phone: "",
  });

  const [emailValidation, setEmailValidation] = useState("");

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
    if (emailValidation !== "") {
      submit = false;
    }

    if (!submit) {
      setEmptyError(checkEmptyValue);
      setCreateLoading(false);
    } else {
      dispatch(
        Creators.putDomain(form, (response) => {
          console.log(response, "response");
          if (response.MessageID === 1) {
            // Domain Duplicate Error
            setCreateLoading(false);
            handleSnackbarClick("duplicateError");
            return null;
          } else if (response.MessageID === 0) {
            // Domain Success Message
            setCreateLoading(false);
            handleCancelButton();
            handleSnackbarClick("create");
            setTimeout(() => {
              history.push("/MMAdmin/manageDistrict");
            }, 1500);
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
      domainName: "",
      description: "",
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
      domainName: false,
      description: false,
      location: false,
      country: false,
      userName: false,
      emailId: false,
      firstName: false,
      lastName: false,
      password: false,
    }));
    setCountryData({
      code: "",
      label: "",
      phone: "",
    });
  };
  // handle Create Domain
  const handleOnChangeCreateDistrict = (e) => {
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

    if (e.target.id === "emailId" && e.target.value !== "") {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
        setEmailValidation("");
        setForm((state) => ({
          ...state,
          [e.target.id]: e.target.value,
        }));
      } else {
        setEmptyError((state) => ({
          ...state,
          [e.target.id]: true,
        }));

        setEmailValidation(EMAIL_INVALID);
        return null;
      }
    }
  };

  return (
    <>
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
              Create Domain
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
              to="/MAdmin/manageDistrict"
            >
              <Tooltip title="Manage Domain">
                <LocationOnIcon sx={{ mr: 0.5 }} fontSize="medium" />
              </Tooltip>
              <span className="BreadcrumbName">Manage Domain</span>
            </Link>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Create Domain">
                <CreateIcon sx={{ mr: 0.5 }} fontSize="medium" />
              </Tooltip>
              <span className="BreadcrumbName">Create Domain</span>
            </Typography>
          </Breadcrumbs>
        </div>
        <div className="createDomainParent">
          <div className="LessonBotContent">
            <div className="fieldParent">
              <div className="fieldChild">
                <TextField
                  variant="standard"
                  size="small"
                  id="domainName"
                  label="Domain Name"
                  type="text"
                  className="fieldStyle"
                  value={form.domainName}
                  onChange={handleOnChangeCreateDistrict}
                  error={emptyError.domainName}
                  helperText={emptyError.domainName ? DOMAIN_EMPTY : ""}
                />
              </div>
              <div className="fieldChild">
                <TextField
                  variant="standard"
                  size="small"
                  id="location"
                  label="Location"
                  type="text"
                  className="fieldStyle"
                  value={form.location}
                  onChange={handleOnChangeCreateDistrict}
                  error={emptyError.location}
                  helperText={emptyError.location ? LOCATION_EMPTY : ""}
                />
              </div>
              <div className="fieldChild">
                <Autocomplete
                  size="small"
                  id="country"
                  options={COUNTRIES}
                  value={countryData}
                  onChange={(_, y) => setCountryData(y)}
                  getOptionLabel={(option) => option.label}
                  onBlur={(e) => {
                    if (e.target.value !== "") {
                      const present = COUNTRIES.some(
                        (item) => item.label === e.target.value
                      );
                      if (present) {
                        setEmptyError((state) => ({
                          ...state,
                          country: false,
                        }));
                        setForm((state) => ({
                          ...state,
                          country: e.target.value,
                        }));
                      } else {
                        setForm((state) => ({
                          ...state,
                          country: "",
                        }));
                      }
                    } else {
                      setForm((state) => ({
                        ...state,
                        country: "",
                      }));
                    }
                  }}
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
                      variant="standard"
                      size="small"
                      {...params}
                      label="Choose a country"
                      value={form.country}
                      inputProps={{
                        ...params.inputProps,
                      }}
                      error={emptyError.country}
                      helperText={emptyError.country ? COUNTRY_EMPTY : ""}
                    />
                  )}
                />
              </div>
            </div>
            <div className="fieldParent">
              <div className="fieldChild">
                <TextField
                  variant="standard"
                  size="small"
                  id="description"
                  label="Description"
                  multiline
                  rows={3}
                  value={form.description}
                  sx={{ width: "100%" }}
                  onChange={handleOnChangeCreateDistrict}
                  error={emptyError.description}
                  helperText={emptyError.description ? DESCRIPTION_EMPTY : ""}
                />
              </div>
            </div>
            <div className="fieldParentSubHeading">
              <Typography
                variant="button"
                gutterBottom
                sx={{
                  "&.MuiTypography-button": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexGrow: 1,
                    fontWeight: 700,
                  },
                }}
              >
                Bot Admin Details
              </Typography>
            </div>
            <div className="fieldParent">
              <div className="fieldChild">
                <TextField
                  variant="standard"
                  size="small"
                  id="firstName"
                  label="First Name"
                  type="text"
                  className="fieldStyle"
                  value={form.firstName}
                  onChange={handleOnChangeCreateDistrict}
                  error={emptyError.firstName}
                  helperText={emptyError.firstName ? FIRST_NAME_EMPTY : ""}
                />
              </div>
              <div className="fieldChild">
                <TextField
                  variant="standard"
                  size="small"
                  id="lastName"
                  label="Last Name"
                  type="text"
                  className="fieldStyle"
                  value={form.lastName}
                  onChange={handleOnChangeCreateDistrict}
                  error={emptyError.lastName}
                  helperText={emptyError.lastName ? LAST_NAME_EMPTY : ""}
                />
              </div>
              <div className="fieldChild">
                <TextField
                  variant="standard"
                  size="small"
                  id="emailId"
                  label="Email"
                  type="email"
                  className="fieldStyle"
                  value={form.emailId}
                  onChange={handleOnChangeCreateDistrict}
                  error={emptyError.emailId}
                  helperText={
                    emptyError.emailId
                      ? emailValidation !== ""
                        ? EMAIL_INVALID
                        : EMAIL_EMPTY
                      : ""
                  }
                />
              </div>
            </div>
            <div className="fieldParent">
              <div className="fieldChild">
                <TextField
                  variant="standard"
                  size="small"
                  id="userName"
                  label="User Name"
                  type="text"
                  className="fieldStyle"
                  autoComplete="off"
                  value={form.userName}
                  onChange={handleOnChangeCreateDistrict}
                  error={emptyError.userName}
                  helperText={emptyError.userName ? USER_NAME_EMPTY : ""}
                />
              </div>
              <div className="fieldChild">
                <TextField
                  variant="standard"
                  inputProps={{
                    autoComplete: "new-password",
                  }}
                  size="small"
                  id="password"
                  label="Password"
                  type="password"
                  className="fieldStyle"
                  autoComplete="off"
                  value={form.password}
                  onChange={handleOnChangeCreateDistrict}
                  error={emptyError.password}
                  helperText={emptyError.password ? PASSWORD_EMPTY : ""}
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
export default CreateDomain;
