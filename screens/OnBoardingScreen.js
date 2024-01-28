import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const carouselDataOnboarding = [
  {
    id: '01',
    url: require('../assets/onboardcarousels/1.png'),
    title: 'Seamless Shopping Experience',
  },
  {
    id: '02',
    url: require('../assets/onboardcarousels/2.png'),
    title: 'Wishlist: Where Fashion Dreams Begin',
  },
  {
    id: '03',
    url: require('../assets/onboardcarousels/3.png'),
    title: 'Swift Navigation for Effortless Browsing',
  },
];

const OnBoardingScreen = ({navigation}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const handlePageChange = index => {
    setActiveIndex(index);
  };

  const handleForward = () => {
    const nextIndex = activeIndex + 1;
    if (nextIndex < carouselDataOnboarding.length) {
      flatListRef.current.scrollToIndex({index: nextIndex});
      handlePageChange(nextIndex);
    }
  };

  const handleReturn = () => {
    const previousIndex = activeIndex - 1;
    if (previousIndex >= 0) {
      flatListRef.current.scrollToIndex({index: previousIndex});
      handlePageChange(previousIndex);
    }
  };

  const renderCarousel = ({item}) => (
    <View>
      <Image source={item.url} style={{height: 400, width}} />
    </View>
  );

  const renderPaginationDot = index => (
    <View
      key={index}
      style={{
        width: 10,
        height: 10,
        borderRadius: 15,
        margin: 5,
        backgroundColor: index === activeIndex ? '#008080' : 'lightgray',
      }}
    />
  );

  const navigateToSignup = () => {
    if (activeIndex === carouselDataOnboarding.length - 1) {
      navigation.navigate('signup');
    }
  };

  return (
    <View style={{paddingTop: 60, backgroundColor: '#EBEBEB', flex: 1}}>
      <FlatList
        ref={flatListRef}
        data={carouselDataOnboarding}
        renderItem={renderCarousel}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        snapToAlignment="center"
        onMomentumScrollEnd={event => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          handlePageChange(index);
        }}
      />
      <View
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          padding: 30,
          height: 360,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'SulphurPoint-Bold',
              fontSize: 25,
            }}>
            {carouselDataOnboarding[activeIndex].title}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: 'black',
              paddingTop: 30,
              fontFamily: 'SulphurPoint-Light',
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 5,
              fontSize: 18,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 80,
            marginHorizontal: 10,
          }}>
          {activeIndex !== 0 ? (
            <TouchableOpacity
              onPress={handleReturn}
              style={{
                padding: 10,
                backgroundColor: 'white',
                borderRadius: 55,
                borderWidth: 1,
                borderColor: '#008080',
              }}>
              <Ionicon name="arrow-back" color={'#008080'} size={25} />
            </TouchableOpacity>
          ) : (
            <View style={{paddingLeft: 45}}></View>
          )}
          <View style={{flexDirection: 'row'}}>
            {carouselDataOnboarding.map((_, index) =>
              renderPaginationDot(index),
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              handleForward();
              navigateToSignup();
            }}
            style={{
              padding: 10,
              backgroundColor: '#008080',
              borderRadius: 55,
            }}>
            <Ionicon name="arrow-forward" color={'white'} size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('signup');
        }}
        style={{position: 'absolute', top: 50, right: 20}}>
        <Text
          style={{
            color: '#008080',

            fontFamily: 'SulphurPoint-Bold',
            fontSize: 18,
          }}>
          Skip
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnBoardingScreen;