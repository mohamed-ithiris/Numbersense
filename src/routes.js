// import ActivateBot from "./containers/ActivateBot/ActivateBot";
import Dashboard from "./containers/Dashboard/Dashboard";
// import ListFolder from "./containers/ListFolder/ListFolder";
// import ListLessonsFromFolder from "./containers/ListLessonsFromFolder/ListLessonsFromFolder";
// import CreateBotCreator from "./containers/ManageBotCreator/CreateBotCreator";
// import ManageBotCreator from "./containers/ManageBotCreator/ManageBotCreator";
// import UpdateBotCreator from "./containers/ManageBotCreator/UpdateBotCreator";
// import CreateCourse from "./containers/ManageCourse/CreateCourse";
// import ManageCourse from "./containers/ManageCourse/ManageCourse";
// import UpdateCourse from "./containers/ManageCourse/UpdateCourse";
// import CreateDomain from "./containers/ManageDistrict/CreateDomain";
// import ManageDistrict from "./containers/ManageDistrict/ManageDistrict";
// import UpdateDomain from "./containers/ManageDistrict/UpdateDomain";
// import CreateFolder from "./containers/ManageFolder/CreateFolder";
// import ManageFolder from "./containers/ManageFolder/ManageFolder";
// import UpdateFolder from "./containers/ManageFolder/UpdateFolder";
// import UserRecentActivity from "./containers/RecentActivity/UserRecentActivity";
// import AdminRecentActivity from "./containers/RecentActivity/AdminRecentActivity";
// import MainAdminRecentActivity from "./containers/RecentActivity/MainAdminRecentActivity";
// import EditActivatedBot from "./containers/EditActivatedBot/EditActivatedBot";

var ROUTES = [
  {
    path: "/dashboard",
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "/dashboard/folders/:id",
  //   component: ListFolder,
  //   layout: "/admin",
  // },
  // {
  //   path: "/dashboard/folders/lessons/:id",
  //   component: ListLessonsFromFolder,
  //   layout: "/admin",
  // },
  // {
  //   path: "/dashboard/activateBot/:id",
  //   component: ActivateBot,
  //   layout: "/admin",
  // },
  // {
  //   path: "/recentActivity",
  //   component: UserRecentActivity,
  //   layout: "/user",
  // },
  // {
  //   path: "/dashboard/editActivatedBot/:id",
  //   component: EditActivatedBot,
  //   layout: "/user",
  // },
  // {
  //   path: "/manageCourse",
  //   component: ManageCourse,
  //   layout: "/admin",
  // },
  // {
  //   path: "/manageCourse/create",
  //   component: CreateCourse,
  //   layout: "/admin",
  // },
  // {
  //   path: "/manageCourse/update/:id",
  //   component: UpdateCourse,
  //   layout: "/admin",
  // },
  // {
  //   path: "/manageFolder",
  //   component: ManageFolder,
  //   layout: "/admin",
  // },
  // {
  //   path: "/manageFolder/create",
  //   component: CreateFolder,
  //   layout: "/admin",
  // },
  // {
  //   path: "/manageFolder/update/:id",
  //   component: UpdateFolder,
  //   layout: "/admin",
  // },
  // {
  //   path: "/manageBotCreator",
  //   component: ManageBotCreator,
  //   layout: "/admin",
  // },
  // {
  //   path: "/manageBotCreator/create",
  //   component: CreateBotCreator,
  //   layout: "/admin",
  // },
  // {
  //   path: "/manageBotCreator/update/:id",
  //   component: UpdateBotCreator,
  //   layout: "/admin",
  // },
  // {
  //   path: "/recentActivity",
  //   component: AdminRecentActivity,
  //   layout: "/admin",
  // },
  // {
  //   path: "/manageDistrict",
  //   component: ManageDistrict,
  //   layout: "/MAdmin",
  // },
  // {
  //   path: "/manageDistrict/create",
  //   component: CreateDomain,
  //   layout: "/MAdmin",
  // },
  // {
  //   path: "/manageDistrict/update/:id",
  //   component: UpdateDomain,
  //   layout: "/MAdmin",
  // },
  // {
  //   path: "/recentActivity",
  //   component: MainAdminRecentActivity,
  //   layout: "/MAdmin",
  // },
];

export default ROUTES;
