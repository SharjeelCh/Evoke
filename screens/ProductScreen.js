import {View, Text, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {UserContext} from './UserProvider';
import {addToCart, fetchCartItems} from '../ReduxManagement/reducers';
import {fav} from '../ReduxManagement/wishlistreducer';
import SQLite from 'react-native-sqlite-storage';
import {cartDB, validateCart, wishDB} from '../SQL/userDB';

const ProductScreen = ({navigation, route}) => {
  const db = SQLite.openDatabase(
    {name: 'evokeDB.db', location: 'default'},
    () => {
      console.log('evokeDB opened successfully');
    },
    error => {
      console.log('Error while opening the database:', error);
    },
  );
  const [selectedSize, setSelectedSize] = useState('M');
  const productId = route.params;
  const {user} = useContext(UserContext);
  const [val, setval] = useState([]);

  const dispatch = useDispatch();
  const dispatch1 = useDispatch();

  const item = useSelector(state =>
    state.detail.items.find(item => item.proid === productId),
  );

  const handleSizeSelection = size => {
    setSelectedSize(size);
    console.log(size);
  };
  const handlecart = async product => {
    try {
      const userId = await getUserinfo();
      if (val.includes(product.proid)) {
        ToastAndroid.show('Already in Cart', ToastAndroid.SHORT);
      } else {
        dispatch(addToCart(product));
        cartDB(product, userId, selectedSize);
      }
    } catch (error) {
      console.error('Error getting user info:', error);
    }
  };
  const handlewishlist = async product => {
    try {
      const userId = await getUserinfo();
      if (val.includes(product.proid)) {
        ToastAndroid.show('Already in wishlist', ToastAndroid.BOTTOM);
      } else {
        dispatch(fav(product));
        wishDB(product, userId);
      }
    } catch (error) {
      console.error('Error getting user info:', error);
    }
  };
  const getUserinfo = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT UserId FROM Users where Email= ?;',
          [user.Email],
          (_, results) => {
            if (results.rows.length > 0) {
              resolve(results.rows.item(0).UserId);
            } else {
              reject(new Error('Invalid email or password'));
            }
          },
          (_, error) => reject(error),
        );
      });
    });
  };

  useEffect(() => {
    console.log('item', item);
    getUserinfo()
      .then(user => {
        console.log(user.UserId);
      })
      .catch(error => {
        console.error('Error getting user info:', error);
      });

    validateCart()
      .then(proId => {
        console.log(proId);
        setval(proId);
      })
      .catch(error => {
        console.error('Error getting user info:', error);
      });
  }, [item]);
  return (
    <View style={{flex: 1, backgroundColor: '	hsl(0, 0%, 98%)'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 25,
          paddingTop: 50,
        }}>
        <TouchableOpacity
          onPress={() => navigation.replace('bottomtab')}
          style={{backgroundColor: '#cdcdcd', padding: 10, borderRadius: 40}}>
          <Ionicon name="arrow-back" color={'black'} size={20} />
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            fontSize: 23,
            fontWeight: '600',
            fontFamily: 'SulphurPoint-Bold',
          }}>
          Product Details
        </Text>
        <TouchableOpacity
          onPress={() => {
            handlewishlist(item);
          }}
          style={{backgroundColor: '#cdcdcd', padding: 10, borderRadius: 40}}>
          <Ionicon name="heart" color={'#008080'} size={20} />
        </TouchableOpacity>
      </View>

      <View>
        <Image
          source={{uri: item.picture}}
          style={{height: '75%', width: '100%', zIndex: -1, marginTop: -105}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 25,
          marginTop: -200,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 26,
            fontFamily: 'SulphurPoint-Bold',
          }}>
          {item.Proname}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicon name="star" color={'orange'} size={22} />
          <Text
            style={{
              color: 'black',
              marginLeft: 5,
              fontFamily: 'SulphurPoint-Bold',
              fontSize: 18,
            }}>
            {item.rating}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 0.4,
          paddingBottom: 20,
          borderColor: 'grey',
          marginTop: 30,
          marginHorizontal: 25,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontFamily: 'SulphurPoint-Bold',
          }}>
          Product Details
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontFamily: 'SulphurPoint-Light',
            marginTop: 10,
          }}>
          {item.categoryName}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontFamily: 'SulphurPoint-Light',
            marginTop: 10,
          }}>
          {item.Proname}
        </Text>
      </View>
      <View style={{paddingHorizontal: 25, paddingTop: 10}}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'SulphurPoint-Bold',
            fontSize: 16,
            paddingBottom: 10,
          }}>
          Select Size
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(size => (
            <TouchableOpacity
              key={size}
              onPress={() => handleSizeSelection(size)}
              style={{
                borderColor: '#008080',
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                margin: 5,
                backgroundColor: selectedSize === size ? '#008080' : 'white',
              }}>
              <Text
                style={{
                  color: selectedSize === size ? 'white' : '#008080',
                  fontSize: 15,
                  fontFamily: 'SulphurPoint-Bold',
                }}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View
        style={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 90,
          borderWidth: 1,
          alignItems: 'center',
          borderColor: '#cdcdcd',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          elevation: 24,
          paddingHorizontal: 25,
        }}>
        <View>
          <Text
            style={{
              color: 'grey',
              fontFamily: 'SulphurPoint-Bold',
              fontSize: 18,
            }}>
            Total Price
          </Text>
          <Text
            style={{
              color: 'black',
              fontFamily: 'SulphurPoint-Bold',
              fontSize: 18,
            }}>
            ${item.Proprice}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#008080',
            flexDirection: 'row',
            width: 200,
            height: 50,
            borderRadius: 55,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            handlecart(item);
          }}>
          <Ionicon name="bag-handle" color={'white'} size={20} />
          <Text
            style={{
              color: 'white',
              fontFamily: 'SulphurPoint-Bold',
              fontSize: 18,
              marginLeft: 10,
            }}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductScreen;
