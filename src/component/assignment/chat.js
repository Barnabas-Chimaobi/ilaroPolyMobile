import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, TextInput, View , TouchableWithoutFeedback, Text} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import MaterialIcon from "react-native-vector-icons/MaterialIcons"

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
    headerShown: false
  }
  const [name, setName] = useState('');
  const [isEnter, setIsEnter] = useState("");
  const [messages, setMessages] = useState([]);
  let [Chats, setChats] = useState([]);


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


  // const sampleCourseAllocation = CourseAllo[0];

  const loadChats = () => {
    fetch(
      `http://applications.federalpolyilaro.edu.ng/api/e_learning/EnterChatRoom?courseAllocationId=${sampleCourseAllocation}&personId=${PersonId}`,
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        setChats(json.Output.EChatBoards);

        const remappedMessages = Chats.map((c, index) => {
          const addIndex = index + 1;
          return {
            _id: addIndex,
            text: c.Response,
            createdAt: c.DateSent,
            user: {
              _id: addIndex,
              name: c.Sender,
              // avatar:
              //   'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png',
            },
          };
        });

        setIsEnter(remappedMessages);
      });
  };

  // setInterval(() => loadChats(), 10000);

  console.log('RES_22: ', Chats);

  const onSend = async (newMessages) => {
    const [a, ...b] = newMessages;
    const response = await fetch(
      `http://applications.federalpolyilaro.edu.ng/api/e_learning/SaveChatResponse?courseAllocationId=${sampleCourseAllocation}&response=${a.text}&personId=${PersonId}`,
    );

    const data = await response.json();
    console.log(response, ":CHATTTT")
    console.log( ":CHATTTT")

    setMessages(GiftedChat.append(isEnter, newMessages));
    loadChats()

  };

  useEffect(()=>{
    loadChats()
  },[])

  //  loadChats()
  setInterval(()=>{
  loadChats()
   },200000)




  // const onSend = newMessages => {
  //   setMessages(GiftedChat.append(messages, newMessages));
  // };
  
       const user = { _id: name, 
        name, 
      // avatar: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png'
      };

      return (
        <View style={{ flex: 1, backgroundColor: "#DFE9DA" }}>
              <View style={styles.headerWrapper}>
          <View style={styles.headerWrapper1}>
            <TouchableWithoutFeedback onPress={()=> {
              props.navigation.navigate("CoursesForChat")
            }}>
              <MaterialIcon
                name="arrow-back"
                // name="keyboard-backspace"
                style={{color: 'white', fontSize: 27, marginLeft: 15}}
              />
            </TouchableWithoutFeedback>
            <Text style={{fontSize: 22, color: 'white', marginLeft: 20}}>
              Back
            </Text>
          </View>
        </View>
          <GiftedChat
            messages={messages}
            onSend={newMessages => onSend(newMessages)}
            user={user}
            renderUsernameOnMessage
          />
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
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '50%'
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#17732B',
    height: 52,
    elevation: 10
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