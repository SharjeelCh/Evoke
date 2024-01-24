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
      <ScrollView>
        <View style={{marginHorizontal: 0}}>
          <FlatList
            ref={ref => (flatListRef.current = ref)}
            data={carouselData}
            renderItem={renderItem}
            horizontal
            pagingEnabled={true}
            onMomentumScrollEnd={scrollToNext}
            onScroll={handlePageChange}
            showsHorizontalScrollIndicator={false}
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
        <View style={{marginHorizontal: 20}}>
          <FlatList
            data={categoryData}
            renderItem={renderCat}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={{marginHorizontal: 25, marginTop: 15}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'SulphurPoint-Bold',
              fontSize: 20,
            }}>
            New Arrival
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
