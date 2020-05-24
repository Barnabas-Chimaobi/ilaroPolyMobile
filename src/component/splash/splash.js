

import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, ImageBackground, Animated} from 'react-native'
export default class Splash extends Component {
 static navigationOptions ={
   headerShown: false
 }

  componentDidMount() {
    setTimeout(() => {
       this.load();
          }, 3000);
    }

   load = () => {
        this.props.navigation.navigate("Login");
    };

  render() {
    return(
      <View style={styles.container}>
      <Image source={require("../../assets/ilarologo.jpeg")} style={styles.image}/>
   </View>
   
    )

  }
}

const styles = StyleSheet.create({

  image: {
    width: 250,
    height: 220, 
    // marginTop:150,
    // alignItems: "center"
  },

  container: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems:  "center",
    height: "100%"
  }

})
