const express = require('express');
const router = express.Router();
const mongoClient = require('../../mongoClient');
const { sendResponsePayload } = require('../../helpers/api');
const { mutatePerson } = require('../../mutate/person');

const COLLECTION_NAME = 'players';

const makeRequest = async (res, query = {}) => {
	const client = mongoClient;
	const db = client.db(process.env.DB_NAME);
	const response = await db.collection(COLLECTION_NAME).find(query).sort({ last_name: 1 }).toArray();
	const mutated = mutatePerson(response);
	sendResponsePayload(mutated, res);
};

router.get('/', async (_req, res) => makeRequest(res));
router.get('/captain', async (_req, res) => makeRequest(res, { is_captain: true }));
router.get('/vicecaptain', async (_req, res) => makeRequest(res, { is_vice_captain: true }));
router.get('/loan', async (_req, res) =>
	makeRequest(res, { $or: [{ on_loan_from: { $ne: null } }, { on_loan_to: { $ne: null } }] })
);
router.get('/loan/in', async (_req, res) => makeRequest(res, { on_loan_from: { $ne: null } }));
router.get('/loan/out', async (_req, res) => makeRequest(res, { on_loan_to: { $ne: null } }));
router.get('/:slug', async (req, res) => makeRequest(res, { slug: req.params.slug })); // Keep this :slug route last to allow for other routes to be hit

module.exports = router;
