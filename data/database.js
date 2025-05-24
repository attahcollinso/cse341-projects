const dotenv = require('dotenv');
const process = require("node:process");
const console = require("node:console");
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if(database) {
        console.log('Database is already initialised!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            database = client;
        callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database is not initialised')
}
    return database;
};

module.exports = {
    initDb,
    getDatabase
};