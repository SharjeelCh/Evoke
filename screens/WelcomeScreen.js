import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import FontIcons from 'react-native-vector-icons/FontAwesome6';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={{height: '100%', backgroundColor: 'white', paddingTop: 25}}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          marginVertical: 40,
        }}>
        <Image
          source={require('../assets/images.jpg')}
          style={{height: 400, width: 170, borderRadius: 123}}
        />
        <View>
          <Image
            source={require('../assets/image5.png')}
            style={{marginLeft: 8, height: 238, width: 144, borderRadius: 115}}
          />
          <Image
            source={require('../assets/image6.png')}
            style={{
              height: 150,
              width: 150,
              borderRadius: 115,
              marginTop: 10,
              marginLeft: 5,
            }}
          />
        </View>
      </View>
      <View
        style={{
          height: 250,
          width: 250,
          position: 'absolute',
          top: -50,
          left: -80,
          borderRadius: 99999,
          zIndex: -1,
          borderWidth: 0.5,
          borderColor: '#008080',
        }}></View>
      <View
        style={{
          height: 150,
          width: 150,
          position: 'absolute',
          top: 231,
          right: -85,
          borderRadius: 99999,

          borderWidth: 0.5,
          borderColor: '#008080',
        }}></View>
      <View>
        <FontIcons
          name="asterisk"
          size={30}
          color={'#008080'}
          style={{position: 'absolute', top: -85, left: 25}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: -5,
        }}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'SulphurPoint-Bold',
            fontSize: 25,
          }}>
          The
        </Text>
        <Text
          style={{
            color: '#008080',
            fontFamily: 'SulphurPoint-Bold',
            fontSize: 25,
            marginHorizontal: 15,
          }}>
          Fashion App
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'SulphurPoint-Bold',
            fontSize: 25,
          }}>
          That
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'SulphurPoint-Bold',
            fontSize: 25,
            marginVertical: 5,
          }}>
          Makes You Look The Best
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'SulphurPoint-Light',
            fontSize: 20,
            marginTop: 20,
            marginBottom: 2,
            marginHorizontal: 20,
          }}>
          Lorem ipsum dolor sit amet,
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'SulphurPoint-Light',
            fontSize: 20,
            marginHorizontal: 15,
            marginTop: -2,
            marginBottom: 10,
          }}>
          consectetur adipiscing.
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#008080',
            height: 50,
            marginHorizontal: 30,
            borderRadius: 92,
            justifyContent: 'center',
            marginBottom: 20,
            marginTop: 30,
          }}
          onPress={() => navigation.navigate('bottomtab')}>
          <Text
            style={{
              color: 'white',
              fontSize: 25,
              alignSelf: 'center',
              marginTop: -3,
              fontFamily: 'SulphurPoint-Bold',
            }}>
            Lets Get Started!
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <Text
          style={{
            fontFamily: 'SulphurPoint-Light',
            color: 'black',
            fontSize: 20,
          }}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Text
            style={{
              fontFamily: 'SulphurPoint-Bold',
              color: '#008080',
              fontSize: 20,
            }}>
            Sign in!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;
