import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Main from '../components/Main'
import Dados from '../components/Dados'

const Menu = createBottomTabNavigator({
    Dados: { screen: Dados },
  });
  
export default createAppContainer(Menu);