
import React, { Component } from 'react';
import { Text, StyleSheet, View, Linking, Platform, TouchableNativeFeedback } from 'react-native';
import MaterialIcon from "react-native-vector-icons/MaterialIcons"


export default class CBT extends Component {
 static navigationOptions = {
   headerShown: false,
 }

  render() {
    return (
      <View style={styles.container} >
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
            <Text style={{fontSize: 22, color: 'white', marginLeft: 20, }}>
              CBT
            </Text>
          </View>
        </View>
              <Text style={{fontSize: 25, fontWeight:"bold", textAlign: "center", marginTop:"55%", color: "black"}}>Coming Soon !!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    
    TextStyle: {
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
    },
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

  });