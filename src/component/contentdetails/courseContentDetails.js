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
} from 'react-native';
import {WebView} from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Menu from '../drawer/menu';
// import {Item} from 'native-base';

const CourseContentDetails = (props) => {
  CourseContentDetails.navigationOptions = {
    headerShown: false,
  };

  const {state, setParams, navigate} = props.navigation;
  const params = state.params || {};


 const press = params.newArray.map((one) => {
   return one.Url
 })

//  const presses = press.substring(4, press.length)
 console.log(press)

  const API_ROOT = 'https://applications.federalpolyilaro.edu.ng/';

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
      <View style={styles.headerWrapper}>
        <View style={styles.headerWrapper1}>
          <TouchableNativeFeedback
            onPress={() => {
              props.navigation.navigate('CourseContent');
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
        <Text style={{textAlign:"center", fontSize: 15, fontWeight: "bold"}}>PDF/WORD</Text>
        {params.newArray.map((items, index) => {
          return (
            <View>
              <SectionList
                sections={[
                  {
                    title: 'PDF / WORD',
                    data: [
                      `${API_ROOT}${items.Url.substring(2, items.Url.length)}`,
                    ],
                  },
                  // {title: 'Videos', data: [items.VideoUrl]},
                ]}
                renderItem={({item}) => (
                  <View style={styles.container1}>
                    <View style={styles.fileName}>
                    <Text>{items.Url.substring([20], items.Url.length)}</Text>
                    </View>

                    <View>
                    <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(item), console.log(item);
                    }}>
                    <Text style={styles.itemlink}>View or download</Text>
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
          );
        })}
      </View>
      {/* <View>
        {params.newArray.map((items, index) => {
          return (
            <View>
              <SectionList
                sections={[
                  {title: 'Videos', data: [items.VideoUrl]},
                ]}
                renderItem={({item}) => (
                  <View style={styles.container1}>
                    <View>
                    <Text>{items.VideoUrl}</Text>
                    </View>

                    <View>
                    <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(item), console.log(item);
                    }}>
                    <Text style={styles.item}>play</Text>
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
          );
        })}
      </View> */}
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
    padding: 3,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "green",
    color: "white",
    borderColor: "green"
    // height: 30,
  },

  fileName: {
 
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

  container1:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5
  }
});

export default CourseContentDetails;
