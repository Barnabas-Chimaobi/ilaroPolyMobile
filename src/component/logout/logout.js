// import React, {Component} from "react" 
// import {View, AsyncStorage, BackHandler, Alert} from "react-native"


// class Logout extends Component {
//   constructor(props) {
//       super(props);
//    }

//    static navigationOptions = {
//      headerShown: false
//    }

//    handleBackButton = () => {
  
//       Alert.alert(
//         'Exit App',
//         'Exiting the application?',
//         [
//           {
//             text: 'Cancel',
//             onPress: () => console.log('Cancel Pressed'),
//             style: 'cancel'
//           },
//           {
//             text: 'OK',
//             onPress: () => BackHandler.exitApp()
//           }
//         ],
//         {
//           cancelable: false
//         }
//       );
//       return true;
    
//   };


//  componentDidMount() {
//   BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
//   // AsyncStorage.clear();
// }

// componentWillUnmount() {
//   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
// }

//   // componentDidMount() {
//   //     AsyncStorage.clear();
//   //     this.props.navigation.navigate('LoginPage')
//   // }

  
  
// render(){
//   return(
//     <View>
//     </View>
//   )
// }

// }
// export default Logout;

import React, { useEffect } from "react";
import { Text, View, StyleSheet, BackHandler, Alert, TouchableWithoutFeedback } from "react-native";

export default function App(props) {
  useEffect(() => {
    const backAction = () => {
      // Alert.alert("Exit", "Exiting Application?", [
      //   {
      //     text: "Cancel",
      //     onPress: () => null,
      //     style: "cancel"
      //   },
      //   { text: "YES", onPress: () => BackHandler.exitApp() }
      // ]);
      BackHandler.exitApp()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You Are Currently Logged Out of This App</Text>
      <Text>To Continue Using The App, Pls Sign In</Text>
      <TouchableWithoutFeedback 
       onPress={()=>{
         props.navigation.navigate("Login")
       }}
      >
        <Text>Sign In</Text>
      </TouchableWithoutFeedback>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold"
  }
});
