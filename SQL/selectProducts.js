// showtables1.js

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'evokeDB.db', location: 'default'});

export const selectProducts = () => {
  return new Promise((resolve, reject) => {
    const categories = [];
    const catShirt =[];
    db.transaction(tx => {
      tx.executeSql(
        'SELECT products.*, categories.name AS categoryName FROM products INNER JOIN categories ON products.catid = categories.catid;',
        [],
        (_, results) => {
          const { rows } = results;
          for (let i = 0; i < rows.length; i++) {
            const { proid, UniqueId, Proname, Proprice, rating, picture, catid, categoryName } = rows.item(i);
            categories.push({ proid, UniqueId, Proname, Proprice, rating, picture, catid, categoryName });
          }
        },
       // resolve(categories),
        (_, error) => {
          console.log('Error while selecting from categories:', error);
          reject(error);
        },
      );
    });

    db.transaction(tx => {
      tx.executeSql(
        'SELECT products.*, categories.name AS categoryName FROM products INNER JOIN categories ON products.catid = categories.catid where products.catid=1;',
        [],
        (_, results) => {
          const { rows } = results;
          for (let i = 0; i < rows.length; i++) {
            const { proid, UniqueId, Proname, Proprice, rating, picture, catid, categoryName } = rows.item(i);
            catShirt.push({ proid, UniqueId, Proname, Proprice, rating, picture, catid, categoryName });
          }
        },
        resolve({categories,catShirt}),
        (_, error) => {
          console.log('Error while selecting from categories:', error);
          reject(error);
        },
      );
    });
    
    
  });
};

