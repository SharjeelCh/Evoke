import {View, Text, ScrollView, FlatList, Image,TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {showtables1, tables} from './tables';
import SQLite from 'react-native-sqlite-storage';
import {Proshirt, selectProducts} from './selectProducts';

const DataFetch = () => {
  const [data1, setData1] = useState([]);
  const [incoming, setincoming] = useState([]);
  const [shirt, setshirt] = useState([]);
  const [selectedCategroy, setSelectedCategory] = useState(null);

  const categories = ['shirt', 'jacket'];
  const db = SQLite.openDatabase({name: 'evokeDB.db', location: 'default'});

  const fetchData = async category => {
    const url = `https://kohls.p.rapidapi.com/products/list?limit=1000&offset=12&keyword=${category}&sortID=1`; // change  keyword for filter
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '7b2ea8df32msh3f9eeb6fbf86637p1dcfd3jsn6366f455d20c',
        'X-RapidAPI-Host': 'kohls.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (result && result.payload && result.payload.products) {
        setData1(result.payload.products);

        ///////

        db.transaction(tx => {
          categories.forEach((categoryName, index) => {
            tx.executeSql(
              'INSERT OR IGNORE INTO categories (catid, name) VALUES (?, ?);',
              [index + 1, categoryName],
              (_, resultSet) => {
                console.log(`Category '${categoryName}' inserted successfully`);
              },
              (_, error) => {
                console.error('Error inserting category:', error);
              },
            );
          });
        });

        // Insert products into the products table (if not already present)
        db.transaction(tx => {
          result.payload.products.forEach((product, index) => {
            let matchedCategory = null;

            // Check if productTitle contains any category
            for (let i = 0; i < categories.length; i++) {
              if (
                product.productTitle
                  .toLowerCase()
                  .includes(categories[i].toLowerCase())
              ) {
                matchedCategory = categories[i];
                break;
              }
            }

            // If a matching category is found, insert the product into the database
            if (matchedCategory !== null) {
              const categoryId = categories.indexOf(matchedCategory);
              if (categoryId != -1) {
                tx.executeSql(
                  'INSERT OR IGNORE INTO products (proid,UniqueId, Proname, Proprice, rating, picture, catid) VALUES (?, ?, ?, ?, ?, ?,?);',
                  [
                    index + 1,
                    product.webID,
                    product.productTitle,
                    product.prices[0].regularPrice.minPrice,
                    product.rating.avgRating,
                    product.image.url,
                    categoryId + 1,
                  ],
                  (_, resultSet) => {
                    console.log(
                      `Product '${product.productTitle}' inserted successfully`,
                    );
                  },
                  (_, error) => {
                    console.error('Error inserting product:', error);
                  },
                );
              }
            }
          });
        });

        // setData1(result.payload.products);

        ///////
        // console.log(data1);
      } else {
        console.error('No products found for category:', category);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    selectProducts()
      .then(({categories, catShirt}) => {
        // Now you have categories and products data
        // console.log('Categories:', categories);
        console.log('Products:', catShirt);
        // console.log('Products:', products);
        // Set the data to state or perform other actions with the data
        setincoming(categories);
        setshirt(catShirt);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    tables();
    /*const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const fetchDataWithDelay = async (category, delayTime) => {
      await fetchData(category);
      await delay(delayTime);
    };

    categories.forEach((category, index) => {
      fetchDataWithDelay(category, index * 0); // Waits for 1 second between each request
    });  */
  }, []);

  class ProductItem extends React.PureComponent {
    render() {
      const {item} = this.props;
      return (
        <View style={{flex: 1, margin: 8}}>
          <Image
            source={{uri: item.picture}}
            style={{width: 100, height: 100}}
            resizeMode="contain"
          />
          <Text style={{fontSize: 15}}>{item.categoryName}</Text>

          <Text style={{fontSize: 15}}>{item.Proname}</Text>
          <Text style={{fontSize: 15}}>{item.Proprice}</Text>
          <Text style={{fontSize: 15}}>{item.rating}</Text>
        </View>
      );
    }
  }

  const MemoizedProductItem = React.memo(ProductItem);

  return (
    <View style={{flex: 1}}>
 

      <FlatList
        data={incoming}
        renderItem={({item}) => <MemoizedProductItem item={item} />}
        keyExtractor={item => item.UniqueId.toString()}
        numColumns={2}
      />
    </View>
  );
};

export default DataFetch;
