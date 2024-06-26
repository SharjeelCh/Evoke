import {
  View,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Pressable,
  ImageBackground,
} from 'react-native';
import {UserContext} from './UserProvider';
import React, {useEffect, useState, useContext, useRef} from 'react';
import {StyleSheet} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {LogBox} from 'react-native';
import {insertintoproducts, showtables1, Tables} from '../SQL/tables';
import {useDispatch} from 'react-redux';
import {seedetail} from '../ReduxManagement/DetailReducer';
import {useNavigation} from '@react-navigation/native';
import DataFetch from '../SQL/DataFetch';
import db, {
  cartDB,
  createTable,
  executeProcedures,
  searchitemfromDB,
  searchitemfromDBusingProcedures,
} from '../SQL/userDB';
import {products} from '../SQL/Array';
import {
  selectShirt,
  selectall,
  selectcap,
  selecthoodie,
  selectpent,
  selectsuit,
  selecttrouser,
} from '../SQL/selectShirt';

const HomeScreen = () => {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const [incoming, setincoming] = useState([]);
  const [shirt, setshirt] = useState([]);
  const [cap, setcap] = useState([]);
  const [pent, setpent] = useState([]);
  const [hoodie, sethoodie] = useState([]);
  const [trouser, settrouser] = useState([]);
  const [suit, setsuit] = useState([]);
  const [showsearch, setsearch] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = ['shirt', 'hat', 'trouser', 'hoodie', 'pant', 'suit'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    createTable(); 
    db.transaction(tx => {
      categories.forEach((categoryName, index) => {
        tx.executeSql(
          'INSERT OR IGNORE INTO categories (catid, name) VALUES (?, ?);',
          [index + 1, categoryName],
          (_, resultSet) => {
            
          },
          (_, error) => {
            
          },
        );
      });
    });
    db.transaction(tx => {
      Object.keys(products).forEach(key => {
        products[key].forEach(product => {
          tx.executeSql(
            'INSERT OR IGNORE INTO products (UniqueId, Proname, Proprice, rating, picture, catid) VALUES (?,?,?,?,?,?)',
            [
              product.WebID,
              product.Name,
              product.Price.minPrice,
              product.Rating,
              product.URL,
              product.catid,
            ],
            (tx, results) => {
              
              if (results.rowsAffected > 0) {
                
              } else {
                
              }
            },
            error => {
              
            },
          );
        });
      });
    });

    selectall()
      .then(categories => {
        setincoming(categories);
      })
      .catch(error => {
        
      });
    selectShirt()
      .then(categories => {
        setshirt(categories);
      })
      .catch(error => {
        
      });
    selectcap()
      .then(categories => {
        setcap(categories);
      })
      .catch(error => {
        
      });
    selecttrouser()
      .then(categories => {
        settrouser(categories);
      })
      .catch(error => {
        
      });
    selecthoodie()
      .then(categories => {
        sethoodie(categories);
      })
      .catch(error => {
        
      });
    selectpent()
      .then(categories => {
        setpent(categories);
      })
      .catch(error => {
        
      });
    selectsuit()
      .then(categories => {
        setsuit(categories);
      })
      .catch(error => {
        
      });

    



   Tables(); // uncomment this to truncate cart and wishlist

     showtables1();
    
    const startCarousel = () => {
      let index = currentIndex;
      setTimeout(() => {
        if (index === carouselData.length - 1) {
          index = -1;
        }
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({animated: true, index: index + 1});
        }
        setCurrentIndex(index + 1);
        startCarousel();
      }, 2000); // Change images every 2 seconds
    };
    startCarousel();
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
      name: 'Hoodies',
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

  const handleProductDetail = product => {
    dispatch(seedetail(product));
  };

  const renderProd = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        handleProductDetail(item);
        navigation.navigate('product', item.proid);
      }}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: width / 21,
        marginRight: width / 22,
        marginTop: width / 27,
        borderBottomWidth:0.5,
        borderColor:'#008080'
      }}>
      <View style={{marginVertical: 10}}>
        <Image
          source={{uri: item.picture}}
          style={{height: 150, width: 150, borderRadius: 10}}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'SulphurPoint-Bold',
                lineHeight: 20,
              }}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item.Proname}
            </Text>
          </View>
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
            marginTop: 0,
          }}>
          ${item.Proprice}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderCat = ({item}) => (
    <TouchableOpacity onPress={() => setSelectedCategory(item)}>
      <View
        style={{
          backgroundColor:
            selectedCategory && selectedCategory.id === item.id
              ? 'rgba(0, 128, 128,0.5)'
              : 'rgba(0, 128, 128,0.2)',
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
    </TouchableOpacity>
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

  const renderDotIndicator = () => {
    return carouselData.map((_, i) => {
      return (
        <View
          key={i}
          style={[
            styles.dot,
            {backgroundColor: i === currentIndex ? '#008080' : 'white'},
          ]}
        />
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

  const handleSearch = async query => {
    try {
      if (query.trim() !== '') {
        const items = await searchitemfromDB(query);
        setSearchResults(items);
        
        
        setsearch(false);
      } else {
        setSearchResults([]);
        setsearch(true);
      }
    } catch (error) {
      
    }
  };
  const getProductsByCategory = category => {
    switch (category) {
      case 'Shirts':
        return shirt;
      case 'Cap':
        return cap;
      case 'Trousers':
        return trouser;
      case 'Hoodies':
        return hoodie;
      case 'Pants':
        return pent;
      case 'Suits':
        return suit;
      // Add cases for other categories as needed
      default:
        return [];
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 45,
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
            onChangeText={text => {
              if (text.length != 0) {
                setsearch(false);
                setSearchQuery(text);
                handleSearch(searchQuery);
              } else {
                setsearch(true);
              }
            }}
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
      {showsearch ? (
        <ScrollView>
          <View style={{marginHorizontal: 0}}>
            <FlatList
              ref={flatListRef}
              data={carouselData}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onScrollToIndexFailed={info => {
                const wait = new Promise(resolve => setTimeout(resolve, 500));
                wait.then(() => {
                  flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                });
              }}

              onScroll={({nativeEvent}) => {
                const slide = Math.ceil(
                  nativeEvent.contentOffset.x /
                    nativeEvent.layoutMeasurement.width,
                );
                if (slide !== currentIndex) {
                  setCurrentIndex(slide);
                }
              }}
              scrollEventThrottle={32} // to ensure scroll events are fired regularly
              renderItem={({item}) => (
                <View
                  style={{
                    width,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{borderRadius: 20}}>
                    <ImageBackground
                      source={item.image}
                      imageStyle={{borderRadius: 20}}
                      style={{
                        width: width / 1.3,
                        height: width / 2,
                        borderRadius: 20,
                        marginTop: 13,
                      }}
                      resizeMode="cover">
                      <View
                        style={{
                          backgroundColor: '#008080',
                          width: 47,
                          height: 29,
                          alignItems: 'center',
                          borderTopLeftRadius: 20,
                          borderBottomRightRadius:20,
                          justifyContent: 'center',
                        }}>
                        <Text style={{fontFamily: 'SulphurPoint-Bold',color:'white'}}>
                          Promo
                        </Text>
                      </View>
                    </ImageBackground>
                  </View>
                </View>
              )}
            />
            <View style={styles.dotContainer}>{renderDotIndicator()}</View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}></View>
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
            <TouchableOpacity
              onPress={() => {
                setSelectedCategory(null);
              }}>
              <Text style={{color: '#008080', fontFamily: 'SulphurPoint-Bold'}}>
                See All
              </Text>
            </TouchableOpacity>
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
          <FlatList
            data={
              selectedCategory
                ? getProductsByCategory(selectedCategory.name)
                : incoming
            }
            renderItem={renderProd}
            numColumns={2}
            style={{marginHorizontal: 10}}
          />
        </ScrollView>
      ) : (
        <View style={{flex: 1}}>
          <View
            style={{
              marginTop: width / 26,
              marginLeft: width / 14,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: width / 27,
            }}>
            <Text
              style={{
                fontSize: 19,
                fontFamily: 'SulphurPoint-Bold',
                color: 'black',
              }}>
              Results For "{searchQuery}"
            </Text>
            <Text
              style={{
                fontSize: 19,
                fontFamily: 'SulphurPoint-Bold',
                color: 'black',
                marginRight: width / 18,
              }}>
              {searchResults.length} items
            </Text>
          </View>
          <FlatList
            data={searchResults}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 0.2,
                    borderColor: 'grey',
                    justifyContent: 'space-between',
                    marginRight: width / 20,
                    marginLeft: width / 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: width / 23,

                      justifyContent: 'flex-start',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        handleProductDetail(item);
                        navigation.navigate('product', item.proid);
                      }}>
                      <Image
                        source={{uri: item.picture}}
                        style={{
                          height: width / 8,
                          width: width / 8,
                          borderRadius: 12,
                        }}
                      />
                    </TouchableOpacity>
                    <View>
                      <Text
                        style={{
                          color: 'black',
                          fontFamily: 'SulphurPoint-Bold',
                          fontSize: 18,
                          marginLeft: width / 27,
                        }}>
                        {item.Proname.split(' ').slice(0, 4).join(' ')}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginLeft: width / 27,
                          marginTop: width / 67,
                        }}>
                        <Ionicon color={'orange'} size={17} name="star" />
                        <Text
                          style={{
                            color: 'black',
                            fontFamily: 'SulphurPoint-Bold',
                            fontSize: 16,
                            marginLeft: width / 70,
                          }}>
                          {item.rating}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 0,
                      }}>
                      <Pressable
                        style={{backgroundColor: '#008080', borderRadius: 5}}
                        onPress={() => {
                          handleProductDetail(item);
                          navigation.navigate('product', item.proid);
                        }}>
                        <Ionicon
                          color={'white'}
                          size={25}
                          name="chevron-forward-outline"
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25, // Adjust this value as needed
  },
});

export default HomeScreen;
