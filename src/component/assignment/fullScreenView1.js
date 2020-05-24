import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Linking,
  DrawerLayoutAndroid
} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Menu from "../drawer/menu"

// import { TouchableWithoutFeedback } from "react-native-gesture-handler"

class FullSreenView1 extends Component {
static navigationOptions = {
  headerShown: false
}

  constructor(props) {
    super(props);

    this.state = {
      personId: '',
      CourseId: [],
      date: "",
      newDate: "",
      isImmersive: false,

    };
  }

  componentDidMount() {
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};
    console.log(params);

  }
 
  render() {

    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};

    return (
      <View>
      {/* <ScrollView> */}
        <View style={{height: "97%"}}>
 
           <View style={{marginLeft:15, marginRight: 15,}}>
           <View style={{borderWidth: 0.5, marginTop: 10, padding:5,}}>
             <ScrollView>
             <Text style={{ textTransform:"capitalize", color: "black", fontSize: 20,}}>
               {params.finds.SubmittedAssignmentText}
             </Text>
             </ScrollView>
           </View>
        
           </View>

           <TouchableWithoutFeedback onPress={() => {
             this.props.navigation.navigate("ViewAssignment1")
           }}>
            <View style={{flexDirection:"row",justifyContent:"flex-end"}}>
            <MaterialIcons
              name="fullscreen"
              style={{ fontSize: 27, marginLeft: 15}}
            />
            <Text style={{marginTop: 5, marginRight:15}}>Normal Mode</Text>
              </View>
           </TouchableWithoutFeedback>
      
        </View>

      {/* </ScrollView> */}
      </View>
    );
  }
}



export default FullSreenView1;
