import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import * as RNFS from 'react-native-fs';
import FilePickerManager from 'react-native-file-picker';
// import RNFetchBlob from 'react-native-fetch-blob'
import axios from 'axios';

const SubmitAssignment = (props) => {
  SubmitAssignment.navigationOptions = {
    headerShown: false,
  };

  const {state, setParams, navigate} = props.navigation;
  const params = state.params || {};

  let [Input, setInput] = useState(null);
  let [Dates, setDates] = useState('');
  let [NewDates, setNewDates] = useState('');
  let [Pdf, setPdf] = useState('');
  let [MainPdf, setMainPdf] = useState(null);
  let [StartPdf, setStartPdf] = useState(null);
  let [Wholedata, setWholedata] = useState(null);
  let PersonId = params.PersonDetails.Id;
  let AssignmentId = params.CourseId.Id;
  let Semester = params.CourseId.Semester;
  let [Indicator, setIndicator] = useState(false)
  // let date = params.CourseId.DueDate

  // useEffect(() => {
  //   const {state, setParams, navigate} = props.navigation;
  //   const params = state.params || {};
  //   console.log(params, ":DASERRRRRR")

  console.log(PersonId, ':DASERRRRRR');
  console.log(AssignmentId, ':DASERRRRRR');
  console.log(Semester, ':DASERRRRRR');
  console.log(Wholedata, ': THIS IS THE WHOLE DETAILS OF THE FILE SELECTED');

  const formatAMPM = () => {
    const dt = new Date(Dates);
    var hours = dt.getHours() - 1;
    var minutes = dt.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  const formatFullDate = () => {
    const dt = new Date(Dates);
    const yeah = dt.toDateString();
    return setNewDates(`${yeah} ${formatAMPM()}`);
  };


  useEffect(() => {
    setDates(params.CourseId.DueDate);
    formatFullDate();
  });


  async function fileUpload() {
    try {
      let res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      }).then(res => {
          console.log("FILE URI: ", res);
          setMainPdf(res);
          setPdf(res.name);
          setStartPdf(res.uri);
          setWholedata(res);
        });


    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
      console.log(err);
    }
  }

  onButtonPress = () => {
      setIndicator(true);
    setTimeout(()=>{
      setIndicator(false);
    }, 25000)
  };


  const handleSubmit = () => {
    const url = 'https://applications.federalpolyilaro.edu.ng/api/e_learning/UploadAssignment';

        console.log("FILE to be uploaded: ", Wholedata);
     
        const formData = new FormData();
        formData.append('PersonId', PersonId);
        formData.append('AssignmentId', AssignmentId);
        formData.append('AssignmentText', Input);
        formData.append('file',Wholedata );

      
  console.log(FormData)
     fetch(url, {
      method: 'POST',
      headers : {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp.data, ':successsssssssssss');
        Alert.alert('Assignment Succesfully Submitted');
        setIndicator(false)
      })
      .catch((err) => {
        console.log(err, ':Errrrrorrr');
        Alert.alert('eroooorrrrr');
      })

      setInput("")
      setPdf("")
    
  };

  return (
    <KeyboardAvoidingView>
    <View style={{flexGrow: 1}}>
     
      <View style={styles.headerWrapper}>
        <View style={styles.headerWrapper1}>
          <TouchableNativeFeedback
            onPress={() => {
              props.navigation.navigate('GetAssignment');
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
        <Spinner
              color={'green'}
              //visibility of Overlay Loading Spinner
              visible={Indicator}
              //Text with the Spinner
              textContent={'Submitting...'}
              //Text style of the Spinner Text
              textStyle={styles.spinnerTextStyle}
            />
      <View >
  
          <View>
       
          <View style={{flexDirection: 'row', margin: 10,}}>
            <Image
              source={require('../../assets/fine-books.png')}
              style={{marginTop: 10, marginRight: 8}}
            />
            <View>
              <Text style={{fontWeight: 'bold', color: "black"}}>
                {params.CourseId.CourseCode}- {params.CourseId.CourseName}
              </Text>
              <Text style={{color: "black"}}>{params.CourseId.Assignment}</Text>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../assets/schedule.png')}
                  style={{marginRight: 5}}
                />
                <Text style={{color: "black"}}>{NewDates}</Text>
              </View>
            </View>
          </View>
          <View >
            <Text style={{marginLeft: 5, fontWeight: 'bold', fontSize: 18, color: "black"}}>
              Answer :
            </Text>
            <TextInput
              placeholder="Enter Text Here"
              multiline={true}
              style={{
                borderWidth: 1,
                margin: 5,
                height: '58%',
                textAlignVertical: 'top',
                borderColor: 'gray',
              }}
              onChangeText={(text) => setInput(text)}
              value={Input}
            />
            <TouchableNativeFeedback
              onPress={() => {
                handleSubmit();
                onButtonPress()
              }}>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  marginRight: 5,
                  backgroundColor: 'green',
                  color: 'white',
                  width: 115,
                  textAlign: 'center',
                  height: 25,
                  paddingTop: 3,
                }}>
                Submit
              </Text>
            </TouchableNativeFeedback>
          </View>

          <View >
            <Text style={{marginLeft: 8, fontSize: 15}}>{Pdf}</Text>
            <TouchableNativeFeedback
              onPress={() => {
                fileUpload();
              }}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: 5,
                  marginTop: 10,
                  backgroundColor: 'green',
                  color: 'white',
                  width: 115,
                  textAlign: 'center',
                  height: 25,
                  paddingTop: 3,
                  marginTop:10
                }}>
                Select File
              </Text>
            </TouchableNativeFeedback>
          </View>
          </View>
        
        </View>
       
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    // display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#17732B',
    height: 52,
    elevation: 10,
  },

  headerWrapper1: {
    // display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default SubmitAssignment;
