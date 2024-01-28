import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  TouchableOpacity,RefreshControl, SafeAreaView, Dimensions
} from 'react-native';
import React, {useState,useEffect, useContext} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { fetchWishlistItemsFromSQLite } from '../SQL/userDB';
import LottieView from 'lottie-react-native';
import { UserContext } from './UserProvider';


const renderItem = ({item}) => (
  <TouchableOpacity style={{marginHorizontal: 10}}>
    <View style={{marginVertical: 10}}>
      <Image
        source={{uri: item.picture}}
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
          {item.Proname}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <Ionicon name="star" color={'orange'} size={15} />
          <Text style={{color: 'black', fontFamily: 'SulphurPoint-Regular'}}>
            {item.rating}
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
        ${item.Proprice}
      </Text>
    </View>
  </TouchableOpacity>
);

const Wishlist = ({navigation}) => {
  const wishlistItems=useSelector(state=>state.wish.items)
  const {user}=useContext(UserContext);
  
  const [item,setitem]=useState([])
  const [refresh, setRefresh] = useState(false);
  const width=Dimensions.get('window').width
  const height=Dimensions.get('window').height
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchWishlistItemsFromSQLite(user.Email)
      .then(wish => {
        setitem(wish);
      })
      .catch(error => {
        console.error('Error fetching wishlist items:', error);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  useEffect(()=>{
    fetchWishlistItemsFromSQLite(user.Email)
    .then(wish => {
      setitem(wish);
    })
    .catch(error => {
      console.error('Error getting user info:', error);
    });
  },[refresh])

  

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
        <FlatList  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
          ListEmptyComponent={()=>{return(
            <SafeAreaView style={{backgroundColor: 'white', flex: 1,justifyContent:'center',alignItems:'center'}}>
            <LottieView
              source={require('../assets/Animation - 1706364838004.json')}
              // ref={animation}
              style={{
                height: width/5.9,
                width: height/5.9,
                alignSelf: 'center',
                marginTop: 100,
                justifyContent: 'center',
                opacity:0.7
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
                fontFamily: 'SulphurPoint-Bold'
              }}>
            </Text>
          </SafeAreaView>
          )}}
         data={item} renderItem={renderItem} numColumns={2} />
      </View>
    </View>
  );
};

export default Wishlist;