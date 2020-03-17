require('dotenv').config();
const keys = require("./keys");
const mysql = require('mysql');
const chalk = require("chalk");
const util = require("util");

const DBNAME = "star_wars_db";
const TABLENAME = "characters";
let connection;
let dataArray = [];




function getCharacterByKey(key) {

}

function getAllCharacters() {

}

function saveNewCharacter() {

}

function connectToDB() {
  // connect to mysql
  connection = mysql.createConnection({
    host: keys.creds.hostName,
    port: 8819,
    user: keys.creds.userName,
    password: keys.creds.password,
    database: "star_wars_db"
  });

  connection.connect(function(err) {
    if (err) {
      throw err;
    }
    console.log("connected as id " + chalk.yellow(connection.threadId));

  });

}



async function queryByName(name) {
  connection = mysql.createConnection({
    host: keys.creds.hostName,
    port: 8819,
    user: keys.creds.userName,
    password: keys.creds.password,
    database: "star_wars_db"
  });

  let queryString = `SELECT * FROM ${DBNAME}.${TABLENAME};`;

  let myData = connection
    .query(queryString,
    async function(err, data, fields) {
      if(err) {
        throw err;
      }

      console.log('here is data');
      // console.log(data);
      return data;
    
  });

}

let mysqlConfig = {
  host: keys.creds.hostName,
  port: 8819,
  user: keys.creds.userName,
  password: keys.creds.password,
  database: "star_wars_db"
};

function makeDb(config) {
  config = {
    host: keys.creds.hostName,
    port: 8819,
    user: keys.creds.userName,
    password: keys.creds.password,
    database: "star_wars_db"
  };

  const connection = mysql.createConnection( config );
  return {
    query( sql, args ) {
      return util.promisify( connection.query )
        .call( connection, sql, args );
    },
    close() {
      return util.promisify( connection.end ).call( connection );
    }
  };
}

// const db = makeDb(
//   {
//     host: keys.creds.hostName,
//     port: 8819,
//     user: keys.creds.userName,
//     password: keys.creds.password,
//     database: "star_wars_db"
//   }
// );

// try {
//   const someRows = await db.query( 'SELECT * FROM star_wars_db.character' );
//   // const otherRows = await db.query( 'SELECT * FROM other_table' );
//   // do something with someRows and otherRows
//   console.log(someRows);
//   console.log(someRows);
  
// } catch ( err ) {
//   // handle the error
// } finally {
//   await db.close();
// }

// ==== testing async await ===================
const db = makeDb();
const someRows = [];

function getTheRows() {
  try {
    someRows = db.query( 'SELECT * FROM star_wars_db.characters' )
      .then(function(response) {
        console.log('inside then response line 135');
        console.log(response);
        
        // res.sendFile(path.join(__dirname, "views", "index.html"));
        // return true;
        
      });
    // const otherRows = await db.query( 'SELECT * FROM other_table' );
    // do something with someRows and otherRows
    // console.log('somerows');
    // console.log(someRows);
    // res.sendFile(path.join(__dirname, "views", "index.html"));
    
  } catch ( err ) {
    // handle the error
  } finally {
    db.close();
    // return true;
  }

}
// ==============================================


module.exports = {
  queryByName: queryByName,
  makeDb: makeDb,
  someRows: someRows,
  getTheRows: getTheRows
}

