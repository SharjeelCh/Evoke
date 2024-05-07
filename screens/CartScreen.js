import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fetchCartItemsFromSQLite} from '../SQL/userDB';
import {RefreshControl} from 'react-native';
import LottieView from 'lottie-react-native';
import {UserContext} from './UserProvider';

const CartScreen = () => {
  const cartItems = useSelector(state => state.cart.items);
  const navigation = useNavigation();
  const [item, setitem] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [showbottom, setbottom] = useState('1');
  const {user} = useContext(UserContext);
  const [quantity, setquatity] = useState({Number: 0});
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedItem, setSelectedItemData] = useState([]);
  const [price, setprice] = useState({Number: 1});
  const [items, setItems] = useState([]);

  const toggleSelectedItem = itemId => {
    Object.keys(selectedItems).forEach(key => {
      if (key !== itemId) {
        setSelectedItems(prevSelectedItems => ({
          ...prevSelectedItems,
          [key]: false,
        }));
      }
    });

    setSelectedItems(prevSelectedItems => ({
      ...prevSelectedItems,
      [itemId]: !prevSelectedItems[itemId],
    }));
  };

  const increaseQuantity = itemId => {
    setitem(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.proid === itemId) {
          return {...item, proQuantity: item.proQuantity + 1};
        }
        return item;
      });
      return updatedItems;
    });
  };

  const decreaseQuantity = itemId => {
    setitem(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.proid === itemId && item.proQuantity > 0) {
          return {...item, proQuantity: item.proQuantity - 1};
        }
        return item;
      });
      return updatedItems;
    });
  };

  const renderCart = ({item}) => {
    const isSelected = selectedItems[item.proid];
    // const itemStyle = item.selected ? styles.selectedItem : styles.cartItem;
    //   const itemStyle = isSelected ? styles.selectedItem : styles.cartItem;
    const itemStyle = isSelected
      ? {...styles.selectedItem, borderColor: '#008080', borderWidth: 0.5}
      : {...styles.cartItem};

    return (
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 25,
            paddingVertical: 10,
            borderBottomWidth: 0.2,
            borderColor: 'grey',
            justifyContent: 'space-between',
          },
        ]}>
        <Image
          source={{uri: item.picture}}
          style={[{height: 80, width: 80, borderRadius: 12}, itemStyle]}
        />
        <View style={{marginLeft: 10}}>
          <Pressable
            onPress={() => {
              toggleSelectedItem(item.proid);
              setSelectedItemData(item);
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'SulphurPoint-Bold',
                fontSize: 18,
              }}>
              {item.Proname.split(' ').slice(0, 3).join(' ')}
            </Text>
            <Text style={{color: 'black', fontFamily: 'SulphurPoint-Regular'}}>
              Size : {item.proSize}
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'SulphurPoint-Bold',
                fontSize: 18,
              }}>
              ${item.Proprice}
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: -30,
          }}>
          <TouchableOpacity
            style={{backgroundColor: '#d9d9d9', borderRadius: 5}}
            onPress={() => {
              decreaseQuantity(item.proid);
            }}>
            <Ionicon color={'black'} size={20} name="remove" />
          </TouchableOpacity>
          <Text
            style={{
              color: 'black',
              fontFamily: 'SulphurPoint-Bold',
              marginHorizontal: 10,
              fontSize: 20,
            }}>
            {item.proQuantity}
          </Text>
          <TouchableOpacity
            style={{backgroundColor: '#008080', borderRadius: 5}}
            onPress={() => {
              increaseQuantity(item.proid);
              setprice(item.Proprice * item.proQuantity);
              
            }}>
            <Ionicon color={'white'} size={20} name="add" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const calculateTotalCost = () => {
    const subTotal = item.reduce((total, currentItem) => {
      return total + currentItem.Proprice * currentItem.proQuantity;
    }, 0);
    return subTotal + 13; // Adding shipping fee
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchCartItemsFromSQLite(user.Email)
      .then(cart => {
        setitem(cart);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    fetchCartItemsFromSQLite(user.Email)
      .then(cart => {
        setitem(cart);
        if (cart.length == 0) setbottom('1');
        else setbottom('0');
      })
      .catch(error => {
        console.error('Error getting user info:', error);
      });
  }, [refresh]);

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
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
          My Cart
        </Text>
        <View></View>
      </View>
      <View style={{height: '55%'}}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => {
            return (
              <SafeAreaView
                style={{
                  backgroundColor: 'white',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <LottieView
                  source={require('../assets/lottieflow-ecommerce-14-4-008080-easey.json')}
                  // ref={animation}
                  style={{
                    height: width / 5.5,
                    width: height / 5.5,
                    alignSelf: 'center',
                    marginTop: 100,
                    justifyContent: 'center',
                  }}
                  autoPlay
                  loop={false}
                  speed={0.7}
                />
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 19,
                    fontWeight: '600',
                    textAlign: 'center',
                    fontFamily: 'SulphurPoint-Bold',
                  }}></Text>
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
          }}
          data={item}
          renderItem={renderCart}
          showsVerticalScrollIndicator
          indicatorStyle="white"
        />
      </View>

      {showbottom == '0' ? (
        <View
          style={{
            backgroundColor: 'white',
            height: '40%',
            marginTop: -20,
            elevation: 24,
            borderWidth: 1,
            borderColor: '#008080',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            padding: 25,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'SulphurPoint-Bold',
                fontSize: 17,
              }}>
              Sub-Total
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'SulphurPoint-Bold',
                fontSize: 17,
              }}>
              ${selectedItem.Proprice}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'SulphurPoint-Bold',
                fontSize: 17,
              }}>
              Delivery Fee
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'SulphurPoint-Bold',
                fontSize: 17,
              }}>
              $13
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderTopWidth: 0.5,
              borderColor: '#008080',
              paddingTop: 10,
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'SulphurPoint-Bold',
                fontSize: 17,
              }}>
              Total Cost
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'SulphurPoint-Bold',
                fontSize: 17,
              }}>
              ${calculateTotalCost()}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#008080',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              height: 50,
              marginTop: 15,
            }}
            onPress={() => {
              const selectedQuantity =
                item.find(item => item.proid === selectedItem.proid)
                  ?.proQuantity ?? 0;
              navigation.replace('order', {
                item: selectedItem,
                price: calculateTotalCost(),
                quantity: selectedQuantity,
              });
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'SulphurPoint-Bold',
                fontSize: 18,
              }}>
              Proceed To Checkout
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
    paddingVertical: 10,
    borderBottomWidth: 0.2,
    borderColor: 'grey',
    justifyContent: 'space-between',
  },
  selectedItem: {
    backgroundColor: 'rgba(0, 128, 128, 0.2)',
    borderRadius: 20,
    padding: 3,
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#008080',
  },
});

export default CartScreen;
