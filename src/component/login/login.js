import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  AsyncStorage,
} from 'react-native';
import Menu from '../drawer/menu';
import Dashboard from "../dashboard/dashboard"
import {Formik} from 'formik';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class StudentLogin extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    regno: '',
    password: '',
    newArrayField: [],
  };

  authentication = () => {
    if (this.state.regno !== '' && this.state.password !== '') {
      fetch(
        `https://applications.federalpolyilaro.edu.ng/api/E_Learning/LoginStudent?MatricNo=${this.state.regno}&Password=${this.state.password}`,
      )
        .then(data => data.json())
        .then(newData => {
          this.setState(prevState => ({
            newArrayField: prevState.newArrayField.concat(newData),
          }));

          
         const mappedArray = this.state.newArrayField.map(item => {
            return {
                 FullName: item.OutPut.FullName
            }
            })

          const API_ROOT = "https://applications.federalpolyilaro.edu.ng";
          const { Id, FirstName, LastName, OtherName, ImageFileUrl } = newData.OutPut.ApplicationForm.Person;
          const { MatricNumber } = newData.OutPut;

          const PersonDetails = {
            Id,
            FirstName,
            LastName,
            OtherName,
            FullName:`${FirstName} ${LastName} ${OtherName}`,
            ImageFileUrl: `${API_ROOT}${ImageFileUrl}`,
            MatricNumber
          };

          AsyncStorage.setItem("PersonDetails", JSON.stringify(PersonDetails));

          this.props.navigation.navigate('Dashboard', {mappedArray: mappedArray, PersonDetails});
        })
        .catch(err => {
          console.log(err, 'there was an error');
        });
    } else {
      alert('please fill the fieslds');
    }
  };

  handleChange(name) {
    return text => {
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
    // console.log(gotten);

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
              marginRight: 20,
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
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.password}>
                <View>
                  <TouchableOpacity
                    style={styles.invoiceButton}
                    onPress={() => {
                      this.authentication();
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
    flex: 1,
  },

  titleStyle: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },

  // headerContainer: {
  //   //  flex: 1,
  //    backgroundColor: '#ffa94d',

  //  },

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
    width: 136,
    height: 35,
    borderRadius: 5,
    backgroundColor: '#17732B',
    borderColor: '#17732B',
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
    width: 136,
    height: 35,

    // marginBottom: 15
  },
  generateInv1: {
    textAlign: 'center',
    paddingTop: 5,
    color: 'black',
  },
});


// import React, { useState, useEffect } from 'react';
// import { TextInput, View, StyleSheet, Text, TouchableOpacity} from 'react-native';


// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [arrayField, newArrayField] = useState([]);


//   const handleChange = (name)=> {
//     return text => {
//       setUsername({[name]: text});
//     };
//    }

//    const handleChanges = (name)=> {
//     return text => {
//       setUsername({[name]: text});
//     };
//    }
 

     
//     function authentication () {
//     if (username !== '' && password !== '') {
//       fetch(
//         `https://applications.federalpolyilaro.edu.ng/api/E_Learning/LoginStudent?MatricNo=${username}&Password=${password}`
//       )
//         .then(data => data.json())
//         .then(({data: arrayField})=> {

//           newArrayField(arrayField)
//           // newArrayField(()=> ({
//           //   newArrayField: [newArrayField.concat(newData)],
//           // }));

//           //  const mappedArray = newArrayField.map(item => {
//           //   return {
//           //        FullName: item.OutPut.FullName
//           //   }
//           //   })
  
//           console.log(data)

//           this.props.navigation.navigate('Dashboard', )
//         })
//         .catch(err => {
//           console.log(err, 'there was an error');
//         });
//     } else {
//       alert('please fill the fieslds');
//     }
//   }

//  return (
//     <React.Fragment>
//        <View>
//               <TextInput
//                 type="email"
//                 name="username"
//                 placeholder="Username"
//                 value={username}
//                 onChangeText={(username) => setUsername({username})}
//                 // onChangeText={()=>handleChange()}
                
//               />
//               <TextInput
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={password}
//                 onChangeText={(password) => setPassword({password})}

//               />
//             <TouchableOpacity
//               onPress={()=>authentication()}
//         >
//                 <Text>
//                 Login
//                 </Text>
            
//             </TouchableOpacity>
//        </View>
  
//     </React.Fragment>
//   );
// }

// export default Login;