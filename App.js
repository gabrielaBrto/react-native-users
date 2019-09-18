import React, {Component} from 'react';
import { View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Icon } from 'react-native-elements'

import Main from './src/components/Main'
import Dados from './src/components/Dados'
import Login from './src/components/Login'
import SplashScreen from './src/components/SplashScreen'

class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={[styles.bubble, styles.button]} onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

drawer = () => { navigation.toggleDrawer() }

const AppNavigator = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
    })
  },
  Login: {
    screen: Login,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  }, 
  Main: {
    screen: Main,
    navigationOptions: ({navigation}) => ({
     header: null,
    })
  },

});

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }, 
  bubble: {
      backgroundColor: "#1E446A",
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 20
    },
    button: {
      width: 80,
      paddingHorizontal: 12,
      alignItems: "center",
      marginHorizontal: 10,
      width: 200,
    },
    header: {
      backgroundColor: '#2F3C51'
    },
    back: {
      color: '#000',
      alignSelf: 'center',
      textAlign: 'center'
    },
})


export default createAppContainer(AppNavigator);

