import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Breadcrumbs,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  LESSON_UNIT_DESCRIPTION_EMPTY,
  LESSON_UNIT_NAME_EMPTY,
  ROW_ACTIVE_SUCCESS_MESSAGE,
} from "../../constants";
import Images from "../../images";
import allAction from "../../redux/ducks/actions";
function ActivateBot() {
  const dispatch = useDispatch(); // dispatch
  const history = useHistory(); // history
  const { userInfo, listAllLessons } = useSelector((state) => state.data);
  const param = useParams();

  const [form, setForm] = useState({
    domainId: "",
    lessonUnitId: "",
    courseId: "",
    loginId: "",
    lessonUnitName: "",
    lessonUnitDescription: "",
  });
  const [slides, setSlide] = useState([]);
  const [emptyError, setEmptyError] = useState({
    lessonUnitName: false,
    lessonUnitDescription: false,
  });

  const { lessonUnitName, lessonUnitDescription } = form;

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
      const tempSlide = [...slides];
      const filteredData = tempSlide.filter((item) => {
        if (item.FollowTheFlow) {
          item.FollowTheFlow = 1;
        } else {
          item.FollowTheFlow = 0;
        }
        if (item.AutoHint) {
          item.AutoHint = 1;
        } else {
          item.AutoHint = 0;
        }
        delete item["slideName"];
        delete item["SlideType"];
        delete item["Images"];
        return item;
      });
      dispatch(
        allAction.putActivatePod(form, filteredData, (response) => {
          if (response.MessageID === 0) {
            // Activate Success Message
            setCreateLoading(false);
            handleSnackbarClick("active");
            setTimeout(() => {
              history.push("/user/dashboard");
            }, 1500);
          } else {
            //  Error
            console.error(response, "response");
            setCreateLoading(false);
            return null;
          }
        })
      );
    }
  };

  // handle on change
  const handleOnChangeActivateBot = (e) => {
    if (e.target.value !== "") {
      setEmptyError((state) => ({
        ...state,
        [e.target.name]: false,
      }));
    }
    setForm((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleonChangeSlides = (e, updateIndex) => {
    let Data = [...slides];
    if (e.target.name === "ActivityType") {
      Data[updateIndex].ActivityType = e.target.value;
      if (
        Data[updateIndex].SlideType === "Smart Tile" ||
        Data[updateIndex].SlideType === "Smart Slide"
      ) {
        Data[updateIndex].ContentMode = "";
      } else if (
        e.target.value === "Practice" ||
        e.target.value === "practice"
      ) {
        Data[updateIndex].ContentMode = "All";
      } else {
        Data[updateIndex].ContentMode = "Type";
      }
    } else if (e.target.name === "ContentMode") {
      Data[updateIndex].ContentMode = e.target.value;
    } else if (e.target.name === "FollowTheFlow") {
      Data[updateIndex].FollowTheFlow = e.target.checked;
    } else if (e.target.name === "AutoHint") {
      Data[updateIndex].AutoHint = e.target.checked;
    }
    setSlide(Data);
  };

  useEffect(() => {
    dispatch(
      allAction.getActivatePod(param.id, (response) => {
        let currentData = listAllLessons.LessonUnits.filter(
          (item) => item.LessonUnitID === response.LessonUnitID
        );
        setForm((state) => ({
          ...state,
          domainId: userInfo.DomainID,
          lessonUnitId: currentData[0].LessonUnitID,
          courseId: currentData[0].SubjectID,
          loginId: currentData[0].AuthorID,
          lessonUnitName: currentData[0].LessonName,
          lessonUnitDescription: currentData[0].LessonDesc,
          lessonPodType: "My Lesson",
        }));

        const SLIDES = response.Slides;
        let totalSlide = [];
        for (let i = 0; i < SLIDES.length; i++) {
          const slideData = {
            SlideID: SLIDES[i].SlideID,
            ParentSlideID: SLIDES[i].ParentSlideID,
            ActivityType: "practice",
            ContentMode:
              SLIDES[i].SlideType === "Smart Tile" ||
              SLIDES[i].SlideType === "Smart Slide"
                ? ""
                : "All",
            NoOfItems: 0,
            Optional: false,
            Attempts: 0,
            MasteryPercentage: 0,
            Randomize: 0,
            FollowTheFlow:
              SLIDES[i].SlideType === "Smart Tile" ||
              SLIDES[i].SlideType === "Smart Slide"
                ? false
                : false,
            AutoHint:
              SLIDES[i].SlideType === "Smart Tile" ||
              SLIDES[i].SlideType === "Smart Slide"
                ? false
                : true,
            ContentID: SLIDES[i].ContentID,
            slideName: SLIDES[i].SlideName,
            SlideType: SLIDES[i].SlideType,
            Images:
              SLIDES[i].SlideType === "Smart Tile"
                ? Images.smart_tile
                : SLIDES[i].SlideType === "Smart Label"
                ? Images.smart_label
                : SLIDES[i].SlideType === "Smart Paper"
                ? Images.smart_paper
                : Images.smart_slide,
          };
          totalSlide.push(slideData);
        }
        setSlide(totalSlide);
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {snackMessageFor === "active" ? ROW_ACTIVE_SUCCESS_MESSAGE : ""}
          </Alert>
        </Snackbar>
      </Stack>
      <div className="LessonBotAdmin">
        <div className="listFolderHeader">
          <Stack direction="row" spacing={1}>
            <AssignmentTurnedInIcon
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
              Activate Bot
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
                <Tooltip title="Activate Bot">
                  <AssignmentTurnedInIcon sx={{ mr: 0.5 }} fontSize="medium" />
                </Tooltip>
                <span className="BreadcrumbName">Activate Bot</span>
              </Typography>
            </Breadcrumbs>
          </div>
        </div>
        <div className="contentActivatePod">
          <div className="LessonBotContent">
            <div className="activateFieldParent">
              <div className="activateFieldChild">
                <TextField
                  variant="standard"
                  size="small"
                  name="lessonUnitName"
                  label="Lesson Unit Name"
                  type="text"
                  className="fieldStyle"
                  value={lessonUnitName}
                  onChange={handleOnChangeActivateBot}
                  error={emptyError.lessonUnitName}
                  helperText={
                    emptyError.lessonUnitName ? LESSON_UNIT_NAME_EMPTY : ""
                  }
                />
              </div>
              <div className="activateFieldChild">
                <TextField
                  variant="standard"
                  size="small"
                  name="lessonUnitDescription"
                  label="Lesson Unit Description"
                  multiline
                  rows={3}
                  sx={{ width: "100%" }}
                  value={lessonUnitDescription}
                  onChange={handleOnChangeActivateBot}
                  error={emptyError.lessonUnitDescription}
                  helperText={
                    emptyError.lessonUnitDescription
                      ? LESSON_UNIT_DESCRIPTION_EMPTY
                      : ""
                  }
                />
              </div>
            </div>
            {slides &&
              slides.length !== 0 &&
              slides.map((item, index) => (
                <div className="activateMain" key={index}>
                  <div className="imageParent">
                    <img src={item.Images} alt="img" className="imageType" />
                    <Typography
                      variant="button"
                      gutterBottom
                      sx={{
                        "&.MuiTypography-button": {
                          paddingLeft: "1%",
                          fontWeight: 600,
                          fontSize: "18px",
                          textTransform: "capitalize",
                          letterSpacing: "0.05rem",
                        },
                      }}
                    >
                      {item.SlideType}
                    </Typography>
                  </div>
                  <div className="activateRowParent">
                    <div className="activateRowChildType">
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="activate-type">Type</InputLabel>
                        <Select
                          labelId="activate-type"
                          name="ActivityType"
                          value={slides[index].ActivityType}
                          onChange={(e) => {
                            handleonChangeSlides(e, index);
                          }}
                        >
                          <MenuItem value="practice">Practice</MenuItem>
                          <MenuItem value="test">Test</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    {item.SlideType === "Smart Paper" ||
                    item.SlideType === "Smart Label" ? (
                      <>
                        <div className="activateRowChildSequence">
                          <FormControlLabel
                            checked={slides[index].FollowTheFlow}
                            name="FollowTheFlow"
                            control={<Checkbox />}
                            label="Sequence"
                            labelPlacement="top"
                            onChange={(e) => {
                              handleonChangeSlides(e, index);
                            }}
                          />
                        </div>
                        {slides[index].FollowTheFlow ? (
                          <div className="activateRowChildAutoHint">
                            <FormControlLabel
                              checked={slides[index].AutoHint}
                              name="AutoHint"
                              control={<Checkbox />}
                              label="Auto Hint"
                              labelPlacement="top"
                              onChange={(e) => {
                                handleonChangeSlides(e, index);
                              }}
                            />
                          </div>
                        ) : null}
                      </>
                    ) : null}
                    {item.SlideType === "Smart Label" ? (
                      slides[index].ActivityType === "Practice" ||
                      slides[index].ActivityType === "practice" ? (
                        <div className="activateRowChildMode">
                          <FormControl variant="standard" fullWidth>
                            <InputLabel id="practiceMode">Mode</InputLabel>
                            <Select
                              labelId="practiceMode"
                              name="ContentMode"
                              value={
                                slides.length !== 0 && slides[index].ContentMode
                              }
                              onChange={(e) => {
                                handleonChangeSlides(e, index);
                              }}
                            >
                              <MenuItem value="All">All</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      ) : (
                        <div className="activateRowChildMode">
                          <FormControl variant="standard" fullWidth>
                            <InputLabel id="testMode">Mode</InputLabel>
                            <Select
                              labelId="testMode"
                              name="ContentMode"
                              value={
                                slides.length !== 0 && slides[index].ContentMode
                              }
                              onChange={(e) => {
                                handleonChangeSlides(e, index);
                              }}
                            >
                              <MenuItem value="Type">Type</MenuItem>
                              <MenuItem value="Shuffle">Shuffle</MenuItem>
                              <MenuItem value="Select">Select</MenuItem>
                              <MenuItem value="Match">Match</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      )
                    ) : null}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="activateButtonSection">
          <div className="activateCreateButtonParent">
            <div className="activateCreateButtonChild">
              <LoadingButton
                variant="contained"
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
                startIcon={<CheckCircleIcon />}
              >
                Activate
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ActivateBot;