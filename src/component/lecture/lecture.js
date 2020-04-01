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
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Menu from '../drawer/menu';

class Lecture extends Component {
  state = {
    courses: [],
    semesters: [0, 1, 2],
    newCourse: '',
    newSemester: 0,
    contentList: [],
    PersonDetails: {
      Id: null,
      FirstName: null,
      OtherName: null,
      FullName: null,
      ImageFileUrl: null,
    },
  };

  componentDidMount() {
    //Method 1: The prop Way
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};

    this.setState({
      PersonDetails: params.PersonDetails,
    });
    
    //Method 2: The Async Storage Way
    //const { Id, FirstName, OtherName, FullName, ImageFileUrl } = JSON.parse(await AsyncStorage.getItem("PersonDetails"));
  }

  collectCourses = value => {
    if (typeof value === 'number' && value > 0) {
      fetch(`https://applications.federalpolyilaro.edu.ng/api/E_Learning/RegisteredCourses?PersonId=${this.state.PersonDetails?.Id}
      &Semester=${value}`)
        .then(response => response.json())
        .then(response1 => {
          this.setState({
            courses: [...response1.Output],
          });
          // console.log("ghhj:", response1);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };


  viewCourseContent = () => {
    fetch(
      `https://applications.federalpolyilaro.edu.ng/api/E_Learning/ContentType?PersonId=${this.state.PersonDetails?.Id}&CourseId=${this.state.newCourse}`,
    )
      .then(data => data.json())
      .then(Data => {
        const newArray = Data.Output.map(newData => {
          return {
            Id: newData.Id,
            Name: newData.Name,
          };
        });
        console.log(newArray, ', ARRAY');

        this.setState({
          contentList: newArray,
        });

        this.props.navigation.navigate("CourseContent", { newArray: newArray, courseId: this.state.newCourse  } );
      })
      .catch(err => {
        console.log(err);
      });
  };

  alert = item => {
    alert(item);
  };
  openDrawer = () => {
    this.drawer.openDrawer();
  };

  closeDrawer = () => {
    this.drawer.closeDrawer();
  };

  static navigationOptions = {
    headerShown: false,
  };

  courseList = () => {
    return this.state.courses.map((y, z) => {
      return <Picker.Item label={y.CourseName} key={z} value={y.CourseId} />;
    });
  };

  semesterList = () => {
    return this.state.semesters.map((y, z) => {
      if (z === 0) {
        return <Picker.Item label={`Select Semester`} key={z} value={y} />;
      } else {
        return <Picker.Item label={`Semester ${y}`} key={z} value={y} />;
      }
    });
  };

  render() {
    //  this.viewCourseContent()

    const courseCode = this.state.courses.map(item => {
      return item.CourseId;
    });

    // console.log(courseCode)
    // console.log(this.state.newCourse);
    // console.log(this.state.PersonDetails?.Id)

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={() => (
          <Menu
            navigation={this.props.navigation}
            closeDrawer={this.closeDrawer}
          />
        )}
        ref={_drawer => {
          this.drawer = _drawer;
        }}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerWrapper1}>
            <TouchableNativeFeedback onPress={(this.onPress = this.openDrawer)}>
              <MaterialIcon
                 name="menu"
                // name="keyboard-backspace"
                style={{color: 'white', fontSize: 20, marginLeft: 15}}
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
              <MaterialIcon
                style={{fontSize: 70, color: '#FAB005', alignSelf: 'center'}}
                name="library-books"
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
            <Text style={styles.textDescriprion}>Select Semester</Text>
            <TextInput style={styles.textInput} />
            <Picker
              style={styles.picker}
              selectedValue={this.state.newSemester}
              onValueChange={value => this.collectCourses(value)}>
              {this.semesterList()}
            </Picker>
          </View>

          <View style={styles.textInputWrapper}>
            <Text style={styles.textDescriprion}>Select Course</Text>
            <TextInput style={styles.textInput} />
            <Picker
              style={styles.picker}
              selectedValue={this.state.newCourse}
              onValueChange={value => (
                this.setState({newCourse: value})
              )}>
              {this.courseList()}
            </Picker>
          </View>

          <View style={styles.noteContainer1}>
            <TouchableOpacity style={styles.noteCon}      onPress={() => {
                      this.viewCourseContent();
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

export default Lecture;

const styles = StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#17732B',
    height: 52,
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
    marginTop: '5%',
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
    borderWidth: 0.5,
    margin: 15,
    borderColor: 'gray',
    backgroundColor: 'white',
  },
  noteContainer1: {
    borderWidth: 0.5,
    backgroundColor: 'green',
    width: 80,
    alignSelf: 'center',
    height: 40,
    marginTop: 70,
    marginBottom: 30,
  },
  picker: {
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
  },

  textDescriprion: {
    marginBottom: 2,
  },
  textInputWrapper: {
    marginBottom: 10,
    alignSelf: 'center',
  },
});
