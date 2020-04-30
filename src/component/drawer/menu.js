//Menu.js
// /components/Menu.js
import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, AsyncStorage, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Spinner from 'react-native-loading-spinner-overlay';
import Logout from '../logout/logout';
const Menu = (props) => {
  const {state, setParams, navigate} = props.navigation;
  const params = state.params || {};
  const {
    Id,
    FirstName,
    OtherName,
    FullName,
    ImageFileUrl,
    MatricNumber,
  } = params.PersonDetails;
  let [loading, setLoading] = useState(false);

  const signOut = () => {
    AsyncStorage.clear();
    // Alert.alert("You Are Logged Out")
    props.navigation.navigate('Login');

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Alert.alert('Oops!');
    }, 8000);
  };

  return (
    <View style={styles.Menucontainer}>
      <Spinner
        //visibility of Overlay Loading Spinner
        color={'green'}
        visible={loading}
        //Text with the Spinner
        textContent={'Logging out...'}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
      <View style={{backgroundColor:"#17732B"}}>
        <Image style={styles.profileImage} source={{uri: ImageFileUrl}} />
        <Text style={{alignSelf: "flex-start", marginTop: 10, color: "white", marginLeft: 20, fontFamily: "sans-serif-condensed" ,fontSize:17}}>{FullName}</Text>

        <Text style={{alignSelf: "flex-start", margin: 5, color: "white", marginLeft:20, borderWidth: 1, borderColor:"#CA9818", backgroundColor: "#CA9818", padding: 5, borderRadius:5, marginBottom: 20, fontFamily: "sans-serif-condensed", fontSize: 17 }}>{MatricNumber}</Text>

      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'green',
          width: '100%',
          marginBottom: 5,
        }}
      />
      <View style={styles.board}>
        <View style={styles.eachIcon}>
          <MaterialIcons
            name="dashboard"
            size={20}
            color="green"
            style={styles.icon}
          />
          <Text
            style={styles.boardText}
            onPress={() => {
              props.navigation.navigate('Dashboard');
              props.closeDrawer();
            }}>
            Dashboard
          </Text>
          <View></View>
        </View>

        <View
          style={{
            borderBottomWidth: 0.25,
            borderBottomColor: 'gray',
            width: '80%',
            margin: 5,
          }}
        />

        <View style={styles.eachIcon}>
          <MaterialIcons
            name="person"
            size={20}
            color="green"
            style={styles.icon}
          />
          <Text
            onPress={() => {
              props.navigation.navigate('Profile');
              props.closeDrawer();
            }}
            style={styles.boardText}>
            My Profile
          </Text>
        </View>

        <View
          style={{
            borderBottomWidth: 0.25,
            borderBottomColor: 'gray',
            width: '80%',
            margin: 5,
          }}
        />

        <View style={styles.eachIcon}>
          <MaterialIcons
            name="notifications"
            size={20}
            color="green"
            style={styles.icon}
          />
          <Text
            onPress={() => {
              props.navigation.navigate('Notifications');
              props.closeDrawer();
            }}
            style={styles.boardText}>
            Notifications
          </Text>
        </View>

        <View
          style={{
            borderBottomWidth: 0.25,
            borderBottomColor: 'gray',
            width: '80%',
            margin: 5,
          }}
        />

        <View style={styles.eachIcon}>
          <MaterialIcons
            name="comment"
            size={20}
            color="green"
            style={styles.icon}
          />
          <Text
            style={styles.boardText}
            onPress={() => {
              props.navigation.navigate('Conversation');
              props.closeDrawer();
            }}>
            Join Conversation
          </Text>
          <View></View>
        </View>

        <View
          style={{
            borderBottomWidth: 0.25,
            borderBottomColor: 'gray',
            width: '80%',
            margin: 5,
          }}
        />

        <View style={styles.eachIcon}>
          <MaterialIcons
            name="settings"
            size={20}
            color="green"
            style={styles.icon}
          />
          <Text
            onPress={() => {
              props.navigation.navigate('Profile');
              props.closeDrawer();
            }}
            style={styles.boardText}>
            Settings
          </Text>
        </View>

        <View
          style={{
            borderBottomWidth: 0.25,
            borderBottomColor: 'gray',
            width: '80%',
            margin: 5,
          }}
        />

        <View style={styles.eachIcon}>
          <MaterialIcons
            name="vpn-key"
            size={20}
            color="green"
            style={styles.icon}
          />
          <Text
            onPress={() => {
              // props.navigation.navigate('Logout');
              signOut();
              props.closeDrawer();
            }}
            style={styles.boardText}>
            Sign Out
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  Menucontainer: {
    flex: 1,
  },
  board: {
    marginLeft: 'auto',
    marginRight: 'auto',
    borderColor: 'white',
    borderStyle: 'solid',
    height: 450,
    width: 350,
  },
  boardText: {
    fontSize: 13,
    marginLeft: 20,
    marginTop: -20,
    marginLeft: 70,
  },
  icon: {
    marginTop: 2,
    marginLeft: 20,
  },
  eachIcon: {
    borderBottomColor: 'lightgrey',
    paddingBottom: 7,
    marginTop: 10,
  },
  profileImage: {
    height: 120,
    width: 120,
    borderColor: "#28EB53",
    alignSelf: "flex-start",
    borderWidth: 3,
    borderRadius: 100,
    marginTop: 40,
    marginLeft: 15,
  },
});
