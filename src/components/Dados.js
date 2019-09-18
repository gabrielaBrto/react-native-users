import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements'

const list = [
  {
    title: 'Appointments',
    icon: 'book',
    type: 'font-awesome'
  },
  {
    title: 'Trips',
    icon: 'book',
    type: 'font-awesome'
  },
]

class Dados extends Component {
   render() {
     return (
       <View style={styles.container}>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon }}
              />
            ))
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor: '#FFF',
      marginTop: 60
  },
  text: {
      color: 'white',
      fontSize: 20,
  },
  horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
  }
})  

export default Dados