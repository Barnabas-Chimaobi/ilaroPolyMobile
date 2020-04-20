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
      <View>
        <Image style={styles.profileImage} source={{uri: ImageFileUrl}} />
      </View>
      <Text style={{alignSelf: 'center', margin: 5}}>{MatricNumber}</Text>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'green',
          width: '100%',
          marginBottom: 5,
        }}
      />
      <Text style={{alignSelf: 'center', marginBottom: 18}}>{FullName}</Text>
      <View style={styles.board}>
        <View style={styles.eachIcon}>
          <MaterialIcons
            name="dashboard"
            size={25}
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
            size={25}
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
            size={25}
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
            size={25}
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
            size={25}
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
            size={25}
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
    marginTop: -25,
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
    height: 150,
    width: 150,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 100,
    marginTop: 15,
  },
});
