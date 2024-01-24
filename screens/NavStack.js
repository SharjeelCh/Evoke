import React,{useContext,useState,useEffect} from 'react';
import SplashScreen from './splashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-community/async-storage';
import WelcomeScreen from './WelcomeScreen';
import OnBoardingScreen from './OnBoardingScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import OtpScreen from './OtpScreen';
import HomeScreen from './HomeScreen';
import BottomTab from './BottomNav';
import { UserContext } from './UserProvider';

const Stack = createNativeStackNavigator();
const NavStack = () => {
  const { user, setUser } = useContext(UserContext);
  const { isLoggedIn } = user;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check AsyncStorage for the user's login state
    const checkLoginStatus = async () => {
      try {
        const storedLoginStatus = await AsyncStorage.getItem('isLoggedIn');
        console.log('Stored Login Status:', storedLoginStatus);
        const parsedLoginStatus = JSON.parse(storedLoginStatus);
        setUser({ isLoggedIn: parsedLoginStatus });
      } catch (error) {
        console.error('Error reading login status from AsyncStorage', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [setUser]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>

      {isLoggedIn ? (
          <>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="bottomtab" component={BottomTab} />
          </>
        ) : (
          <>
            <Stack.Screen name="splash" component={SplashScreen} />
            <Stack.Screen name="welcome" component={WelcomeScreen} />
            <Stack.Screen name="onboard" component={OnBoardingScreen} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="signup" component={SignUpScreen} />
            <Stack.Screen name="otp" component={OtpScreen} />
            <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="bottomtab" component={BottomTab} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavStack;
