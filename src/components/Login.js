import React, {Component} from 'react';
import { View, StyleSheet, TextInput, Alert, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import arrow from '../assets/image/arrow.png'
import { NavigationActions, StackActions} from 'react-navigation';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

const { width : WIDTH } = Dimensions.get('window')

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      showPass: true,
      press: false,
      email: "",
      password: "",
    };
  }

  showPass = () => {
    if(this.state.press == false)
      this.setState({ showPass: false, press: true })
    else
    this.setState({ showPass: true, press: false })
  }

  logar = () =>{
    axios({
      method: 'post',
      url: 'http://192.168.1.38/Hunt/public/api/logar',
       headers: {
        'Accept': 'application/json',  
     },
      data: {
        email: this.state.email,
        password: this.state.password,
      },
    }).then( (response) => {
      if(response.data.nome){
        console.log(response.data.api_token)
         AsyncStorage.setItem('id',JSON.stringify(response.data.id));
        
         const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Main' })],
        });

        this.props.navigation.dispatch(resetAction);
      }else{
        Alert.alert('Ops', 'E-mail ou Senha incorretos')
      }
    })
    .catch(function (error) {
      console.log(JSON.stringify(error))
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={arrow} style={styles.logo}/>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="user" size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
          <TextInput style={styles.input} placeholder={'Email'} placeholderTextColor={'rgba(255, 255, 255, 0.7)'} underlineColorAndroid="transparent" value={this.state.email} autoCapitalize="none"  autoCorrect={false} onChangeText={(email) => this.setState({email})}></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={30} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
          <TextInput style={styles.input} placeholder={'Senha'} secureTextEntry={this.state.showPass} value={this.state.password} placeholderTextColor={'rgba(255, 255, 255, 0.7)'} underlineColorAndroid="transparent" autoCapitalize="none"  autoCorrect={false} onChangeText={(password) => this.setState({password})}></TextInput>
          
          <TouchableOpacity style={styles.btnEye} onPress={this.showPass.bind(this)}>
          <Icon name={ this.state.press == false ? "eye" : "eye-slash" } size={25} color={'rgba(255,255,255,0.7)'} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnLogin} onPress={() => {this.logar()}}>
          <Text style={styles.textLogin}>LOG IN</Text>  
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
    // 154E5C, 
    backgroundColor: '#2F3C51'
  },

  logoContainer: {
    alignItems: 'center'
  },

  logo: {
    width: 120,
    height: 120
  },

  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25,
  },

  inputContainer: {
    marginTop: 30
  },

  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 40,
  },

  btnEye: {
    position: 'absolute',
    top: 8,
    right: 40,
  },

  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    // 30C7EE, 17B7C8
    backgroundColor: '#30C7EE',
    justifyContent: 'center',
    marginTop: 20
  },

  textLogin: {
    color:'#FFF',
    fontSize: 16,
    textAlign: 'center'
  }

})


