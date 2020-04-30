import React, {Component, useState, useEffect} from "react"
import {View, Text, StyleSheet, TextInput, TouchableNativeFeedback, Alert, Image} from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import  DocumentPicker  from 'react-native-document-picker';
import RNFS from "react-native-fs"

 const SubmitAssignment = (props) => {

  SubmitAssignment.navigationOptions = {
    headerShown: false,
  } 
  
  const {state, setParams, navigate} = props.navigation;
  const params = state.params || {};

  let [Input, setInput] = useState("")
  let [Dates, setDates] = useState("")
  let [NewDates, setNewDates] = useState("")
  let [Pdf, setPdf] = useState("")
  let [MainPdf, setMainPdf] = useState("")
  let PersonId = params.PersonDetails.Id
  let AssignmentId = params.CourseId.Id
  let Semester = params.CourseId.Semester
  // let date = params.CourseId.DueDate

 

  // useEffect(() => {
  //   const {state, setParams, navigate} = props.navigation;
  //   const params = state.params || {};
  //   console.log(params, ":DASERRRRRR")

  // })
 

//   this.setState({
//     personId:params.PersonDetails.Id,
//     assignmentId:params.CourseId.Id,
//     semester: params.CourseId.Semester
//   })
  console.log(PersonId, ":DASERRRRRR")
  console.log(AssignmentId, ":DASERRRRRR")
  console.log(Semester, ":DASERRRRRR")
  console.log(MainPdf)


// let formdata = new FormData()

// formdata.append("Api variable",MainPdf)
  

// const handleSubmit = ()=>{
//   fetch(`https://applications.federalpolyilaro.edu.ng/api/e_learning/PostAssignmentAnswer?personId=${PersonId}&AssignmentId=${AssignmentId}&AssignmentInText=""`,{
//    method: "POST" ,
//    headers: {
//     "content-type": "applicationCache/json"
//    },
//    body: formdata
//   }).then(response => response.json()).then(res => {
//     console.log(res, ":Success")
//     Alert.alert("assignment succesfully submitted")
//   }).catch(error => {
//     console.log(error, ":there was an error");
    
//   });
  
// }


const formatAMPM = () => {
  const dt = new Date(Dates);
  var hours = dt.getHours() - 1;
  var minutes = dt.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

const formatFullDate=()=>{
  const dt = new Date(Dates);
 const yeah = dt.toDateString()
  return  setNewDates(`${yeah} ${formatAMPM()}`);

}

useEffect(()=>{
  setDates(params.CourseId.DueDate)
  formatFullDate()
})

 async function fileUpload () {
   try {
    let res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf]
    });
    console.log(
      res.uri,
      res.type, // mime type
      res.name,
      res.size
    );
    setPdf(res.name)
    setMainPdf(`${res.uri}${res.type}${res.name}${res.size}`)
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
    console.log(err)
  }
   
  
}

let url = MainPdf; //The url you received from the DocumentPicker
let uploadUrl = `https://applications.federalpolyilaro.edu.ng/api/e_learning/PostAssignmentAnswer?personId=${PersonId}&AssignmentId=${AssignmentId}&AssignmentInText=${Input}`
 
// I STRONGLY RECOMMEND ADDING A SMALL SETTIMEOUT before uploading the url you just got.
const split = url.split('/');
const name = split.pop();
const inbox = split.pop();
const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
 
const uploadBegin = (response) => {
  const jobId = response.jobId;
  console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
};
 
const uploadProgress = (response) => {
  const percentage = Math.floor((response.totalBytesSent/response.totalBytesExpectedToSend) * 100);
  console.log('UPLOAD IS ' + percentage + '% DONE!');
};
 
const handleSubmit =()=>{
  RNFS.uploadFiles({
    toUrl: uploadUrl,
    files: [{
       name,
       filename:name,
       filepath: realPath,
     }],
    method: 'POST',
    headers: {
       'Accept': 'application/json',
    },
    begin: uploadBegin,
    beginCallback: uploadBegin, // Don't ask me, only way I made it work as of 1.5.1
    progressCallback: uploadProgress,
    progress: uploadProgress
    })
    .then((response) => {
      console.log(response,"<<< Response");
      if (response.statusCode == 200) { //You might not be getting a statusCode at all. Check
         console.log('FILES UPLOADED!');
       } else {
         console.log('SERVER ERROR');
        }
    
      })
      .catch((err) => {
        if (err.description) {
          switch (err.description) {
            case "cancelled":
              console.log("Upload cancelled");
              break;
            case "empty":
              console.log("Empty file");
            default:
             //Unknown
          }
        } else {
         //Weird
        }
        console.log(err);
     });

}




    return (
      <View>
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
      <View style={{flexDirection:"row", margin: 10}}>
        <Image
            source={require('../../assets/fine-books.png')}
            style={{marginTop:10, marginRight:8}}
          />
          <View>
              
          <Text>{params.CourseId.Assignment}</Text>
          <View style={{flexDirection: "row"}}>
                    <Image
                    source={require("../../assets/schedule.png")}
                    style={{marginRight: 5}}
                    />
                  <Text>{NewDates}</Text>

                  </View>
          </View>
         
            
          </View>
        <Text style={{marginLeft:5, fontWeight:"bold", fontSize:18}}>Answer :</Text>
       <TextInput
       placeholder="Enter Text Here"
       multiline={true}
          style={{borderWidth:1, margin: 5, height:"42%", textAlignVertical: "top", borderColor: "gray"}}
          onChangeText={(text) => setInput(text)}   
          value={Input}    
          />
       <TouchableNativeFeedback onPress={()=> {
         handleSubmit()
       }}>
         <Text style={{alignSelf:"flex-end", marginRight: 5, backgroundColor: "green", color: "white", width:115, textAlign: "center", height:25, paddingTop: 3}}>Submit</Text>
       </TouchableNativeFeedback>
       <View>
      <Text>{Pdf}</Text>
       <TouchableNativeFeedback onPress={()=> {
         fileUpload()
       }}>
         <Text style={{alignSelf:"flex-start", marginLeft: 5, marginTop: 10, backgroundColor: "green", color: "white", width:115, textAlign: "center", height:25, paddingTop: 3}}>Select File</Text>
       </TouchableNativeFeedback>
       </View>
      </View>
    )
  }

  const styles = StyleSheet.create({

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

  })
export default SubmitAssignment

