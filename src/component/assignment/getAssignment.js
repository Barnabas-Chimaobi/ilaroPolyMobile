import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableNativeFeedback,
  Button,
  Alert,
  DrawerLayoutAndroid,
  AsyncStorage
} from 'react-native';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import Menu from '../drawer/menu';
// import { TouchableWithoutFeedback } from "react-native-gesture-handler"

class GetAssignment extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentIteration: null,
      personId: '',
      CourseId: [],
      assignment: '',
      modalVisible: false,
      isModalVisible: false,
      activeState1: false,
      activeState2: false,
      activeState3: false,
      activeState4: false,
      showIndicator: true,
      submitted: []

      // date: ""
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};

    fetch(
      `https://applications.federalpolyilaro.edu.ng/api/e_learning/AssignmentByCategory?personId=${params.PersonDetails.Id}`,
    )
      .then((response) => response.json())
      .then((Data) => {
        const assignmentArray = Data.Output.NotSubmittedAssignment.map(
          (res) => {
            return {
              Id: res.Id,
              Assignment: res.Assignment,
              URL: res.URL,
              Instructions: res.Instructions,
              DateSet: res.DateSet,
              DueDate: res.DueDate,
              AssignmentinText: res.AssignmentinText,
              Semester: res.Semester,
              CourseName: res.CourseName,
              CourseCode: res.CourseCode,
            };
          },
        );

        const submittedAssignmentArray = Data.Output.SubmittedAssignment.map((res) => {
          return {
            Id: res.Id,
            Assignment: res.Assignment,
            URL: res.URL,
            // Instructions: res.Instructions,
            DateSet: res.DateSet,
            DueDate: res.DueDate,
            // AssignmentinText: res.AssignmentinText,
            SubmittedAssignmentUrl: res.AssignmentSubmission.SubmittedAssignmentUrl,
            SubmittedAssignmentText: res.AssignmentSubmission.SubmittedAssignmentText,
            SubmittedAssignmentScore: res.AssignmentSubmission.SubmittedAssignmentScore,
            CourseName: res.CourseName,
            CourseCode: res.CourseCode,
          };
        });

        this.setState({
          CourseId: assignmentArray,
          submitted: submittedAssignmentArray
        });
          
        this.setState({showIndicator: false});

        AsyncStorage.setItem(
          'Assignments',
          JSON.stringify(Data),
        );

        console.log(Data, ':DDDDDDDDDDDD');
        console.log(this.state.submitted, ":SUBMITTEDDDDDD")
        console.log(params);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  remapp = (assignmentId) => {
    console.log('ASSIGN ID: ', assignmentId);
    const newObject = this.state.CourseId.map((item) => {
      return {
        Id: item.Id,
        instruction1: item.Instructions,
        Text: item.AssignmentinText,
        Url: item.URL,
        Semester: item.Semester,
        DateSet: item.DateSet,
        DueDate: item.DueDate,
        Assignment: item.Assignment,
        CourseName: item.CourseName,
        CourseCode: item.CourseCode,
      };
    });

    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};

    this.setState({modalVisible: false});

    const selectedAsignment = newObject.find((as) => as.Id === assignmentId);

    console.log(selectedAsignment, ':ASDDDDDDD');
    this.setState({assignment: selectedAsignment});
    console.log(this.state.assignment, ':ASSIGNMT');
    this.props.navigation.navigate('ViewAssignment', {
      finds: selectedAsignment,
      PersonDetails: params.PersonDetails,
    });
  };

  toggleModal() {
    this.setState({
      isOpen: true,
    });
  }
  
  
  onButtonPress = () => {
    if (this.state.newSemester) {
      this.setState({showIndicator: true});
    } else {
      this.setState({showIndicator: false});
    };
    setTimeout(()=>{
      this.setState({showIndicator: false})
    }, 15000)
  };


  handlePress() {
    this.setState({modalVisible: true});
    return this.state.modalVisible;
  }

  renderBtnConditionally(item) {
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};
    return this.state.modalVisible ? (
      <View
        style={{
          height: 60,
          width: 120,
          borderWidth: 0.5,
          backgroundColor: 'white',
          borderColor: 'gray',
          marginLeft: -95,
          paddingTop: 10,
          marginTop: -50,
          elevation: 5,
          paddingLeft: 5,
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.remapp(item.Id);
          }}>
          <Text style={{color: 'green'}}>View Assignment</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            this.remapp(item.Id);
            this.props.navigation.navigate('SubmitAssignment', {
              PersonDetails: params.PersonDetails,
              CourseId: this.state.assignment,
            });
          }}>
          <Text style={{color: 'green', paddingTop: 10}}>
            Submit Assignment
          </Text>
        </TouchableWithoutFeedback>
      </View>
    ) : null;
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

  render() {
    // const activeStyle = {
    //   // borderTopWidth: 5,
    //   // borderTopColor: 'green',
    //   // paddingTop: -15,
    // };
    // const activePosition = {
    //   // position: 'absolute',
    //   position: 'absolute',
    //   top: 27,
    //   // backgroundColor: 'green',
    //   borderBottomColor: 'green',
    //   borderBottomWidth: 5,
    //   // borderRadius: 50,
    //   width: 120,
    //   height: 5,
    //   alignSelf: 'center',
    // };

    let date = new Date();
    let dates = date.toDateString();
    let eachDate = date.getDate();
    let eachYear = date.getFullYear();
    let eachMonth = date.getMonth();
    let eachHour = date.getHours();
    let eachMinute = date.getUTCMinutes();
    console.log(eachHour, ':DATESSSSSSSSSSSSSSSSSSS');

    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};

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
        <View style={{flex: 1}}>
          <View style={styles.headerWrapper}>
            <View style={styles.headerWrapper1}>
              <TouchableNativeFeedback
                onPress={() => {
                  this.props.navigation.navigate('Dashboard');
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

          <View style={styles.footer}>
            <TouchableWithoutFeedback
              onPress={() => {
                return this.props.navigation.navigate('GetAssignment');
              }}>
              <View
                style={
                  // this.state.activeState1 &&
                  this.props.navigation.state.routeName === 'GetAssignment'
                }>
                <View
                  style={
                    this.props.navigation.state.routeName === 'GetAssignment'
                    //  &&
                    // this.state.activeState1
                  }></View>
                <Text style={styles.text1}>Pending Assignment</Text>
              </View>
            </TouchableWithoutFeedback>
            <Spinner
              color={'green'}
              //visibility of Overlay Loading Spinner
              visible={this.state.showIndicator}
              //Text with the Spinner
              textContent={'Loading...'}
              //Text style of the Spinner Text
              textStyle={styles.spinnerTextStyle}
            />
            <TouchableWithoutFeedback
              onPress={() => {
                // this.setState({
                //   activeState2: true,
                //   activeState1: false,
                //   activeState3: false,
                //   activeState4: false
                // });
                this.props.navigation.navigate('SubmittedAssignment', {
                  PersonDetails: params.PersonDetails,
                  submitted: this.state.submitted
                });
              }}>
              <View
                style={
                  // this.state.activeState2
                  this.props.navigation.state.routeName ===
                    'SubmittedAssignment' && activeStyle
                }>
                <View
                  style={
                    // this.state.activeState2
                    this.props.navigation.state.routeName ===
                      'SubmittedAssignment' && activePosition
                  }></View>
                <Text style={styles.text}>Submitted Assignment</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {/* <View style={{flex: 1}}> */}
          <ScrollView>
            <View>
              {this.state.CourseId.map((item, index) => {
                const apiDate = new Date(item.DueDate);
                //const apiDate = item.DueDate;

                var hours = apiDate.getHours() - 1;
                var minutes = apiDate.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0' + minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                let trueTime = `${apiDate.getDate()}/${apiDate.getMonth() + 1}/${apiDate.getUTCFullYear()} - ${strTime}`;
                //let trueTime = `${apiDate.toLocaleString()} - ${strTime}`;
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.setState({
                        modalVisible: false,
                      });
                    }}>
                    <View>
                      <View key={index}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          { new Date().getTime() > apiDate.getTime() ? (
                            <TouchableWithoutFeedback
                              onPress={() => {
                                // this.remapp(item.Id);
                                Alert.alert("Due Date for Assignment submission exceeded")
                              }}>
                              <View style={{flexDirection: 'row'}}>
                                <Image
                                  source={require('../../assets/fine-books.png')}
                                  style={{
                                    margin: 8,
                                    marginTop: 25,
                                    width: 45,
                                    height: 45,
                                  }}
                                />

                                <View style={{marginTop: 15, width: "85%"}}>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      width: '98%',
                                      marginBottom: 3, color: "black"
                                    }}>
                                    {item.CourseCode}- {item.CourseName}
                                  </Text>
                                  <Text
                                    style={{
                                      width: 270,
                                      marginBottom: 3,
                                      fontFamily: 'sans-serif-light',
                                      fontSize: 14, color: "black"
                                    }}>
                                    {item.Assignment.toUpperCase()}
                                  </Text>

                                  <View style={{flexDirection: 'row'}}>
                                    <Image
                                      source={require('../../assets/schedule.png')}
                                      style={{marginRight: 5}}
                                    />
                                    <Text
                                      style={{fontFamily: 'sans-serif-light', color: "black"}}>
                                      {trueTime}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              {/* <Text style={{color: 'green'}}>View Assignment</Text> */}
                            </TouchableWithoutFeedback>
                          ) : (
                            <TouchableWithoutFeedback
                              onPress={() => {
                                this.remapp(item.Id);
                              }}>
                              <View style={{flexDirection: 'row'}}>
                                <Image
                                  source={require('../../assets/fine-books.png')}
                                  style={{
                                    margin: 8,
                                    marginTop: 25,
                                    width: 45,
                                    height: 45,
                                  }}
                                />

                                <View style={{marginTop: 15, width:"85%"}}>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      width: '98%',
                                      marginBottom: 3, color: "black"
                                    }}>
                                    {item.CourseCode}- {item.CourseName}
                                  </Text>
                                  <Text
                                    style={{
                                      width: 270,
                                      marginBottom: 3,
                                      fontFamily: 'sans-serif-light',
                                      fontSize: 14, color: "black"
                                    }}>
                                    {item.Assignment.toUpperCase()}
                                  </Text>

                                  <View style={{flexDirection: 'row'}}>
                                    <Image
                                      source={require('../../assets/schedule.png')}
                                      style={{marginRight: 5}}
                                    />
                                    <Text
                                      style={{fontFamily: 'sans-serif-light', color: "black"}}>
                                      {trueTime}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              {/* <Text style={{color: 'green'}}>View Assignment</Text> */}
                            </TouchableWithoutFeedback>
                          )}

                          {/* <View style={{marginLeft: -50}}>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                this.setState({
                                  currentIteration: index,
                                  modalVisible: true,
                                });
                              }}>
                              <MaterialIcon
                                style={{
                                  color: 'gray',
                                  fontSize: 20,
                                  marginTop: 20,
                                }}
                                name="more-vert"
                              />
                            </TouchableWithoutFeedback>

                            {this.state.currentIteration === index
                              ? this.renderBtnConditionally(item)
                              : null}
                          </View> */}
                        </View>
                      </View>
                      <View
                        style={{
                          borderBottomWidth: 0.5,
                          borderBottomColor: 'gray',
                          width: '83%',
                          marginBottom: 5,
                          marginTop: 12,
                          marginLeft: 50,
                        }}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          </ScrollView>
          {/* </View> */}
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    borderTopWidth: 2,
    borderTopColor: '#F6F6F6',
  },
  text: {
    color: '#000000',
    fontSize: 14,
    paddingTop: 7,
    paddingBottom: 9,
    width: 175,
    marginTop: 10,
    paddingLeft: 30,
    color: 'black',
    backgroundColor: '#E5E5E5',
    borderRadius: 5,
    marginLeft: -10,
  },
  text1: {
    color: 'green',
    fontSize: 14,
    paddingTop: 7,
    paddingBottom: 9,
    // borderWidth: 1,
    width: 175,
    marginTop: 10,
    paddingLeft: 20,
    color: 'white',
    backgroundColor: 'green',
    borderRadius: 5,
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
});

export default GetAssignment;
