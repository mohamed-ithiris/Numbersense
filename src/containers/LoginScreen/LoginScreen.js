import { Alert, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  INCORRECT_CREDENTIALS,
  RESET_PWD_DONE,
  FORGOT_INCORRECT_CREDENTIALS,
  FIELD_EMPTY,
} from "../../constants";
import Images from "../../images";
import allActions from "../../redux/ducks/actions";
import "./LoginScreen.css";

function LoginScreen(props) {
  const history = useHistory();

  const { userLogin, forgotPassword } = props; //from dispatch

  // Login Info
  const [login, setLogin] = useState({
    userName: "",
    password: "",
    userDomain: "",
  });

  // remember me
  const [isRememberPwd, setisRememberPwd] = useState(false);
  // data not filled msg
  const [showEmptyAlert, setshowEmptyAlert] = useState(false);
  // Incorrect credential msg
  const [showAlert, setshowAlert] = useState(false);
  // forgot password msg
  const [showForgetAlert, setShowForgetAlert] = useState(false);
  // password send to mail msg
  const [showForgotPwdAlert, setshowForgotPwdAlert] = useState(false);
  // Loader
  const [loaderStatus, setLoaderStatus] = useState(false);

  // Prevent navigating back
  useEffect(() => {
    const onBackButtonEvent = (event) => {
      event.preventDefault();
      history.push("/");
    };
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, [history]);

  useEffect(() => {
    if (
      localStorage.IsRememberPwd === "true" ||
      localStorage.IsRememberPwd === true
    ) {
      setLogin({
        userName: localStorage.Username,
        password: localStorage.Password,
        userDomain: localStorage.Userdomain,
      });
      setisRememberPwd(localStorage.IsRememberPwd);
    }
    if (
      sessionStorage.Username !== "" &&
      sessionStorage.Password !== "" &&
      sessionStorage.Userdomain !== ""
    ) {
      userLogin(
        sessionStorage.Username,
        sessionStorage.Password,
        sessionStorage.Userdomain,
        (userData) => {
          console.log(userData, "userData");
          setLoaderStatus(false);
          if (userData.Role === "LBAdmin") {
            history.push("MAdmin");
          } else if (userData.Role === "BotAdmin") {
            history.push("admin");
          } else if (userData.Role === "BotCreator") {
            history.push("user");
          } else {
            history.push("login");
          }
        },
        (response) => {
          console.error(response);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setshowAlert(false);
    setshowEmptyAlert(false);
  };

  const handleLoginClick = (e) => {
    setLoaderStatus(true);
    e.preventDefault();
    if (login.userName !== "" && login.userDomain !== "") {
      userLogin(
        login.userName,
        login.password,
        login.userDomain,
        (userData) => {
          if (isRememberPwd) {
            localStorage.Username = login.userName;
            localStorage.Password = login.password;
            localStorage.Userdomain = login.userDomain;
          } else {
            localStorage.Username = "";
            localStorage.Password = "";
            localStorage.Userdomain = "";
          }
          localStorage.IsRememberPwd = isRememberPwd;
          sessionStorage.Username = login.userName;
          sessionStorage.Password = login.password;
          sessionStorage.Userdomain = login.userDomain;
          sessionStorage.Role = userData.Role;
          console.log(userData, "userData");
          setLoaderStatus(false);
          if (userData.Role === "LBAdmin") {
            history.push("MAdmin");
          } else if (userData.Role === "BotAdmin") {
            history.push("admin");
          } else if (userData.Role === "BotCreator") {
            history.push("user");
          } else {
            history.push("login");
          }
        },
        () => {
          setLoaderStatus(false);
          setshowAlert(true);
        }
      );
    } else {
      setLoaderStatus(false);
      setshowEmptyAlert(true);
    }
  };

  const forgotPwd = () => {
    if (login.userName !== "" && login.userDomain !== "") {
      forgotPassword(login.userName, login.userDomain, (response) => {
        if (response.data.SendBackpackForgotPasswordResult.MessageID === 0) {
          setshowForgotPwdAlert(true);
          setshowAlert(false);
          setShowForgetAlert(false);
          setshowEmptyAlert(false);
          setTimeout(() => {
            setshowForgotPwdAlert(false);
          }, 5000);
        } else {
          setshowForgotPwdAlert(false);
          setshowAlert(false);
          setShowForgetAlert(true);
          setTimeout(() => {
            setShowForgetAlert(false);
          }, 5000);
        }
      });
    } else {
      setshowAlert(false);
      setshowForgotPwdAlert(false);
      setShowForgetAlert(true);
      setTimeout(() => {
        setShowForgetAlert(false);
      }, 5000);
    }
  };

  return (
    <div style={{ height: "100%" }} key="LoginScreen">
      {loaderStatus ? (
        <div className="skeleton-parent">
          <div className="skeleton-child">
            <div className="skeleton-head">
              <Skeleton variant="h1" width="100%" height={100} />
            </div>
            <div className="skeleton-body">
              <div className="skeleton-menu">
                {[...Array(5)].map((data, idx) => (
                  <Skeleton
                    key={idx.toString()}
                    variant="h1"
                    width="100%"
                    height={60}
                    style={{
                      borderRadius: "12px",
                      marginTop: "12px",
                    }}
                  />
                ))}
              </div>
              <div className="skeleton-content">
                <Skeleton
                  style={{ margin: "2%", borderRadius: "12px" }}
                  variant="h1"
                  width="100%"
                  height={40}
                />
                {[...Array(12)].map((_, idx) => {
                  return (
                    <div style={{ margin: "2%" }} key={idx.toString()}>
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={160}
                        height={160}
                        style={{
                          borderRadius: "12px",
                        }}
                      />
                      <Skeleton animation="wave" width={100} />
                      <Skeleton animation="wave" width={120} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-md-flex h-md-100 align-items-center">
          <div className="col-lg-6 p-0 d-lg-block d-none h-100">
            <div className="d-md-flex align-items-center h-100 justify-content-center">
              <img
                src={Images.login_side}
                alt="logo"
                style={{ height: "100%", width: "100%", overflow: "hidden" }}
              />
            </div>
          </div>

          <div className="col-lg-6 col-sm-12 p-0 bg-white h-md-100 loginarea">
            <div className="d-md-flex align-items-center h-md-100 p-4 justify-content-center">
              <div className="col-lg-12" style={{ height: "100%", margin: 0 }}>
                <div style={{ padding: "5px 0" }}>
                  <img
                    src={Images.chat_icon}
                    className="login_logo"
                    alt="logo"
                    style={{
                      width: "23%",
                    }}
                  />
                </div>
                <div className="text-center p-2">
                  <h3 className="Lesson-bot">Lessonbot</h3>
                  <strong className="login-font">Log In</strong>
                  {(showAlert || showForgetAlert || showEmptyAlert) && (
                    <Alert severity="error" variant="filled">
                      {showAlert
                        ? INCORRECT_CREDENTIALS
                        : showForgetAlert
                        ? FORGOT_INCORRECT_CREDENTIALS
                        : FIELD_EMPTY}
                    </Alert>
                  )}
                  {showForgotPwdAlert && (
                    <Alert variant="filled" severity="success">
                      {RESET_PWD_DONE}
                    </Alert>
                  )}
                </div>
                <div className="p-1">
                  <form style={{ height: "54%" }}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control email_id_login"
                        id="userName"
                        aria-describedby="emailHelp"
                        placeholder="User ID"
                        value={login.userName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control email_id_login"
                        id="password"
                        placeholder="Password"
                        value={login.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control email_id_login"
                        id="userDomain"
                        placeholder="Domain"
                        value={login.userDomain}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary submit_btn"
                      onClick={handleLoginClick}
                    >
                      Login
                    </button>
                    <div className="p-3" style={{ padding: "0 15%" }}>
                      <div className="row rember_forget">
                        <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                          <div className="form-group form-check text-center">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="remembrMe"
                              checked={
                                isRememberPwd === true ||
                                isRememberPwd === "true"
                                  ? true
                                  : false
                              }
                              onChange={(e) => {
                                setisRememberPwd((state) => !state);
                              }}
                            />
                            <label
                              className="form-check-label rem_forget"
                              htmlFor="remembrMe"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                          <div className="text-center">
                            <span
                              className="rem_forget forgetHover"
                              href="null"
                              onClick={() => forgotPwd()}
                            >
                              Forgot Password ?
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="text-center p-3">
                  <p className="rem_forget1">
                    By tapping on the button above you agree to the{" "}
                    <a
                      rel="noopener noreferrer"
                      href={"https://www.knomadix.com/tos-privacy/"}
                      target="_blank"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      rel="noopener noreferrer"
                      href={"https://www.knomadix.com/tos-privacy/"}
                      target="_blank"
                    >
                      Privacy Policy
                    </a>{" "}
                    of Knomadix
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.data.userInfo,
  logInOutMessage: state.data.logInOutMessage,
});

const mapDispatchToProps = (dispatch) => ({
  userLogin: (username, password, domain, successFn, failureFn) =>
    dispatch(
      allActions.userLogin(username, password, domain, successFn, failureFn)
    ),
  forgotPassword: (LoginName, DomainName, successFn) =>
    dispatch(allActions.forgotPassword(LoginName, DomainName, successFn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
