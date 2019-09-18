import React, { Component } from 'react'
import { Image, ActivityIndicator, StyleSheet, View , Text, Dimensions, Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'
import arrow from '../assets/image/arrow.png'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export default class SplashScreen extends Component {
    state = {
        email: "",
        password: "",
        api_token: "",
        timePassed: false,
    }

    componentDidMount(){
        AsyncStorage.getItem("id").then((value) => {
            this.setState({id: value});
            this.verifica();
        })
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
        setTimeout(() => {
            this.props.navigation.dispatch({
                type: 'Navigation/RESET',
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Main'})],
            });
        },10000)
       }else{
        setTimeout(() => {
            this.props.navigation.dispatch({
                type: 'Navigation/RESET',
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Login'})],
            });
        },10000)
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
                    <Image source={arrow} style={styles.logo}/>
                </View>
                <View style={{marginTop: 50}}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
                <Text>{this.state.email}</Text>
            </View>
        );
    }
}
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    logo: {
        width: 120,
        height: 120
    },
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
    }
})