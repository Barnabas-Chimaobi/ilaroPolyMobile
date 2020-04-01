//Menu.js
// /components/Menu.js
import React from 'react';
import {StyleSheet, Text, View, Image, AsyncStorage} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Menu = (props) => {
  const { state, setParams, navigate } = props.navigation;
  const params = state.params || {}
  const { Id, FirstName, OtherName, FullName, ImageFileUrl } = params.PersonDetails;

  return (
    <View style={styles.Menucontainer}>
      <View>
        <Image
            style={styles.profileImage}
            source={{uri: ImageFileUrl}}
          /> 
      </View>
  <Text>{FullName}</Text>
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
              props.navigation.navigate('Dashboard');
              props.closeDrawer();
            }}>
            Join Conversation
          </Text>
          <View></View>
        </View>

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

        <View style={styles.eachIcon}>
          <MaterialIcons
            name="vpn-key"
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
    fontSize: 20,
    marginLeft: 20,
    marginTop: -25,
    marginLeft: 70,
  },
  icon: {
    marginTop: 10,
    marginLeft: 20,
  },
  eachIcon: {
    borderBottomColor: 'lightgrey',
    paddingBottom: 7,
    marginTop: 20
  },
  profileImage: {
    height: 150,
    width: 150,
    alignSelf: "center"
  },
});


