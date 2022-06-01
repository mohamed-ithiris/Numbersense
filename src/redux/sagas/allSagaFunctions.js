import { call, put } from "redux-saga/effects";
import {
  ERROR_HAPPENED,
  LOGIN_FAILED_MESSAGE,
  LOGOUT_SUCCESS_MESSAGE,
} from "../../constants";
import Creators from "../ducks/actions";
import { AllService } from "../services";

// Forget password Data
export function* forgotPassword(data) {
  const { LoginName, DomainName, successFn } = data;
  const forgotPasswordResponse = yield call(
    AllService.forgotPassword,
    LoginName,
    DomainName
  );
  if (forgotPasswordResponse === "TIMEOUT_ERROR") {
    alert(ERROR_HAPPENED);
  } else {
    if (forgotPasswordResponse) {
      console.log(forgotPasswordResponse);
      yield call(successFn, forgotPasswordResponse);
    } else {
      console.log("forgot Password failure");
    }
  }
}

// LessonBot Starts

// Login Data
export function* userLogin(data) {
  const { username, password, domainname, successFunc, failureFunc } = data;
  const userData = yield call(
    AllService.userLogin,
    username,
    password,
    domainname
  );
  if (userData === "TIMEOUT_ERROR") {
    alert("error occurred");
  } else {
    if (userData && userData.Role) {
      yield put(Creators.userLoginSuccessMessage(userData));
      yield call(successFunc, userData);
    } else {
      yield put(Creators.userLoginFailureMessage(LOGIN_FAILED_MESSAGE));
      yield call(failureFunc);
    }
  }
}

// logout user
export function* userLogout(data) {
  const { successFn } = data;
  yield put(Creators.setLogoutStatus(LOGOUT_SUCCESS_MESSAGE));
  yield call(successFn);
}

//  Domain
export function* putDomain(data) {
  const { domainData, successFn } = data;
  const serviceResponse = yield call(
    AllService.putDomain,
    domainData.country,
    domainData.domainName,
    domainData.description,
    domainData.emailId,
    domainData.firstName,
    domainData.lastName,
    domainData.location,
    domainData.password,
    domainData.userName
  );
  yield call(successFn, serviceResponse);
}

export function* getAllDomainList(data) {
  const { loginId } = data;
  const allDomainList = yield call(AllService.getAllDomainList, loginId);
  yield put(Creators.setDomainList(allDomainList));
}

export function* updateDomainList(data) {
  const { updateDomainData, successFunc } = data;
  const serviceResponse = yield call(
    AllService.updateDomainList,
    updateDomainData.domainId,
    updateDomainData.country,
    updateDomainData.domainName,
    updateDomainData.description,
    updateDomainData.location,
    updateDomainData.userName,
    updateDomainData.emailId,
    updateDomainData.firstName,
    updateDomainData.lastName,
    updateDomainData.password
  );
  yield call(successFunc, serviceResponse);
}

//  Course
export function* putCourse(data) {
  const { createCourseData, successFunc } = data;
  const serviceResponse = yield call(
    AllService.putCourse,
    createCourseData.districtId,
    createCourseData.courseName,
    createCourseData.courseDescription,
    createCourseData.activityBy,
    createCourseData.image
  );
  yield call(successFunc, serviceResponse);
}

export function* getAllCourseList(data) {
  const { districtId } = data;
  const courseList = yield call(AllService.getAllCourseList, districtId);
  if (courseList === "TIMEOUT_ERROR") {
    alert(ERROR_HAPPENED);
  } else {
    if (courseList) {
      yield put(Creators.setCourseList(courseList));
    } else {
      console.log("getCourseListForStudent failure");
    }
  }
}

export function* updateCourseList(data) {
  const { updateCourseData, successFunc } = data;
  const serviceResponse = yield call(
    AllService.updateCourseList,
    updateCourseData.subjectId,
    updateCourseData.gradeId,
    updateCourseData.activityId,
    updateCourseData.courseName,
    updateCourseData.courseDescription,
    updateCourseData.image
  );
  yield call(successFunc, serviceResponse);
}

//  Folder
export function* putFolder(data) {
  const { createFolderData, successFunc } = data;
  const serviceResponse = yield call(
    AllService.putFolder,
    createFolderData.subjectId,
    createFolderData.folderName,
    createFolderData.folderDescription,
    createFolderData.activityBy
  );
  yield call(successFunc, serviceResponse);
}

export function* getFolderList(data) {
  const { subjectId, loginId } = data;
  const folderList = yield call(AllService.getFolderList, subjectId, loginId);
  if (folderList === "TIMEOUT_ERROR") {
    alert(ERROR_HAPPENED);
  } else {
    if (folderList) {
      yield put(Creators.setFolderList(folderList));
    } else {
      console.log("getFolderList failure");
    }
  }
}

export function* updateFolderList(data) {
  const { updateFolderData, successFunc } = data;
  const serviceResponse = yield call(
    AllService.updateFolderList,
    updateFolderData.lessonId,
    updateFolderData.subjectId,
    updateFolderData.folderName,
    updateFolderData.folderDescription,
    updateFolderData.activityBy
  );
  yield call(successFunc, serviceResponse);
}

