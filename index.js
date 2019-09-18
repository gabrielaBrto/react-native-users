/**
 * @format
 */


// import {AppRegistry, Dimensions} from 'react-native';
// import {name as appName} from './app.json';
// import { createDrawerNavigator, createAppContainer } from 'react-navigation'

// import Main from './src/components/Main'
// import Dados from './src/components/Dados'
// import Menu from './src/components/Menu'
// import App from './App'

// const MyDrawerNavigator = createDrawerNavigator({
//   item1: {
//     screen: App
//   }
//   }, {
    //     contentComponent: Menu,
    //     drawerWidth: Dimensions.get('window').width - 150,  
    // });
//AppRegistry.registerComponent(appName, () => createAppContainer(MyDrawerNavigator));
    
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

