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
  TouchableWithoutFeedback,
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

  let [Stop, setStop] = useState('');
  let [Start, setStart] = useState('');
  let [New, setNew] = useState('');
  let [New1, setNew1] = useState('');

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
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  const formatFullDate = () => {
    const dt = new Date(Start);
    const yeah = dt.toDateString();
    return setNew(`${yeah} ${formatAMPM()}`);
  };

  const formatAMPM1 = () => {
    const dt = new Date(Stop);
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  const formatFullDate1 = () => {
    const dt = new Date(Stop);
    const yeah = dt.toDateString();
    return setNew1(`${yeah} ${formatAMPM1()}`);
  };

  useEffect(() => {
    params.newArray.map((item, index) => {
      setStop(item.StopTime);
      setStart(item.StartTime);
      formatFullDate();
      formatFullDate1();
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
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate('CourseContent');
            }}>
            <MaterialIcons
              name="arrow-back"
              style={{color: 'white', fontSize: 27, marginLeft: 15}}
            />
          </TouchableWithoutFeedback>
          <Text style={{fontSize: 22, color: 'white', marginLeft: 20}}>
            Back
          </Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={{backgroundColor:"#DFE9DA", borderRadius: 5, marginBottom:  20, elevation: 10, paddingBottom: 15, margin:15}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              margin: 10,
              color: "black"
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
            Topic: {params.courseContent.toUpperCase()}
          </Text>
          <Text style={{textAlign: 'center', color: "black"}}>From: {New}</Text>
          <Text style={{textAlign: 'center', color: "black"}}>To: {New1}</Text>

        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate('LectureNotes', {
              newArray: params.newArray,
              courseContent: params.courseContent,
              newsCourse: params.newsCourse,
            });
          }}>
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
                    marginRight: 15,
                    marginLeft: 25
                  }}
                />
              </View>
              <View>
              <Text
                style={{
                  fontFamily: 'sans-serif-medium',
                  fontSize: 15,
                  paddingTop: 10,
                  color: "black"
                }}>
                Lecture Note
              </Text>
            </View>
            </View>
           
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate('VideoTutorial', {
              newArray: params.newArray,
              courseContent: params.courseContent,
              newsCourse: params.newsCourse,
            });
          }}>
          <View style={styles.container1}>
            <View style={styles.fileName}>
              {/* <Text>{items.Url.substring([20], items.Url.length).split(".")[0]}</Text> */}
              <Image
                source={require('../../assets/video-player.png')}
                style={{
                  width: 25,
                  height: 25,
                  alignSelf: 'center',
                  marginRight: 15,
                  marginLeft: 25
                }}
              />
              <View>
                <Text style={{fontFamily: 'sans-serif-medium', paddingTop: 15, color:"black"}}>
                  Video Tutorial
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate('LiveClass', {
              newArray: params.newArray,
              courseContent: params.courseContent,
              newsCourse: params.newsCourse,
            });
            // Linking.openURL(item), console.log(item)
          }}>
          <View style={styles.container1}>
            <View style={styles.fileName}>
              {/* <Text>{items.Url.substring([20], items.Url.length).split(".")[0]}</Text> */}
              <Image
                source={require('../../assets/cbt.png')}
                style={{
                  width: 25,
                  height: 25,
                  alignSelf: 'center',
                  marginRight: 15,
                  marginLeft: 25
                }}
              />
              <Text style={{fontFamily: 'sans-serif-medium', paddingTop: 15, color:"black"}}>
                Live Stream
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    marginBottom: 1,
    backgroundColor:"#DFE9DA",
    height:50,
    borderRadius:5,
    margin:15,
    elevation: 5
  },

  mainContainer: {
    // margin: 15,
    // // borderColor: '#E5E5E5',
    // // backgroundColor: 'white',
    // borderRadius: 5,
    // elevation: 5,
    // // borderBottomWidth: 3,
    // // borderRightWidth: 3,
    // height: '80%',
    // // marginBottom: "10%"
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
    justifyContent: 'space-evenly',
    padding: 10,
  },
});

export default CourseContentDetails;
