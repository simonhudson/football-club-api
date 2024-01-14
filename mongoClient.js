/* eslint-disable no-console */
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.DB_URI;
if (!uri) throw new Error('No DB_URI in .env file');

let mongoClient;
try {
	mongoClient = new MongoClient(uri);
	console.log('Connecting to MongoDB Atlas cluster...');
	mongoClient.connect();
	console.log('Successfully connected to MongoDB Atlas!');
} catch (error) {
	console.error('Connection to MongoDB Atlas failed!', error);
	process.exit();
}

module.exports = mongoClient;
