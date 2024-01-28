import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

function ConfirmScreen({navigation}) {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [pageno, setpageno] = useState(0);
  const [content, setContent] = useState(0);
  const [a, setA] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [isPressed1, setIsPressed1] = useState(false);
  const [isPressed2, setIsPressed2] = useState(false);
  const [isPressed3, setIsPressed3] = useState(false);
  const [activeButton, setactiveButton] = useState(true);
  const [activeButton1, setactiveButton1] = useState(true);
  const [activeButton2, setactiveButton2] = useState(true);
  const [activeButton3, setactiveButton3] = useState(true);
  const [a2, seta2] = useState(0);
  const [methodPay, setMethodPay] = useState('');
  return (
    <View style={{flex: 1}}>
      <View style={{justifyContent:'center',alignItems:'center',marginTop:height/16}}>
      <Text
          style={{
            color: 'black',
            fontSize: 22,
            fontFamily: 'SulphurPoint-Bold',
            marginLeft: 0,
          }}>
          Transaction
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: height / 22,
          marginLeft: width / 19,
          marginRight: width / 19,
        }}>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              //button one
              borderRadius: 20,
              backgroundColor: 'grey',
              alignItems: 'center',
              justifyContent: 'center',
              width: width / 11,
              height: height / 19,
            }}>
            {pageno >= 1 ? (
              <View
                style={{
                  backgroundColor: '#0F8BA1',
                  borderRadius: 20,

                  alignItems: 'center',
                  justifyContent: 'center',
                  width: width / 11,
                  height: height / 19,
                }}>
                <Icon name="check" size={22} color={'white'} />
              </View>
            ) : (
              <Text style={{color: 'white', fontSize: 18,fontFamily: 'SulphurPoint-Bold'}}>1</Text>
            )}
          </View>
          <Text
            style={[
              {lineHeight: height / 19},
              {color: pageno >= 1 ? '#0F8BA1' : 'grey'},
              {fontFamily: 'SulphurPoint-Bold'}
            ]}>
            Address
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <View
            style={{
              //button two
              borderRadius: 20,
              backgroundColor: 'grey',
              alignItems: 'center',
              justifyContent: 'center',
              width: width / 11,
              height: height / 19,
            }}>
            {pageno >= 2 ? (
              <View
                style={{
                  backgroundColor: '#0F8BA1',
                  borderRadius: 20,

                  alignItems: 'center',
                  justifyContent: 'center',
                  width: width / 11,
                  height: height / 19,
                }}>
                <Icon name="check" size={22} color={'white'} />
              </View>
            ) : (
              <View>
                <Text style={{color: 'white', fontSize: 18,fontFamily: 'SulphurPoint-Bold'}}>2</Text>
              </View>
            )}
          </View>
          <Text
            style={[
              {lineHeight: height / 19},
              {color: pageno >= 2 ? '#0F8BA1' : 'grey',fontFamily: 'SulphurPoint-Bold',},
            ]}>
            Delivery
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <View
            style={{
              //button 3
              borderRadius: 20,
              backgroundColor: 'grey',
              alignItems: 'center',
              justifyContent: 'center',
              width: width / 11,
              height: height / 19,
            }}>
            {pageno >= 3 ? (
              <View
                style={{
                  backgroundColor: '#0F8BA1',
                  borderRadius: 20,

                  alignItems: 'center',
                  justifyContent: 'center',
                  width: width / 11,
                  height: height / 19,
                }}>
                <Icon name="check" size={22} color={'white'} />
              </View>
            ) : (
              <Text style={{color: 'white', fontSize: 18,fontFamily: 'SulphurPoint-Bold'}}>3</Text>
            )}
          </View>
          <Text
            style={[
              {lineHeight: height / 19},
              {color: pageno >= 3 ? '#0F8BA1' : 'grey',fontFamily: 'SulphurPoint-Bold'},
            ]}>
            Payment
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <View
            style={{
              //button 4
              borderRadius: 20,
              backgroundColor: 'grey',
              alignItems: 'center',
              justifyContent: 'center',
              width: width / 11,
              height: height / 19,
            }}>
            {pageno >= 4 ? (
              <View
                style={{
                  backgroundColor: '#0F8BA1',
                  borderRadius: 20,

                  alignItems: 'center',
                  justifyContent: 'center',
                  width: width / 11,
                  height: height / 19,
                }}>
                <Icon name="check" size={22} color={'white'} />
              </View>
            ) : (
              <Text style={{color: 'white', fontSize: 18,fontFamily: 'SulphurPoint-Bold'}}>4</Text>
            )}
          </View>

          <Text
            style={[
              {lineHeight: height / 19},
              {color: pageno >= 4 ? '#0F8BA1' : 'grey',fontFamily: 'SulphurPoint-Bold'},
            ]}>
            Place Order
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}>
        {content == 0 ? (
          <View style={{flex: 1}}>
            <View
              style={{
                marginTop: height / 65,
                marginLeft: width / 19,
              }}>
              <Text style={{color: 'black', fontSize: 18, fontWeight: '700',fontFamily: 'SulphurPoint-Bold'}}>
                Select Delivery Address
              </Text>
            </View>
            <View
              style={{
                width: width / 1.1,
                height: height / 8,
                marginTop: height / 65,
                marginLeft: width / 19,
                alignItems: 'center',
                justifyContent: 'flex-start',
                borderWidth: 0.5,
                elevation: 1,
                borderColor: 'grey',
                borderRadius: 7,
                flexDirection: 'row',
                backgroundColor: 'white',
              }}>
              <View>
                {a == 0 ? (
                  <Pressable
                    style={{marginLeft: width / 20, marginRight: width / 20}}
                    onPress={() => {
                      setA(1);
                      setactiveButton1(false);
                    }}>
                    <Icon name="circle" size={22} color={'grey'} />
                  </Pressable>
                ) : (
                  <Pressable
                    style={{marginLeft: width / 20, marginRight: width / 20}}>
                    <Icon name="circle-dot" size={22} color={'grey'} />
                  </Pressable>
                )}
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '700',
                      fontSize: 17,
                      marginRight: 8,
                      fontFamily: 'SulphurPoint-Bold'
                    }}>
                    Sharjeel
                  </Text>
                  <Icon name="location-dot" size={20} color={'red'} />
                </View>
                <Text
                  style={{fontSize: 17,fontFamily: 'SulphurPoint-Bold'}}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {'Abadi#03,House#191A,Tench Bhatta,Rawalpindi'.length > 43
                    ? 'Abadi#03,House#191A,Tench Bhatta,Rawalpindi'.substring(
                        0,
                        43 - 3,
                      ) + '...'
                    : 'Abadi#03,House#191A,Tench Bhatta,Rawalpindi'}
                </Text>
              </View>
            </View>
            <Pressable
              style={[
                {
                  width: width / 1.1,
                  height: height / 19,
                  marginTop: height / 65,
                  marginLeft: width / 19,
                },
                styles.button,
                isPressed1 && styles.buttonPressed,
              ]}
              disabled={activeButton1}
              onPressIn={() => {
                setIsPressed1(true);
                setpageno(1);
                setContent(1);
              }}>
              <Text style={{fontSize: 17, color: 'white',fontFamily: 'SulphurPoint-Bold'}}>Continue</Text>
            </Pressable>
          </View>
        ) : content == 1 ? (
          <View style={{flex: 1}}>
            <View
              style={{
                marginTop: height / 65,
                marginLeft: width / 19,
              }}>
              <Text style={{color: 'black', fontSize: 18, fontWeight: '700',fontFamily: 'SulphurPoint-Bold'}}>
                Choose Your Delivery Options
              </Text>
            </View>
            <View
              style={{
                width: width / 1.1,
                height: height / 9,
                marginTop: height / 65,
                marginLeft: width / 19,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                borderWidth: 0.5,
                elevation: 1,
                borderColor: 'grey',
                borderRadius: 7,
                flexDirection: 'row',
                backgroundColor: 'white',
              }}>
              <View>
                {a == 1 ? (
                  <Pressable
                    onPress={() => {
                      setA(2);
                      seta2(2.5);
                      setactiveButton(false);
                      setMethodPay('cash');
                    }}>
                    <Icon name="circle" size={22} color={'grey'} />
                  </Pressable>
                ) : (
                  <Pressable>
                    <Icon name="circle-dot" size={22} color={'grey'} />
                  </Pressable>
                )}
              </View>
              <View>
                <Text>
                  <Text style={{color: 'green', fontSize: 17,fontFamily: 'SulphurPoint-Bold'}}>
                    Tomorrow By 10pm -
                  </Text>
                  <Text style={{fontSize: 17,fontFamily: 'SulphurPoint-Bold'}}>
                    FREE Delivery with your Prime membership
                  </Text>
                </Text>
              </View>
            </View>
            <Pressable
              style={[
                {
                  width: width / 1.1,
                  height: height / 19,
                  marginTop: height / 65,
                  marginLeft: width / 19,
                },
                styles.button,
                isPressed && styles.buttonPressed,
              ]}
              disabled={activeButton}
              onPressIn={() => {
                setIsPressed(true);
                setpageno(2);
                setContent(2);
              }}>
              <Text style={{fontSize: 17, color: 'white',fontFamily: 'SulphurPoint-Bold'}}>Continue</Text>
            </Pressable>
          </View>
        ) : content == 2 ? (
          <View style={{flex: 1}}>
            <View
              style={{
                marginTop: height / 65,
                marginLeft: width / 19,
              }}>
              <Text style={{color: 'black', fontSize: 18, fontWeight: '700',fontFamily: 'SulphurPoint-Bold'}}>
                Select Your Payment Method
              </Text>
            </View>
            <View
              style={{
                width: width / 1.1,
                height: height / 12,
                marginTop: height / 65,
                marginLeft: width / 19,
                alignItems: 'center',
                justifyContent: 'flex-start',
                borderWidth: 0.5,
                elevation: 1,
                borderColor: 'grey',
                borderRadius: 7,
                flexDirection: 'row',
                backgroundColor: 'white',
              }}>
              <View>
                {a == 2 && a2 == 2.5 ? (
                  <Pressable
                    style={{marginLeft: width / 20, marginRight: width / 20}}
                    onPress={() => {
                      setA(3);
                      seta2(2.5);

                      setactiveButton2(false);
                    }}>
                    <Icon name="circle" size={22} color={'grey'} />
                  </Pressable>
                ) : (
                  <Pressable
                    style={{marginLeft: width / 20, marginRight: width / 20}}>
                    <Icon name="circle-dot" size={22} color={'grey'} />
                  </Pressable>
                )}
              </View>
              <View>
                <Text>
                  <Text style={{color: 'green', fontSize: 17,fontFamily: 'SulphurPoint-Bold'}}>Cash </Text>
                  <Text style={{fontSize: 17,fontFamily: 'SulphurPoint-Bold'}}>On Payment</Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                width: width / 1.1,
                height: height / 12,
                marginTop: height / 65,
                marginLeft: width / 19,
                alignItems: 'center',
                justifyContent: 'flex-start',
                borderWidth: 0.5,
                elevation: 1,
                borderColor: 'grey',
                borderRadius: 7,
                flexDirection: 'row',
                backgroundColor: 'white',
              }}>
              <View>
                {a2 == 2.5 && a != 2 ? (
                  <Pressable
                    style={{marginLeft: width / 20, marginRight: width / 20}}
                    onPress={() => {
                      setA(2);
                      seta2(2.5);
                      setactiveButton2(false);
                      setMethodPay('online');
                    }}>
                    <Icon name="circle" size={22} color={'grey'} />
                  </Pressable>
                ) : (
                  <Pressable
                    style={{marginLeft: width / 20, marginRight: width / 20}}>
                    <Icon name="circle-dot" size={22} color={'grey'} />
                  </Pressable>
                )}
              </View>
              <View>
                <Text>
                  <Text style={{color: 'green', fontSize: 17,fontFamily: 'SulphurPoint-Bold'}}>
                    JazzCash /{' '}
                  </Text>
                  <Text style={{fontSize: 17,fontFamily: 'SulphurPoint-Bold'}}>Online Payment</Text>
                </Text>
              </View>
            </View>

            <Pressable
              style={[
                {
                  width: width / 1.1,
                  height: height / 18,
                  marginTop: height / 65,
                  marginLeft: width / 19,
                },
                styles.button,
                isPressed2 && styles.buttonPressed,
              ]}
              disabled={activeButton2}
              onPressIn={() => {
                setIsPressed2(true);
                setpageno(3);
                setContent(3);
              }}>
              <Text style={{fontSize: 17, color: 'white',fontFamily: 'SulphurPoint-Bold'}}>Continue</Text>
            </Pressable>
          </View>
        ) : content == 3 ? (
          <View style={{flex: 1}}>
            <View
              style={{
                marginTop: height / 65,
                marginLeft: width / 19,
              }}>
              <Text style={{color: 'black', fontSize: 18, fontWeight: '700',fontFamily: 'SulphurPoint-Bold'}}>
                Order Now
              </Text>
            </View>
            <View
              style={{
                width: width / 1.1,
                height: height / 12,
                marginTop: height / 65,
                marginLeft: width / 19,
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 0.5,
                elevation: 1,
                borderColor: 'grey',
                borderRadius: 7,
                paddingLeft: width / 30,
                paddingRight: width / 30,

                flexDirection: 'row',
                backgroundColor: 'white',
              }}>
              <View>
                <Text style={{color: 'black', fontSize: 17, fontWeight: '700',fontFamily: 'SulphurPoint-Bold'}}>
                  Save Money With Us
                </Text>
                <Text style={{color: 'grey', fontSize: 15, fontWeight: '500',fontFamily: 'SulphurPoint-Bold'}}>
                  Delivery in minutes
                </Text>
              </View>
              <Image
                source={require('../assets/fast-delivery.png')}
                style={{width: width / 9.5, height: height / 18}}
              />
            </View>
            <View
              style={{
                width: width / 1.1,
                height: height / 5,
                marginTop: height / 65,
                marginLeft: width / 19,
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                borderWidth: 0.5,
                elevation: 1,
                borderColor: 'grey',
                borderRadius: 7,

                padding: width / 30,

                flexDirection: 'column',
                backgroundColor: 'white',
              }}>
              <View>
                <Text
                  style={{color: 'black', fontSize: 16.5, fontWeight: '700',fontFamily: 'SulphurPoint-Bold'}}>
                  Shipping to Sharjeel
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    paddingTop: width / 40,
                  }}>
                  <Text
                    style={{color: 'grey', fontSize: 14.5, fontWeight: '600',fontFamily: 'SulphurPoint-Bold'}}>
                    Quantity
                  </Text>
                  <Text
                    style={{color: 'grey', fontSize: 16, fontWeight: '600',fontFamily: 'SulphurPoint-Bold'}}>
                    Rs.568
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    paddingTop: width / 40,
                  }}>
                  <Text
                    style={{color: 'grey', fontSize: 14.5, fontWeight: '600',fontFamily: 'SulphurPoint-Bold'}}>
                    Delivery
                  </Text>
                  <Text
                    style={{color: 'grey', fontSize: 16, fontWeight: '600',fontFamily: 'SulphurPoint-Bold'}}>
                    Rs.0
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    paddingTop: width / 40,
                  }}>
                  <Text
                    style={{color: 'black', fontSize: 18, fontWeight: '700',fontFamily: 'SulphurPoint-Bold'}}>
                    Order Total
                  </Text>
                  <Text
                    style={{color: 'black', fontSize: 18, fontWeight: '700',fontFamily: 'SulphurPoint-Bold'}}>
                    Rs.568
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: width / 1.1,
                height: height / 12,
                marginTop: height / 65,
                marginLeft: width / 19,
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 0.5,
                elevation: 1,
                borderColor: 'grey',
                borderRadius: 7,
                paddingLeft: width / 30,
                paddingRight: width / 30,

                flexDirection: 'row',
                backgroundColor: 'white',
              }}>
              <View>
                {methodPay == 'cash' ? (
                  <View>
                    <Text
                      style={{color: 'grey', fontSize: 16, fontWeight: '600',fontFamily: 'SulphurPoint-Bold'}}>
                      Pay With
                    </Text>
                    <Text
                      style={{color: 'black', fontSize: 17, fontWeight: '700',fontFamily: 'SulphurPoint-Bold'}}>
                      Pay On Delivery (Cash)
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text
                      style={{color: 'grey', fontSize: 16, fontWeight: '600',fontFamily: 'SulphurPoint-Bold'}}>
                      Payed With
                    </Text>
                    <Text
                      style={{color: 'black', fontSize: 17, fontWeight: '700',fontFamily: 'SulphurPoint-Bold'}}>
                      Online
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <Pressable
              style={[
                {
                  width: width / 1.1,
                  height: height / 19,
                  marginTop: height / 28,
                  marginLeft: width / 19,
                },
                styles.button,
                isPressed3 && styles.buttonPressed,
              ]}
              // disabled={activeButton3}
              onPressIn={() => {
                setIsPressed3(true);

                navigation.replace('animation');
              }}>
              <Text style={{fontSize: 17, color: 'white',fontFamily: 'SulphurPoint-Bold'}}>Continue</Text>
            </Pressable>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0F8BA1',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: 'green',
  },
  text: {
    fontSize: 17,
    color: 'white',
  },
});

export default ConfirmScreen;
