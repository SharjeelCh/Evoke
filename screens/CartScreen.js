import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';

const cartData = [
  {
    id: '01',
    name: 'Brown Shirt',
    url: 'https://picsum.photos/150?random',
    price: 29.99,
    avgRating: 4.5,
    size: 'XL',
    quantity: 4,
  },
  {
    id: '02',
    name: 'Yellow Shirt',
    url: 'https://picsum.photos/150?random=1',
    price: 19.99,
    avgRating: 3.8,
    size: 'X',
    quantity: 3,
  },
  {
    id: '03',
    name: 'Red Jacket',
    url: 'https://picsum.photos/150?random=2',
    price: 49.99,
    avgRating: 4.2,
    size: 'S',
    quantity: 1,
  },
  {
    id: '04',
    name: 'Grey Shoes',
    url: 'https://picsum.photos/150?random=3',
    price: 39.99,
    avgRating: 4.0,
    size: 'M',
    quantity: 2,
  },
];

const renderCart = ({item}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 25,
      paddingVertical: 10,
      borderBottomWidth: 0.2,
      borderColor: 'grey',
      justifyContent: 'space-between',
    }}>
    <Image
      source={{uri: item.url}}
      style={{height: 80, width: 80, borderRadius: 12}}
    />
    <View style={{marginLeft: -40}}>
      <Text
        style={{color: 'black', fontFamily: 'SulphurPoint-Bold', fontSize: 18}}>
        {item.name}
      </Text>
      <Text style={{color: 'black', fontFamily: 'SulphurPoint-Regular'}}>
        Size : {item.size}
      </Text>
      <Text
        style={{color: 'black', fontFamily: 'SulphurPoint-Bold', fontSize: 18}}>
        ${item.price}
      </Text>
    </View>
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginBottom: -30}}>
      <TouchableOpacity style={{backgroundColor: '#d9d9d9', borderRadius: 5}}>
        <Ionicon color={'black'} size={20} name="remove" />
      </TouchableOpacity>
      <Text
        style={{
          color: 'black',
          fontFamily: 'SulphurPoint-Bold',
          marginHorizontal: 10,
          fontSize: 20,
        }}>
        {item.quantity}
      </Text>
      <Pressable style={{backgroundColor: '#008080', borderRadius: 5}}>
        <Ionicon color={'white'} size={20} name="add" />
      </Pressable>
    </View>
  </View>
);

const CartScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingTop: 60}}>
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
      <View>
        <FlatList data={cartData} renderItem={renderCart} />
      </View>
    </View>
  );
};

export default CartScreen;