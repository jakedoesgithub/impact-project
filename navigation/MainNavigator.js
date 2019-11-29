import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import ProfileUpdater from "../screens/ProfileUpdater";
import ProfileScreen from "./../screens/ProfileScreen";



export default createAppContainer(
  createSwitchNavigator({
    Main: MainTabNavigator,
    Profile: ProfileScreen,
    Updater: ProfileUpdater
  })  
);

