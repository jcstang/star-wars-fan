// Dependencies
// =============================================================
require("dotenv").config();
const mysql = require("mysql");
const keys = require("./keys");
const express = require("express");
const path = require("path");
const characters = require("./character-file").localCharacters;
// const dbCharacters = require("./character-file.js").dbCharacters;
const chalk = require("chalk");
const debug = require("debug")("server");
const dbHelper = require("./charDB-handler");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3005;
const DBNAME = "star_wars_db";
const TABLENAME = "characters";

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static('./static/'));

// Star Wars Characters (DATA)
// =============================================================
// see character-file.js

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  // let thing = dbHelper.queryByName('blah');
  // console.log(thing);
  console.log('has thing logged?');
  dbHelper.getTheRows();

  // dbHelper.queryByName('blah2').then(function(data){
  //   console.log('inside then');
  //   debug(data);
  // });

  // dbHelper.queryByName('blah2').then(result => {
  //   console.log('inside then');
  //   debug(result);
  // });

  // ==== testing async await ===================
  
  // ==============================================
  

  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Displays all characters
app.get("/api/characters", function(req, res) {
  // return res.json(characters);
  // debug(dbCharacters);
  let connection = mysql.createConnection({
    host: keys.creds.hostName,
    port: 8819,
    user: keys.creds.userName,
    password: keys.creds.password,
    database: "star_wars_db"
  });
  
  let queryString = `SELECT * FROM ${DBNAME}.${TABLENAME};`;
  connection.query(queryString, function(err, data, fields) {
    if(err) {
      throw err;
    }
    return res.json( data );
  });

  // return res.json( dbCharacters );
});

// Displays a single character, or returns false
// app.get("/api/characters/:character", function(req, res) {
//   var chosen = req.params.character;

//   console.log(chosen);

//   for (var i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });

app.get("/api/characters/:character", function(req, res) {
  let chosen = req.params.character;
  debug(chosen);
  let queryString = `SELECT * FROM ${DBNAME}.${TABLENAME} as c WHERE c.name LIKE '${chosen}%';`;
  debug(queryString);

  mysql.createConnection({
    host: keys.creds.hostName,
    port: 8819,
    user: keys.creds.userName,
    password: keys.creds.password,
    database: "star_wars_db"
  })
  .query(queryString, function(err, data, fields) {
    if(err) {
      throw err;
    }

    return res.json(data[0]);
  });

});

app.get("/api/characters/id/:charKey", function(req, res) {
  let chosenKey = req.params.charKey;
  debug(chosenKey);
  let queryString = `SELECT * FROM ${DBNAME}.${TABLENAME} as c WHERE c.key=${chosenKey};`;

  let connection = mysql.createConnection({
    host: keys.creds.hostName,
    port: 8819,
    user: keys.creds.userName,
    password: keys.creds.password,
    database: "star_wars_db"
  })
  .query(queryString, function(err, data, fields) {
    if(err) {
      throw err;
    }
    // return res.json(data);
      // returnCharacter = data[0].name;
      // debug('returnCharacter');
      // debug(returnCharacter);

    return res.json(data[0]);
  });

  // return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/characters", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newcharacter = req.body;

  console.log("new char ", newcharacter);

  // We then add the json the user sent to the character array
  characters.push(newcharacter);

  // We then display the JSON to the users
  res.json(newcharacter);
});





// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  // console.log("App listening on PORT " + PORT);
  // console.log(`Listening on port ${chalk.green(PORT)}`);
  debug(`Listening on port ${chalk.green(PORT)}`);
});