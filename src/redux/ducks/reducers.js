import { createReducer } from "reduxsauce";
import { ActionTypes } from "./actions";
import { INITIAL_STATE } from "./initialState";
import { LOGIN_SUCCESS_MESSAGE } from "../../constants";

export const setCheckData = (state, { checkData }) => ({
  ...state,
  checkData,
});

export const setDomainList = (state, { domainList }) => ({
  ...state,
  listAllDomain: domainList,
});

export const userLoginSuccessMessage = (state, { successMessage }) => ({
  ...state,
  userInfo: successMessage,
  logInOutMessage: LOGIN_SUCCESS_MESSAGE,
});

export const userLoginFailureMessage = (state, { errorMessage }) => ({
  ...state,
  userInfo: {},
  logInOutMessage: errorMessage,
});

export const setLogoutStatus = (state, { logoutstatus }) => ({
  ...state,
  userInfo: {},
  logInOutMessage: logoutstatus,
});

export const setCourseList = (state, { courseList }) => ({
  ...state,
  listAllCourses: courseList,
});

export const setFolderList = (state, { folderList }) => ({
  ...state,
  listAllFolders: folderList,
});

export const setBotCreatorList = (state, { botCreatorList }) => ({
  ...state,
  listAllBotCreator: botCreatorList,
});

export const setLessonList = (state, { lessonList }) => ({
  ...state,
  listAllLessons: lessonList,
});

export const setLessonsFromFolder = (state, { lessonFromFolder }) => ({
  ...state,
  listLessonsFromFolder: lessonFromFolder,
});

export const setCourseName = (state, { courseName, courseId }) => ({
  ...state,
  courseName: [courseName, courseId],
});

export const setFolderName = (state, { folderName, folderId }) => ({
  ...state,
  folderName: [folderName, folderId],
});

export const setActivateData = (state, { activateData }) => ({
  ...state,
  activatePod: activateData,
});

export const reducer = createReducer(INITIAL_STATE, {
  [ActionTypes.USER_LOGIN_SUCCESS_MESSAGE]: userLoginSuccessMessage,
  [ActionTypes.USER_LOGIN_FAILURE_MESSAGE]: userLoginFailureMessage,
  [ActionTypes.SET_COURSE_LIST]: setCourseList,
  [ActionTypes.SET_LOGOUT_STATUS]: setLogoutStatus,
  [ActionTypes.SET_COURSE_NAME]: setCourseName,
  [ActionTypes.SET_FOLDER_NAME]: setFolderName,
  [ActionTypes.SET_CHECK_DATA]: setCheckData,
  [ActionTypes.SET_DOMAIN_LIST]: setDomainList,
  [ActionTypes.SET_FOLDER_LIST]: setFolderList,
  [ActionTypes.SET_BOT_CREATOR_LIST]: setBotCreatorList,
  [ActionTypes.SET_LESSON_LIST]: setLessonList,
  [ActionTypes.SET_LESSONS_FROM_FOLDER]: setLessonsFromFolder,
  [ActionTypes.SET_ACTIVATE_DATA]: setActivateData,
});
