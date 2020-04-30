
//AppContainer.js
import { createAppContainer } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack"
import Splash from "../splash/splash"
import Login from "../login/login"
import Menu from "../drawer/menu";
import Dashboard from "../dashboard/dashboard"
import Lecture from "../lecture/lecture"
import CourseContent from "../coursecontent/coursetent"
import CourseContentDetails from "../contentdetails/courseContentDetails"
import Logout from "../logout/logout"
import LectureNotes from "../lectureMaterials/lectureNotes"
import VideoTutorial from "../lectureMaterials/videoTutorial"
import LiveClass from "../lectureMaterials/liveClass"
import GetAssignment from "../assignment/getAssignment"
import ViewAssignment from "../assignment/viewAssignments"
import SubmitAssignment from "../assignment/submitAssignmet"
import LiveChat from "../assignment/chat"
import SubmittedAssignment from "../assignment/submittedAssignment"

const AppNavigator = createStackNavigator(
  {
    Splash,
    Login,
    Menu,
    Dashboard: Dashboard,
    Lecture,
    CourseContent,
    CourseContentDetails,
    Logout,
    LectureNotes,
    VideoTutorial,
    LiveClass,
    GetAssignment,
    ViewAssignment,
    SubmitAssignment,
    LiveChat,
    SubmittedAssignment
  },
  {
    initialRouteName: "Splash",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#222e50"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
