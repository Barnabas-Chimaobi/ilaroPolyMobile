import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View, Text, ScrollView} from 'react-native';

import {GiftedChat} from 'react-native-gifted-chat';

const Apps = (props) => {
  let [Chats, setChats] = useState([]);
  const {state, setParams, navigate} = props.navigation;
  const params = state.params || {};

  const PersonId = params.PersonDetails.Id;
  const CourseAllo = params.courses.map((c) => {
    return {
      CourseAllocationId: c.CourseAllocationId,
      CourseCode: c.CourseCode,
      CourseId: c.CourseId,
      CourseName: c.CourseName,
    };
  });

  const MOCK_MESSAGES = [
    // {
    //   _id: 1,
    //   text: 'Hello, World!',
    //   createdAt: new Date(),
    //   user: {
    //     _id: 2,
    //     name: 'Simple Chatter',
    //     avatar: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png',
    //   },
    // },
  ];

  const [name, setName] = useState('');
  const [isEnter, setIsEnter] = useState(false);
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const sampleCourseAllocation = CourseAllo[0];

  const loadChats = () => {
    fetch(
      `http://applications.federalpolyilaro.edu.ng/api/e_learning/EnterChatRoom?courseAllocationId=${sampleCourseAllocation.CourseAllocationId}&personId=${PersonId}`,
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
              avatar:
                'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png',
            },
          };
        });

        setMessages(remappedMessages);
      });
  };

  //loadChats();
  setInterval(() => loadChats(), 2000);

  console.log('RES_22: ', Chats);

  const onSend = async (newMessages) => {
    const [a, ...b] = newMessages;
    const response = await fetch(
      `http://applications.federalpolyilaro.edu.ng/api/e_learning/SaveChatResponse?courseAllocationId=${sampleCourseAllocation.CourseAllocationId}&response=${a.text}&personId=${PersonId}`,
    );

    const data = await response.json();

    // setMessages(GiftedChat.append(messages, newMessages));
  };

  if (!isEnter)
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          textAlign="center"
          value={name}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
        />
        <Button title="Enter" onPress={() => setIsEnter(true)} />
      </View>
    );
  else {
    const user = {
      _id: name,
      name,
      avatar:
        'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png',
    };

    return (
      <ScrollView>
                 <View style={{flex: 1}}>
        {Chats.map((chat, index) => {
          return (
            <View>
              {!chat.ActiveSender ? (
                <View style={{display: 'flex', justifyContent: 'flex-start'}}>
                  <Text>{chat.Sender}</Text>
                  <Text>{chat.Response}</Text>
                  <Text>{chat.DateSent}</Text>
                </View>
              ) : (
                <View style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Text>{chat.Sender}</Text>
                  <Text>{chat.Response}</Text>
                  <Text>{chat.DateSent}</Text>
                </View>
              )}
            </View>
          );
        })}
        {/* <GiftedChat
            messages={messages}
            onSend={newMessages => onSend(newMessages)}
            user={user}
            renderUsernameOnMessage
          /> */}
          <TextInput style={{borderWidth: 1}}/>
      </View>

      </ScrollView>
         );
  }
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
    width: '50%',
  },
});

export default Apps;
