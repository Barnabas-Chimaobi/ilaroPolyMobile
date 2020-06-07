
import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, ImageBackground, Animated, AsyncStorage} from 'react-native'
import {StatusBar} from 'react-native';
// import PushNotification from "react-native-push-notification";

export default class Splash extends Component {
 static navigationOptions ={
   headerShown: false
 }

  constructor(props){
    super(props)
    this.state = {
      password : null,
      regno: null,
      PersonDetails: null
    }


  // PushNotification.localNotificationSchedule({ 
  //   message: "My Notification",
  //    date: new Date(Date.now() + 500 * 1000),  
  // })
  }

  async componentDidMount() {
    setTimeout(() => {
       this.load();
          }, 3000);

          AsyncStorage.getItem("personDetails").then(dtr => {
            dtr = JSON.parse(dtr);
            console.log("ERROR: ", dtr);
            this.setState({
              password:  dtr.password,
              regno: dtr.regno,
              PersonDetails: dtr
              
            }) 
       
          })

    }

   load = () => {

    {this.props.navigation.navigate("Login")}

    return this.state.regno !== null ?
      <View>
        {/* <Image source={require("../../assets/ilarologo.jpeg")} style={styles.image}/> */}
        {this.props.navigation.navigate("Dashboard", {PersonDetails:this.state.PersonDetails})}
      </View>:
          <View>
          {/* <Image source={require("../../assets/ilarologo.jpeg")} style={styles.image}/> */}
          {this.props.navigation.navigate("Login")}
        </View>
     
       
    };
    

  render() {
    return(
      <View style={styles.container}>
         <StatusBar
                backgroundColor="#1B692B"
                barStyle="default"
          />
      <Image source={require("../../assets/ilarologo.jpeg")} style={styles.image}/>
      {/* {this.load()} */}
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
