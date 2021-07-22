const DB_HOSTNAME = '127.0.0.1';
const DB_PORT = '27017';
const DB_NAME = 'users';
const DB_URL = `mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_NAME}`

module.exports = DB_URL;