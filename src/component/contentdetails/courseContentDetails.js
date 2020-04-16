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
                  {title: 'Videos', data: [items.VideoUrl]},
                ]}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(item), console.log(item);
                    }}>
                    <Text style={styles.item}>{item}</Text>
                  </TouchableOpacity>
                )}
                renderSectionHeader={({section}) => (
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
                keyExtractor={(item, index) => index}
              />
            </View>
          );
        })}
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 60,
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

export default CourseContentDetails;
