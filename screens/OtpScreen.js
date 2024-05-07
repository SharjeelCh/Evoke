import {View, Text, Dimensions, Pressable,TouchableOpacity,Image, FlatList, RefreshControl, SafeAreaView} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { fetchtransactionFromSQLite } from '../SQL/userDB';

const OtpScreen = ({route}) => {
  const {email}=route.params;
  
  const navigation = useNavigation();
  const [item, setitem] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [showbottom, setbottom] = useState('1');
  const [quantity, setquatity] = useState({Number: 0});
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedItem, setSelectedItemData] = useState([]);
  const [price, setprice] = useState({Number: 1});
  const [items, setItems] = useState([]);

  const renderCart = ({item}) => {

    return (
      <View
        style={
          {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 25,
            paddingVertical: 10,
            borderBottomWidth: 0.6,
            borderColor: 'grey',
            justifyContent: 'space-between',
          }
        }>
        <Image
          source={{uri: item.picture}}
          style={{height: 80, width: 80, borderRadius: 12}}
        />
        <View style={{marginLeft: 10}}>
          <Pressable
            onPress={() => {
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'SulphurPoint-Bold',
                fontSize: 18,
              }}>
              {item.Proname.split(' ').slice(0, 3).join(' ')}
            </Text>
            <Text style={{color: 'black', fontFamily: 'SulphurPoint-Regular',lineHeight:20}}>
              Size : {item.proSize}
            </Text>
            <Text style={{color: 'black', fontFamily: 'SulphurPoint-Regular',lineHeight:20}}>
              Items Ordered : {item.proQuantity}
            </Text>
            <Text style={{color: 'black', fontFamily: 'SulphurPoint-Regular',lineHeight:20}}>
              Payed with : {item.MethodPay}
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'SulphurPoint-Bold',
                fontSize: 18,marginTop:2
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
            style={{borderRadius: 5}}
            onPress={() => {
            }}>
            <Ionicon color={'black'} size={25} name="bag" />
          </TouchableOpacity>
          
        </View>
      </View>
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchtransactionFromSQLite(email)
      .then(trans => {
        setitem(trans);
      })
      .catch(error => {
        
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    fetchtransactionFromSQLite(email)
      .then(trans => {
        setitem(trans);
      })
      .catch(error => {
        
      });
  }, [refresh]);

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingTop: 0}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
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
            color: 'black',
            fontSize: 23,
            fontWeight: '600',
            fontFamily: 'SulphurPoint-Bold',
            marginLeft:width/4
          }}>
          My Orders
        </Text>
      </View>
       <View style={{height: '55%',marginTop:20}}>
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
                
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 19,
                    fontWeight: '600',
                    textAlign: 'center',
                    fontFamily: 'SulphurPoint-Bold',
                  }}>No Orders</Text>
              </SafeAreaView>
            );
          }}
          data={item}
          renderItem={renderCart}
          showsVerticalScrollIndicator
          indicatorStyle="white"
        />
      </View>
    </View>
  );
};

export default OtpScreen;
