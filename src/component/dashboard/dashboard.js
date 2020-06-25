import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  DrawerLayoutAndroid,
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView,
  Linking,
  Alert,
  BackHandler,
  Button, 
  AsyncStorage,
  AppRegistry
  // TouchableWithoutFeedbackBase
} from 'react-native';
import {Root} from 'native-base'
import { Container, Header, Content, ActionSheet} from "native-base";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontawesome from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Menu from '../drawer/menu';
import firebase, { RNFirebase } from 'react-native-firebase';
import BackgroundFetch from "react-native-background-fetch";
import Spinner from 'react-native-loading-spinner-overlay';
import Footer from "../../component/support/support"
import Call from "../../component/support/call"




class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIndicator: false,
      clicked: null,
      firebase_messaging_token: '',
      firebase_messaging_message: '',
      firebase_notification: '',
      firebase_send: '',
      newAssignment: null,
      compareAssignment: null
    };

}

async componentDidMount() {
  let currentList = await AsyncStorage.getItem("currentAssignmentList");
  if(!currentList) {
    await AsyncStorage.setItem("currentAssignmentList", "[]");
    currentList= await AsyncStorage.getItem("currentAssignmentList");
  }

  console.log("CURR_LIST: ", currentList);

  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  this.createNotificationChannel();
  this.checkNotificationPermissions();
  this.addNotificationListeners();
  this.sendAssignmentToFirebase()
  // this.sendToServer()
  this.setState({showIndicator: false});

  BackgroundFetch.configure({
    minimumFetchInterval: 15,
    stopOnTerminate: false,
    startOnBoot: true,
    enableHeadless: true,
  }, async (taskId) => {

    console.log("Received background-fetch event: " + taskId);
    /* process background tasks */
    this.sendAssignmentToFirebase();
    this.sendToServer()

    BackgroundFetch.finish();
  }, (error) => {
    console.log("RNBackgroundFetch failed to start");
  })
  // AppRegistry.registerHeadlessTask( 'RNFirebaseBackgroungMessage', () => this.sendToServer());
  
  const assign = await AsyncStorage.getItem("currentAssignmentList");
  const dtr = JSON.parse(assign);
  console.log("ERROR: ", dtr);
}


  handleBackButton = () => {
    BackHandler.exitApp()
    return true;
 };


// compareAndContrast = (newArray, existingArray) => {
//   const missings = [];
//   const matchesArray = [];
//   let matches = false;
   
//   for ( let i = 0; i < newArray.length; i++ ) {
//       matches = false;
//       for ( let e = 0; e < existingArray.length; e++ ) {
//           if ( newArray[i]?.Id === existingArray[e]?.Id ) {
//             matches = true;
//             matchesArray.push(newArray[i]);
//             return matchesArray;
//           } else if(!matches) missings.push( newArray[i] );{          
//        return missings;
//           }
//       }
     
//   }
// }

 compareAndContrast(newArray, existingArray) {
  const missings = [];
  const matchesArray = [];
  let matches = false;

  for ( let i = 0; i < newArray.length; i++ ) {
      matches = false;
      for ( let e = 0; e < existingArray.length; e++ ) {
          if (  newArray[i]?.Id === existingArray[e]?.Id ) {
            matches = true;
            matchesArray.push(newArray[i]);
          }
      }
      if(!matches) missings.push( newArray[i] );
  }

  console.log(matchesArray);
  return missings;
}



