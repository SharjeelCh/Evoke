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
  let offset = 0;
  const limit = 25;
  let hasMoreProducts = true;



  const categories = ['shirt', 'hat','trouser','hoodie','pant','suit'];
  const db = SQLite.openDatabase({name: 'evokeDB.db', location: 'default'});

  
  const fetchData = async category => {
    while (hasMoreProducts) {
    const url = `https://kohls.p.rapidapi.com/products/list?limit=${limit}&offset=${offset}&keyword=${category}`; // change  keyword for filter
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '201a32a6camsh0e01c8c23c55838p184e9fjsn00792122155e',
        'X-RapidAPI-Host': 'kohls.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (result && result.payload && result.payload.products  && result.payload.products.length > 0) {
        setData1(prevData => [...prevData, ...result.payload.products]);
        ///////

        db.transaction(tx => {
          categories.forEach((categoryName, index) => {
            tx.executeSql(
              'INSERT OR IGNORE INTO categories (catid, name) VALUES (?, ?);',
              [index + 1, categoryName],
              (_, resultSet) => {
                
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
                    
                      `Product '${product.productTitle}' inserted successfully`,
                      tx.executeSql('COMMIT;', [], () => {
                        
                      })
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
        // 
        offset += limit;
       
      } else {
        hasMoreProducts = false;
        console.error('No products found for category:', category);
      }
    } catch (error) {
      hasMoreProducts = false;
      console.error(error);
    }
  };
}

  useEffect(() => {
    tables();
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const fetchDataWithDelay = async (category, delayTime) => {
      await fetchData(category);
      await delay(delayTime);
    };

    categories.forEach((category, index) => {
      fetchDataWithDelay(category, index * 1000); // Waits for 1 second between each request
    });  
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
    <View style={{}}>
 

    </View>
  );
};

export default DataFetch;