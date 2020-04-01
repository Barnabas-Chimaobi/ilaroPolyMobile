
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

const AppNavigator = createStackNavigator(
  {
    Splash,
    Login,
    Menu,
    Dashboard: Dashboard,
    Lecture,
    CourseContent,
    CourseContentDetails
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
