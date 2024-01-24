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

const WishlistData = [
  {
    id: '01',
    name: 'Brown Shirt',
    url: 'https://picsum.photos/150?random',
    price: 29.99,
    avgRating: 4.5,
  },
  {
    id: '02',
    name: 'Yellow Shirt',
    url: 'https://picsum.photos/150?random=1',
    price: 19.99,
    avgRating: 3.8,
  },
  {
    id: '03',
    name: 'Red Jacket',
    url: 'https://picsum.photos/150?random=2',
    price: 49.99,
    avgRating: 4.2,
  },
  {
    id: '04',
    name: 'Grey Shoes',
    url: 'https://picsum.photos/150?random=3',
    price: 39.99,
    avgRating: 4.0,
  },
  {
    id: '05',
    name: 'Black Nigga',
    url: 'https://picsum.photos/150?random=4',
    price: 59.99,
    avgRating: 4.8,
  },
  {
    id: '06',
    name: 'Blue Jeans',
    url: 'https://picsum.photos/150?random-5',
    price: 34.99,
    avgRating: 4.1,
  },
  {
    id: '07',
    name: 'White Sneakers',
    url: 'https://picsum.photos/150?random=6',
    price: 54.99,
    avgRating: 4.6,
  },
  {
    id: '08',
    name: 'Green Hoodie',
    url: 'https://picsum.photos/150?random1',
    price: 44.99,
    avgRating: 4.4,
  },
  {
    id: '09',
    name: 'Striped T-shirt',
    url: 'https://picsum.photos/150?random2',
    price: 22.99,
    avgRating: 3.9,
  },
  {
    id: '10',
    name: 'Leather Boots',
    url: 'https://picsum.photos/150?random3',
    price: 79.99,
    avgRating: 4.9,
  },
];

const renderItem = ({item}) => (
  <TouchableOpacity style={{marginHorizontal: 10}}>
    <View style={{marginVertical: 10}}>
      <Image
        source={{uri: item.url}}
        style={{height: 150, width: 150, borderRadius: 10}}
      />
      <Ionicon
        name="heart"
        color={'#008080'}
        size={20}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'rgba(255,255,255,0.6)',
          borderRadius: 25,
          padding: 5,
          alignSelf: 'center',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black', fontFamily: 'SulphurPoint-Bold'}}>
          {item.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <Ionicon name="star" color={'orange'} size={15} />
          <Text style={{color: 'black', fontFamily: 'SulphurPoint-Regular'}}>
            {item.avgRating}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: 'black',
          fontFamily: 'SulphurPoint-Bold',
          fontSize: 16,
          marginTop: -5,
        }}>
        ${item.price}
      </Text>
    </View>
  </TouchableOpacity>
);

const Wishlist = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingTop: 60}}>
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
          My Wishlist
        </Text>
        <View></View>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 20}}>
        <FlatList data={WishlistData} renderItem={renderItem} numColumns={2} />
      </View>
    </View>
  );
};

export default Wishlist;
