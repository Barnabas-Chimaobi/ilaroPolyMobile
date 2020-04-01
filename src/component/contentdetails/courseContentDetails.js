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
} from 'react-native';

const CourseContentDetails = props => {
  CourseContentDetails.navigationOptions = {
    header: null,
  };

  const {state, setParams, navigate} = props.navigation;
  const params = state.params || {};
  console.log(props);

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
      <View>
        {params.newArray.map((items, index) => {
          return (
            <View>
              <SectionList
                sections={[
                  {title: 'PDF', data: [items.Url]},
                  {title: 'Videos', data: [items.VideoUrl]},
                ]}
                renderItem={({item}) => (
                  <TouchableOpacity>
                    <Text style={styles.item}>{item}</Text>
                  </TouchableOpacity>
                )}
                renderSectionHeader={({section}) => (
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
                keyExtractor={(item, index) => index}
              />

              {/* <WebView
                style={ {  marginTop: (Platform.OS == 'ios') ? 20 : 0,} }
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{uri: 'https://www.youtube.com/embed/'+items.YoutubeVideoUrl }}
        /> */}

              {/* <YoutubePlayer
                ref={playerRef}
                height={300}
                width={400}
                videoId={items.YoutubeVideoUrl}
                play={playing}
                onChangeState={event => console.log(event)}
                onReady={() => console.log("ready")}
                onError={e => console.log(e)}
                onPlaybackQualityChange={q => console.log(q)}
                volume={50}
                playbackRate={1}
                playerParams={{
                  preventFullScreen: true,
                  cc_lang_pref: "us",
                  showClosedCaptions: true
                }}
                /> */}
            </View>
          );
        })}
      </View>
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
    height: 44,
  },
});

export default CourseContentDetails;
