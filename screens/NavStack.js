import React from 'react';
import SplashScreen from './splashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WelcomeScreen from './WelcomeScreen';
import OnBoardingScreen from './OnBoardingScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import OtpScreen from './OtpScreen';
import HomeScreen from './HomeScreen';
import BottomTab from './BottomNav';

const Stack = createNativeStackNavigator();
const NavStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="onboard" component={OnBoardingScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignUpScreen} />
        <Stack.Screen name="otp" component={OtpScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="bottomtab" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavStack;
