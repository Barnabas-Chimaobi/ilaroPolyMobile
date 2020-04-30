import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Button,
  Alert,
} from 'react-native';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import { TouchableHighlight } from "react-native-gesture-handler"

class GetAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personId: '',
      CourseId: [],
      modalVisible: false,
      activeState1: false,
      activeState2: false,
      activeState3: false,
      activeState4: false,
    };
  }

  static navigationOptions = {
    headerShown: false
  }

  componentDidMount() {
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};

    fetch(
      `http://applications.federalpolyilaro.edu.ng/api/e_learning/AssignmentByCategory?personId=${params.PersonDetails.Id}`,
    )
      .then((response) => response.json())
      .then((Data) => {
        const assignmentArray = Data.Output.SubmittedAssignment.map(
          (res) => {
            return {
              Id: res.Id,
              Assignment: res.Assignment,
              URL: res.URL,
              Instructions: res.Instructions,
              DateSet: res.DateSet,
              DueDate: res.DueDate,
              AssignmentinText: res.AssignmentinText,
            };
          },
        );
        this.setState({
          CourseId: assignmentArray,
        });
        console.log(assignmentArray, ':DDDDDDDDDDDD');
        console.log(params);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  remapp = (assignmentId) => {
    console.log('ASSIGN ID: ', assignmentId);
    const newObject = this.state.CourseId.map((item) => {
      return {
        Id: item.Id,
        instruction1: item.Instructions,
        Text: item.AssignmentinText,
        Url: item.URL,
      };
    });

    this.setState({modalVisible:false})

    const selectedAsignment = newObject.find((as) => as.Id === assignmentId);

    console.log(selectedAsignment, ':ASDDDDDDD');
    this.props.navigation.navigate('ViewAssignment', {
      finds: selectedAsignment,
    });
  };

  render() {
    const activeStyle = {
      // borderTopWidth: 5,
      // borderTopColor: "green",
      // // borderTopColor: 'green',
      // paddingTop: -15,
      // flexDirection: 'row',
    };
    const activePosition = {
      position: 'absolute',
      top: 27,
      // backgroundColor: 'green',
      borderBottomColor: "green",
      borderBottomWidth: 5,
      // borderRadius: 50,
      width: 135,
      height: 5,
      alignSelf: 'center',
    };
    return (
      <View style={{flex: 1}}>
      <View style={styles.headerWrapper}>
      <View style={styles.headerWrapper1}>
        <TouchableNativeFeedback
          onPress={() => {
            props.navigation.navigate('GetAssignment');
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
    <View style={styles.footer}>
          <TouchableWithoutFeedback
            onPress={() => {
              return (
                // this.setState({
                //   activeState1: true,
                //   activeState2: false,
                //   activeState3: false,
                //   activeState4: false
                // }),
                this.props.navigation.navigate('GetAssignment')
              );
            }}>
            <View
              style={
                // this.state.activeState1 &&
                this.props.navigation.state.routeName === 'GetAssignment'
                  ? activeStyle
                  : ''
              }>
              <View
                style={
                  this.props.navigation.state.routeName === 'GetAssignment'
                    ? //  &&
                      // this.state.activeState1
                      activePosition
                    : ''
                }></View>
              <Text style={styles.text}>Pending Assignment</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              // this.setState({
              //   activeState2: true,
              //   activeState1: false,
              //   activeState3: false,
              //   activeState4: false
              // });
              this.props.navigation.navigate('SubmittedAssignment');
            }}>
            <View
              style={
                // this.state.activeState2
                this.props.navigation.state.routeName === 'SubmittedAssignment' &&
                activeStyle
              }>
              <View
                style={
                  // this.state.activeState2
                  this.props.navigation.state.routeName === 'SubmittedAssignment' &&
                  activePosition
                }></View>
              <Text style={styles.text1}> Submitted Assignment</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      <ScrollView>
   
        <Text style={{margin:10, fontSize: 15}}>* Submitted Assignment</Text>
        <View>
          {this.state.CourseId.map((item, index) => {
                      const dt = new Date(item.DueDate);
                      const yeah = dt.toDateString()
      
                      const dts = new Date(item.DueDate);
                      var hours = dts.getHours() - 1;
                      var minutes = dts.getMinutes();
                      var ampm = hours >= 12 ? 'pm' : 'am';
                      hours = hours % 12;
                      hours = hours ? hours : 12; // the hour '0' should be '12'
                      minutes = minutes < 10 ? '0'+minutes : minutes;
                      var strTime = hours + ':' + minutes + ' ' + ampm;
                      let trueTime = `${yeah} ${strTime}`

            return (
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../assets/fine-books.png')}
                  style={{margin: 8}}
                />

                <View style={{marginTop:15}}>
                  <Text style={{width:270}}>{item.Assignment}</Text>
                  {/* <Text>{item.DateSet}</Text> */}
                  <View style={{flexDirection: "row"}}>
                    <Image
                    source={require("../../assets/schedule.png")}
                    style={{marginRight: 5}}
                    />
                  <Text>{trueTime}</Text>

                  </View>
                  
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      borderBottomColor: 'gray',
                      width: "100%",
                      marginBottom: 5,
                      marginTop: 35,
                    }}
                  />
                </View>
                <View >
                {!this.state.modalVisible ? (
                      <TouchableHighlight
                        onPress={() => {
                          this.setState({modalVisible: true});
                        }}>
                        <MaterialIcon
                           style={{color: "gray", fontSize:18, marginTop:10}}
                          name="more-vert"
                          //  onPress={this.toggleModal}
                        />
                      </TouchableHighlight>
                    ) : (
                      <View
                        style={{
                          height: 50,
                          width: 110,
                          backgroundColor: 'blue',
                          marginLeft:-90
                        }}>
                        <TouchableHighlight
                          onPress={() => {
                            this.remapp(item.Id);
                          }}>
                          <Text>View Assignment</Text>
                        </TouchableHighlight>
                      </View>
                    )}
                </View>
                
              </View>
            );
          })}

        </View>
        
      </ScrollView>
      </View>
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
  text1: {
    color: 'green',
    fontSize: 14,
    paddingTop: 7,
    paddingBottom: 9,
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

export default GetAssignment;
