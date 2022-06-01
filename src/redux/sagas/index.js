import { takeLatest, all } from "redux-saga/effects";
import { ActionTypes } from "../ducks/actions";
import {
  userLogin,
  userLogout,
  forgotPassword,
  getAllLessonList,
  putDomain,
  getAllDomainList,
  updateDomainList,
  putCourse,
  getAllCourseList,
  updateCourseList,
  putFolder,
  getFolderList,
  updateFolderList,
  putBotCreator,
  getBotCreatorList,
  updateBotCreatorList,
  getLessonsFromFolder,
  getActivatePod,
  putActivatePod,
  renameLessonPod,
  deleteCreatedLessonPod,
  deleteActivatedLessonPod,
  getActivatedBotForUpdate,
  updateActivateBot,
  copyLessonbot,
} from "./allSagaFunctions";

export default function* rootSaga() {
  yield all([
    takeLatest(ActionTypes.USER_LOGIN, userLogin),
    takeLatest(ActionTypes.USER_LOGOUT, userLogout),
    takeLatest(ActionTypes.FORGOT_PASSWORD, forgotPassword),
    // Lessonbot Starts
    // Domain
    takeLatest(ActionTypes.PUT_DOMAIN, putDomain),
    takeLatest(ActionTypes.GET_ALL_DOMAIN_LIST, getAllDomainList),
    takeLatest(ActionTypes.UPDATE_DOMAIN_LIST, updateDomainList),
    // Course or Subject
    takeLatest(ActionTypes.PUT_COURSE, putCourse),
    takeLatest(ActionTypes.GET_ALL_COURSE_LIST, getAllCourseList),
    takeLatest(ActionTypes.UPDATE_COURSE_LIST, updateCourseList),
    // Folder
    takeLatest(ActionTypes.PUT_FOLDER, putFolder),
    takeLatest(ActionTypes.GET_FOLDER_LIST, getFolderList),
    takeLatest(ActionTypes.UPDATE_FOLDER_LIST, updateFolderList),
    // Bot Creator
    takeLatest(ActionTypes.PUT_BOT_CREATOR, putBotCreator),
    takeLatest(ActionTypes.GET_BOT_CREATOR_LIST, getBotCreatorList),
    takeLatest(ActionTypes.UPDATE_BOT_CREATOR_LIST, updateBotCreatorList),
    // lesson list
    takeLatest(ActionTypes.GET_ALL_LESSON_LIST, getAllLessonList),
    // lessons from folder
    takeLatest(ActionTypes.GET_LESSONS_FROM_FOLDER, getLessonsFromFolder),
    // activate pod
    takeLatest(ActionTypes.GET_ACTIVATE_POD, getActivatePod),
    takeLatest(ActionTypes.PUT_ACTIVATE_POD, putActivatePod),
    takeLatest(ActionTypes.RENAME_LESSON_POD, renameLessonPod),
    takeLatest(ActionTypes.DELETE_CREATED_LESSON_POD, deleteCreatedLessonPod),
    takeLatest(
      ActionTypes.DELETE_ACTIVATED_LESSON_POD,
      deleteActivatedLessonPod
    ),
    takeLatest(
      ActionTypes.GET_ACTIVATED_BOT_FOR_UPDATE,
      getActivatedBotForUpdate
    ),
    takeLatest(ActionTypes.UPDATE_ACTIVATE_BOT, updateActivateBot),
    takeLatest(ActionTypes.COPY_LESSONBOT, copyLessonbot),
  ]);
}
