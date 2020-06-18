import React, {useState, useEffect, useRef} from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Header } from 'react-navigation-stack';
import {GiftedChat} from 'react-native-gifted-chat';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
// import PushNotification from "react-native-push-notification";

const MOCK_MESSAGES = [
  {
    _id: 1,
    text: 'Hello, World!',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Simple Chatter',
      // avatar: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png',
    },
  },
];

const Apps = (props) => {
  Apps.navigationOptions = {
    headerShown: false,
  };
  const [name, setName] = useState('');
  const [isEnter, setIsEnter] = useState([]);
  const [messages, setMessages] = useState([]);
  let [Chats, setChats] = useState([]);
  let [Input, setInput] = useState('');
  let [DateOfChat, setDateOfChat] = useState("")
  const [time, setTime] = useState(Date.now());
  // const [Alert, setAlert] = useState("")

  const {state, setParams, navigate} = props.navigation;
  const params = state.params || {};

  const PersonId = params.PersonDetails.Id;
  // const CourseAllo = params.courses.map((c) => {
  //   return {
  //     CourseAllocationId: c.CourseAllocationId,
  //     CourseCode: c.CourseCode,
  //     CourseId: c.CourseId,
  //     CourseName: c.CourseName,
  //   };
  // });
  const sampleCourseAllocation = params.alloc.CourseAllocationId;

  // // const sampleCourseAllocation = CourseAllo[0];

  // PushNotification.configure({
  //   onRegister: function (token) {
  //     console.log("TOKEN:", token);
  //   },
   
  //   onNotification: function (notification) {
  //     console.log("NOTIFICATION:", notification);

  //     notification.finish(PushNotificationIOS.FetchResult.NoData);
  //   },
  //      permissions: {
  //     alert: true,
  //     badge: true,
  //     sound: true,
  //   },

  //   popInitialNotification: true,
  //   requestPermissions: true,
  // });

  // testNotification = () => {
  //   PushNotification.localNotificationSchedule({
  //     //... You can use all the options from localNotifications
  //     title: "notification",
  //     message: "My Notification Message", // (required)
  //     date: new Date(Date.now() + 10 * 1000), // in 60 secs
  //   });
  // }

  // PushNotification.localNotificationSchedule({ 
  //   message: "My Notification",
  //    date: new Date(Date.now() + 500 * 1000),  
  // });

  

  const loadChatMessages = async () => {
    const response = await fetch(
      `https://applications.federalpolyilaro.edu.ng/api/e_learning/EnterChatRoom?courseAllocationId=${sampleCourseAllocation}&personId=${PersonId}`,
      {method: 'GET'},
    );

    const jsonResponse = await response.json();
    // setChats(jsonResponse.Output.EChatBoards);

    // const remappedMessages = jsonResponse.Output.EChatBoards.map((c, index) => {
    //   const addIndex = index + 1;
    //   return {
    //     _id: addIndex,
    //     text: c.Response,
    //     createdAt: c.DateSent,
    //     user: {
    //       _id: addIndex,
    //       name: c.Sender,
    //       // avatar:
    //       //   'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png',
    //     },
    //   };
    // });

    // console.log("EChats REMAPP: ", jsonResponse.Output.EChatBoards);

    setIsEnter(jsonResponse.Output.EChatBoards);

  };

  // const alertChat = isEnter.map((res) =>{
  //    return res.Response
  // })

  // setAlert(alertChat)

  // const loadChats = () => {
  //   fetch(
  //     `http://applications.federalpolyilaro.edu.ng/api/e_learning/EnterChatRoom?courseAllocationId=${sampleCourseAllocation}&personId=${PersonId}`,
  //   )
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (json) {
  //       setChats(json.Output.EChatBoards);

  //       const remappedMessages = Chats.map((c, index) => {
  //         const addIndex = index + 1;
  //         return {
  //           _id: addIndex,
  //           text: c.Response,
  //           createdAt: c.DateSent,
  //           user: {
  //             _id: addIndex,
  //             name: c.Sender,
  //             // avatar:
  //             //   'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png',
  //           },
  //         };
  //       });

  //       setIsEnter(remappedMessages);
  //     });
  // };

  //console.log('RES_22: ', Chats);

  const onSend = async () => {
    //const [a, ...b] = newMessages;
    const response = await fetch(
      `http://applications.federalpolyilaro.edu.ng/api/e_learning/SaveChatResponse?courseAllocationId=${sampleCourseAllocation}&response=${Input}&personId=${PersonId}`,
    );

    const data = await response.json();

    await loadChatMessages();

    console.log(response, ':CHATTTT');
    console.log(Input, ': CHATTTT');

    setInput('');

   
    //setMessages(GiftedChat.append(isEnter, newMessages, true));
  };

  const myAsync = async () => {
    await loadChatMessages();
  };

  const myAsync1 = () => {
    setInterval(async () => await loadChatMessages(), 15000);
  };

  // const apiDate = new Date(item.DueDate);
  //const apiDate = item.DueDate;

  // var hours = apiDate.getHours() - 1;
  // var minutes = apiDate.getMinutes();
  // var ampm = hours >= 12 ? 'pm' : 'am';
  // hours = hours % 12;
  // hours = hours ? hours : 12; // the hour '0' should be '12'
  // minutes = minutes < 10 ? '0' + minutes : minutes;
  // var strTime = hours + ':' + minutes + ' ' + ampm;

  useEffect(() => {
    myAsync();

    const date = new Date()
    const chatDate = date.toDateString()
    setDateOfChat(chatDate)

    myAsync1()
    // testNotification()
    const interval = setInterval(() => {
      // testNotification()
    }, 1000);
    return () => clearInterval(interval);  
  }, 
    []);


  const scrollViewRef = useRef();

  return (
    <View style={{flex: 1, backgroundColor: '#E5DDD5'}}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerWrapper1}>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate('CoursesForChat');
            }}>
            <MaterialIcon
              name="arrow-back"
              // name="keyboard-backspace"
              style={{color: 'white', fontSize: 27, marginLeft: 15}}
            />
          </TouchableWithoutFeedback>
          <Text style={{fontSize: 17, color: 'white', marginLeft: 20}}>
            {params.CName}
          </Text>
        </View>
      </View>
      {/* <GiftedChat
            messages={messages}
            onSend={newMessages => onSend(newMessages)}
            user={user}
            renderUsernameOnMessage
          /> */}
      <View style={{flex: 1}}>
        <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={(contentWidth, contentHeight)=> {scrollViewRef.current.scrollToEnd({animated: true})}}
      >
        
        <Text style={{color: "#000000", textAlign: "center"}}>{DateOfChat}</Text>
          {isEnter?.length > 0 ? (
            isEnter.map((message, index) => {
                const apiDate = new Date(message.DateSent);
              var hours = apiDate.getHours() - 1;
              var minutes = apiDate.getMinutes();
              var ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0' + minutes : minutes;
              var strTime = hours + ':' + minutes + ' ' + ampm;

              let time = new Date(message.DateSent)
              let times = time.toDateString()
              let stripDay = times.substring(3, times.length)

              DateOfChat= `${stripDay} ${strTime}`
              return (
                <View>
                  {message.ActiveSender ? (
                    <View style={styles.sender}>
                        <Text style={{textAlign: "left",color: "#000000",}}>{message.Response}</Text>
                        <Text style={{textAlign: "right", color: "#000000", marginTop: 5}} >{DateOfChat}</Text>

                    </View>
                  ) : (
                    <View style={styles.receiver}>
                     <Text style={{textAlign: "left",color: "green"}}>{message.Sender.toUpperCase()}</Text>
                    <Text style={{textAlign: "left",color: "#000000"}}>{message.Response}</Text>
                    <Text style={{textAlign: "right", color: "#000000", marginTop: 5}} >{DateOfChat}</Text>
                    {/* <Text style={{textAlign: "right", color: "#000000"}} >{message.DateSent}</Text> */}


                </View>
                    
                  )}
                </View>
              );
            })
          ) : (
            <View>
              <Text>No Messages To Display Yet</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <View style={{marginTop: 60, flexDirection: 'row'}}>
        <TextInput
          style={styles.textInput1}
          // name="regno"
          onChangeText={(text) => setInput(text)}
          value={Input}
          placeholder="Type a Message"
          clearTextOnFocus={true}
          multiline={true}
        />
        <View
          style={{
            position: 'absolute',
            left: 310,
            bottom: 20,
            right: 5,
            borderRadius: 50,
            height: 45,
            marginBottom: -13,
            backgroundColor: 'green',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              onSend();
            }}>
            <FontAwesome
              name="paper-plane"
              style={{
                alignSelf: 'center',
                paddingTop: 8,
                color: 'white',
                fontSize: 25,
              }}
            />
            {/* <Text style={{alignSelf:"center", paddingTop:13}} >Send</Text> */}
          </TouchableWithoutFeedback>
        </View>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput1: {
    // height: 40,
    // borderColor: 'gray',
    // borderWidth: 1,
    width: '80%',
    position: 'absolute',
    left: 5,
    right: 0,
    bottom: 5,
    borderRadius: 20,
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },

  sender: {
    // textAlign: 'right',
    backgroundColor: '#e9fac8',
    marginTop: 5,
    marginLeft: 90,
    marginRight: 20,
    padding: 5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    color:"#000000",

  },
  receiver: {
    textAlign: 'left',
    backgroundColor: '#ffffff',
    marginTop: 5,
    marginLeft: 20,
    marginRight: 90,
    padding: 5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    color: "#000000",
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#17732B',
    height: 52,
    elevation: 10,
  },

  headerWrapper1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerWrapper2: {
    alignSelf: 'center',
  },
});

export default Apps;
