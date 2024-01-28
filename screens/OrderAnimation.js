import {StyleSheet, Text, View, SafeAreaView, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

const OrderAnimation = () => {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('bottomtab');
    }, 1300);
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <LottieView
        source={require('../assets/thumbs.json')}
        // ref={animation}
        style={{
          height: width,
          width: height,
          alignSelf: 'center',
          marginTop: 40,
          justifyContent: 'center',
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 20,
          fontWeight: '600',
          textAlign: 'center',
          fontFamily: 'SulphurPoint-Bold'
        }}>
        Your Order Has been Recieved
      </Text>
      <LottieView
        source={require('../assets/sparkle.json')}
        style={{
          height: 250,
          position: 'absolute',
          top: 100,
          width: 250,
          alignSelf: 'center',
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeAreaView>
  );
};

export default OrderAnimation;

const styles = StyleSheet.create({});
