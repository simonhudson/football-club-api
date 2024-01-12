import express, { Request, Response } from 'express';
const router = express.Router();
import mongoClient from '../../mongoClient';
import { sendResponsePayload } from '../../helpers/api';

const COLLECTION_NAME = 'players';

const makeRequest = async (res: Response, query = {}) => {
	const client = await mongoClient;
	const db = client.db(process.env.DB_NAME);
	const response = await db.collection(COLLECTION_NAME).find(query).sort({ last_name: 1 }).toArray();
	sendResponsePayload(response, res);
};

router.get('/', async (_: Request, res: Response) => makeRequest(res));
router.get('/captain', async (_: Request, res: Response) => makeRequest(res, { is_captain: true }));
router.get('/vicecaptain', async (_: Request, res: Response) => makeRequest(res, { is_vice_captain: true }));
router.get('/loan', async (_: Request, res: Response) =>
	makeRequest(res, { $or: [{ on_loan_from: { $ne: null } }, { on_loan_to: { $ne: null } }] })
);
router.get('/loan/in', async (_: Request, res: Response) => makeRequest(res, { on_loan_from: { $ne: null } }));
router.get('/loan/out', async (_: Request, res: Response) => makeRequest(res, { on_loan_to: { $ne: null } }));

export default router;
