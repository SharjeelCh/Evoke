import {
  View,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const width = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const carouselData = [
    {id: '01', image: require('../assets/discountcarousels/image1.jpg')},
    {id: '02', image: require('../assets/discountcarousels/image2.jpg')},
    {id: '03', image: require('../assets/discountcarousels/image3.jpg')},
    {id: '04', image: require('../assets/discountcarousels/image4.jpg')},
    {id: '05', image: require('../assets/discountcarousels/image5.jpg')},
  ];

  const categoryData = [
    {
      id: '06',
      name: 'Shirts',
      image: require('../assets/categoryicons/clothes.png'),
    },
    {id: '02', name: 'Cap', image: require('../assets/categoryicons/cap.png')},
    {
      id: '03',
      name: 'Trousers',
      image: require('../assets/categoryicons/man.png'),
    },
    {
      id: '04',
      name: 'T-Shirt',
      image: require('../assets/categoryicons/tshirt.png'),
    },
    {
      id: '05',
      name: 'Pants',
      image: require('../assets/categoryicons/trousers.png'),
    },
    {
      id: '01',
      name: 'Suits',
      image: require('../assets/categoryicons/suit.png'),
    },
  ];

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

  const renderProd = ({item}) => (
    <TouchableOpacity
      style={{alignItems: 'center', justifyContent: 'center', margin: 10}}>
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

  const renderCat = ({item}) => (
    <View>
      <View
        style={{
          backgroundColor: 'rgba(0, 128, 128,0.2),',
          borderRadius: 100,
          padding: 15,
          margin: 10,
        }}>
        <Image
          source={item.image}
          style={{height: 30, width: 30}}
          tintColor={'#008080'}
        />
      </View>
      <Text
        style={{
          color: 'black',
          fontFamily: 'SulphurPoint-Bold',
          alignSelf: 'center',
          marginTop: -5,
          fontSize: 16,
        }}>
        {item.name}
      </Text>
    </View>
  );

  const renderItem = ({item}) => (
    <View
      style={{
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
      }}>
      <Image
        source={item.image}
        style={{height: 200, width: 300, borderRadius: 20}}
      />
    </View>
  );

  const handlePageChange = event => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(xOffset / (width - 80)); // Adjusted the width based on the Image width
    // Update the active index only if the index has changed
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const RenderDotIndicator = () => {
    return carouselData.map((dot, index) => {
      return (
        <View
          key={index}
          style={{
            backgroundColor: index === activeIndex ? '#008080' : '#bfbfbf',
            height: index === activeIndex ? 12 : 8,
            width: index === activeIndex ? 12 : 8,
            borderRadius: 10,
            marginHorizontal: 3,
          }}></View>
      );
    });
  };

  const scrollToNext = () => {
    const nextIndex = (activeIndex + 1) % carouselData.length;
    flatListRef.current.scrollToIndex({
      animated: true,
      index: nextIndex,
    });
    setActiveIndex(nextIndex);
  };


  return (
    <View
      style={{
        flex: 1,
        paddingTop: 60,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 0.5,
            borderRadius: 80,
          }}>
          <Ionicon
            name="search-outline"
            color={'#008080'}
            size={25}
            style={{alignSelf: 'center', marginLeft: 10}}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor={'grey'}
            style={{
              fontFamily: 'SulphurPoint-Bold',
              color: 'black',
              width: '70%',
              height: 50,
              fontSize: 20,
              marginLeft: 5,
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#008080',
            height: 50,
            width: 50,
            borderRadius: 25,
          }}>
          <Image
            source={require('../assets/filter.png')}
            style={{height: 25, width: 25}}
            tintColor={'white'}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginHorizontal: 0}}>
        <FlatList
          ref={ref => (flatListRef.current = ref)}
          data={carouselData}
          renderItem={renderItem}
          horizontal
          pagingEnabled={true}
          onMomentumScrollEnd={scrollToNext}
          onScroll={handlePageChange}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <RenderDotIndicator />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 25,
          marginTop: 15,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'SulphurPoint-Bold',
            fontSize: 20,
          }}>
          Catergory
        </Text>
        <Text style={{color: '#008080', fontFamily: 'SulphurPoint-Bold'}}>
          See All
        </Text>
      </View>
      <View></View>
    </View>
  );
};

export default HomeScreen;
