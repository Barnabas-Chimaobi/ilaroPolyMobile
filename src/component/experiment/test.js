import React, {Component, useState} from 'react';

import {StyleSheet, View, Platform, Text, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
// import RNFS from 'react-native-fs';
// import FileViewer from 'react-native-file-viewer';

const VideoTest = () => {
    let [ renderPDF, setRenderPDF ] = useState(false);
    
    const toggleDisplay = () => {
        setRenderPDF(!renderPDF);
    }

    //   let [renderedOnce,  setRenderedOnce] = useState(false)

//   useEffect(() => {
//     setRenderedOnce({renderedOnce: true});
// });

    const {state, setParams, navigate} = props.navigation;
    const params = state.params || {};
    // console.log(params.newArray.map((item1)=>{return item1.Url}),": PROPSSSSSSSSSSSS");
    const list = params.newArray.map((item1)=>{return item1.Url})
    

    // let urlFromAPI = `~/Content/ELearning/PYE32212518235.pdf`;
    let list1 = list
    console.log(list1)
    // let uri = `${API_ROOT}${urlFromAPI.substring(2, urlFromAPI.length)}`;
    // let uri = `${API_ROOT}${list1.substring(2, list1.length)}`;

    // console.log(uri,":YESSSSSS")
  
    // if (/\.pdf$/.test(uri)) {
    //   uri = `https://drive.google.com/viewerng/viewer?embedded=true&url=${uri}`;
    // }

    //let uri = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    let uri = 'https://reactnativemaster.com/wp-content/uploads/2020/02/React-native-document-viewer-pdf-sample.pdf'
    console.log(uri)

    if (/\.pdf$/.test(uri)) {
      uri = `https://drive.google.com/viewerng/viewer?embedded=true&url=${uri}`;
    }
  return (
    <View style={{height: 300}}>
         <TouchableOpacity onPress={toggleDisplay}>
     <Text>click me</Text>
 </TouchableOpacity>
 
      {/* <WebView
        style={styles.WebViewContainer}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{uri: 'https://www.youtube.com/embed/dFKhWe2bBkM'}}
      /> */}

          {/* <WebView
                style={ {  marginTop: (Platform.OS == 'ios') ? 20 : 0,} }
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{uri: 'https://www.youtube.com/embed/dFKhWe2bBkM' }}
                // source={{uri: 'https://www.youtube.com/embed/'+items.YoutubeVideoUrl }}
        /> */}
      <Text>Play the Video</Text>

     {
        renderPDF ?  
        <WebView
         style={styles.WebViewContainers}
         startInLoadingState={true}
         scalesPageToFit={true}
         scrollEnabled={true}
         source={{uri}}
         scalesPageToFit
       /> : null
     }
 
    </View>
  );
};

export default VideoTest;

const styles = StyleSheet.create({
  WebViewContainer: {
    marginTop: Platform.OS == 'ios' ? 30 : 0,
  },

  WebViewContainers: {
    marginTop: Platform.OS == 'ios' ? 200 : 0,
  },
});
