import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  DrawerLayoutAndroid,
  ImageBackground
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontawesome from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Menu from '../drawer/menu';
import Spinner from 'react-native-loading-spinner-overlay';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIndicator: false,
    };
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

  componentWillUnmount() {
    this.setState({showIndicator: false});
  }

  render() {
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
        <View style={styles.container}>
          <View>
            {/* {params.mappedArray.map((items, index) => {
            return (
              <Text>
                {items.FullName}
              </Text>
            );
          })} */}
          </View>
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
            <View style={styles.headerWrapper2}>
              <Fontawesome
                name="bell"
                style={{color: 'white', fontSize: 18, marginRight: 15}}
              />
            </View>
          </View>
          <View style={styles.container1}>
            {this.state.showIndicator ? (
              // <View style={styles.container}>
              //   {/*Code to show Activity Indicator*/}
              //   <ActivityIndicator size="large" color="#0000ff" />
              //   {/*Size can be large/ small*/}
              // </View>:
              <Spinner
                color={'green'}
                //visibility of Overlay Loading Spinner
                visible={this.state.showIndicator}
                //Text with the Spinner
                textContent={'Logging in...'}
                //Text style of the Spinner Text
                textStyle={styles.spinnerTextStyle}
              />
            ) : (
              <TouchableNativeFeedback
                onPress={() => {
                  this.props.navigation.navigate('Lecture', {
                    PersonDetails: params.PersonDetails,
                  });
                }}>
                <View style={styles.noteContainer}>
                  {/* <MaterialIcon
                    style={{
                      fontSize: 70,
                      color: '#CA9818',
                      alignSelf: 'center',
                      marginTop: 25,
                    }}
                    name="library-books"
                  /> */}
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
            )}
             
             <TouchableNativeFeedback
                  onPress={() => {
                    this.props.navigation.navigate('GetAssignment', {
                      PersonDetails: params.PersonDetails,
                    });
                  }}
             >
             <View style={styles.noteContainer}>
              {/* <MaterialIcon
                name="assignment"
                style={{
                  fontSize: 70,
                  color: '#CA9818',
                  alignSelf: 'center',
                  marginTop: 25,
                }}
              /> */}
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
              {/* <MaterialIcon
                name="desktop-mac"
                style={{
                  fontSize: 70,
                  color: '#CA9818',
                  alignSelf: 'center',
                  marginTop: 25,
                }}
              /> */}
                  <Image
                 source={require("../../assets/cbt.png")}
                 style={{
                  width: 80,
                  height:85,
                  alignSelf: 'center',
                  marginTop: 20,
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
                CBT Tests
              </Text>
            </View>

            <View style={styles.noteContainer}>
              {/* <MaterialIcon
                name="question-answer"
                style={{
                  fontSize: 70,
                  color: '#CA9818',
                  alignSelf: 'center',
                  marginTop: 25,
                }}
              /> */}
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
          </View>
        </View>
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
    // height: '88%',
  },
  noteContainer: {
    width: '45%',
    height: '55%',
    marginTop: "10%",
    // borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 9,
    borderBottomWidth: 2,
    // borderRightWidth: 3,
    paddingTop: 10,
  },
});
