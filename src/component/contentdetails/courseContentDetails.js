import React, {Component, useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TextInput,
  ScrollView,
  StyleSheet,
  SectionList,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  AsyncStorage,
  DrawerLayoutAndroid,
  Linking,
  Alert,
  Image,
} from 'react-native';
import {WebView} from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Menu from '../drawer/menu';
// import {Item} from 'native-base';

const CourseContentDetails = (props) => {
  CourseContentDetails.navigationOptions = {
    headerShown: false,
  };

 let [Stop, setStop] = useState("")
 let [Start, setStart] = useState("")
 let [New, setNew] = useState("")
 let [New1, setNew1] = useState("")

  const {state, setParams, navigate} = props.navigation;
  const params = state.params || {};
  // console.log("RESTRE:", params)


  const formatAMPM = () => {
    const dt = new Date(Start);
    var hours = dt.getHours() - 1;
    var minutes = dt.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  
  const formatFullDate=()=>{
    const dt = new Date(Start);
   const yeah = dt.toDateString()
    return  setNew(`${yeah} ${formatAMPM()}`);
  
  }

 
  const formatAMPM1 = () => {
    const dt = new Date(Stop);
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  
  const formatFullDate1=()=>{
    const dt = new Date(Stop);
   const yeah = dt.toDateString()
    return  setNew1(`${yeah} ${formatAMPM1()}`);
  
  }

  useEffect(() => {  
    params.newArray.map((item, index) => {
      setStop(item.StopTime)
      setStart(item.StartTime)
      formatFullDate()
      formatFullDate1()
        
       });
    });

  // const dt = new Date();
  // const gis = dt.toLocaleString('en-US',{hour:"numeric", minute: "numeric", hour: 12})
  // console.log(gis,":BBBBBBBBBBBBBB")
  // console.log("AAAAAAAA:",New)



  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
      <View style={styles.headerWrapper}>
        <View style={styles.headerWrapper1}>
          <TouchableNativeFeedback
            onPress={() => {
              props.navigation.navigate('CourseContent');
            }}>
            <MaterialIcons
              name="arrow-back"
              style={{color: 'white', fontSize: 27, marginLeft: 15}}
            />
          </TouchableNativeFeedback>
          <Text style={{fontSize: 22, color: 'white', marginLeft: 20}}>
            Back
          </Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              margin: 10,
            }}>
            Course: {params.newsCourse}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              margin: 10,
              marginTop: 0,
              fontFamily: 'sans-serif-thin',
              color: 'green',
            }}>
            Topic: {params.courseContent}
          </Text>
          <Text style={{textAlign: "center"}}>From: {New}</Text>
          <Text style={{textAlign: "center"}}>To:      {New1}</Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'green',
              width: '80%',
              marginBottom: 20,
              marginTop: 10,
              alignSelf: 'center',
            }}
          />
        </View>

        <View style={styles.container1}>
          <View style={styles.fileName}>
            {/* <Text>{items.Url.substring([20], items.Url.length).split(".")[0]}</Text> */}

            <View>
              <Image
                source={require('../../assets/notebook.png')}
                style={{
                  width: 25,
                  height: 20,
                  alignSelf: 'center',
                  marginTop: 10,
                  marginRight: 5,
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'sans-serif-medium',
                  fontSize: 15,
                  paddingTop: 10,
                }}>
                Lecture Note
              </Text>
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('LectureNotes', {
                  newArray: params.newArray,
                  courseContent: params.courseContent,
                  newsCourse: params.newsCourse,
                });
              }}>
              <Text style={styles.itemlink}>View</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container1}>
          <View style={styles.fileName}>
            {/* <Text>{items.Url.substring([20], items.Url.length).split(".")[0]}</Text> */}
            <Image
              source={require('../../assets/cbt.png')}
              style={{
                width: 25,
                height: 25,
                alignSelf: 'center',
                marginRight: 5,
              }}
            />
            <View>
              <Text style={{fontFamily: 'sans-serif-medium', paddingTop: 10}}>
                Video Tutorial
              </Text>
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('VideoTutorial', {
                  newArray: params.newArray,
                  courseContent: params.courseContent,
                  newsCourse: params.newsCourse,
                });
              }}>
              <Text style={styles.itemlink}>View</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container1}>
          <View style={styles.fileName}>
            {/* <Text>{items.Url.substring([20], items.Url.length).split(".")[0]}</Text> */}
            <Image
              source={require('../../assets/cbt.png')}
              style={{
                width: 25,
                height: 25,
                alignSelf: 'center',
                marginRight: 5,
              }}
            />
            <Text style={{fontFamily: 'sans-serif-medium', paddingTop: 10}}>
              Live Stream
            </Text>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('LiveClass', {
                  newArray: params.newArray,
                  courseContent: params.courseContent,
                  newsCourse: params.newsCourse,
                });
                // Linking.openURL(item), console.log(item)
              }}>
              <Text style={styles.itemlink}>Streams</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container1}>
          <View style={styles.fileName}>
            {/* <Text>{items.Url.substring([20], items.Url.length).split(".")[0]}</Text> */}
            <Image
              source={require('../../assets/cbt.png')}
              style={{
                width: 25,
                height: 25,
                alignSelf: 'center',
                marginRight: 5,
              }}
            />
            <Text style={{fontFamily: 'sans-serif-medium', paddingTop: 10}}>
              Live Chat
            </Text>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('LiveChat', {
                  newArray: params.newArray,
                  courseContent: params.courseContent,
                  newsCourse: params.newsCourse,
                  courses: params.courses,
                  PersonDetails:params.PersonDetails
                });
                // Linking.openURL(item), console.log(item)
              }}>
              <Text style={styles.itemlink}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{height: 300}}></View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  itemlink: {
    padding: 8,
    fontSize: 15,
    fontFamily: 'sans-serif-condensed',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'green',
    color: 'white',
    borderColor: 'green',
    width: 70,
    textAlign: 'center',
  },

  fileName: {
    flexDirection: 'row',
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

  container1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
  },

  mainContainer: {
    margin: 15,
    borderColor: '#E5E5E5',
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    height: '80%',
    // marginBottom: "10%"
  },

  item: {
    padding: 8,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'green',
    color: 'white',
    borderColor: 'green',
    fontFamily: 'sans-serif-condensed',
    width: 70,
    textAlign: 'center',
  },

  containerss: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 10
  }
});

export default CourseContentDetails;
