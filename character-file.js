require("dotenv").config();
const mysql = require("mysql");
const keys = require("./keys");
const DBNAME = "star_wars_db";
const TABLENAME = "characters";

let characters = [
  {
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  },
  {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  },
  {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Master",
    age: 55,
    forcePoints: 1350
  },
  {
    routeName: "babyyoda",
    name: "Baby Yoda",
    role: "unknown",
    age: 50,
    forcePoints: 1500
  },
  {
    routeName: "chewbacca",
    name: "Chewbacca",
    role: "Pilot - The Muscle",
    age: 190,
    forcePoints: 10
  }
];

let dbCharacters = getCharacters();


function getCharacters() {
  let connection = mysql.createConnection({
    host: keys.creds.hostName,
    port: 8819,
    user: keys.creds.userName,
    password: keys.creds.password,
    database: "star_wars_db"
  });
  
  let queryString = `SELECT * FROM ${DBNAME}.${TABLENAME};`;
  
  connection
  .query(queryString,
    function(err, data, fields) {
      if(err) {
        throw err;
      }
      
      console.log('here is data');
      // console.log(data);
      return data;
      
    });
}
  


module.exports = {
  localCharacters: characters,
  dbCharacters: dbCharacters
}