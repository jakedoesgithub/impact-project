import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import LoginScreen from './../screens/LoginScreen';
import SignupScreen from './../screens/SignupScreen';
import ForgotPasswordScreen from './../screens/ForgotPasswordScreen';

export default createAppContainer(
  createSwitchNavigator({
    Login:LoginScreen,
    Signup:SignupScreen,
    ForgotPassword:ForgotPasswordScreen,

    Main: MainTabNavigator,
  })
);
