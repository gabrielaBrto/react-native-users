import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native'
import { createBottomTabNavigator, createAppContainer, NavigationActions, StackActions } from 'react-navigation';
import axios from 'axios'
import Dados from './Dados'
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements'
import { Avatar } from 'react-native-elements';

const { width : WIDTH } = Dimensions.get('window')

class Main extends Component {
    constructor(props){
    super(props);
    this.state = {
      nome: "", 
      id: "",
      email: "",
      api_token: "",
    };
  }

    componentDidMount() {
      AsyncStorage.getItem("id").then((value) => {
          this.setState({id: value});
          this.verifica();
      })  
    }

    logout = () => {
      AsyncStorage.clear();
        this.setState({nome: null, id: null, email: null, api_token: null})
        AsyncStorage.setItem("id","")
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Login' })],
        });
        this.props.navigation.dispatch(resetAction);
    }
    
    verifica = () => {
       axios({
         method: 'post',
         url: 'http://192.168.1.38/Hunt/public/api/verifica',
          headers: {
          'Accept': 'application/json',  
        },
         data: {
           id: this.state.id,
         },
        
       }).then( (response) => {
      if(response.data.nome){
         this.setState({email: response.data.email,nome: response.data.nome, api_token: response.data.api_token})
      }else{
        Alert.alert('Ops', 'E-mail ou Senha incorretos')
      }
    })
    .catch(function (error) {
      console.log(JSON.stringify(error))
    });
  }
      
   render() {
     return (
       <View style={styles.container}>
          <View>
          <Avatar size="large" activeOpacity={0.7} rounded  icon={{name: 'user', type: 'font-awesome'}}  />
          </View>
          <View>
          <Text style={styles.text}>{this.state.nome}</Text>
          </View>
         
         
         {/* <Text style={styles.text}>Email: {this.state.email}</Text> */}
         <TouchableOpacity style={styles.sair} onPress={() => {this.logout()} }>
          <Text style={styles.textSair}>LOG OUT</Text>  
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2F3C51',
  },
  text: {
      color: 'white',
      fontSize: 20,
  },
  horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
  },
  logo: {
    width: 120,
    height: 120
  },
  sair: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    // 30C7EE, 17B7C8
    backgroundColor: '#30C7EE',
    justifyContent: 'center',
    marginTop: 20
  },
  textSair: {
    color:'#FFF',
    fontSize: 16,
    textAlign: 'center'
  }
})

const TabNavigator = createBottomTabNavigator({
  Inicio: { 
    screen: Dados, 
    navigationOptions: {
      // tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <Icon name='home' color={tintColor} size={24}/>
      ),
      tabBarOptions: {
        showLabel: false, // hide labels
        activeTintColor: '#F8F8F8', // active icon color
        inactiveTintColor: '#586589',  // inactive icon color
        style: {
            backgroundColor: '#171F33' // TabBar background
        }
    }
    }
  },
  Profile: { 
    screen: Main,
    navigationOptions: {
      // tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <Icon name='account-circle' color={tintColor} size={24}/>
      ),
      tabBarOptions: {
        showLabel: false, // hide labels
        activeTintColor: '#F8F8F8', // active icon color
        inactiveTintColor: '#586589',  // inactive icon color
        style: {
            backgroundColor: '#171F33' // TabBar background #171F33, 232A33
        }
    }
    } 
  },
});

// https://itnext.io/react-native-tab-bar-is-customizable-c3c37dcf711f
export default createAppContainer(TabNavigator);

  