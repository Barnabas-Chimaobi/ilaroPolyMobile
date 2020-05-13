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
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableOpacity,
  AsyncStorage,
  DrawerLayoutAndroid,
  Alert,
  Image
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Menu from '../drawer/menu';

// import { Container, Header, Content, List, ListItem, Text } from "native-base";

class coursesForChat extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      // courseId: '',
      // courseContent: '',
      // showIndicator: false,
      // confirmedArray: [],
      AllocationId: []
    };
  }

  onButtonPress = () => {
    if (this.state.newSemester !== '' && this.state.selectedCourseText !== '') {
      this.setState({showIndicator: true});
    } else {
      this.setState({showIndicator: false});
    }
  };


  

  componentDidMount() {
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};
    const courseIds = params.courseId;
    console.log(params, ':ressssssst');

    this.setState({
      courseId: courseIds,
    });
  
          const newArray = params.courses.map((newData) => {
            return {
              CourseAllocationId: newData.CourseAllocationId,
      
            };
          });
  
          // this.setState((prevState) =>{
          //   return {
          //     AllocationId: [...prevState.AllocationId, newArray]
          //   }
            
          // })
          this.setState({
            AllocationId: newArray
          })
  }

  alert = () => {
    alert();
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



   remappedData =  (CourseAllocationIds) => {
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};

    console.log('ASSIGN ID: ', CourseAllocationIds);
    const newObject = this.state.AllocationId.map((item) => {
      return {
        CourseAllocationId: item.CourseAllocationId,
      };
    });

    const selectedAllocation = newObject.find((as) => as.CourseAllocationId === CourseAllocationIds);

    console.log(selectedAllocation, ':ASDDDDDDD');
    // this.setState({assignment: selectedAsignment});
    // console.log(this.state.assignment, ':ASSIGNMT');
    this.props.navigation.navigate('LiveChat', {
      alloc: selectedAllocation,
      PersonDetails: params.PersonDetails,
    });
   }


  render() {
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};
    console.log(this.state.confirmedArray, ":WERRCRCFJVFYJFG")
    // console.log(this.state.AllocationId, ":RRRRR")
    
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
                  this.props.navigation.navigate('EnterChat');
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
              Chat
            </Text>

            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'green',
                width: '90%',
                marginBottom: 15,
                alignSelf: 'center',
              }}
            />
      
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
              {params.courses.map((items, index) => {
                return (
                  <View>
                  <TouchableWithoutFeedback
                  onPress={() => {
                    this.remappedData(items.CourseAllocationId);
                  }}>
                  <View style={styles.container1}>
                    <Image
                    source={require("../../assets/chat-box.jpg")}
                    style={{width: 25,
                      height: 25}}
                    />
                    <Text style={styles.fileClick}>{items.CourseName}</Text>
                  <View>
                
                 {/* <Text style={{ fontSize:17, padding: 5, borderRadius:5, color:"white", backgroundColor:"green"}}>Chat</Text> */}
                  </View>
                </View>
                </TouchableWithoutFeedback>
                <View
                           style={{borderWidth: 0.5, borderColor:"#ECECEC", marginTop:5}}
                          />
                </View>
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
    flexDirection: "row",
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
    elevation: 10
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
    margin: 5,
  },
  fileClick: {
    alignSelf: 'center',
    fontSize: 14,
    // borderWidth: 0.11,
    padding: 5,
    // borderRadius: 5,
    width: 280,
    // borderColor: 'green',
    fontFamily: 'sans-serif-light',
    color: "black"
  },
  mainContainer: {
    flex: 1,
    margin: 5,
    borderColor: '#E5E5E5',
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    height: '100%',
  },
});

export default coursesForChat;
