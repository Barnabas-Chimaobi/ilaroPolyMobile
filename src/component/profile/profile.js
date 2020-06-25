import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  DrawerLayoutAndroid,
  TouchableWithoutFeedback,
  Alert,
  ScrollView 
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Fontawesome from 'react-native-vector-icons/FontAwesome5';
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
          <View style={{flex: 1}}>
            <ScrollView>
        <View style={styles.headerWrapper}>
          <View style={styles.headerWrapper1}>
            <TouchableNativeFeedback onPress={(this.onPress = this.openDrawer)}>
              <MaterialIcon
                name="menu"
                // name="keyboard-backspace"
                style={{
                  color: 'white',
                  fontSize: 27,
                  marginLeft: 15,
                  marginBottom: 170,
                }}
              />
            </TouchableNativeFeedback>
          </View>

          <View style={{marginLeft: 50}}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                marginTop: 65,
                marginLeft: 30,
              }}>
              My Profile
            </Text>
          </View>

          <View style={{width: '90%', marginLeft: -220, marginRight: -35}}>
            <View
              style={{
                backgroundColor: 'white',
                marginTop: 120,
                width: '100%',
                borderRadius: 10,
                elevation: 10
              }}>
              <Image
                style={styles.profileImage}
                source={{uri: params.PersonDetails.ImageFileUrl}}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  padding: 10,
                  fontFamily: 'sans-serif-condensed',
                  fontSize: 17,

                  color: 'green',
                }}>
                {params.PersonDetails.FullName}
              </Text>
              <View
                style={{
                  backgroundColor: '#CA9818',
                  width: 141,
                  alignSelf: 'center',
                  borderRadius: 6,
                  marginBottom: 40,
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontFamily: 'sans-serif-condensed',
                    fontSize: 17,
                    padding: 3,
                    color: 'white',
                  }}>
                  {params.PersonDetails.MatricNumber}
                </Text>
              </View>
            </View>
          </View>

          <TouchableWithoutFeedback
            onPress={() => {
              Alert.alert('No new Notifications');
            }}>
            <View style={styles.headerWrapper2}>
              <Fontawesome
                name="bell"
                style={{
                  color: 'white',
                  fontSize: 18,
                  marginRight: 15,
                  alignSelf: 'flex-end',
                  marginTop: 20,
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 180,
            height: 130
          }}>
          <View style={{flexDirection: 'column', justifyContent: "space-between", height: 143, marginLeft: -15}}>
            <Text style={styles.title1}>Department</Text>
            <Text style={styles.title}>Level</Text>
            <Text style={styles.title}>Session</Text>
          </View>

          <View
            style={{
              borderRightWidth: 1,
              // flexGrow: 1,
              borderRightColor: 'gray',
              marginTop: 13,
            }}
          />

          <View style={{flexDirection: 'column',  justifyContent: "space-between", height: 135}}>
            <Text style={styles.label1}>
              {params.PersonDetails.Department.toUpperCase()}
            </Text>
            <Text style={styles.label}>{params.PersonDetails.Levels}</Text>
            <Text style={styles.label}>{params.PersonDetails.Session}</Text>
          </View>
        </View>
        </ScrollView>
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
    height: 240,
    elevation: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerWrapper1: {
    // display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  // headerWrapper2: {
  //   alignSelf: 'center',
  // },
  profileImage: {
    height: 120,
    width: 120,
    borderColor: '#28EB53',
    alignSelf: 'center',
    borderWidth: 3,
    borderRadius: 100,
    marginTop: 40,
    // marginBottom: 30,
    // marginLeft: -25,
  },

  text1: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 10,
    paddingTop: 5,
  },
  title: {
    color: 'green',
    padding: 10,
    marginLeft: 25,
    fontSize: 15,
    marginRight: 1,
    marginBottom:5
  },
  title1: {
    color: 'green',
    padding: 10,
    marginLeft: 25,
    fontSize: 15,
    marginRight: 1,
    marginBottom:5,
    marginTop: -4
  },
  label: {
    color: '#000000',
    padding: 10,
    fontFamily: 'sans-serif-medium',
    // marginLeft: -80,
    marginRight: 130,
    fontSize: 14,
    width: "99%"
  },
  label1: {
    color: '#000000',
    padding: 10,
    fontFamily: 'sans-serif-medium',
    // marginLeft: -80,
    marginRight: 130,
    fontSize: 14,
    width: '99%',
    marginTop: -6,
    bottom: 0
  },
});
