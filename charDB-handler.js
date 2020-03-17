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

const db = makeDb(
  {
    host: keys.creds.hostName,
    port: 8819,
    user: keys.creds.userName,
    password: keys.creds.password,
    database: "star_wars_db"
  }
);

try {
  const someRows = await db.query( 'SELECT * FROM star_wars_db.character' );
  // const otherRows = await db.query( 'SELECT * FROM other_table' );
  // do something with someRows and otherRows
  console.log(someRows);
  console.log(someRows);
  
} catch ( err ) {
  // handle the error
} finally {
  await db.close();
}

module.exports = {
  queryByName: queryByName,
  makeDb: makeDb
}

