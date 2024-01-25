import SQLite from 'react-native-sqlite-storage';

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

export default db;
