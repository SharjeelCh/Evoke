import {
  View,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const width = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const carouselData = [
    {id: '01', image: require('../assets/discountcarousels/image1.jpg')},
    {id: '02', image: require('../assets/discountcarousels/image2.jpg')},
    {id: '03', image: require('../assets/discountcarousels/image3.jpg')},
    {id: '04', image: require('../assets/discountcarousels/image4.jpg')},
    {id: '05', image: require('../assets/discountcarousels/image5.jpg')},
  ];

  const categoryData = [
    {
      id: '01',
      name: 'shirts',
      iconname: 'shirt',
    },
    {
      id: '02',
      name: 'pants',
      iconname: 'shirt',
    },
    {
      id: '03',
      name: 'shirts',
      iconname: 'shirt',
    },
    {
      id: '04',
      name: 'shirts',
      iconname: 'shirt',
    },
    {
      id: '05',
      name: 'shirts',
      iconname: 'shirt',
    },
    {
      id: '06',
      name: 'shirts',
      iconname: 'shirt',
    },
    {
      id: '07',
      name: 'shirts',
      iconname: 'shirt',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View>
        <Image source={{uri: item.image}} style={{height: 150, width: 150}} />
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'black'}}>{item.name}</Text>
          <Ionicon name="star" size={10} color={'yellow'} />
          <Text style={{color: 'black'}}>{item.avgRating}</Text>
        </View>
        <Text style={{color: 'black'}}>{item.price}</Text>
      </View>
    );
  };

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
