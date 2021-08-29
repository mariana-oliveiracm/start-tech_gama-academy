const pg = require('pg');
require('dotenv').config();

const ELEPHANTSQL_PASSWORD = process.env.ELEPHANTSQL_PASSWORD;
const conString = `postgres://jndtouxa:${ELEPHANTSQL_PASSWORD}@chunee.db.elephantsql.com/jndtouxa` //Can be found in the Details page
const client = new pg.Client(conString);

module.exports = client;
