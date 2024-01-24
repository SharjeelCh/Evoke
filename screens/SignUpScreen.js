import {View, Text, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Jiro} from 'react-native-textinput-effects';
import Ionicon from 'react-native-vector-icons/Ionicons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { createTable, createUser } from '../SQL/userDB';

const SignUpScreen = ({navigation}) => {

  const [userName, setuserName]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');

  const handleSignup = async () => {
    try {
      const user=await createUser(userName, email, password)
      console.log('User created successfully', user);
      navigation.navigate('login');
    } catch (error) {
      console.log('Error signing up:', error);
    }
  };

  useEffect(()=>{
    createTable();
  },[])


  return (
    <View style={{height: '100%', paddingTop: 0, backgroundColor: 'white'}}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 80}}>
        <Text
          style={{
            color: 'black',
            fontSize: 28,
            fontFamily: 'SulphurPoint-Bold',
          }}>
          Create Account
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'SulphurPoint-Regular',
            marginTop: 20,
            fontSize: 16,
            marginHorizontal: 20,
            alignSelf: 'center',
            marginBottom: 2,
          }}>
          Sign up and shop effortlessly!
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'SulphurPoint-Regular',
            marginBottom: 20,
            fontSize: 16,
            marginHorizontal: 20,
            alignSelf: 'center',
          }}>
          Join the Shopping Spree NOW!
        </Text>
      </View>
      <View style={{marginHorizontal: 30}}>
        <View style={{}}>
          <Jiro
            label={'Name'}
            labelStyle={{
              fontFamily: 'SulphurPoint-Bold',
              fontSize: 15,
              fontWeight: 'normal',
            }}
            borderColor={'#008080'}
            inputPadding={16}
            inputStyle={{
              color: 'white',
              fontFamily: 'SulphurPoint-Bold',
              fontWeight: 'normal',
            }}
            onChangeText={userName => setuserName(userName)}
          />
        </View>
        <View style={{}}>
          <Jiro
            label={'Email'}
            labelStyle={{
              fontFamily: 'SulphurPoint-Bold',
              fontSize: 15,
              fontWeight: 'normal',
            }}
            borderColor={'#008080'}
            inputPadding={16}
            inputStyle={{
              color: 'white',
              fontFamily: 'SulphurPoint-Bold',
              fontWeight: 'normal',
            }}
            onChangeText={email => setEmail(email)}
          />
        </View>

        <View>
          <Jiro
            label={'Password'}
            labelStyle={{
              fontFamily: 'SulphurPoint-Bold',
              fontSize: 15,
              fontWeight: 'normal',
            }}
            borderColor={'#008080'}
            inputPadding={16}
            secureTextEntry={true}
            inputStyle={{
              color: 'white',
              fontFamily: 'SulphurPoint-Bold',
              fontWeight: 'normal',
            }}
            style={{marginTop: 0}}
            onChangeText={password => setPassword(password)}
          />
          <View style={{position: 'relative', left: 257, bottom: 40}}>
            <TouchableOpacity onPress={() => {}}>
              <Ionicon name="eye-off-outline" color={'white'} size={35} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: -10,
          }}>
          <BouncyCheckbox
            size={25}
            fillColor="#008080"
            unfillColor="#FFFFFF"
            iconStyle={{borderColor: 'red', borderRadius: 5}}
            innerIconStyle={{borderWidth: 2, borderRadius: 5}}
            textStyle={{fontFamily: 'JosefinSans-Regular'}}
          />
          <Text
            style={{
              fontFamily: 'SulphurPoint-Bold',
              color: 'black',
              fontSize: 15,
              marginLeft: -8,
              marginRight: 8,
            }}>
            Agree with
          </Text>
          <Text
            style={{
              color: '#008080',
              fontFamily: 'SulphurPoint-Bold',
              fontSize: 15,
              textDecorationLine: 'underline',
            }}>
            Terms & Conditions
          </Text>
        </View>
        <View style={{}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#008080',
              padding: 12,
              alignItems: 'center',
              borderRadius: 30,
              marginVertical: 30,
            }}
            onPress={() => {
              handleSignup();
            }}>
            <Text
              style={{
                fontSize: 22,
                color: 'white',
                fontFamily: 'SulphurPoint-Bold',
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 30,
              marginVertical: 10,
            }}>
            <View style={{flex: 1, height: 1, backgroundColor: 'grey'}} />
            <View>
              <Text
                style={{
                  width: 100,
                  textAlign: 'center',
                  color: 'grey',
                  fontFamily: 'SulphurPoint-Regular',
                }}>
                Or sign in with
              </Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: 'grey'}} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 50,
            marginVertical: 30,
          }}>
          <TouchableOpacity>
            <View
              style={{
                borderWidth: 1,
                height: 50,
                width: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicon name="logo-google" size={25} color={'black'} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                borderWidth: 1,
                height: 50,
                width: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicon name="logo-facebook" size={25} color={'black'} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                borderWidth: 1,
                height: 50,
                width: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicon name="logo-apple" size={25} color={'black'} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 40,
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontFamily: 'SulphurPoint-Regular',
              color: 'black',
              fontSize: 16,
            }}>
            Already have an Account?
          </Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text
              style={{
                fontFamily: 'SulphurPoint-Bold',
                color: '#008080',
                fontSize: 16,
                textDecorationLine: 'underline',
              }}>
              Sign in!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
