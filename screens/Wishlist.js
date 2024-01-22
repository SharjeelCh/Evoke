import {View, Text, Pressable, FlatList} from 'react-native';
import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';

const wishlistData = [
  {
    id: '01',
    name: 'Brown Jacket',
    price: 120,
    avgRating: 4.9,
    image: 'https://dummyimage.com/300x400/7a7a7a/ffffff&text=Brown+Jacket',
  },
  {
    id: '02',
    name: 'Blue Dress',
    price: 89.99,
    avgRating: 4.5,
    image: 'https://dummyimage.com/300x400/336699/ffffff&text=Blue+Dress',
  },
  {
    id: '03',
    name: 'Red High Heels',
    price: 59.99,
    avgRating: 4.2,
    image: 'https://dummyimage.com/300x400/ff0000/ffffff&text=Red+Heels',
  },
  {
    id: '04',
    name: 'Black Jeans',
    price: 65.5,
    avgRating: 4.7,
    image: 'https://dummyimage.com/300x400/000000/ffffff&text=Black+Jeans',
  },
  {
    id: '05',
    name: 'White Sneakers',
    price: 49.99,
    avgRating: 4.8,
    image: 'https://dummyimage.com/300x400/ffffff/000000&text=White+Sneakers',
  },
  {
    id: '06',
    name: 'Green Sweater',
    price: 79.99,
    avgRating: 4.4,
    image: 'https://dummyimage.com/300x400/00cc00/ffffff&text=Green+Sweater',
  },
  {
    id: '07',
    name: 'Yellow Handbag',
    price: 39.99,
    avgRating: 4.6,
    image: 'https://dummyimage.com/300x400/00cc00/ffffff&text=Yellow+Handbag',
  },
];

const renderItem = ({item}) => (
  <View>
    <Image source={{uri: item.prodImage}} style={{height: 150, width: 150}} />
    <View style={{flexDirection: 'row'}}>
      <Text style={{color: 'black'}}>{item.name}</Text>
      <Ionicon name="star" size={10} color={'yellow'} />
      <Text style={{color: 'black'}}>{item.avgRating}</Text>
    </View>
    <Text style={{color: 'black'}}>{item.price}</Text>
  </View>
);

const Wishlist = ({navigation}) => {
  <View style={{flex: 1, paddingTop: 60}}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        alignItems: 'center',
      }}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          borderRadius: 45,
          borderWidth: 0.5,
          padding: 8,
          borderColor: 'grey',
        }}>
        <Ionicon name="arrow-back" size={25} color={'black'} />
      </Pressable>
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          marginLeft: -45,
        }}>
        My Wishlist
      </Text>
      <View></View>
    </View>
    <View>
      <FlatList data={wishlistData} renderItem={renderItem} />
    </View>
  </View>;
};

export default Wishlist;
