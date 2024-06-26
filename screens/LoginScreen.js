import {View, Text, TouchableOpacity,TouchableWithoutFeedback,Modal, Dimensions} from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {Jiro} from 'react-native-textinput-effects';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { loginUser } from '../SQL/userDB';
import { useContext } from 'react';
import { UserContext } from './UserProvider';
import AsyncStorage from '@react-native-community/async-storage';


const LoginScreen = ({navigation}) => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false); 
  const [password, setPassword] = useState('');
  const width = Dimensions.get('window').width;

  const handleLogin = async () => {
    try {
      const user = await loginUser(email,password)
      
      setUser(user);
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      navigation.navigate('bottomtab')
      if(user==null){
        setModalVisible(true);
      }
    } catch (error) {
      
      setModalVisible(true);

    }
  };

  const modal = () => {
    return (
      <Modal
        animationType="slide"
        statusBarTranslucent={true}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginTop: 0,
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}>
            <View
              style={{
                width: '100%',
                height: '20%',
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                backgroundColor: '#008080',
                padding: 17,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 29,
                  fontFamily: 'SulphurPoint-Bold',
                  marginBottom: 10,
                }}>
                Error
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 19,
                  fontFamily: 'SulphurPoint-Bold',
                  marginBottom: 8,
                }}>
                  Invalid Email or Password
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 12,
                    marginTop: 10,
                    padding: 10,
                    width: width / 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={{fontFamily: 'SulphurPoint-Bold', fontSize: 16, color:'black'}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 12,
                    marginTop: 10,
                    padding: 10,
                    width: width / 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={{fontFamily: 'SulphurPoint-Bold', fontSize: 16, color:'black'}}>
                    Ok
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  useEffect(()=>{
    
  },[])

  return (
    <View style={{height: '100%', paddingTop: 40, backgroundColor: 'white'}}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 80}}>
        <Text
          style={{
            color: 'black',
            fontSize: 28,
            fontFamily: 'SulphurPoint-Bold',
          }}>
          Sign In
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'SulphurPoint-Regular',
            margin: 20,
            fontSize: 16,
            marginHorizontal: 20,
          }}>
          Back in the spotlight!
        </Text>
      </View>
      <View style={{marginHorizontal: 30}}>
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
            onChangeText={(email)=>{setEmail(email)}}
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
            style={{marginTop: 5}}
            onChangeText={(mAil)=>{setPassword(mAil)}}
          />
          <View style={{position: 'relative', left: 257, bottom: 40}}>
            <TouchableOpacity onPress={() => {}}>
              <Ionicon name="eye-off-outline" color={'white'} size={35} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            marginTop: -10,
          }}>
          <Text
            style={{
              color: '#008080',
              fontFamily: 'SulphurPoint-Bold',
              fontSize: 15,
              textDecorationLine: 'underline',
            }}>
            Forgot Password?
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
            onPress={()=>{handleLogin();}}>
            <Text
              style={{
                fontSize: 22,
                color: 'white',
                fontFamily: 'SulphurPoint-Bold',
              }}>
              Sign In
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
            marginVertical: 30,
          }}>
          <Text
            style={{
              fontFamily: 'SulphurPoint-Regular',
              color: 'black',
              fontSize: 16,
            }}>
            Don't have an Account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text
              style={{
                fontFamily: 'SulphurPoint-Bold',
                color: '#008080',
                fontSize: 16,
                textDecorationLine: 'underline',
              }}>
              Sign Up!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {modal()}
    </View>
  );
};

export default LoginScreen;