// Bot Creator
export function* putBotCreator(data) {
  const { createBotCreatorData, successFunc } = data;
  const serviceResponse = yield call(
    AllService.putBotCreator,
    createBotCreatorData.domainId,
    createBotCreatorData.country,
    createBotCreatorData.location,
    createBotCreatorData.userName,
    createBotCreatorData.emailId,
    createBotCreatorData.firstName,
    createBotCreatorData.lastName,
    createBotCreatorData.password
  );
  yield call(successFunc, serviceResponse);
}

export function* getBotCreatorList(data) {
  const { districtId, loginId } = data;
  const userList = yield call(
    AllService.getBotCreatorList,
    districtId,
    loginId
  );
  if (userList === "TIMEOUT_ERROR") {
    alert(ERROR_HAPPENED);
  } else {
    if (userList) {
      yield put(Creators.setBotCreatorList(userList));
    } else {
      console.log("getBotCreatorList failure");
    }
  }
}

export function* updateBotCreatorList(data) {
  const { updateBotCreatorData, successFunc } = data;
  const serviceResponse = yield call(
    AllService.updateBotCreatorList,
    updateBotCreatorData.domainId,
    updateBotCreatorData.userId,
    updateBotCreatorData.country,
    updateBotCreatorData.location,
    updateBotCreatorData.userName,
    updateBotCreatorData.emailId,
    updateBotCreatorData.firstName,
    updateBotCreatorData.lastName,
    updateBotCreatorData.password
  );
  yield call(successFunc, serviceResponse);
}

// All lesson list
export function* getAllLessonList(data) {
  const { loginId } = data;
  const lessonList = yield call(AllService.getAllLessonList, loginId);
  if (lessonList === "TIMEOUT_ERROR") {
    alert(ERROR_HAPPENED);
  } else {
    if (lessonList) {
      yield put(Creators.setLessonList(lessonList));
    }
  }
}

// Lessons form Folder
export function* getLessonsFromFolder(data) {
  const { loginId, folderId } = data;
  const lessonFromFolder = yield call(
    AllService.getLessonsFromFolder,
    loginId,
    folderId
  );
  if (lessonFromFolder === "TIMEOUT_ERROR") {
    alert(ERROR_HAPPENED);
  } else {
    if (lessonFromFolder) {
      yield put(Creators.setLessonsFromFolder(lessonFromFolder));
    }
  }
}

// activate Data

export function* getActivatePod(data) {
  const { lessonUnitId, successFunc } = data;
  const activatePod = yield call(AllService.getActivatePod, lessonUnitId);
  if (activatePod === "TIMEOUT_ERROR") {
    alert(ERROR_HAPPENED);
  } else {
    if (activatePod) {
      yield put(Creators.setActivateData(activatePod));
      yield call(successFunc, activatePod);
    }
  }
}

export function* putActivatePod(data) {
  const { formData, slideData, successFunc } = data;
  const createActivatePod = yield call(
    AllService.putActivatePod,
    formData.domainId,
    formData.lessonUnitId,
    formData.courseId,
    formData.loginId,
    formData.lessonUnitName,
    formData.lessonUnitDescription,
    formData.lessonPodType,
    slideData
  );
  yield call(successFunc, createActivatePod);
}

export function* renameLessonPod(data) {
  const { formData, successFunc } = data;
  const serverResponse = yield call(
    AllService.renameLessonPod,
    formData.loginId,
    formData.lessonUnitId,
    formData.lessonPodName,
    formData.lessonPodDescription,
    formData.accessType
  );
  yield call(successFunc, serverResponse);
}

export function* deleteCreatedLessonPod(data) {
  const { deleteData, successFunc } = data;
  const serverResponse = yield call(
    AllService.deleteCreatedLessonPod,
    deleteData
  );
  yield call(successFunc, serverResponse);
}

export function* deleteActivatedLessonPod(data) {
  const { deleteData, successFunc } = data;
  const serverResponse = yield call(
    AllService.deleteActivatedLessonPod,
    deleteData
  );
  yield call(successFunc, serverResponse);
}

export function* getActivatedBotForUpdate(data) {
  const { lessonDistinctId, loginId, successFunc } = data;
  const serverResponse = yield call(
    AllService.getActivatedBotForUpdate,
    loginId,
    lessonDistinctId
  );
  yield call(successFunc, serverResponse);
}

export function* updateActivateBot(data) {
  const { form, slides, successFunc } = data;
  const serverResponse = yield call(
    AllService.updateActivateBot,
    form.loginId,
    form.lessonUnitDistinctID,
    slides
  );
  yield call(successFunc, serverResponse);
}

export function* copyLessonbot(data) {
  const { formData, successFunc } = data;
  const serverResponse = yield call(
    AllService.copyLessonbot,
    formData.loginId,
    formData.lessonUnitId,
    formData.lessonPodName,
    formData.lessonPodDescription
  );
  yield call(successFunc, serverResponse);
}
