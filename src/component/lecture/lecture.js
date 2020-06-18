import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  DrawerLayoutAndroid,
  TouchableNativeFeedback,
  Picker,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Image
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Menu from '../drawer/menu';

class Lecture extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    showIndicator: false,
    selectedCourseText: '',
    courses: [],
    semesterText: ['', 'First Semester', 'Second Semester', 'Third Semester'],
    semesters: [0, 1, 2, 3],
    newCourse: 0,
    newSemester: '',
    contentList: [],
    courseCode: "",
    values: "",
    PersonDetails: {
      Id: '',
      FirstName: null,
      OtherName: null,
      FullName: null,
      ImageFileUrl: null,
    },
  };

  onButtonPress = () => {
    if (this.state.selectedCourseText !== "" && this.state.newSemester === this.state.newSemester) {
      this.setState({showIndicator: true});
    } else {
      this.setState({showIndicator: false});
    };
    setTimeout(()=>{
      this.setState({showIndicator: false})
    }, 15000)
  };

  onButtonPresser = () => {
    this.setState({showIndicator: true});
    setTimeout(()=>{
      this.setState({showIndicator: false})
    }, 15000)
  };

  componentDidMount() {
    //Method 1: The prop Way
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};
    // console.log(params, ': RRRRRRR');

    // console.log(params.PersonDetails.Id, ':GGGGGGGG');

    this.setState({
      PersonDetails: params.PersonDetails,
    });
  }

  collectCourses = (value) => {
    if (typeof value === 'number' && value > 0) {
      fetch(`https://applications.federalpolyilaro.edu.ng/api/E_Learning/RegisteredCourses?PersonId=${this.state.PersonDetails?.Id}
      &Semester=${value}`)
        .then((response) => response.json())
        .then((response1) => {
          this.setState({
            courses: [...response1.Output],
            showIndicator: false,
          });
          console.log('ghhjdddddddd:', this.state.courses);

        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  viewCourseContent = () => {
    fetch(
      `https://applications.federalpolyilaro.edu.ng/api/E_Learning/ContentType?PersonId=${this.state.PersonDetails?.Id}&CourseId=${this.state.newCourse}`,
    )
      .then((data) => data.json())
      .then((Data) => {
        const newArray = Data.Output.map((newData) => {
          return {
            Id: newData.Id,
            Name: newData.Name,
          };
        });

        newArray == ''
          ? Alert.alert('there is no study material for this course')
          : console.log(newArray, ', ARRAY');

        this.setState({
          contentList: newArray,
          showIndicator: false,
        });

        console.log(this.state.newCourse, ':NEWCOUSERjjjjj');
        const {state, setParams, navigate} = this.props.navigation;
        const params = state.params || {};
        this.props.navigation.navigate('CourseContent', {
          newArray: newArray,
          courseId: this.state.newCourse,
          PersonDetails: params.PersonDetails,
          newsCourse: this.state.selectedCourseText,
          courses: this.state.courses,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  alert = (item) => {
    alert(item);
  };
  openDrawer = () => {
    this.drawer.openDrawer();
  };

  closeDrawer = () => {
    this.drawer.closeDrawer();
  };

  courseList = () => {
    if (this.state.courses == '') {
      return <Picker.Item label={`Select Course`} color="green"/>;
    } else {
      const dummyObject = {
        CourseName: "Select Course",
        CourseAllocationId: null,
        CourseCode: null,
        CourseId: 0
      };

      if(!this.state.courses.find(course => course.CourseId === 0)) {
        this.state.courses.unshift(dummyObject);
        // this.state.courses = this.state.courses.reverse();
      }

      let reMap = this.state.courses.map((y, z) => {
        return (
          <Picker.Item
            style={styles.pitem}
            label={y.CourseName}
            key={z}
            value={y.CourseId}
          />
        );
      });

      return reMap;
    }
    
  };


  // courseList = () => {
  //   if (this.state.courses == '') {
  //     return <Picker.Item label={`Select Course`} color="green"/>;
  //   } else {
  //     return this.state.courses.map((y, z) => {
  //       if(z == 0){
  //         return <Picker.Item label={`Select Course`} color="green"/>;
  //       }
  //       else {
  //         return (
  //           <Picker.Item
  //             style={styles.pitem}
  //             label={y.CourseName}
  //             key={z}
  //             value={y.CourseId}
              
  //           />
            
  //         );
  //       }
  //     });
  //   }
    
  // };

  semesterList = () => {
    return this.state.semesters.map((y, z) => {
      if (z === 0) {
        return <Picker.Item label={`Select Semester`} key={z} value={y} color="green"/>;
      } else {
        console.log(`SEmester: ${this.state.semesterText[z]}`);
        return (
          <Picker.Item label={this.state.semesterText[z]} key={z} value={y} />
        );
      }
    });
  };

  render() {
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
        <View style={styles.headerWrapper}>
          <View style={styles.headerWrapper1}>
            <TouchableNativeFeedback onPress={(this.onPress = this.openDrawer)}>
              <MaterialIcon
                name="menu"
                style={{color: 'white', fontSize: 27, marginLeft: 15}}
              />
            </TouchableNativeFeedback>
            <Text style={{fontSize: 22, color: 'white', marginLeft: 20}}>
              Select Course
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.container1}>
            <View style={styles.noteContainer}>
            <Image
                 source={require("../../assets/lecture-notes.png")}
                 style={{
                  width: 80,
                  height:70,
                  alignSelf: 'center',
                  marginTop: 25,
                }}
                  />
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 15,
                  fontSize: 20,
                  marginBottom: 30,
                  color: 'green',
                }}>
                Lecture Notes
              </Text>
            </View>
          </View>

          <View style={styles.textInputWrapper}>
            <Spinner
              color={'green'}
              visible={this.state.showIndicator}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
            <TextInput style={styles.textInput} />
            <Picker
              itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
              style={styles.picker1}
              selectedValue={this.state.newSemester}
              onValueChange={(value) => {
                this.setState({
                  newSemester: value,
                });
                if(value > 0){
                  this.onButtonPresser();
                }
                this.collectCourses(value);
              }}>
              {this.semesterList()}
            </Picker>
          </View>

          <View style={styles.textInputWrapper}>
            <TextInput style={styles.textInput} />
            <Picker
              style={styles.picker2}
              selectedValue={this.state.newCourse}
              onValueChange={(values) => {
                this.state.courses && this.state.courses !== null?
                this.setState({
                  newCourse: values,
                  selectedCourseText: this.state.courses.find(
                    c => c.CourseId)?.CourseName
                }): null

              }}
              >
              {this.courseList()}
            </Picker>
          </View>
            <Spinner
              color={'green'}
              visible={this.state.showIndicator}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.noteContainer1}>
              <TouchableOpacity
                style={styles.noteCon}
                onPress={() => {
                  this.onButtonPress();
                  this.viewCourseContent();
                  console.log('CCCCCCCCCC:', this.state.PersonDetails?.Id),
                    console.log('DDDD:', this.state.newCourse);
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 5,
                    fontSize: 20,
                    color: 'white',
                  }}>
                  View
                </Text>
              </TouchableOpacity>
            </View>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#17732B',
    height: 52,
    elevation: 10
  },

  headerWrapper1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerWrapper2: {
    alignSelf: 'center',
  },
  container1: {
    marginTop: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  noteContainer: {
    width: 150,
    height: '100%',
  },

  container: {
    // borderWidth: 0.5,
    margin: 15,
    borderColor: '#E5E5E5',
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  noteContainer1: {
    borderWidth: 0.5,
    borderColor: "green",
    backgroundColor: 'green',
    width: 210,
    alignSelf: 'center',
    height: 40,
    marginTop: 70,
    marginBottom: 30,
    borderRadius: 4,
    elevation: 4,
  },
  picker1: {
    marginLeft: 10,
    marginTop: -40,
  },

  picker2: {
    marginLeft: 10,
    marginTop: -40,
  },

  textInput: {
    borderColor: '#EBEBEB',
    borderBottomWidth: 0.5,
    backgroundColor: 'white',
    borderColor: 'gray',
    width: 310,
    height: 36,
    marginTop: -4,
    marginLeft: 10,
    width: "90%"
  },

  textDescriprion: {
    marginBottom: 2,
  },
  textInputWrapper: {
    marginBottom: 10,
    alignSelf: 'center',
    width: "95%"
    
  },
  twoPickers: {
    width: 200,
    height: 88,
    backgroundColor: '#FFF0E0',
    borderColor: 'black',
    borderWidth: 1,
  },
  twoPickerItems: {
    height: 88,
    color: 'red'
  },
});

export default Lecture;