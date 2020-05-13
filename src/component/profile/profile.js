import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import {DrawerLayoutAndroid} from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Container, Drawer} from 'native-base';
import Menu from '../drawer/menu';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
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

  render() {
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};
    console.log(params.person, ':TTTTTTTTTTTTTT');

    //  const navigationView = (
    //     <View style={{flex: 1, backgroundColor: '#fff'}}>
    //       <Menu
    //         navigation={this.props.navigation}
    //         closeDrawer={this.closeDrawer}
    //       />
    //       <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
    //     </View>
    //   );

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
        <View style={styles.headerWrapper}>
          <View style={styles.headerWrapper1}>
            <TouchableNativeFeedback onPress={(this.onPress = this.openDrawer)}>
              <MaterialIcon
                name="menu"
                // name="keyboard-backspace"
                style={{color: 'white', fontSize: 27, marginLeft: 15}}
              />
            </TouchableNativeFeedback>
            <Text style={{color: 'white', fontSize: 20, marginLeft: 30}}>
              Profile
            </Text>
          </View>
        </View>
        <View>
          <View>
            <Text
              style={{
                marginLeft: 30,
                marginTop: 15,
                fontSize: 18,
                color: 'green',
              }}>
              My Profile
            </Text>
            <Image
              style={styles.profileImage}
              source={{uri: params.PersonDetails.ImageFileUrl}}
            />
          </View>
          <View style={styles.textContainer}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                paddingLeft: 10,
                paddingTop: 5,
                marginRight: 30,
                backgroundColor: "#DFE9DA",
                width: 150,
                color: "black"
                
              }}>
              Name
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                paddingTop: 5,
                paddingLeft: 1,
                marginLeft: -15,
                fontFamily: 'sans-serif-condensed',
                fontSize: 17,
                backgroundColor: "#DFE9DA",
                height: 30,
                width: 180,
                color: "black"
              }}>
              {' '}
              {params.PersonDetails.FullName}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                paddingLeft: 10,
                paddingTop: 5,
                marginRight: 10,
                backgroundColor: "#DFE9DA",
                width: 150,
                color: "black"
            
              }}>
              MatricNumber
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                paddingTop: 5,
                paddingLeft: 5,
                marginLeft: 5,
                fontFamily: 'sans-serif-condensed',
                fontSize: 17,
                backgroundColor: "#DFE9DA",
                height: 30,
                width: 180,
                color: "black"
              }}>
              {params.PersonDetails.MatricNumber}
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                paddingLeft: 10,
                paddingTop: 5,
                marginRight: 28,
                backgroundColor: "#DFE9DA",
                width: 150,
                color: "black"
              }}>
              Department
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                paddingTop: 5,
                paddingLeft: 5,
                marginLeft: -13,
                fontFamily: 'sans-serif-condensed',
                fontSize: 17,
                backgroundColor: "#DFE9DA",
                height: 30,
                width: 180,
                color: "black"
              }}>
              {params.PersonDetails.Department.toUpperCase()}
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                paddingLeft: 10,
                paddingTop: 5,
                marginRight: 73,
                backgroundColor: "#DFE9DA",
                width: 150,
                color: "black"
              }}>
              Level
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                paddingTop: 5,
                paddingLeft: 5,
                marginLeft: -59,
                fontFamily: 'sans-serif-condensed',
                fontSize: 17,
                backgroundColor: "#DFE9DA",
                height: 30,
                width: 180,
                color: "black"
              }}>
              {params.PersonDetails.Levels}
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                paddingLeft: 10,
                paddingTop: 5,
                marginRight: 54,
                backgroundColor: "#DFE9DA",
                width: 150,
                color: "black"
              }}>
              Session
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                paddingTop: 5,
                paddingLeft: 5,
                marginLeft: -40,
                fontFamily: 'sans-serif-condensed',
                fontSize: 17,
                backgroundColor: "#DFE9DA",
                height: 30,
                width: 180,
                color: "black"
              }}>
              {params.PersonDetails.Session}
            </Text>
          </View>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

export default ProfilePage;

const styles = StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#17732B',
    height: 52,
    elevation: 10,
  },

  headerWrapper1: {
    // display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerWrapper2: {
    alignSelf: 'center',
  },
  profileImage: {
    height: 120,
    width: 120,
    borderColor: '#28EB53',
    alignSelf: 'center',
    borderWidth: 3,
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 30,
    marginLeft: -25,
  },
  textContainer: {
    flexDirection: 'row',
    marginLeft: 5,
    marginTop: 5,
  },
  text1: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 10,
    paddingTop: 5,
  },
  // text2: {
  //   alignSelf: 'center',
  //   marginTop: 6,
  //   marginLeft: 30,
  //   fontFamily: 'sans-serif-condensed',
  //   fontSize: 17,
  //   backgroundColor: "green",
  //   height: 30,
  //   color: "white",
  //   width: 160
  // },
});
