import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  AsyncStorage,
  Alert,
  Switch,
  ActivityIndicator,
  Button
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Container,
  Header,
  Content,
  ListItem,
  Text,
  Body,
  Icon,
  CheckBox
} from 'native-base';
import firebase, { RNFirebase } from 'react-native-firebase';
// import RemotepushController from "../services/RemotepushController"
import Menu from '../drawer/menu';
import Dashboard from '../dashboard/dashboard';
import {Formik} from 'formik';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class StudentLogin extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      showIndicator: false,
      showPassword: true,
      regno: '',
      password: '',
      password: true,
      icon: 'eye-off',
      newArrayField: [],
      rememberMe: false,
      checked: false,
      firebase_messaging_token: '',
      firebase_messaging_message: '',
      firebase_notification: '',
      firebase_send: '',
      passwords: ""
    };
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //      this.onButtonPress();
  //         }, 500);
  //   }

  changeIcon() {
    this.setState({
      icon: this.state.icon === 'eye' ? 'eye-off' : 'eye',
      showPassword: !this.state.showPassword,
    });
  }

  onButtonPress = () => {
    if (this.state.password !== '' && this.state.regno !== '') {
      this.setState({showIndicator: true});
    } else {
      this.setState({showIndicator: false});
    }
    setTimeout(() => {
      this.setState({
        showIndicator: false,
      });
    }, 25000);
  };
  //  resetLoader = () => {
  //    if(this.state.newArrayField !== ""){
  //     this.setState({ showIndicator: false });

  //    }else{
  //     this.state.showIndicator == true
  //    }
  //  }

  authentication = () => {
    if (this.state.regno !== '' && this.state.password !== '') {
      fetch(
        `https://applications.federalpolyilaro.edu.ng/api/E_Learning/LoginStudent?MatricNo=${this.state.regno}&Password=${this.state.password}`,
      )
        .then((data) => data.json())
        .then((newData) => {
          //  console.log("NEW DATA: ", newData);
          if (newData.OutPut) {
            this.setState((prevState) => ({
              newArrayField: prevState.newArrayField.concat(newData),
            }));

            const mappedArray = this.state.newArrayField.map((item) => {
              // console.log("ITEM: ", item);
              return {
                FullName: item.OutPut.FullName,
              };
            });

            const API_ROOT = 'https://applications.federalpolyilaro.edu.ng';
            const {
              Id,
              FirstName,
              LastName,
              OtherName,
              ImageFileUrl,
            } = newData.OutPut.Student.ApplicationForm.Person;
            const MatricNumber = newData.OutPut.Student.MatricNumber;
            const Levels = newData.OutPut.Level.Name;
            const Department = newData.OutPut.Department.Name;
            const Faculty = newData.OutPut.Department.Faculty.Name;
            const Session = newData.OutPut.Session.Name;
            const password = this.state.password
            const regno    = this.state.regno

            const PersonDetails = {
              Id,
              FirstName,
              LastName,
              OtherName,
              FullName: `${FirstName} ${LastName} ${OtherName}`,
              ImageFileUrl: `${API_ROOT}${ImageFileUrl}`,
              MatricNumber,
              Levels,
              Department,
              Faculty,
              Session,
              password,
              regno
            };
            this.setState({
            showIndicator: false,
            passwords: PersonDetails.Id
          });

            console.log(PersonDetails, ":PERSONDETAILSSSSSSS")

            AsyncStorage.setItem(
              'personDetails',
              JSON.stringify(PersonDetails),
            );

            this.props.navigation.navigate('Dashboard', {
              mappedArray: mappedArray,
              PersonDetails,
            });
            this.setState({regno: ''});
            this.setState({password: ''});
          } else {
            Alert.alert('Incorrect User details');
            this.setState({showIndicator: false});
            return;
          }
        })
        .catch((err) => {
          console.error(err, 'there was an error');
        });
    } else {
      Alert.alert('please fill complete log in details');
    }
  };

  handleChange(name) {
    return (text) => {
      this.setState({[name]: text});
    };
  }

  toggleRememberMe = (value) => {

    this.setState({
      rememberMe: !this.state.rememberMe
  });

   if(!this.state.rememberMe){
     this.rememberUser()
   }else{
     this.forgetUser()
   }
    // this.setState({rememberMe: value});
    // if (value == true) {
    //   //user wants to be remembered.
    //   this.rememberUser();
    // } else {
    //   this.forgetUser();
    // }
  };

  rememberUser = async () => {
    try {
      await AsyncStorage.setItem('REG_NO', this.state.regno);
    } catch (error) {
      // Error saving data
    }
  };

  getRememberedUser = async () => {
    try {
      const regno = await AsyncStorage.getItem('REG_NO');
      if (regno !== null) {
        // We have username!!
        return regno;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  forgetUser = async () => {
    try {
      await AsyncStorage.removeItem('REG-NO');
    } catch (error) {
      // Error removing
    }
  };

  async componentDidMount() {
    // this.checkPermission();
    // this.createNotificationListeners()
    this.createNotificationChannel();
    this.checkNotificationPermissions();
    this.addNotificationListeners();
    const regno = await this.getRememberedUser();
    this.setState({
      regno: regno || '',
      rememberMe: regno ? true : false,
    });
   
    // setInterval(() => {
    //   this.sendToServer()
    // })
  }


  componentWillUnmount() {
    // this.notificationListener();
    // this.notificationOpenedListener();
    this.removeNotificationListeners();
  }

	
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
    this.messageListener();
    this.notificationInitialListener;
    this.notificationDisplayedListener();
    this.notificationListener();
    this.tokenRefreshListener();    
  }
  
  sendAssignmentToFirebase = async () => {
    console.log("0personid:", this.state.passwords)
   const response = await fetch(
      `http://applications.federalpolyilaro.edu.ng/api/e_learning/AssignmentByCategory?personId=${this.state.passwords}`,
    );
    const resToJson = await response.json();

    //Save the returned assignments to async storage
    await AsyncStorage.setItem("CurrentAssignmentList", JSON.stringify(resToJson));
    console.log(`RESPONSE FROM FETCH API:`, resToJson);

    const assignmentLoad = await AsyncStorage.getItem("CurrentAssignmentList");
    console.log(`Current Assignment List: ${assignmentLoad}`);

    return resToJson;
  }
  
  sendToServer = async(str) => {
    const firebase_server_key = 'AAAAfImolUU:APA91bGL7RnddnrKqmSBmnayL_BrpWM7M4eIsIeD3VxB3peT7Da3B0xwhXnIx3LNBuzALvAIweXK4THS72AfXVbJ01EaVw2h0LMsPMtwPinhNoLff69lim38-61fLr1cMWFyF6TE_dBs';
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
          "title":"Title",
          "body": "my new message"
        },
        "notification": {
            "title":"Title",
            "body": "my new message"
        },
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

//   async checkPermission() {
//     const enabled = await firebase.messaging().hasPermission();
//     if (enabled) {
//         this.getToken();
//     } else {
//         this.requestPermission();
//     }
//   }

//   async getToken() {
//     let fcmToken = await AsyncStorage.getItem('fcmToken');
//     if (!fcmToken) {
//         fcmToken = await firebase.messaging().getToken();
//         if (fcmToken) {
//             // user has a device token
//             await AsyncStorage.setItem('fcmToken', fcmToken);
//         }
//     }
//   }

//   async requestPermission() {
//     try {
//         await firebase.messaging().requestPermission();
//         // User has authorised
//         this.getToken();
//     } catch (error) {
//         // User has rejected permissions
//         console.log('permission rejected');
//     }
//   }
  
  
// async createNotificationListeners() {
// /*
// * Triggered when a particular notification has been received in foreground
// * */
// this.notificationListener = firebase.notifications().onNotification((notification) => {
//     const { title, body } = notification;
//     this.showAlert(title, body);
// });

// /*
// * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
// * */
// this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
//     const { title, body } = notificationOpen.notification;
//     this.showAlert(title, body);
// });

// /*
// * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
// * */
// const notificationOpen = await firebase.notifications().getInitialNotification();
// if (notificationOpen) {
//     const { title, body } = notificationOpen.notification;
//     this.showAlert(title, body);
// }
// /*
// * Triggered for data only payload in foreground
// * */
// this.messageListener = firebase.messaging().onMessage((message) => {
//   //process data message
//   console.log(JSON.stringify(message), "messaserf");
// });
// }


// showAlert(title, body) {
// Alert.alert(
//   title, body,
//   [
//       { text: 'OK', onPress: () => console.log('OK Pressed') },
//   ],
//   { cancelable: false },
// );
// }

  render() {
    // const gotten = this.state.newArrayField.map(item => {
    //   return {
    //     fullname: item.OutPut.FullName,
    //     imgurl: item.OutPut.ImageFileUrl,
    //     matricno: item.OutPut.MatricNumber,
    //   };
    // });

    

    return (
      <View style={styles.container}>
        <ScrollView>
          <Image
            source={require('../../assets/ilarologo.jpeg')}
            style={{
              marginTop: '30%',
              width: 200,
              height: 180,
              alignSelf: 'center',
              marginBottom: -18,
            }}
          />

          <View style>
            <View style={styles.formWrapper}>
              <View style={styles.titleStyle}></View>

              <View style={styles.textInputWrapper}>
                <Icon
                  style={{
                    color: 'gray',
                    fontSize: 23,
                    marginTop: -10,
                    paddingRight: 5,
                  }}
                  name="person"
                />
                <TextInput
                  style={styles.textInput1}
                  name="regno"
                  onChangeText={this.handleChange('regno')}
                  value={this.state.regno}
                  placeholder="Registration No"
                  clearTextOnFocus={true}
                />
              </View>
              <View style={styles.textInputWrapper}>
                <Icon
                  style={{
                    color: 'gray',
                    fontSize: 23,
                    marginTop: 10,
                    paddingRight: 5,
                  }}
                  name="key"
                />
                <TextInput
                  style={styles.textInput2}
                  name="password"
                  onChangeText={this.handleChange('password')}
                  value={this.state.password}
                  placeholder="Password"
                  clearTextOnFocus={true}
                  secureTextEntry={this.state.showPassword}
                  // placeholderTextColor={"red"}
                />
                <Icon
                  style={{color: 'gray', fontSize: 20, marginTop: 15}}
                  name={this.state.icon}
                  onPress={() => {
                    this.changeIcon();
                  }}
                />
              </View>
              <Spinner
                color={'green'}
                //visibility of Overlay Loading Spinner
                visible={this.state.showIndicator}
                //Text with the Spinner
                textContent={'Logging in...'}
                //Text style of the Spinner Text
                textStyle={styles.spinnerTextStyle}
              />
              {/* <Switch
                value={this.state.rememberMe}
                onValueChange={(value) => this.toggleRememberMe(value)}
              />
              <Text>Remember Me</Text> */}

                   <View style={{flexDirection: "row", marginTop:10, marginLeft:27}}>
                   <CheckBox
                    checked={this.state.rememberMe} color="green"
                     onPress={()=>{
                        this.toggleRememberMe()
                    }}
                  

                    />
                 
                      <Text style={{marginLeft:20, fontSize:15, fontFamily: "sans-serif-light"}}>Remember Me</Text>
                 
                   </View>
         
           
               
               
            
              <View style={styles.password}>
                <View>
                  <TouchableOpacity
                    style={styles.invoiceButton}
                    onPress={() => {
                      this.authentication(), this.onButtonPress();
                    }}>
                    <Text style={styles.generateInv}>SIGN IN</Text>
                  </TouchableOpacity>
                </View>
                <Button onPress={() => this.sendToServer(this.state.firebase_send)} title="Send and Receive" />
                <Button onPress={async() =>await this.sendAssignmentToFirebase()} title="save assignment" />

              </View>
            </View>
          </View>
          {/* <RemotepushController/> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // flex: 1,
    height: '100%',
  },

  titleStyle: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },

  header1: {
    margin: 15,
  },
  textInput1: {
    flex: 1,
    marginTop: -18,
  },
  textInput2: {
    flex: 1,
  },
  formWrapper: {
    backgroundColor: 'white',
    margin: 5,
  },
  textDescriprion: {
    marginBottom: 2,
  },
  textInputWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    paddingBottom: -10,

    width: '80%',
    marginTop: 10,
    alignSelf: 'center',
  },
  invoiceButton: {
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 1,
    width: 176,
    height: 37,
    borderRadius: 5,
    backgroundColor: '#17732B',
    borderColor: '#17732B',
    elevation: 5,
    // marginBottom: 15
  },
  generateInv: {
    textAlign: 'center',
    paddingTop: 5,
    color: 'white',
  },
  header: {
    backgroundColor: '#324AB2',
    height: 55,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  password: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  invoiceButton1: {
    alignSelf: 'center',
    marginTop: 30,
    width: 194,
    height: 35,

    // marginBottom: 15
  },
  generateInv1: {
    textAlign: 'center',
    paddingTop: 5,
    color: 'black',
  },

  switch: {
    marginTop: -35,
    width: 50,
    alignSelf: 'flex-end',
  },
});
