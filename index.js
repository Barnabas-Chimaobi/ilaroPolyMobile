/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Login from "./src/component/login/login"
import AppContainer from "./src/component/navigation/appContainer"
import Dashboard from "./src/component/dashboard/dashboard"
import Splash from './src/component/splash/splash';
import Lecture from "./src/component/lecture/lecture"
import Menu from "./src/component/drawer/menu"
import Assignmeny from "./src/component/assignment/submitAssignmet"

AppRegistry.registerComponent(appName, () => AppContainer);


