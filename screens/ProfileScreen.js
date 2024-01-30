import {View, Text, Pressable, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import SQLite from 'react-native-sqlite-storage';
import {UserContext} from './UserProvider';
import AsyncStorage from '@react-native-community/async-storage';

const ProfileScreen = ({navigation}) => {
  const [name, setname] = useState(null);
  const {user} = useContext(UserContext);

  const db = SQLite.openDatabase({name: 'evokeDB.db', location: 'default'});
  const getusername = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT Username FROM Users where Email = ?;',
        [user.Email],
        (_, results) => {
          if (results.rows.length > 0) {
            setname(results.rows.item(0).Username);
          }
        },
        (_, error) => (error),
      );
    });
  };

  const { setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('userData');
      
      setUser({ isLoggedIn: false });
      
      navigation.navigate('welcome'); 
    } catch (error) {
      console.error('Error during logout', error);
    }
  }

  useEffect(() => {
    getusername();
    console.log("user email: ",user.Email);
  }, [user]);

  const renderMenuItem = (iconName, label, onPress) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 25,
        borderBottomWidth: 0.2,
        borderColor: 'grey',
        marginTop:-3,
        padding: 15,
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Ionicon name={iconName} size={25} color={'#008080'} />
        <Text
          style={{
            color: 'black',
            fontFamily: 'SulphurPoint-Bold',
            marginHorizontal: 15,
            fontSize: 20,
          }}>
          {label}
        </Text>
      </View>
      <Ionicon name="chevron-forward-outline" size={25} color={'#008080'} />
    </TouchableOpacity>
  );
  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingTop: 15}}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Pressable
          style={{
            padding: 10,
            borderColor: 'grey',
            borderWidth: 0.5,
            borderRadius: 30,
          }}
          onPress={() => navigation.goBack()}>
          <Ionicon name="arrow-back" size={25} color={'black'} />
        </Pressable>
        <Text
          style={{
            color: 'black',
            fontSize: 22,
            fontFamily: 'SulphurPoint-Bold',
            marginLeft: -50,
          }}>
          My Profile
        </Text>
        <View></View>
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Image
          source={{
            uri: 'https://st4.depositphotos.com/9998432/22597/v/450/depositphotos_225976914-stock-illustration-person-gray-photo-placeholder-man.jpg',
          }}
          style={{height: 120, width: 120, borderRadius: 60}}
        />
        <View
          style={{
            padding: 7,
            backgroundColor: '#008080',
            borderRadius: 50,
            borderColor: 'white',
            borderWidth: 2,
            position: 'absolute',
            right: 120,
            bottom: 0,
          }}>
          <Image
            source={require('../assets/categoryicons/edit-text.png')}
            tintColor={'white'}
            style={{
              height: 22,
              width: 22,
            }}
          />
        </View>
      </View>
      <Text
        style={{
          color: 'black',
          fontSize: 22,
          fontFamily: 'SulphurPoint-Bold',
          alignSelf: 'center',
          margin: 30,
        }}>
        {name}
      </Text>
      {renderMenuItem('person-outline', 'My Profile')}
      {renderMenuItem('reader-outline', 'My Orders')}
      {renderMenuItem('settings-outline', 'Settings')}
      {renderMenuItem('alert-circle-outline', 'Help Center')}
      {renderMenuItem('lock-closed-outline', 'Privacy Policy')}
      {renderMenuItem('log-out-outline', 'Sign Out' , handleLogout)}
    </View>
  );
};

export default ProfileScreen;
