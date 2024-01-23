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

export const tables = () => {
  createTables();
};

export default db;
