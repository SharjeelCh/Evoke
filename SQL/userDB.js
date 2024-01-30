import {useContext} from 'react';
import SQLite from 'react-native-sqlite-storage';
import {UserContext} from '../screens/UserProvider';
import {ToastAndroid} from 'react-native';

const db = SQLite.openDatabase(
  {name: 'evokeDB.db', location: 'default'},
  () => {
    console.log('evokeDB opened successfully');
  },
  error => {
    console.log('Error while opening the database:', error);
  },
);

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Users (UserId INTEGER PRIMARY KEY AUTOINCREMENT, Username varchar(100), Email varchar(50), Password varchar(20))',
      [],
      (tx, results) => {
        console.log('User table created successfully');
      },
      (tx, error) => {
        console.log('Error while creating table:', error);
      },
    );
    createTrigger();

    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS UserLogs (LogId INTEGER PRIMARY KEY AUTOINCREMENT, Event varchar(50), Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)',
      [],
      (_, results) => {
        console.log('UserLogs table created successfully: ');
      },
      (_, error) => {
        console.log('Error while creating UserLogs table:', error);
      },
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS userCart (cartId INTEGER PRIMARY KEY AUTOINCREMENT, UserId INTEGER, proid INTEGER UNIQUE, Proname varchar(100), Proprice REAL, proSize varchar(10), rating REAL,proQuantity INTEGER, picture varchar(500), catid INTEGER, FOREIGN KEY (UserId) REFERENCES Users(UserId))',
      [],
      (_, results) => {
        console.log('userCart table created successfully: ');
      },
      (_, error) => {
        console.log('Error while creating userCart table:', error);
      },
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS userWishlist (wishId INTEGER PRIMARY KEY AUTOINCREMENT, UserId INTEGER, proid INTEGER UNIQUE, Proname varchar(100), Proprice REAL, rating REAL, picture varchar(500), FOREIGN KEY (UserId) REFERENCES Users(UserId))',
      [],
      (_, results) => {
        console.log('userWishlist table created successfully: ');
      },
      (_, error) => {
        console.log('Error while creating userWishlist table:', error);
      },
    );
    
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS userTransaction (transId INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER, proid INTEGER, Proname varchar(100), Proprice REAL, proSize varchar(10), rating REAL,proQuantity INTEGER, picture varchar(500), catid INTEGER, MethodPay varchar(30) , address,FOREIGN KEY (UserID) REFERENCES Users(UserId))',
      [],
      (_, results) => {
        console.log('userTransaction table created successfully: ');
      },
      (_, error) => {
        console.log('Error while creating userTransaction table:', error);
      },
    );

    tx.executeSql(
      `CREATE TRIGGER IF NOT EXISTS after_user_insert
       AFTER INSERT ON Users
       BEGIN
         INSERT INTO UserLogs (Event, Timestamp)
         VALUES ('User Created', DATETIME('now'));
       END;`,
      [],
      (_, results) => {
        console.log('User creation trigger created successfully: ');
      },
      (_, error) => {
        ToastAndroid.show('Email must be a Gmail address', ToastAndroid.BOTTOM);
        console.log('Error creating user creation trigger:', error);
      },
    );
    tx.executeSql(`select * from UserLogs`, [], (_, results) => {
      const rows = results.rows;

      for (let i = 0; i < rows.length; i++) {
        console.log(
          `LogId: ${rows.item(i).LogId}, Event: ${
            rows.item(i).Event
          }, Timestamp: ${rows.item(i).Timestamp}`,
        );
      }
    });
  });
};