componentWillUnmount() {

      // this.notificationListener();
    // this.notificationOpenedListener();
    this.removeNotificationListeners();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton())
}

  alert = (item) => {
    alert(item);
  };
  openDrawer = () => {
    this.drawer.openDrawer();
  };

  closeDrawer = () => {
    this.drawer.closeDrawer();
  };

  static navigationOptions = {
    headerShown: false,
  };

  onButtonPress = () => {
    this.setState({showIndicator: true});
  };

  makeCall = () => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${07088391544}';
    } else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  };


  createNotificationChannel = () => {
    console.log("createNotificationChannel");
    // Build a android notification channel
    const fcmChannelID = 'fcm_default_channel';
    const channel = new firebase.notifications.Android.Channel(
      fcmChannelID, // channelId
      "FCM Default Channel", // channel name
      firebase.notifications.Android.Importance.High // channel importance
    ).setDescription("Test Channel"); // channel description
    // Create the android notification channel
    firebase.notifications().android.createChannel(channel);
  };

  checkNotificationPermissions() {
    console.log("checkNotificationPermissions");
    // show token
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          console.log('user has notification permission')
          this.setToken();
        } else {
          console.log('user does not have notification permission')
          firebase.messaging().requestPermission()
            .then((result) => {
              if (result) {
                this.setToken();
              }
              else {
              }
            });
        }
      });
  }
 
  setToken(token) {
    console.log("setToken");
    firebase.messaging().getToken().then((token) => {
      this.setState({ firebase_messaging_token: token });
      console.log(token, "toKEEEEEENNNNNN");
    });
  }
	
  addNotificationListeners() {
    const fcmChannelID = 'fcm_default_channel';
    console.log("receiveNotifications");
    this.messageListener = firebase.messaging().onMessage((message) => {
      // "Headless" Notification
      console.log("onMessage");
    });
 
    this.notificationInitialListener = firebase.notifications().getInitialNotification().then((notification) => {
          if (notification) {
            // App was opened by a notification
            // Get the action triggered by the notification being opened
            // Get information about the notification that was opened
            console.log("onInitialNotification");
          }
      });
 
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      console.log("onNotificationDisplayed");
    });
 
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      console.log("onNotification");
      notification.android.setChannelId(fcmChannelID);
      firebase.notifications().displayNotification(notification).catch((err) => {
        console.log(err);
      });
 
      // Process your notification as required
 
      // #1: draw in View
      var updatedText = this.state.firebase_notification + "\n" +
        "[" + new Date().toLocaleString() + "]" + "\n" + 
        notification.title + ":" + notification.body + "\n";
 
      this.setState({ firebase_notification: updatedText });
    });
 
    this.tokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
      // Process your token as required
      console.log("onTokenRefresh");
    });  
  }
 
  removeNotificationListeners() {
    this.messageListener;
    this.notificationInitialListener;
    this.notificationDisplayedListener;
    this.notificationListener;
    this.tokenRefreshListener;    
  }
  
  sendAssignmentToFirebase = async () => {  
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};
    const response = await fetch(
      `https://applications.federalpolyilaro.edu.ng/api/e_learning/AssignmentByCategory?personId=${params.PersonDetails.Id}`,
    );
    
    let resToJson = await response.json();
    console.log(resToJson, "RESSSSSSSSSSSSSSSSSSS");

     //Save the returned assignments to async storage

    let assignmentLoad = await AsyncStorage.getItem("currentAssignmentList");
    let assignmentLoads = JSON.parse(assignmentLoad);
    console.log(assignmentLoads, "DOMMMMY ASSIGNMENT DATA")
    console.log(assignmentLoad, "ASSIGNMENT DATAAAAAAAAAAAAAAAAAAAAAAAAAAA");

    if(assignmentLoads) {
      const currentUnsubmittedAssignments = assignmentLoads?.Output ? assignmentLoads.Output.NotSubmittedAssignment : [];
      const unNotSubmittedAssignmentsUserDoesNotHave = 
      this.compareAndContrast(resToJson.Output.NotSubmittedAssignment, currentUnsubmittedAssignments);
      console.log(`New Unsubmitted Assignments From API:`, unNotSubmittedAssignmentsUserDoesNotHave);
      await AsyncStorage.setItem("currentAssignmentList", JSON.stringify(resToJson));
  
      const storageData = await AsyncStorage.getItem("currentAssignmentList");
      console.log("STData----", JSON.parse(storageData));

      const newAssignments = unNotSubmittedAssignmentsUserDoesNotHave.map((item) => {
        return `${item.CourseCode}  ${item.CourseName}`
       })
    
       this.setState({
        newAssignment: newAssignments.length
      });

      console.log(this.state.newAssignment, "NEWWWWWWWWWWWWWWWWWWWWASSS")
    }



