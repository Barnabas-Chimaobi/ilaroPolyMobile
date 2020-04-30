import React, {Component, useState, useEffect} from 'react';
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
  DrawerLayoutAndroid,
  Linking,
  Alert,
  Image
} from 'react-native';
import {WebView} from 'react-native-webview';
import Unorderedlist from 'react-native-unordered-list';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Menu from '../drawer/menu';
// import {Item} from 'native-base';

const VideoTutorial = (props) => {
  VideoTutorial.navigationOptions = {
    headerShown: false,
  };

  const {state, setParams, navigate} = props.navigation;
  const params = state.params || {};

  const API_ROOT = 'https://applications.federalpolyilaro.edu.ng/';

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
      <View style={styles.headerWrapper}>
        <View style={styles.headerWrapper1}>
          <TouchableNativeFeedback
            onPress={() => {
              props.navigation.navigate('CourseContentDetails');
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
      <View style={styles.mainContainer}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              margin: 10,
            }}>
            Course: {params.newsCourse}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              margin: 15,
              marginTop: 0,
              fontFamily: 'sans-serif-thin',
              color: 'green',
            }}>
            Topic: {params.courseContent} (Video Tutorial)
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'green',
              width: '80%',
              marginBottom: 20,
              alignSelf: 'center',
            }}
          />
        </View>
        <View>
          {params.newArray.map((items, index) => {
            return items.VideoUrl && typeof items.VideoUrl !== 'undefined' ? (
              <View>
                <SectionList
                  sections={[{title: 'Videos', data: [items.VideoUrl]}]}
                  renderItem={({item}) => (
                    <View style={styles.container1}>
                           <View style={styles.fileName}>
                        {/* <Text>{items.Url.substring([20], items.Url.length).split(".")[0]}</Text> */}

                        <View>
                        <Image
                 source={require("../../assets/cbt.png")}
                 style={{
                  width: 20,
                  height:20,
                  alignSelf: 'center',
                  marginTop: 8,
                  marginRight: 7
                }}
                  />
                        </View>
                        <View>
                          <Text
                            style={{
                              fontFamily: 'sans-serif-light',
                              fontSize: 15,
                              paddingTop:10
                            }}>
                            Video Tutorial {index +1}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            items.VideoUrl &&
                            typeof items.VideoUrl !== 'undefined'
                              ? Linking.openURL(item)
                              : Alert.alert(
                                  'There is no video content to display',
                                );
                          }}>
                          <Text style={styles.item}>watch</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  // renderSectionHeader={({section}) => (
                  //   <Text style={styles.sectionHeader}>{section.title}</Text>
                  // )}
                  keyExtractor={(item, index) => index}
                />
              </View>
            ) : null;
          })}
        </View>
      </View>

      <View style={{height: 300}}></View>
    </KeyboardAvoidingView>
  );
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
  itemlink: {
    padding: 8,
    fontSize: 15,
    fontFamily: 'sans-serif-condensed',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'green',
    color: 'white',
    borderColor: 'green',
    // height: 30,
  },

  fileName: {
    display: 'flex',
    flexDirection: 'row',
  },

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

  container1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
  },

  mainContainer: {
    margin: 15,
    borderColor: '#E5E5E5',
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    height: '80%',
    // marginBottom: "10%"
  },

  item: {
    padding: 8,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'green',
    color: 'white',
    borderColor: 'green',
    fontFamily: 'sans-serif-condensed',
    width: 70,
    textAlign: 'center',
  },
});

export default VideoTutorial;
