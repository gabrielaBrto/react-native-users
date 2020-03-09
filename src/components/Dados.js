import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements'


class Dados extends Component {
  constructor(props){
    super(props)
    this.state = {
      livros: []
    }
    this._getLivros()
  }

  _getLivros = () =>{
      axios.get('http://192.168.1.38/Hunt/public/api/livros')
      .then((res) => {
          var livros = this.state.livros
          res.data.map(livro => {
              livros.push({
                  title: livro.titulo,
                  autor: livro.autor,
                  preco: livro.preco,
                  icon: 'book'
              })
          })
          this.setState({livros})
      })
  }
  
  render() {
     return (
       <View style={styles.container}>
          {
            this.state.livros.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon }}
                bottomDivider
                chevron
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