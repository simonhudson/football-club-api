import express from 'express';
const router = express.Router();
import mongoClient from '../../mongoClient';
import { sendResponsePayload } from '../../helpers/api';

const COLLECTION_NAME = 'players';

router.get('/', async (req, res) => {
	const client = await mongoClient;
	const db = client.db(process.env.DB_NAME);
	const response = await db.collection(COLLECTION_NAME).find({}).sort({ last_name: 1 }).toArray();
	sendResponsePayload(response, res);
});

router.get('/captain', async (req, res) => {
	const client = await mongoClient;
	const db = client.db(process.env.DB_NAME);
	const response = await db.collection(COLLECTION_NAME).find({ is_captain: true }).toArray();
	sendResponsePayload(response, res);
});

router.get('/vicecaptain', async (req, res) => {
	const client = await mongoClient;
	const db = client.db(process.env.DB_NAME);
	const response = await db.collection(COLLECTION_NAME).find({ is_vice_captain: true }).toArray();
	sendResponsePayload(response, res);
});

router.get('/loan', async (req, res) => {
	const client = await mongoClient;
	const db = client.db(process.env.DB_NAME);
	const response = await db
		.collection(COLLECTION_NAME)
		.find({ $or: [{ on_loan_from: { $ne: null } }, { on_loan_to: { $ne: null } }] })
		.toArray();
	sendResponsePayload(response, res);
});

router.get('/loan/in', async (req, res) => {
	const client = await mongoClient;
	const db = client.db(process.env.DB_NAME);
	const response = await db
		.collection(COLLECTION_NAME)
		.find({ on_loan_from: { $ne: null } })
		.toArray();
	sendResponsePayload(response, res);
});

router.get('/loan/out', async (req, res) => {
	const client = await mongoClient;
	const db = client.db(process.env.DB_NAME);
	const response = await db
		.collection(COLLECTION_NAME)
		.find({ on_loan_to: { $ne: null } })
		.toArray();
	sendResponsePayload(response, res);
});

export default router;
