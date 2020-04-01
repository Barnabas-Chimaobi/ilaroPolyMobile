import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  DrawerLayoutAndroid
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontawesome from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Menu from "../drawer/menu"

class Dashboard extends Component {
  alert = item => {
    alert(item);
  };
  openDrawer = () => {
    this.drawer.openDrawer();
  };

  closeDrawer = () => {
    this.drawer.closeDrawer();
  };

  static navigationOptions = {
    headerShown: false
  };
  render() {
    const { state, setParams, navigate } = this.props.navigation;
  const params = state.params || {}

    return (
      <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition= "left"
      renderNavigationView={() => (
        <Menu
          navigation={this.props.navigation}
          closeDrawer={this.closeDrawer}
        />
      )}
      ref={_drawer => {
        this.drawer = _drawer;
      }}
    >
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
          <TouchableNativeFeedback onPress={(this.onPress = this.openDrawer)}>
          <Entypo
              name="menu"
              style={{color: 'white', fontSize: 20, marginLeft: 15}}
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
          <TouchableNativeFeedback onPress={()=>{this.props.navigation.navigate("Lecture", {PersonDetails: params.PersonDetails})}}>
            <View style={styles.noteContainer}>
              <MaterialIcon
                style={{fontSize: 70, color: '#FAB005', alignSelf: 'center'}}
                name="library-books"
              />
              <Text style={{textAlign: 'center', marginTop: 15, fontSize: 20}}>
                Lecture Notes
              </Text>
            </View>
          </TouchableNativeFeedback>

          <View style={styles.noteContainer}>
            <MaterialIcon
              name="assignment"
              style={{fontSize: 70, color: '#FAB005', alignSelf: 'center'}}
            />
            <Text style={{textAlign: 'center', marginTop: 15, fontSize: 20}}>
              Quiz/Assignments
            </Text>
          </View>

          <View style={styles.noteContainer}>
            <MaterialIcon
              name="desktop-mac"
              style={{fontSize: 70, color: '#FAB005', alignSelf: 'center'}}
            />
            <Text style={{textAlign: 'center', marginTop: 15, fontSize: 20}}>
              CBT Tests
            </Text>
          </View>

          <View style={styles.noteContainer}>
            <MaterialIcon
              name="question-answer"
              style={{fontSize: 70, color: '#FAB005', alignSelf: 'center'}}
            />
            <Text style={{textAlign: 'center', marginTop: 15, fontSize: 20}}>
              Study Past Question
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
    marginTop: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  noteContainer: {
    width: 150,
    height: '100%',
  },
});
