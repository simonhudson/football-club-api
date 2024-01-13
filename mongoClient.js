"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
var mongodb_1 = require("mongodb");
var dotenv = require("dotenv");
dotenv.config();
var uri = process.env.DB_URI;
if (!uri)
    throw new Error('No DB_URI in .env file');
var mongoClient;
try {
    mongoClient = new mongodb_1.MongoClient(uri);
    console.log('Connecting to MongoDB Atlas cluster...');
    mongoClient.connect();
    console.log('Successfully connected to MongoDB Atlas!');
}
catch (error) {
    console.error('Connection to MongoDB Atlas failed!', error);
    process.exit();
}
exports.default = mongoClient;
