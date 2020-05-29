
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
import ViewAssignment1 from "../assignment/viewAssignment1"
import EnterChat from "../../component/chat/enterChat"
import CoursesForChat from "../../component/chat/coursesForChat"
import Support from "../../component/support/support"
import Profile from "../../component/profile/profile"
import Call from "../../component/support/call"
import News from "../../component/news/news"
import Cbt from "../../component/cbt/cbt"
import FullScreenView from "../../component/assignment/fullScreenView"
import FullScreenView1 from "../../component/assignment/fullScreenView1"


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
    SubmittedAssignment,
    ViewAssignment1,
    EnterChat,
    CoursesForChat,
    Support,
    Profile,
    Call, 
    News,
    Cbt,
    FullScreenView,
    FullScreenView1
  },
  {
    initialRouteName: "Splash",
    headerMode: 'none',
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
