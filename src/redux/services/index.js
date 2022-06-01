import { create } from "apisauce";
import { Config as rootAPIURL } from "./api";

const userApiClient = create({
  baseURL: rootAPIURL.API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 2500000,
});

const userApiClientREST = create({
  baseURL: rootAPIURL.API_ACTIVATE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 2500000,
});

function forgotPassword(LoginName, DomainName) {
  return userApiClient
    .get("/SendBackpackForgotPassword", {
      LoginName: LoginName,
      DomainName: DomainName,
    })
    .then((response) => {
      if (response.ok) {
        return response;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

// Lessonbot

// Login Data
function userLogin(username, password, domainname) {
  return userApiClient
    .get("/AuthenticateLessonbotUser", {
      LoginName: username,
      Password: password,
      DistrictName: domainname,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data.AuthenticateLessonbotUserResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

// Domain
function putDomain(
  country,
  domainName,
  description,
  emailId,
  firstName,
  lastName,
  location,
  password,
  userName
) {
  return userApiClient
    .put("./CreateDistrict", {
      Country: country,
      DistrictName: domainName,
      Desc: description,
      EmailID: emailId,
      Location: location,
      FirstName: firstName,
      LastName: lastName,
      Password: password,
      LoginName: userName,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data.CreateDistrictResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

function getAllDomainList(loginId) {
  return userApiClient
    .get("/GetAllDomains", { LoginID: loginId })
    .then((response) => {
      if (response.status === 200) {
        return response.data.GetAllDomainsResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

function updateDomainList(
  districtID,
  country,
  domainName,
  description,
  location,
  userName,
  emailId,
  firstName,
  lastName,
  password
) {
  return userApiClient
    .put("./CreateDomain", {
      DistrictID: districtID,
      Country: country,
      DistrictName: domainName,
      Desc: description,
      Location: location,
      LoginName: userName,
      EmailID: emailId,
      FirstName: firstName,
      LastName: lastName,
      Password: password,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data.CreateDomainResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

// Course
function putCourse(
  districtId,
  courseName,
  courseDescription,
  activityBy,
  image
) {
  return userApiClient
    .put("./CreateSubject", {
      DistrictID: districtId,
      SubjectName: courseName,
      SubjectDesc: courseDescription,
      ActivityBy: activityBy,
      Image: image,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data.CreateSubjectResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

function getAllCourseList(districtId) {
  return userApiClient
    .get("/GetAllSubject", {
      DistrictID: districtId,
    })
    .then((response) => {
      if (response.ok) {
        return response.data.GetAllSubjectResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

function updateCourseList(
  subjectId,
  gradeId,
  activityId,
  courseName,
  courseDescription,
  image
) {
  return userApiClient
    .put("./UpdateSubject", {
      SubjectID: subjectId,
      GradeID: gradeId,
      ActivityBy: activityId,
      SubjectName: courseName,
      SubjectDesc: courseDescription,
      Image: image,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data.UpdateSubjectResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

// Folder
function putFolder(subjectId, lessonName, LessonDescription, activityBy) {
  return userApiClient
    .put("./CreateLesson", {
      SubjectID: subjectId,
      LessonName: lessonName,
      LessonDesc: LessonDescription,
      ActivityBy: activityBy,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data.CreateLessonResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

function getFolderList(subjectId, loginId) {
  return userApiClient
    .get("/GetAllLessonsForASubject", {
      SubjectID: subjectId,
      LoginID: loginId,
    })
    .then((response) => {
      if (response.ok) {
        return response.data.GetAllLessonsForASubjectResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

function updateFolderList(
  lessonId,
  subjectId,
  lessonName,
  lessonDescription,
  activityId
) {
  return userApiClient
    .put("./UpdateLesson", {
      LessonID: lessonId,
      SubjectID: subjectId,
      LessonName: lessonName,
      LessonDesc: lessonDescription,
      ActivityBy: activityId,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data.UpdateLessonResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

// Bot Creator
function putBotCreator(
  districtId,
  country,
  location,
  userName,
  emailId,
  firstName,
  lastName,
  password
) {
  return userApiClient
    .put("./CreateLessonbotUser", {
      DistrictID: districtId,
      Country: country,
      Location: location,
      LoginName: userName,
      EmailID: emailId,
      FirstName: firstName,
      LastName: lastName,
      Password: password,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data.CreateLessonbotUserResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

function getBotCreatorList(districtId, loginId) {
  return userApiClient
    .get("/GetAllLessonbotUsers", {
      DomainID: districtId,
      LoginID: loginId,
    })
    .then((response) => {
      if (response.ok) {
        return response.data.GetAllLessonbotUsersResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

function updateBotCreatorList(
  domainId,
  userId,
  country,
  location,
  userName,
  emailId,
  firstName,
  lastName,
  password
) {
  return userApiClient
    .put("./UpdateLessonbotUser", {
      DistrictID: domainId,
      UserID: userId,
      Country: country,
      Location: location,
      LoginName: userName,
      EmailID: emailId,
      FirstName: firstName,
      LastName: lastName,
      Password: password,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data.UpdateLessonbotUserResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

// get All Lessons
function getAllLessonList(loginId) {
  return userApiClient
    .get("/GetAllLessonPodsByAuthor", {
      LoginID: loginId,
    })
    .then((response) => {
      if (response.ok) {
        return response.data.GetAllLessonPodsByAuthorResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

// get All Lessons
function getLessonsFromFolder(loginId, folderId) {
  return userApiClient
    .get("/GetAllLessonPodsByLesson", {
      LoginID: loginId,
      LessonID: folderId,
    })
    .then((response) => {
      console.log(response, "response");
      if (response.ok) {
        return response.data.GetAllLessonPodsByLessonResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

// get activate pod
function getActivatePod(lessonUnitId) {
  return userApiClient
    .get("/GetDistributeLessonUnit", {
      LessonUnitID: lessonUnitId,
    })
    .then((response) => {
      if (response.ok) {
        return response.data.GetDistributeLessonUnitResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

// get activate pod
function putActivatePod(
  domainId,
  lessonUnitId,
  courseId,
  loginId,
  lessonUnitName,
  lessonUnitDescription,
  lessonPodType,
  slideData
) {
  return userApiClientREST
    .put("/DistributeLessonUnitToStudents", {
      DomainID: domainId,
      LessonUnitID: lessonUnitId,
      CourseID: courseId,
      AuthorId: loginId,
      LessonName: lessonUnitName,
      LessonDesc: lessonUnitDescription,
      LessonPodType: lessonPodType,
      LessonUnitSlides: slideData,
    })
    .then((response) => {
      if (response.ok) {
        return response.data;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

// rename lesson pod
function renameLessonPod(
  loginId,
  lessonUnitId,
  lessonPodName,
  lessonPodDescription,
  accessType
) {
  return userApiClientREST
    .put("/UpdateLessonUnitProperties", {
      AuthorID: loginId,
      LessonUnitID: lessonUnitId,
      LessonName: lessonPodName,
      LessonDesc: lessonPodDescription,
      AccessType: accessType,
    })
    .then((response) => {
      if (response.ok) {
        return response.data.UpdateLessonUnitPropertiesResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

// delete created lesson pod
function deleteCreatedLessonPod({ lessonUnitId, loginId }) {
  return userApiClient
    .put("/DeleteLessonUnit", {
      LessonUnitID: lessonUnitId,
      AuthorID: loginId,
    })
    .then((response) => {
      if (response.ok) {
        return response.data.DeleteLessonUnitResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

// delete created lesson pod
function deleteActivatedLessonPod({ contentId, activityBy }) {
  return userApiClient
    .put("/DeleteContent", {
      ContentID: contentId,
      ActivityBy: activityBy,
    })
    .then((response) => {
      if (response.ok) {
        return response.data.DeleteContentResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

// get activated bot for update
function getActivatedBotForUpdate(loginId, lessonDistinctId) {
  return userApiClient
    .get("/GetAllActivitiesBySharedLessonUnit", {
      LoginID: loginId,
      LessonUnitDistID: lessonDistinctId,
    })
    .then((response) => {
      if (response.ok) {
        return response.data.GetAllActivitiesBySharedLessonUnitResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

// get activated bot for update
function updateActivateBot(loginId, lessonDistinctId, slides) {
  return userApiClient
    .put("/UpdateSharedLessonUnitSlides", {
      LessonUnitDistID: lessonDistinctId,
      AuthorID: loginId,
      Slides: slides,
    })
    .then((response) => {
      if (response.ok) {
        return response.data.UpdateSharedLessonUnitSlidesResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

// copy lessonbot
function copyLessonbot(
  loginId,
  lessonUnitId,
  lessonPodName,
  lessonPodDescription
) {
  return userApiClientREST
    .put("/CopyLessonUnit", {
      AuthorID: loginId,
      LessonUnitID: lessonUnitId,
      LessonName: lessonPodName,
      LessonDesc: lessonPodDescription,
    })
    .then((response) => {
      if (response.ok) {
        return response.data.CopyLessonUnitResult;
      } else if (response.problem === "TIMEOUT_ERROR") {
        return response.problem;
      } else {
        return null;
      }
    });
}

export const AllService = {
  forgotPassword,
  // Lessonbot starts
  userLogin, // login
  putDomain, // create domain
  getAllDomainList, // get all domain details
  updateDomainList, // update domain
  putCourse, // create course
  getAllCourseList, // get all course or subject
  updateCourseList, // update course
  putFolder, // create folder
  getFolderList, // get all folders
  updateFolderList, // update folder
  putBotCreator, // create Bot Creator
  getBotCreatorList, // get all Bot Creators
  updateBotCreatorList, //update Bot Creator List
  getAllLessonList, // get all lessons
  getLessonsFromFolder, // get lessons from folder
  getActivatePod, // get activate bot
  putActivatePod, // activate bot
  renameLessonPod, // rename lesson
  deleteCreatedLessonPod, //delete created lesson
  deleteActivatedLessonPod, //delete activated lesson
  getActivatedBotForUpdate, //get activatedbot for update
  updateActivateBot, // update activated bots
  copyLessonbot, //copy lesson
};
