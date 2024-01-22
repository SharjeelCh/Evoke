import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('welcome');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: '#008080',
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 45,
          }}>
          <Text
            style={{
              fontFamily: 'SulphurPoint-Regular',
              fontSize: 40,
              color: 'black',
              fontWeight: '600',
              marginTop: -5,
            }}>
            e
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'SulphurPoint-Regular',
            fontSize: 40,
            color: 'black',
            fontWeight: '600',
            marginLeft: 5,
            marginTop: -5,
          }}>
          evoke.
        </Text>
      </View>
      <View style={{position: 'absolute', bottom: -10, alignItems: 'center'}}>
        <Ionicons name="remove" size={60} color={'black'} />
      </View>
    </View>
  );
};

export default SplashScreen;
