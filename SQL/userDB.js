
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'userDB.db', location: 'default' });

export const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Users (UserId INTEGER PRIMARY KEY AUTOINCREMENT,Username varchar(100) , Email varchar(50)) , Password varchar(20);',
        [],
        (tx, results) => {},
        (tx, error) => {
          console.log('Error while creating table:', error);
        },
      );
    });
  };

export const createUser = (username,email ,password) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Users (Username,Email, Password) VALUES (?, ?, ?);',
        [username, email ,password],
        (_, results) => resolve({ id: results.insertId, username }),
        (_, error) => reject(error),
      );
    });
  });
};

export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Users WHERE Email = ? AND Password = ?;',
        [email, password],
        (_, results) => {
          if (results.rows.length > 0) {
            resolve(results.rows.item(0));
          } else {
            reject(new Error('Invalid email or password'));
          }
        },
        (_, error) => reject(error),
      );
    });
  });
};

export default db;
