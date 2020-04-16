import React, {Component} from "react" 
import {View, AsyncStorage} from "react-native"


class Logout extends Component {
  constructor(props) {
      super(props);
   }

  componentDidMount() {
      AsyncStorage.clear();
      this.props.navigation.navigate('LoginPage')
  }
  
render(){
  return(
    <View></View>
  )
}

}
export default Logout;
