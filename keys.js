const debug = require("debug");

debug('DB credentials loaded');

exports.creds = {
  hostName: process.env.DB_HOST,
  userName: process.env.DB_USER,
  password: process.env.DB_PASS
}