const createTrigger = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TRIGGER IF NOT EXISTS CheckEmail
      BEFORE INSERT ON Users
      WHEN NEW.Email NOT LIKE '%@gmail.com'
      BEGIN
        SELECT RAISE(ABORT, 'Email must be a Gmail address');
      END;
      `,
      [],
      () => {
        console.log('Trigger created successfully');
      },
      error => {
        console.log('Error creating trigger:', error);
      },
    );
  });
};

export const createUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Users (Username,Email, Password) VALUES (?, ?, ?);',
        [username, email, password],
        (_, results) => resolve({id: results.insertId, username}),
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

export const cartDB = (product, id, size) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO userCart (UserId, proid, Proname, Proprice, proSize, rating, picture, catid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        product.proid,
        product.Proname,
        product.Proprice,
        size,
        product.rating,
        product.picture,
        product.catid,
      ],
      (_, results) => {
        console.log('Data inserted successfully into userCart');
      },
      (_, error) => {
        console.error('Error inserting data into userCart:', error);
      },
    );
  });
};

export const wishDB = (product, id) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO userWishlist (UserId, proid, Proname, Proprice, rating, picture) VALUES (?, ?, ?, ?, ?, ?)',
      [
        id,
        product.proid,
        product.Proname,
        product.Proprice,
        product.rating,
        product.picture,
      ],
      (_, results) => {
        console.log('Data inserted successfully into userWishlist');
      },
      (_, error) => {
        console.error('Error inserting data into userWishlist:', error);
      },
    );
  });
};
export const insertintouserTransaction = (id,proItem,quantity,methodpay,address) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO userTransaction ( UserID, proid, Proname ,Proprice, proSize, rating, proQuantity ,picture, catid, MethodPay, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
      [
        id,
        proItem.proid,
        proItem.Proname,
        proItem.Proprice,
        proItem.proSize,
        proItem.rating,
        quantity,
        proItem.picture,
        proItem.catid,
        methodpay,
        address
      ],
      (_, results) => {
        console.log('Data inserted successfully into usertransaction');
      },
      (_, error) => {
        console.error('Error inserting data into usertransaction:', error);
      },
    );
  });
};


export const validateCart = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT proid from userCart',
        [],
        (_, results) => {
          const proIds = [];
          for (let i = 0; i < results.rows.length; i++) {
            proIds.push(results.rows.item(i).proid);
          }

          resolve(proIds);
        },
        (_, error) => {
          console.error('Error validating proID :', error);
          reject(error);
        },
      );
    });
  });
};

export const fetchCartItemsFromSQLite = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM userCart inner join Users on userCart.UserId = Users.UserId where Users.Email = ?',
        [id],
        (tx, results) => {
          const len = results.rows.length;
          const items = [];
          for (let i = 0; i < len; i++) {
            const row = results.rows.item(i);
            items.push(row);
          }
          resolve(items);
        },
        error => {
          reject(error);
        },
      );
    });
  });
};
export const fetchWishlistItemsFromSQLite = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM userWishlist inner join Users on userWishList.UserId = Users.UserId where Users.Email = ?',
        [id],
        (tx, results) => {
          const len = results.rows.length;
          const items = [];
          for (let i = 0; i < len; i++) {
            const row = results.rows.item(i);
            items.push(row);
          }
          resolve(items);
        },
        error => {
          reject(error);
        },
      );
    });
  });
};
export const searchitemfromDB = searchQuery => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM products where Proname LIKE ?',
        [`%${searchQuery}%`],
        (tx, results) => {
          const len = results.rows.length;
          const items = [];
          for (let i = 0; i < len; i++) {
            const row = results.rows.item(i);
            items.push(row);
          }
          resolve(items);
        },
        error => {
          reject(error);
        },
      );
    });
  });
};

export const searchItemfromDB = searchQuery => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE PROCEDURE IF NOT EXISTS searchitem (@searchQuery TEXT) 
        BEGIN 
          SELECT * FROM products WHERE Proname LIKE @searchQuery;'; 
        END;`[`%${searchQuery}%`],
        (tx, results) => {},
        error => {
          reject(error);
        },
      ),
        tx.executeSql(
          `CALL searchitem(?)'`,
          [searchQuery],
          (tx, results) => {
            const len = results.rows.length;
            const items = [];
            for (let i = 0; i < len; i++) {
              const row = results.rows.item(i);
              items.push(row);
            }
            resolve(items);
          },
          error => {
            reject(error);
          },
        );
    });
  });
};
export const executeProcedures = searchQuery => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CALL searchitem(?)'`,
        [searchQuery],
        (tx, results) => {
          const len = results.rows.length;
          const items = [];
          for (let i = 0; i < len; i++) {
            const row = results.rows.item(i);
            items.push(row);
          }
          resolve(items);
        },
        error => {
          reject(error);
        },
      );
    });
  });
};

export const deleteWishlist = (id,proid) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM userWishlist WHERE UserId IN (SELECT UserId FROM Users WHERE Email = ?) AND proid = ?',
      [id,proid],
      (tx, results) => {
        console.log('Wishlist deleted successfully');
      },
      error => {
        console.log('Error deleting wishlist',error);
      },
    );
  });
};

export const deleteCart = (id,proid) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM userCart WHERE UserId IN (SELECT UserId FROM Users WHERE Email = ?) AND proid = ?',
      [id,proid],
      (tx, results) => {
        console.log('cart deleted successfully after transaction');
      },
      error => {
        console.log('Error deleting wishlist',error);
      },
    );
  });
};



export default db;
