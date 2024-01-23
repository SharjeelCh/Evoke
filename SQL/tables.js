import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'evokeDB.db', location: 'default'},
  () => {},
  error => {
    console.log('Error while opening the database:', error);
  },
);

const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS categories (catid INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(40)) ;',
      [],
      (tx, results) => {console.log("categories created");},
      (tx, error) => {
        console.log('Error while creating table:', error);
      },
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS products (proid INTEGER PRIMARY KEY AUTOINCREMENT,UniqueId INTEGER, Proname varchar(100), Proprice REAL, rating REAL, picture varchar(500), catid INTEGER, FOREIGN KEY (catid) REFERENCES categories(catid))',
      [],
      (tx, results) => {console.log("Products created");},
      (tx, error) => {
        console.log('Error while creating table:', error);
      },
    );
  });
};

const showtables=()=>{
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM categories;',
      [],
      (_, results) => {
        const { rows } = results;
        for (let i = 0; i < rows.length; i++) {
          const { catid, name } = rows.item(i);
          console.log(`Category ID: ${catid}, Name: ${name}`);
        }
      },
      (_, error) => {
        console.log('Error while selecting from categories:', error);
      },
    );
  });
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM products;',
      [],
      (_, results) => {
        const { rows } = results;
        for (let i = 0; i < rows.length; i++) {
          const { proid, UniqueId, Proname, Proprice, rating, picture, catid } = rows.item(i);
          console.log(`Product ID: ${proid}, Unique ID: ${UniqueId}, Name: ${Proname}, Price: ${Proprice}, Rating: ${rating}, Picture: ${picture}, Category ID: ${catid}`);
        }
      },
      (_, error) => {
        console.log('Error while selecting from products:', error);
      },
    );
  });
    
}

const deletetable=()=>{
  // Truncate the categories table
db.transaction(tx => {
  tx.executeSql(
    'DELETE FROM categories;',
    [],
    (_, results) => {
      console.log('Categories table truncated successfully.');
    },
    (_, error) => {
      console.log('Error while truncating categories table:', error);
    },
  );
});

// Truncate the products table
db.transaction(tx => {
  tx.executeSql(
    'DELETE FROM products;',
    [],
    (_, results) => {
      console.log('Products table truncated successfully.');
    },
    (_, error) => {
      console.log('Error while truncating products table:', error);
    },
  );
});

}

export const tables = () => {
  createTables();
  showtables();
 // deletetable();
};

export default db;
