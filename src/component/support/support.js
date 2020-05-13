import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import MaterialIcon from "react-native-vector-icons/MaterialIcons"

class Footer extends Component {
 static navigationOptions ={
   headerShown : false
 }

  render() {
    return (
      <View style={{flex: 1}}>
          <View style={styles.headerWrapper}>
          <View style={styles.headerWrapper1}>
            <TouchableNativeFeedback onPress={()=>{
               this.props.navigation.navigate("Dashboard")
            }}>
              <MaterialIcon
                name="arrow-back"
                // name="keyboard-backspace"
                style={{color: 'white', fontSize: 27, marginLeft: 15}}
              />
            </TouchableNativeFeedback>
            <Text style={{fontSize: 22, color: 'white', marginLeft: 20}}>
              Contact Us
            </Text>
          </View>
        </View>
            <View style={{ margin: 5, left: 0, right: 0, bottom: 0, top:20}}>
        <Text style={{fontSize: 20,fontFamily:"sans-serif-light", fontWeight:"bold", padding: 5, color: "black"}}>
          If you experience any difficulties or issues kindly call 07088391544
          or email support@lloydant.com
        </Text>
      </View>
      </View>
     
    );
  }
}

export default Footer

const styles = StyleSheet.create({
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

  headerWrapper2: {
    alignSelf: 'center',
  },
})
