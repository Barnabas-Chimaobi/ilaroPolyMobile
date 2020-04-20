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
import {Icon, Text, Label, Input, Item} from 'native-base';
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
          this.setState((prevState) => ({
            newArrayField: prevState.newArrayField.concat(newData),
          }));

          const mappedArray = this.state.newArrayField.map((item) => {
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
          } = newData.OutPut.ApplicationForm.Person;
          const {MatricNumber} = newData.OutPut;

          const PersonDetails = {
            Id,
            FirstName,
            LastName,
            OtherName,
            FullName: `${FirstName} ${LastName} ${OtherName}`,
            ImageFileUrl: `${API_ROOT}${ImageFileUrl}`,
            MatricNumber,
          };
          this.setState({showIndicator: false});

          AsyncStorage.setItem('personDetails', JSON.stringify(PersonDetails));

          this.props.navigation.navigate('Dashboard', {
            mappedArray: mappedArray,
            PersonDetails,
          });
          this.setState({regno: ''});
          this.setState({password: ''});
        })
        .catch((err) => {
          console.log(err, 'there was an error');
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
              marginTop: 30,
              width: 173,
              height: 150,
              alignSelf: 'center',
            }}
          />

          <View style>
            <View style={styles.formWrapper}>
              <View style={styles.titleStyle}>
                <Text style={{fontSize: 25}}>LOG IN TO YOUR ACCOUNT</Text>
              </View>
              <View style={styles.textInputWrapper}>
                <TextInput
                  style={styles.textInput}
                  name="regno"
                  onChangeText={this.handleChange('regno')}
                  value={this.state.regno}
                  placeholder="Registration No"
                  clearTextOnFocus={true}
                />
              </View>
              <View style={styles.textInputWrapper}>
                <TextInput
                  style={styles.textInput}
                  name="password"
                  onChangeText={this.handleChange('password')}
                  value={this.state.password}
                  placeholder="Password"
                  secureTextEntry={true}
                  secureTextEntry={this.state.showPassword}
                />
                <View style={styles.switch}>
                  <Icon
                    name={this.state.icon}
                    onPress={() => {
                      this.changeIcon();
                    }}
                  />
                </View>
              </View>
              {this.state.showIndicator ? (
                // <View style={styles.container}>
                //   {/*Code to show Activity Indicator*/}
                //   <ActivityIndicator size="large" color="#0000ff" />
                //   {/*Size can be large/ small*/}
                // </View>:
                <Spinner
                  color={'green'}
                  //visibility of Overlay Loading Spinner
                  visible={this.state.showIndicator}
                  //Text with the Spinner
                  textContent={'Logging in...'}
                  //Text style of the Spinner Text
                  textStyle={styles.spinnerTextStyle}
                />
              ) : (
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
              )}
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
    flex: 1,
  },

  titleStyle: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },

  header1: {
    margin: 15,
  },
  textInput: {
    borderColor: 'black',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    width: '98%',
    height: 50,
  },
  formWrapper: {
    backgroundColor: 'white',
    margin: 5,
  },
  textDescriprion: {
    marginBottom: 2,
  },
  textInputWrapper: {
    width: '100%',
    marginBottom: 10,
    alignSelf: 'center',
    marginLeft: 10,
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
