import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from './../screens/LoginScreen';
import SignupScreen from './../screens/SignupScreen';
import ForgotPasswordScreen from './../screens/ForgotPasswordScreen';
import ProfileScreen from './../screens/ProfileScreen';
import ProfileUpdater from "../components/ProfileUpdater";
export default createAppContainer(
  createSwitchNavigator({
    Login:LoginScreen,
    Signup:SignupScreen,
    ForgotPassword:ForgotPasswordScreen,
    Profile: ProfileScreen,
    Updater: ProfileUpdater,

    Main: MainTabNavigator,
  })
);
