import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  // for forgot password
  forgotPassword: ["LoginName", "DomainName", "successFn"],
  // set course name
  setCourseName: ["courseName", "courseId"],
  // set Folder name
  setFolderName: ["folderName", "folderId"],
  // set CheckDatas
  setCheckData: ["checkData"],
  // Lessonbots Starts ----------------------------------------
  // Login user.
  userLogin: [
    "username",
    "password",
    "domainname",
    "successFunc",
    "failureFunc",
  ],
  // The login success response
  userLoginSuccessMessage: ["successMessage"],
  // The login error response
  userLoginFailureMessage: ["errorMessage"],
  // create or put domain
  putDomain: ["domainData", "successFn"],
  // get all domain list
  getAllDomainList: ["loginId"],
  // set all domain list
  setDomainList: ["domainList"],
  // update domain list
  updateDomainList: ["updateDomainData", "successFunc"],
  // Logout user
  userLogout: ["successFn"],
  // Logout Status
  setLogoutStatus: ["logoutstatus"],
  // get all Course list
  getAllCourseList: ["districtId", "successFunc"],
  // set all course list
  setCourseList: ["courseList"],
  // create or put Course
  putCourse: ["createCourseData", "successFunc"],
  // update course list
  updateCourseList: ["updateCourseData", "successFunc"],
  // get all Folder list
  getFolderList: ["subjectId", "loginId"],
  // set all folder list
  setFolderList: ["folderList"],
  // create or put Folder
  putFolder: ["createFolderData", "successFunc"],
  // update course list
  updateFolderList: ["updateFolderData", "successFunc"],
  // get all bot creator
  getBotCreatorList: ["districtId", "loginId"],
  // set all Bot Creator list
  setBotCreatorList: ["botCreatorList"],
  // create or put Bot Creator
  putBotCreator: ["createBotCreatorData", "successFunc"],
  // update course list
  updateBotCreatorList: ["updateBotCreatorData", "successFunc"],
  // get all lesson list
  getAllLessonList: ["loginId"],
  // set all lesson list
  setLessonList: ["lessonList"],
  // get lessons from Folder
  getLessonsFromFolder: ["loginId", "folderId"],
  // set lessons from Folder
  setLessonsFromFolder: ["lessonFromFolder"],
  // get Activate Pod
  getActivatePod: ["lessonUnitId", "successFunc"],
  // set Activate Data
  setActivateData: ["activateData"],
  // create or put Activate Bot
  putActivatePod: ["formData", "slideData", "successFunc"],
  // rename lesson Pod
  renameLessonPod: ["formData", "successFunc"],
  // Delete Created Lesson
  deleteCreatedLessonPod: ["deleteData", "successFunc"],
  // Delete Activated Lesson
  deleteActivatedLessonPod: ["deleteData", "successFunc"],
  // get actiavtedbot for update
  getActivatedBotForUpdate: ["loginId", "lessonDistinctId", "successFunc"],
  // update activated bot
  updateActivateBot: ["form", "slides", "successFunc"],
  // copy lessonbod
  copyLessonbot: ["formData", "successFunc"],
});
export const ActionTypes = Types;
export default Creators;