//   const checkAsync =await AsyncStorage.getItem("newAssingmentToCheck")
//   const res = JSON.parse(checkAsync);
//   const newAssignmentToCheck = res.map((item) => {
//    return `${item.CourseCode}  ${item.CourseName}`
//    })
 
// this.setState({
//  compareAssignment: newAssignmentToCheck
// })
//  console.log(newAssignmentToCheck, ":AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

    return resToJson;
  }
  
  sendToServer = async(str) => {
    if(this.state.newAssignment > 0) {
    const firebase_server_key = 'AAAAfImolUU:APA91bHOdjPtbmBn2z3kSSaFhCJdisGOhY5QA33CEGC9e_-rlGlADHuSJFkvWbOcmNwh15jOB0fb74iWj7HnmF26mTlhcVnuNzaj7d4IxNNzrwzwzM0QkVcISgQhoRGZdt-NK9ErWGct';
    console.log("sendToServer");
    console.log(str);
 
    // SEND NOTIFICATION THROUGH FIREBASE
    // Workflow: React -> Firebase -> Target Devices

  fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',   
      Authorization: 'key=' + firebase_server_key,
    },
    body: JSON.stringify({
      "registration_ids":[
        this.state.firebase_messaging_token
      ],
      "data": {
        "title":"New Assignment Available",
        // "body": this.state.newAssignment
        "icon":"icon1",
        color : "green",
        "body": `${this.state.newAssignment} New Assignment/s`,
        "sound":"default", //If you want notification sound,
        vibrate: 300,      // Android only default: 300, no vibration if you pass 0
      },
      "notification": {
          "title":"New Assignment Available",
          // "body": this.state.newAssignment
          "icon":"icon1",
          color : "green",
          "body": `${this.state.newAssignment} New Assignment/s`,
          "sound":"default", //If you want notification sound
           vibrate: 500,     // Android only default: 300, no vibration if you pass 0
      },
      "priority":"high", 
    }),
  })
  .then((response) => {
    console.log("Request sent!");
    console.log(response);
    console.log("FCM Token: " + this.state.firebase_messaging_token);
    console.log("Message: " + str);
    this.setState({ firebase_send: '' });
  })
  .catch((error) => {
    console.error(error);
  });
 
}
  }


  render() {
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};

    var BUTTONS = [
      { text: "Call", icon: "american-football", iconColor: "#2c8ef4",},
      { text: "E-mail", icon: "analytics", iconColor: "#f42ced" },
      { text: "Chat", icon: "aperture", iconColor: "#ea943b" },
    ];
    var DESTRUCTIVE_INDEX = 3;
    var CANCEL_INDEX = 4;

    return (
          <DrawerLayoutAndroid
        drawerWidth={260}
        drawerPosition="left"
        renderNavigationView={() => (
          <Menu
            navigation={this.props.navigation}
            closeDrawer={this.closeDrawer}
          />
        )}
        ref={(_drawer) => {
          this.drawer = _drawer;
        }}>
        <View style={styles.container}>
      
          <View style={styles.headerWrapper}>
            <View style={styles.headerWrapper1}>
              <TouchableNativeFeedback
                onPress={(this.onPress = this.openDrawer)}>
                <Entypo
                  name="menu"
                  style={{color: 'white', fontSize: 25, marginLeft: 15}}
                />
              </TouchableNativeFeedback>
              <Text style={{fontSize: 22, color: 'white', marginLeft: 20}}>
                E-Learning
              </Text>
            </View>
            <TouchableWithoutFeedback
             onPress={()=> {
               Alert.alert("No new Notifications")
             }}
            >
            <View style={styles.headerWrapper2}>
              <Fontawesome
                name="bell"
                style={{color: 'white', fontSize: 18, marginRight: 15}}
              />
            </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.container1}>

              <TouchableNativeFeedback
                onPress={() => {
                  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
                  this.props.navigation.navigate('Lecture', {
                    PersonDetails: params.PersonDetails,
                  });
                }}>
                <View style={styles.noteContainer}>
     
                  <Image
                 source={require("../../assets/lecture-notes.png")}
                 style={{
                  width: 80,
                  height:70,
                  alignSelf: 'center',
                  marginTop: 25,
                }}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingTop: 35,
                      fontSize: 20,
                      fontFamily: 'sans-serif-condensed',
                      color: 'black',
                    }}>
                    Lecture Notes
                  </Text>
                </View>
              </TouchableNativeFeedback>
            
             
             <TouchableNativeFeedback
                  onPress={() => {
                    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
                    this.props.navigation.navigate('GetAssignment', {
                      PersonDetails: params.PersonDetails,
                    });
                  }}
             >
             <View style={styles.noteContainer}>
      
                  <Image
                 source={require("../../assets/assignment.png")}
                 style={{
                  width: 90,
                  height:80,
                  alignSelf: 'center',
                  marginTop: 25,
                }}
                  />
              <Text
                style={{
                  textAlign: 'center',
                  paddingTop: 25,
                  fontSize: 20,
                  fontFamily: 'sans-serif-condensed',
                  color: 'black',
                }}>
                Quiz/Assignments
              </Text>
            </View>
                </TouchableNativeFeedback>
           

            <View style={styles.noteContainer}>

                   <TouchableWithoutFeedback
                    onPress={() => {
                      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
                      this.props.navigation.navigate("Cbt")
                    }}
                   >
                   <Image
                 source={require("../../assets/cbt.png")}
                 style={{
                  width: 80,
                  height:85,
                  alignSelf: 'center',
                  marginTop: 20,
                }}
                  />
                </TouchableWithoutFeedback>
              <Text
                style={{
                  textAlign: 'center',
                  paddingTop: 35,
                  fontSize: 20,
                  fontFamily: 'sans-serif-condensed',
                  color: 'black',
                }}>
                CBT Tests
              </Text>
            </View>

            <View style={styles.noteContainer}>
      
              <TouchableWithoutFeedback onPress={()=> {
                BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
                this.props.navigation.navigate("EnterChat", {PersonDetails: params.PersonDetails})
              }}>
                <View>
                <Image
                 source={require("../../assets/chat-box.jpg")}
                 style={{
                  width: 80,
                  height:80,
                  alignSelf: 'center',
                  marginTop: 25,
                }}
                  />
              <Text
                style={{
                  textAlign: 'center',
                  paddingTop: 35,
                  fontSize: 20,
                  fontFamily: 'sans-serif-condensed',
                  color: 'black',
                }}>
                Chat Room
              </Text>
                </View>
             
              </TouchableWithoutFeedback>
                
            </View>
          </View>
        </View>
    
         <TouchableWithoutFeedback onPress={()=>{
           this.makeCall()
         }}>
           <View style={{position: "absolute", left: "55%", right: 0, bottom: 0, height:40, flexDirection: "row", width:150}}>
           <Text style={{ borderRadius: 5, textAlign: "center", padding: 5, marginTop: -15, marginLeft:23, color: "green"}}>Call Support</Text>
           <View style={{ borderRadius: 80, width: 50, marginTop:-30, height: 50,}}>
             <Image
              source={require("../../assets/call1.jpg")}
              style={{color: 'white', fontSize: 25, alignSelf: "center", paddingTop:5, height:50, width: 50}}

             />
           </View>
     
           </View>
        
         </TouchableWithoutFeedback>
         {/* <Button onPress={async() =>await this.sendAssignmentToFirebase()} title="save assignment" /> */}
         {/* <Button onPress={() => this.sendToServer(this.state.firebase_send)} title="Send and Receive" /> */}
     
      </DrawerLayoutAndroid>
      
    );
  }
}
export default Dashboard;

const styles = StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#17732B',
    height: 52,
    elevation:10
  },

  headerWrapper1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerWrapper2: {
    alignSelf: 'center',
  },
  container1: {
    marginTop: '2%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    margin: 7,
    // borderColor: 'green',
    // backgroundColor: 'white',
    // borderRadius: 5,
    // elevation: 10,
    // borderBottomWidth: 3,
    // borderRightWidth: 3,
    height: '75%',
  },
  noteContainer: {
    width: '45%',
    height: '55%',
    marginTop: "5%",
    // borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 9,
    borderBottomWidth: 2,
    // borderRightWidth: 3,
    paddingTop: 10,
  },

  container: {
    // height: "100%",
    // flex: 1
  }
});
