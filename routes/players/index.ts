const express = require('express');
const router = express.Router();
const mongoClient = require('../../mongoClient');

const COLLECTION_NAME = 'players';

router.get('/', async (req, res) => {
	const client = await mongoClient;
	const db = client.db(process.env.DB_NAME);
	const response = await db.collection(COLLECTION_NAME).find({}).sort({ lastName: 1 }).toArray();
	res.send(response);
});

router.get('/captain', async (req, res) => {
	const client = await mongoClient;
	const db = client.db(process.env.DB_NAME);
	const response = await db.collection(COLLECTION_NAME).find({ is_captain: true }).toArray();
	res.send(response);
});

router.get('/vicecaptain', async (req, res) => {
	const client = await mongoClient;
	const db = client.db(process.env.DB_NAME);
	const response = await db.collection(COLLECTION_NAME).find({ is_vice_captain: true }).toArray();
	res.send(response);
});

module.exports = router;
