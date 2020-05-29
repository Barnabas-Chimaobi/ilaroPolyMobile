import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  AsyncStorage,
  Alert,
  Switch,
  ActivityIndicator,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Container,
  Header,
  Content,
  ListItem,
  Text,
  Body,
  Icon,
  CheckBox
} from 'native-base';
import Menu from '../drawer/menu';
import Dashboard from '../dashboard/dashboard';
import {Formik} from 'formik';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class StudentLogin extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      showIndicator: false,
      showPassword: true,
      regno: '',
      password: '',
      password: true,
      icon: 'eye-off',
      newArrayField: [],
      rememberMe: false,
      checked: false
    };
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //      this.onButtonPress();
  //         }, 500);
  //   }

  changeIcon() {
    this.setState({
      icon: this.state.icon === 'eye' ? 'eye-off' : 'eye',
      showPassword: !this.state.showPassword,
    });
  }

  onButtonPress = () => {
    if (this.state.password !== '' && this.state.regno !== '') {
      this.setState({showIndicator: true});
    } else {
      this.setState({showIndicator: false});
    }
    setTimeout(() => {
      this.setState({
        showIndicator: false,
      });
    }, 25000);
  };
  //  resetLoader = () => {
  //    if(this.state.newArrayField !== ""){
  //     this.setState({ showIndicator: false });

  //    }else{
  //     this.state.showIndicator == true
  //    }
  //  }

  authentication = () => {
    if (this.state.regno !== '' && this.state.password !== '') {
      fetch(
        `https://applications.federalpolyilaro.edu.ng/api/E_Learning/LoginStudent?MatricNo=${this.state.regno}&Password=${this.state.password}`,
      )
        .then((data) => data.json())
        .then((newData) => {
          //  console.log("NEW DATA: ", newData);
          if (newData.OutPut) {
            this.setState((prevState) => ({
              newArrayField: prevState.newArrayField.concat(newData),
            }));

            const mappedArray = this.state.newArrayField.map((item) => {
              // console.log("ITEM: ", item);
              return {
                FullName: item.OutPut.FullName,
              };
            });

            const API_ROOT = 'https://applications.federalpolyilaro.edu.ng';
            const {
              Id,
              FirstName,
              LastName,
              OtherName,
              ImageFileUrl,
            } = newData.OutPut.Student.ApplicationForm.Person;
            const MatricNumber = newData.OutPut.Student.MatricNumber;
            const Levels = newData.OutPut.Level.Name;
            const Department = newData.OutPut.Department.Name;
            const Faculty = newData.OutPut.Department.Faculty.Name;
            const Session = newData.OutPut.Session.Name;
            const password = this.state.password
            const regno    = this.state.regno

            const PersonDetails = {
              Id,
              FirstName,
              LastName,
              OtherName,
              FullName: `${FirstName} ${LastName} ${OtherName}`,
              ImageFileUrl: `${API_ROOT}${ImageFileUrl}`,
              MatricNumber,
              Levels,
              Department,
              Faculty,
              Session,
              password,
              regno
            };
            this.setState({showIndicator: false});

            console.log(PersonDetails, ":PERSONDETAILSSSSSSS")

            AsyncStorage.setItem(
              'personDetails',
              JSON.stringify(PersonDetails),
            );

            this.props.navigation.navigate('Dashboard', {
              mappedArray: mappedArray,
              PersonDetails,
            });
            this.setState({regno: ''});
            this.setState({password: ''});
          } else {
            Alert.alert('Incorrect User details');
            this.setState({showIndicator: false});
            return;
          }
        })
        .catch((err) => {
          console.error(err, 'there was an error');
        });
    } else {
      Alert.alert('please fill complete log in details');
    }
  };

  handleChange(name) {
    return (text) => {
      this.setState({[name]: text});
    };
  }

  toggleRememberMe = (value) => {

    this.setState({
      rememberMe: !this.state.rememberMe
  });

   if(!this.state.rememberMe){
     this.rememberUser()
   }else{
     this.forgetUser()
   }
    // this.setState({rememberMe: value});
    // if (value == true) {
    //   //user wants to be remembered.
    //   this.rememberUser();
    // } else {
    //   this.forgetUser();
    // }
  };

  rememberUser = async () => {
    try {
      await AsyncStorage.setItem('REG_NO', this.state.regno);
    } catch (error) {
      // Error saving data
    }
  };

  getRememberedUser = async () => {
    try {
      const regno = await AsyncStorage.getItem('REG_NO');
      if (regno !== null) {
        // We have username!!
        return regno;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  forgetUser = async () => {
    try {
      await AsyncStorage.removeItem('REG-NO');
    } catch (error) {
      // Error removing
    }
  };

  async componentDidMount() {
    const regno = await this.getRememberedUser();
    this.setState({
      regno: regno || '',
      rememberMe: regno ? true : false,
    });
  }

  render() {
    // const gotten = this.state.newArrayField.map(item => {
    //   return {
    //     fullname: item.OutPut.FullName,
    //     imgurl: item.OutPut.ImageFileUrl,
    //     matricno: item.OutPut.MatricNumber,
    //   };
    // });

    return (
      <View style={styles.container}>
        <ScrollView>
          <Image
            source={require('../../assets/ilarologo.jpeg')}
            style={{
              marginTop: '30%',
              width: 200,
              height: 180,
              alignSelf: 'center',
              marginBottom: -18,
            }}
          />

          <View style>
            <View style={styles.formWrapper}>
              <View style={styles.titleStyle}></View>

              <View style={styles.textInputWrapper}>
                <Icon
                  style={{
                    color: 'gray',
                    fontSize: 23,
                    marginTop: -10,
                    paddingRight: 5,
                  }}
                  name="person"
                />
                <TextInput
                  style={styles.textInput1}
                  name="regno"
                  onChangeText={this.handleChange('regno')}
                  value={this.state.regno}
                  placeholder="Registration No"
                  clearTextOnFocus={true}
                />
              </View>
              <View style={styles.textInputWrapper}>
                <Icon
                  style={{
                    color: 'gray',
                    fontSize: 23,
                    marginTop: 10,
                    paddingRight: 5,
                  }}
                  name="key"
                />
                <TextInput
                  style={styles.textInput2}
                  name="password"
                  onChangeText={this.handleChange('password')}
                  value={this.state.password}
                  placeholder="Password"
                  clearTextOnFocus={true}
                  secureTextEntry={this.state.showPassword}
                  // placeholderTextColor={"red"}
                />
                <Icon
                  style={{color: 'gray', fontSize: 20, marginTop: 15}}
                  name={this.state.icon}
                  onPress={() => {
                    this.changeIcon();
                  }}
                />
              </View>
              <Spinner
                color={'green'}
                //visibility of Overlay Loading Spinner
                visible={this.state.showIndicator}
                //Text with the Spinner
                textContent={'Logging in...'}
                //Text style of the Spinner Text
                textStyle={styles.spinnerTextStyle}
              />
              {/* <Switch
                value={this.state.rememberMe}
                onValueChange={(value) => this.toggleRememberMe(value)}
              />
              <Text>Remember Me</Text> */}

                   <View style={{flexDirection: "row", marginTop:10, marginLeft:27}}>
                   <CheckBox
                    checked={this.state.rememberMe} color="green"
                     onPress={()=>{
                        this.toggleRememberMe()
                    }}
                  

                    />
                 
                      <Text style={{marginLeft:20, fontSize:15, fontFamily: "sans-serif-light"}}>Remember Me</Text>
                 
                   </View>
         
           
               
               
            
              <View style={styles.password}>
                <View>
                  <TouchableOpacity
                    style={styles.invoiceButton}
                    onPress={() => {
                      this.authentication(), this.onButtonPress();
                    }}>
                    <Text style={styles.generateInv}>SIGN IN</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // flex: 1,
    height: '100%',
  },

  titleStyle: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },

  header1: {
    margin: 15,
  },
  textInput1: {
    flex: 1,
    marginTop: -18,
  },
  textInput2: {
    flex: 1,
  },
  formWrapper: {
    backgroundColor: 'white',
    margin: 5,
  },
  textDescriprion: {
    marginBottom: 2,
  },
  textInputWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    paddingBottom: -10,

    width: '80%',
    marginTop: 10,
    alignSelf: 'center',
  },
  invoiceButton: {
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 1,
    width: 176,
    height: 37,
    borderRadius: 5,
    backgroundColor: '#17732B',
    borderColor: '#17732B',
    elevation: 5,
    // marginBottom: 15
  },
  generateInv: {
    textAlign: 'center',
    paddingTop: 5,
    color: 'white',
  },
  header: {
    backgroundColor: '#324AB2',
    height: 55,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  password: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  invoiceButton1: {
    alignSelf: 'center',
    marginTop: 30,
    width: 194,
    height: 35,

    // marginBottom: 15
  },
  generateInv1: {
    textAlign: 'center',
    paddingTop: 5,
    color: 'black',
  },

  switch: {
    marginTop: -35,
    width: 50,
    alignSelf: 'flex-end',
  },
});
