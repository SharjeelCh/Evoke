
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'evokeDB.db', location: 'default'});

export const selectall = async () => {
  return new Promise((resolve, reject) => {
    
    const all =[];
    const cartshirt=[];
   
  
    db.transaction(tx => {
      tx.executeSql(
        'SELECT products.*, categories.name AS categoryName FROM products INNER JOIN categories ON products.catid = categories.catid;',
        [],
        (_, results) => {
          const { rows } = results;
          for (let i = 0; i < rows.length; i++) {
            const { proid, UniqueId, Proname, Proprice, rating, picture, catid, categoryName } = rows.item(i);
            all.push({ proid, UniqueId, Proname, Proprice, rating, picture, catid, categoryName });
          }
        },
        
        (_, error) => {
          
          reject(error);
        },
      );
     resolve(all)
    });


    
    
  });
};
export const selectShirt = async () => {
  return new Promise((resolve, reject) => {
    
    const all =[];
    const cartshirt=[];
   
  
    db.transaction(tx => {
      tx.executeSql(
        'SELECT products.*, categories.name AS categoryName FROM products INNER JOIN categories ON products.catid = categories.catid where categories.catid=1;',
        [],
        (_, results) => {
          const { rows } = results;
          for (let i = 0; i < rows.length; i++) {
            const { proid, UniqueId, Proname, Proprice, rating, picture, catid, categoryName } = rows.item(i);
            all.push({ proid, UniqueId, Proname, Proprice, rating, picture, catid, categoryName });
          }
        },
        
        (_, error) => {
          
          reject(error);
        },
      );
     resolve(all)
    });


    
    
  });
};
export const selectcap = async () => {
  return new Promise((resolve, reject) => {
    
    const all =[];
    const cartshirt=[];
   
  
    db.transaction(tx => {
      tx.executeSql(
        'SELECT products.*, categories.name AS categoryName FROM products INNER JOIN categories ON products.catid = categories.catid where categories.catid=2;',
        [],
        (_, results) => {
          const { rows } = results;
          for (let i = 0; i < rows.length; i++) {
            const { proid, UniqueId, Proname, Proprice, rating, picture, catid, categoryName } = rows.item(i);
            all.push({ proid, UniqueId, Proname, Proprice, rating, picture, catid, categoryName });
          }
        },
        
        (_, error) => {
          
          reject(error);
        },
      );
     resolve(all)
    });


    
    
  });
};
export const selecttrouser = async () => {
  return new Promise((resolve, reject) => {
    
    const all =[];
    const cartshirt=[];
   
  
    db.transaction(tx => {
      tx.executeSql(
        'SELECT products.*, categories.name AS categoryName FROM products INNER JOIN categories ON products.catid = categories.catid where categories.catid=3;',
        [],
        (_, results) => {
          const { rows } = results;
          for (let i = 0; i < rows.length; i++) {
            const { proid, UniqueId, Proname, Proprice, rating, picture, catid, categoryName } = rows.item(i);
            all.push({ proid, UniqueId, Proname, Proprice, rating, picture, catid, categoryName });
          }
        },
        
        (_, error) => {
          
          reject(error);
        },
      );
     resolve(all)
    });


    
    
  });
};
export const selecthoodie = async () => {
  return new Promise((resolve, reject) => {
    
    const all =[];
    const cartshirt=[];
   
  
    db.transaction(tx => {
      tx.executeSql(
        'SELECT products.*, categories.name AS categoryName FROM products INNER JOIN categories ON products.catid = categories.catid where categories.catid=4;',
        [],
        (_, results) => {
          const { rows } = results;
          for (let i = 0; i < rows.length; i++) {
            const { proid, UniqueId, Proname, Proprice, rating, picture, catid, categoryName } = rows.item(i);
            all.push({ proid, UniqueId, Proname, Proprice, rating, picture, catid, categoryName });
          }
        },
        
        (_, error) => {
          
          reject(error);
        },
      );
     resolve(all)
    });


    
    
  });
};
export const selectpent = async () => {
  return new Promise((resolve, reject) => {
    
    const all =[];
    const cartshirt=[];
   
  
    db.transaction(tx => {
      tx.executeSql(
        'SELECT products.*, categories.name AS categoryName FROM products INNER JOIN categories ON products.catid = categories.catid where categories.catid=5;',
        [],
        (_, results) => {
          const { rows } = results;
          for (let i = 0; i < rows.length; i++) {
            const { proid, UniqueId, Proname, Proprice, rating, picture, catid, categoryName } = rows.item(i);
            all.push({ proid, UniqueId, Proname, Proprice, rating, picture, catid, categoryName });
          }
        },
        
        (_, error) => {
          
          reject(error);
        },
      );
     resolve(all)
    });


    
    
  });
};
export const selectsuit = async () => {
  return new Promise((resolve, reject) => {
    
    const all =[];
    const cartshirt=[];
   
  
    db.transaction(tx => {
      tx.executeSql(
        'SELECT products.*, categories.name AS categoryName FROM products INNER JOIN categories ON products.catid = categories.catid where categories.catid=6;',
        [],
        (_, results) => {
          const { rows } = results;
          for (let i = 0; i < rows.length; i++) {
            const { proid, UniqueId, Proname, Proprice, rating, picture, catid, categoryName } = rows.item(i);
            all.push({ proid, UniqueId, Proname, Proprice, rating, picture, catid, categoryName });
          }
        },
        
        (_, error) => {
          
          reject(error);
        },
      );
     resolve(all)
    });


    
    
  });
};