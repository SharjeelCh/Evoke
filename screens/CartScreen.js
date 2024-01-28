import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchCartItemsFromSQLite } from '../SQL/userDB';
import { RefreshControl } from 'react-native';
import LottieView from 'lottie-react-native';
import { UserContext } from './UserProvider';

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
      source={{uri: item.picture}}
      style={{height: 80, width: 80, borderRadius: 12}}
    />
    <View style={{marginLeft: -40}}>
      <Text
        style={{color: 'black', fontFamily: 'SulphurPoint-Bold', fontSize: 18}}>
        {item.Proname.split(' ').slice(0, 3).join(' ')}
      </Text>
      <Text style={{color: 'black', fontFamily: 'SulphurPoint-Regular'}}>
        Size : {item.proSize}
      </Text>
      <Text
        style={{color: 'black', fontFamily: 'SulphurPoint-Bold', fontSize: 18}}>
        ${item.Proprice}
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
        {item.Proquantity}
      </Text>
      <Pressable style={{backgroundColor: '#008080', borderRadius: 5}}>
        <Ionicon color={'white'} size={20} name="add" />
      </Pressable>
    </View>
  </View>
);



const CartScreen = () => {
  const cartItems= useSelector(state => state.cart.items);
  const navigation=useNavigation();
  const [item,setitem]=useState([])
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const width=Dimensions.get('window').width
  const height=Dimensions.get('window').height
  const [showbottom,setbottom]=useState('0')
  const {user}=useContext(UserContext);

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

  useEffect(()=>{
    fetchCartItemsFromSQLite(user.Email)
    .then(cart => {
      setitem(cart);
      if(cart.length==0)
      setbottom('0')
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
        ListEmptyComponent={()=>{return(
          <SafeAreaView style={{backgroundColor: 'white', flex: 1,justifyContent:'center',alignItems:'center'}}>
          <LottieView
            source={require('../assets/lottieflow-ecommerce-14-4-008080-easey.json')}
            // ref={animation}
            style={{
              height: width/5.5,
              width: height/5.5,
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
              fontFamily: 'SulphurPoint-Bold'
            }}>
          </Text>
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
        )}}
          data={item}
          renderItem={renderCart}
          showsVerticalScrollIndicator
          indicatorStyle="white"
        />
      </View>

      {showbottom == '1' ?  (
      <View
        style={{
          backgroundColor: 'white',
          height: '40%',
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
            $156
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
            $169
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
          onPress={()=>{navigation.navigate('order')}}
          >
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
      ):(
        <View></View>
      )}
    </View>
  );
};

export default CartScreen;