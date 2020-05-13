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
  Image,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Unorderedlist from 'react-native-unordered-list';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Menu from '../drawer/menu';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import {Item} from 'native-base';

const LectureNotes = (props) => {
  LectureNotes.navigationOptions = {
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
              color: "black"
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
            Topic: {params.courseContent.toUpperCase()} (Lecture Notes)
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
          {params.newArray.map((items, index) => {
            return (
              <View style={styles.container1}>
                <SectionList
                  sections={[
                    {
                      title: 'PDF / WORD',
                      data: [
                        `${API_ROOT}${items.Url.substring(
                          2,
                          items.Url.length,
                        )}`,
                      ],
                    },
                    // {title: 'Videos', data: [items.VideoUrl]},
                  ]}
                  renderItem={({item}) => (
                    <View>
                    <TouchableOpacity
                      onPress={() => {
                        // Linking.openURL(item), console.log(item);
                        items.Url &&
                        typeof items.Url !== 'undefined'
                          ? Linking.openURL(item)
                          : Alert.alert(
                              'There is no note to download',
                            );
                      }}>
                      <View style={styles.container1}>
                         <View style={{flexDirection: "row"}}>
                         <View>
                            <Image
                              source={require('../../assets/notebook.png')}
                              style={{
                                width: 25,
                                height: 20,
                                alignSelf: 'center',
                                marginTop: 10,
                                marginRight: 5,
                              }}
                            />
                          </View>

                          <View>
                          <Text
                            style={{
                              fontFamily: 'sans-serif-light',
                              fontSize: 15,
                              paddingTop: 10,
                              color: "black"
                            }}>
                            LECTURE NOTE {index + 1}
                          </Text>
                          </View>
                         </View>
                         <View>
                                <MaterialIcons name="get-app" style={{fontSize:20,marginTop: 9}} />
                              </View>
                        
                      </View>
                    </TouchableOpacity>
                    <View
                           style={{borderWidth: 0.5, borderColor:"#ECECEC", marginTop:5, width:"97%"}}
                          />
                    </View>
                  )}
                  // renderSectionHeader={({section}) => (
                  //   <Text style={styles.sectionHeader}>{section.title}</Text>
                  // )}
                  keyExtractor={(item, index) => index}
                />
              </View>
            );
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

  container1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginRight: 5,
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
  fileName: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default LectureNotes;
