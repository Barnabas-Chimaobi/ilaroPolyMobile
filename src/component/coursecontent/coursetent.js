import React, {Component} from 'react';
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TextInput,
  ScrollView,
  StyleSheet,
  SectionList,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  AsyncStorage,
  DrawerLayoutAndroid
} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Menu from '../drawer/menu';

// import { Container, Header, Content, List, ListItem, Text } from "native-base";

class CourseContent extends Component{
  static navigationOptions = {
    headerShown: false,
  };
constructor(props){
  super(props)
  this.state ={
    courseId: "",
  }
}


 componentDidMount() {
  const {state, setParams, navigate} = this.props.navigation;
  const params = state.params || {};
  const courseIds = params.courseId;
  console.log(params, ':ressssssst');

  this.setState({
    courseId: courseIds,
  });
 }

 alert = item => {
  alert(item);
};
openDrawer = () => {
  this.drawer.openDrawer();
};

closeDrawer = () => {
  this.drawer.closeDrawer();
};



  // let Id, FirstName, OtherName, FullName, ImageFileUrl;
  // AsyncStorage.getItem('PersonDetails').then(dtr => {
  //   dtr = JSON.parse(dtr);
  //   console.log('ERROR: ', dtr);

  //   ImageFileUrl = dtr.ImageFileUrl;
  //   (FullName = dtr.FullName), (Id = dtr.Id);
  // });

   viewCourseContentDetails = contentId => {
    fetch(
      `https://applications.federalpolyilaro.edu.ng/api/E_Learning/CourseContentDetails?ContentId=${contentId}&CourseId=${this.state.courseId}`,
    )
      .then(data => data.json())
      .then(Data => {
        const newArray = Data.Output.map(newData => {
          // let youtubeId = newData.VideoUrl.split('/');
          // youtubeId = youtubeId[youtubeId.length - 1];

          return {
            Id: newData.Id,
            Url: newData.Url,
            // VideoUrl: newData.VideoUrl,
            // YoutubeVideoUrl: youtubeId,
          };
        });
    
        console.log(newArray,":SSSSSS")
        this.props.navigation.navigate('CourseContentDetails', {newArray: newArray});
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const {state, setParams, navigate} = this.props.navigation;
    const params = state.params || {};
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
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
                <View style={styles.headerWrapper}>
          
          <View style={styles.headerWrapper1}>
          <TouchableNativeFeedback onPress={()=>{
            this.props.navigation.navigate("Lecture")
          }}>
          <MaterialIcons
              name="arrow-back"
              style={{color: 'white', fontSize: 20, marginLeft: 15}}
            />
          </TouchableNativeFeedback>
            <Text style={{fontSize: 22, color: 'white', marginLeft: 20}}>
              E-Learning
            </Text>
          </View>
        </View>
        <View>
          {params.newArray.map((items, index) => {
            return (
              <SectionList
                sections={[
                  {title: 'COURSE NAME', data: [items.Name]},
                  // { ContentId: "CONTENT ID", data: [items.Id] }
                ]}
                renderItem={({item}) => (
                  <TouchableOpacity
                    id={item.Id}
                    onPress={() => {
                      this.viewCourseContentDetails(items.Id);
                    }}>
                    <Text style={styles.item}>{item}</Text>
                  </TouchableOpacity>
  
                )}
                renderSectionHeader={({section}) => (
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
                keyExtractor={(item, index) => index}
              />
            );
          })}
        </View>
      </KeyboardAvoidingView>
      </DrawerLayoutAndroid>
    );
  }

 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

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
});

export default CourseContent;
