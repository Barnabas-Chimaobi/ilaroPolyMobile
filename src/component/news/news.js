import React, {Component} from "react"
import {View, Text, StyleSheet, TouchableNativeFeedback} from "react-native"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"

class News extends Component {

  static navigationOptions ={
    headerShown : false
  }

  render() {
    return (
      <View>
           <View style={styles.headerWrapper}>
          <View style={styles.headerWrapper1}>
            <TouchableNativeFeedback onPress={()=>{
               this.props.navigation.navigate("Dashboard")
            }}>
              <MaterialIcon
                name="arrow-back"
                // name="keyboard-backspace"
                style={{color: 'white', fontSize: 27, marginLeft: 15}}
              />
            </TouchableNativeFeedback>
            <Text style={{fontSize: 22, color: 'white', marginLeft: 20, }}>
              News/Updates
            </Text>
          </View>
        </View>
        <Text style={{alignSelf: "center", marginTop: "55%", fontSize: 22}}>
          No News Update
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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

  headerWrapper2: {
    alignSelf: 'center',
  },
})

export default News