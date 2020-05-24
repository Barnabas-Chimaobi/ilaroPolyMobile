import React, {Component} from 'react';
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
  TouchableWithoutFeedback,
  AsyncStorage,
  DrawerLayoutAndroid,
  Alert,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Menu from '../drawer/menu';

// import { Container, Header, Content, List, ListItem, Text } from "native-base";

class CourseContent extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      courseId: '',
      courseContent: '',
      showIndicator: false,
      confirmedArray: [],
    };
  }

  onButtonPress = () => {
    if (this.state.newSemester !== '' && this.state.selectedCourseText !== '') {
      this.setState({showIndicator: true});
    } else {
      this.setState({showIndicator: false});
    };
    setTimeout(()=>{
      this.setState({showIndicator: false})
    }, 15000)
  };

  componentDidMount() {
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};
    const courseIds = params.courseId;
    console.log(params, ':ressssssst');

    this.setState({
      courseId: courseIds,
    });
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

  // let Id, FirstName, OtherName, FullName, ImageFileUrl;
  // AsyncStorage.getItem('PersonDetails').then(dtr => {
  //   dtr = JSON.parse(dtr);
  //   console.log('ERROR: ', dtr);

  //   ImageFileUrl = dtr.ImageFileUrl;
  //   (FullName = dtr.FullName), (Id = dtr.Id);
  // });

  viewCourseContentDetails = (contentId) => {
    fetch(
      `https://applications.federalpolyilaro.edu.ng/api/E_Learning/CourseContentDetails?ContentId=${contentId}&CourseId=${this.state.courseId}`,
    )
      .then((data) => data.json())
      .then((Data) => {
        const newArray = Data.Output.map((newData) => {
          // let youtubeId = newData.VideoUrl.split('/');
          // youtubeId = youtubeId[youtubeId.length - 1];
          return {
            Id: newData.Id,
            Url: newData.Url,
            VideoUrl: newData.VideoUrl,
            StartTime: newData.StartTime,
            StopTime: newData.StopTime,
            LiveStream: newData.LiveStreamingLink,
            // YoutubeVideoUrl: youtubeId,
          };
        });

        this.setState({
          confirmedArray: newArray,
          showIndicator: false,
        });
        newArray == ''
          ? Alert.alert('there is no content for this topic')
          : console.log(Data, ':SSSSSS');

        const {state, setParams, navigate} = this.props.navigation;
        const params = state.params || {};
        this.props.navigation.navigate('CourseContentDetails', {
          newArray: newArray,
          courseContent: this.state.courseContent,
          newsCourse: params.newsCourse,
          courses: params.courses,
          PersonDetails: params.PersonDetails,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};
    console.log(this.state.confirmedArray, ':WERRCRCFJVFYJFG');

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
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
          <View style={styles.headerWrapper}>
            <View style={styles.headerWrapper1}>
              <TouchableNativeFeedback
                onPress={() => {
                  this.props.navigation.navigate('Lecture');
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
            <ScrollView>
         
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
                margin: 15,
                color: "black"
              }}>
              COURSE: {params.newsCourse.toUpperCase()} 
            </Text>

            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'green',
                width: '70%',
                marginBottom: 15,
                alignSelf: 'center',
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                color: 'green',
                fontFamily: 'sans-serif-light',
                fontSize: 18,
                marginBottom: 20,
                marginLeft: 10
              }}>
              Topics:
            </Text>
            <Spinner
              color={'green'}
              //visibility of Overlay Loading Spinner
              visible={this.state.showIndicator}
              //Text with the Spinner
              textContent={'Loading...'}
              //Text style of the Spinner Text
              textStyle={styles.spinnerTextStyle}
            />
            <View>
  
              {params.newArray.map((items, index) => {
                return (
                  <SectionList
                    sections={[
                      {title: 'COURSE NAME', data: [items.Name]},
                      // { ContentId: "CONTENT ID", data: [items.Id] }
                    ]}
                    renderItem={({item}) => (
                      <View style={styles.container1}>
                        <View>
                          <TouchableWithoutFeedback
                            id={item.Id}
                            onPress={() => {
                              this.viewCourseContentDetails(items.Id);
                              this.onButtonPress();
                              this.setState({
                                courseContent: item,
                              });
                              console.log(
                                'ABIAAAAAAAA:',
                                this.state.courseContent,
                              );
                              console.log('BARNNNNNN:', params.newArray);
                            }}>
                            <View
                              style={{
                                display: "flex",
                                flexDirection: 'row',
                                justifyContent: "space-between",
                              }}>
                              <View style={{width: "90%"}}>
                                <Text style={styles.fileClick}>
                                  {items.Name.toUpperCase()}
                                </Text>
                              </View>
                              <View>
                                <MaterialIcons name="keyboard-arrow-right" style={{fontSize:20,marginTop: 3}} />
                              </View>
                            </View>
                          </TouchableWithoutFeedback>
                          <View
                           style={{borderWidth: 0.5, borderColor:"#ECECEC", marginTop:5}}
                          />
                        </View>
                      </View>
                    )}
                    // renderSectionHeader={({section}) => (
                    //   <Text style={styles.sectionHeader}>{section.title}</Text>
                    // )}
                    keyExtractor={(item, index) => index}
                  />
                );
              })}
             
            </View>
           </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </DrawerLayoutAndroid>
    );
  }
}

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
  item: {
    // padding: 10,
    fontSize: 16,
    // height: 44,
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
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    margin: 5,
  },
  fileClick: {
    alignSelf: 'center',
    fontSize: 14,
    padding: 5,
    fontFamily: 'sans-serif-light',
    paddingRight:100,
    color: "black",
    width: "100%"
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
  },
});

export default CourseContent;
