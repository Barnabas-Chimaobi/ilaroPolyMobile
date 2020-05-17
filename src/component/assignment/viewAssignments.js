import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableNativeFeedback,
  Linking,
  DrawerLayoutAndroid,
  Alert
} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Menu from "../drawer/menu"
// import { TouchableHighlight } from "react-native-gesture-handler"

class ViewAssignment extends Component {
static navigationOptions = {
  headerShown: false
}

  constructor(props) {
    super(props);
    this.state = {
      personId: '',
      CourseId: [],
      date: "",
      newDate: ""
    };
  }

  formatAMPM = () => {
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};
    const dt = new Date(params.finds.DueDate);
    var hours = dt.getHours() - 1;
    var minutes = dt.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  
  formatFullDate=()=> {
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};
    const dt = new Date(params.finds.DueDate);
   const yeah = dt.toDateString()
    return  this.setState({newDate: (`${yeah} ${this.formatAMPM()}`)}) 
  
  }

  componentDidMount() {
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};
    console.log(params);

    this.setState({
      date: params.finds.DueDate
    });
     
    this.formatFullDate()
  }


  alert = (item) => {
    alert(item);
  };
  openDrawer = () => {
    this.drawer.openDrawer();
  };

  closeDrawer = () => {
    this.drawer.closeDrawer();
  };

  render() {
    const activeStyle = {
      borderTopWidth: 5,
      borderTopColor: '#101E60',
      paddingTop: -15,
    };
    const activePosition = {
      position: 'absolute',
      top: 27,
      backgroundColor: '#101E60',
      borderRadius: 50,
      width: 5,
      height: 5,
      alignSelf: 'center',
    };

    const API_ROOT = 'https://applications.federalpolyilaro.edu.ng/';

    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};
    console.log(params, ':THIS PARAMS');
    const url = params.finds.Url;
    const mainUrl = `${API_ROOT}${url.substring(2, url.length)}`;
    console.log(mainUrl);

    const extension = url.substring(url.lastIndexOf(".") + 1)
    console.log(extension, ":EXTENSIONNNNNN")

    const dt = new Date(this.state.date);
    const yeah = dt.toDateString()
    console.log(yeah)


    return (
      <DrawerLayoutAndroid
      drawerWidth={260}
      drawerPosition="left"
        renderNavigationView={() => (
          <Menu
            navigation={this.props.navigation}
            closeDrawer={this.closeDrawer}
          />
        )}
        ref={(_drawer) => {
          this.drawer = _drawer;
        }}>
      <ScrollView>
                     <View style={styles.headerWrapper}>
        <View style={styles.headerWrapper1}>
          <TouchableNativeFeedback
            onPress={() => {
              this.props.navigation.navigate('GetAssignment');
            }}>
            <MaterialIcons
              name="arrow-back"
              style={{color: 'white', fontSize: 27, marginLeft: 15}}
            />
          </TouchableNativeFeedback>
          <Text style={{fontSize: 22, color: 'white', marginLeft: 20}}>
            Back
          </Text>
        </View>
      </View>
        <View>
        <View style={{flexDirection:"row", margin: 10}}>
        <Image
            source={require('../../assets/fine-books.png')}
            style={{marginTop:10, marginRight:8}}
          />
          <View>
          <Text style={{fontWeight: "bold", marginBottom: 5, color: "black", width: "85%"}}>{params.finds.CourseCode}- {params.finds.CourseName}</Text>
          <Text style={{fontFamily:"sans-serif-light", fontSize:13, width:"75%", color: "black"}}>{params.finds.Assignment.toUpperCase()}</Text>
          <View style={{flexDirection: "row"}}>
                    <Image
                    source={require("../../assets/schedule.png")}
                    style={{marginRight: 5}}
                    />
                  <Text style={{fontFamily:"sans-serif-light", color: "black"}}>{this.state.newDate}</Text>

                  </View>
          </View>
         
            
          </View>
           <View style={{marginLeft:15, marginRight: 15}}>
             <View style={{flexDirection: "row", borderWidth: 0.5, height: 60, padding: 5, borderColor: "gray"}}>
             <Image source={require("../../assets/instruction.png")}/>
           <Text style={{marginLeft:5,width:"90%", textTransform:"capitalize", color: "black"}}>
            {params.finds.instruction1}
          </Text>
             </View>
         
          <Text style={{borderWidth: 0.5, height: 350, marginTop: 10, padding:5, textTransform: "capitalize", color: "black" }}>
            {params.finds.Text}
          </Text>
           </View>
       
          <View style={{flexDirection: "row", justifyContent: "space-between", margin:16}}>
            {extension != "pdf" ?
                <TouchableOpacity
                onPress={() => {
                  Alert.alert("There is no Uploaded File to view")
                  // Linking.openURL(mainUrl), console.log(mainUrl);
                }}>
                <Text style={styles.itemlink}>View PDF</Text>
              </TouchableOpacity>
              :
                  <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(mainUrl), console.log(mainUrl);
                  }}>
                  <Text style={styles.itemlink}>View PDF</Text>
                </TouchableOpacity>
    
  
          }
        
        <TouchableHighlight
          onPress={() => {
            // this.remapp(item.Id);
            this.props.navigation.navigate('SubmitAssignment', {
              PersonDetails: params.PersonDetails,
              CourseId: params.finds,
            });
          }}>
          <Text style={styles.itemlink}>Submit Assignment</Text>
        </TouchableHighlight>
          </View>
        </View>

      </ScrollView>
    </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    borderTopWidth: 2,
    borderTopColor: '#F6F6F6',
  },
  text: {
    color: '#000000',
    fontSize: 14,
    paddingTop: 7,
    paddingBottom: 9,
  },
  itemlink: {
    borderWidth:1,
    width: 121,
  textAlign: "center",
  color: "white",
  backgroundColor: "green",
  height: 25,
  borderColor: "green",
  paddingTop: 3
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#17732B',
    height: 52,
    elevation: 10,
  },

  headerWrapper1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ViewAssignment;
