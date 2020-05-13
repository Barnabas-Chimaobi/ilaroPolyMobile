import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  DrawerLayoutAndroid,
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView,
  Linking,
  Alert
  // TouchableWithoutFeedbackBase
} from 'react-native';
import {Root} from 'native-base'
import { Container, Header, Button, Content, ActionSheet} from "native-base";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontawesome from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Menu from '../drawer/menu';
import Spinner from 'react-native-loading-spinner-overlay';
import Footer from "../../component/support/support"
import Call from "../../component/support/call"




class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIndicator: false,
      clicked: null
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

  componentDidmount() {
    this.setState({showIndicator: false});
  }

  makeCall = () => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${07088391544}';
    } else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  };

  render() {
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};

    var BUTTONS = [
      { text: "Call", icon: "american-football", iconColor: "#2c8ef4",},
      { text: "E-mail", icon: "analytics", iconColor: "#f42ced" },
      { text: "Chat", icon: "aperture", iconColor: "#ea943b" },
    ];
    var DESTRUCTIVE_INDEX = 3;
    var CANCEL_INDEX = 4;

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
            <TouchableWithoutFeedback
             onPress={()=> {
               Alert.alert("No new Notifications")
             }}
            >
            <View style={styles.headerWrapper2}>
              <Fontawesome
                name="bell"
                style={{color: 'white', fontSize: 18, marginRight: 15}}
              />
            </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.container1}>

              <TouchableNativeFeedback
                onPress={() => {
                  this.props.navigation.navigate('Lecture', {
                    PersonDetails: params.PersonDetails,
                  });
                }}>
                <View style={styles.noteContainer}>
     
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
            
             
             <TouchableNativeFeedback
                  onPress={() => {
                    this.props.navigation.navigate('GetAssignment', {
                      PersonDetails: params.PersonDetails,
                    });
                  }}
             >
             <View style={styles.noteContainer}>
      
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

                   <TouchableWithoutFeedback
                    onPress={() => {
                      this.props.navigation.navigate("Cbt")
                    }}
                   >
                   <Image
                 source={require("../../assets/cbt.png")}
                 style={{
                  width: 80,
                  height:85,
                  alignSelf: 'center',
                  marginTop: 20,
                }}
                  />
                </TouchableWithoutFeedback>
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
      
              <TouchableWithoutFeedback onPress={()=> {
                this.props.navigation.navigate("EnterChat", {PersonDetails: params.PersonDetails})
              }}>
                <View>
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
             
              </TouchableWithoutFeedback>
                
            </View>
          </View>
        </View>
    
         <TouchableWithoutFeedback onPress={()=>{
           this.makeCall()
         }}>
           <View style={{position: "absolute", left: "55%", right: 0, bottom: 0, height:40, flexDirection: "row", width:150}}>
           <Text style={{ borderRadius: 5, textAlign: "center", padding: 5, marginTop: -15, marginLeft:23, color: "green"}}>Call Support</Text>
           <View style={{ borderRadius: 80, width: 50, marginTop:-30, height: 50,}}>
             <Image
              source={require("../../assets/call1.jpg")}
              style={{color: 'white', fontSize: 25, alignSelf: "center", paddingTop:5, height:50, width: 50}}

             />
           </View>
     
           </View>
        
         </TouchableWithoutFeedback>
     
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
    height: '75%',
  },
  noteContainer: {
    width: '45%',
    height: '55%',
    marginTop: "5%",
    // borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 9,
    borderBottomWidth: 2,
    // borderRightWidth: 3,
    paddingTop: 10,
  },

  container: {
    // height: "100%",
    // flex: 1
  }
});
