import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'evokeDB.db', location: 'default'},
  () => {},
  error => {
    
  },
);

const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS categories (catid INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(40)) ;',
      [],
      (tx, results) => {
        
      },
      (tx, error) => {
        
      },
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS products (proid INTEGER PRIMARY KEY AUTOINCREMENT, UniqueId INTEGER UNIQUE, Proname varchar(100), Proprice REAL, rating REAL, picture varchar(500), catid INTEGER, FOREIGN KEY (catid) REFERENCES categories(catid))',
      [],
      (tx, results) => {
        
      },
      (tx, error) => {
        
      },
    );
  });
};

const showtables = () => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM categories;',
      [],
      (_, results) => {
        const {rows} = results;
        for (let i = 0; i < rows.length; i++) {
          const {catid, name} = rows.item(i);
          
        }
      },
      (_, error) => {
        
      },
    );
  });
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM products;',
      [],
      (_, results) => {
        const {rows} = results;
        for (let i = 0; i < rows.length; i++) {
          const {proid, UniqueId, Proname, Proprice, rating, picture, catid} =
            rows.item(i);
          
            `Product ID: ${proid}, Unique ID: ${UniqueId}, Name: ${Proname}, Price: ${Proprice}, Rating: ${rating}, Picture: ${picture}, Category ID: ${catid}`,
          );
        }
      },
      (_, error) => {
        
      },
    );
  });
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM userCart;',
      [],
      (_, results) => {
        const item = results.rows.raw();
        
      },
      (_, error) => {
        
      },
    );
  });
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM userTransaction;',
      [],
      (_, results) => {
        const item = results.rows.raw();
        
      },
      (_, error) => {
        
      },
    );
  });
};
export const insertintoproducts = (protype, prodata) => {
  db.transaction(tx => {
    prodata.forEach((product, index) => {
      tx.executeSql(
        'INSERT OR IGNORE INTO products (proid,UniqueId, Proname, Proprice, rating, picture, catid) VALUES (?, ?, ?, ?, ?, ?,?);',
        [
          index + 1,
          product.webID,
          product.Name,
          product.prices.minPrice,
          product.Rating.avgRating,
          product.URL,
          product.catid,
        ],
        (_, resultSet) => {
          
            `Product '${product.productTitle}' inserted successfully`,
            tx.executeSql('COMMIT;', [], () => {
              
            }),
          );
        },
        (_, error) => {
          console.error('Error inserting product:', error);
        },
      );
    });
  });
};

const deletetable = () => {
  // Truncate the categories table

  // Truncate the products table
  db.transaction(tx => {
    tx.executeSql(
      'Drop  userTransaction;',
      [],
      (_, results) => {
        
      },
      (_, error) => {
        
      },
    );
  });
};

export const Tables = () => {
  // deletetable();
  createTables();
  showtables();
};
export const showtables1 = () => {
  showtables();
};

export default db;
