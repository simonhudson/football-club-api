import express from 'express';
const router = express.Router();
import mongoClient from '../../mongoClient';
import { sendResponsePayload } from '../../helpers/api';

const COLLECTION_NAME = 'players';

const makeRequest = async (req, res, query = {}) => {
	const client = await mongoClient;
	const db = client.db(process.env.DB_NAME);
	const response = await db.collection(COLLECTION_NAME).find(query).sort({ last_name: 1 }).toArray();
	sendResponsePayload(response, res);
};

router.get('/', async (req, res) => makeRequest(req, res));
router.get('/captain', async (req, res) => makeRequest(req, res, { is_captain: true }));
router.get('/vicecaptain', async (req, res) => makeRequest(req, res, { is_vice_captain: true }));
router.get('/loan', async (req, res) =>
	makeRequest(req, res, { $or: [{ on_loan_from: { $ne: null } }, { on_loan_to: { $ne: null } }] })
);
router.get('/loan/in', async (req, res) => makeRequest(req, res, { on_loan_from: { $ne: null } }));
router.get('/loan/out', async (req, res) => makeRequest(req, res, { on_loan_to: { $ne: null } }));

export default router;
