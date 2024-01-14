import express, { Request, Response } from 'express';
const router = express.Router();
import mongoClient from '../../mongoClient';
import { sendResponsePayload } from '../../helpers/api';
import { mutatePerson } from '../../mutate/person';

const COLLECTION_NAME = 'players';

const makeRequest = async (res: Response, query = {}) => {
	const client = mongoClient;
	const db = client.db(process.env.DB_NAME);
	const response = await db.collection(COLLECTION_NAME).find(query).sort({ last_name: 1 }).toArray();
	const mutated = mutatePerson(response);
	sendResponsePayload(mutated, res);
};

router.get('/', async (_req: Request, res: Response) => makeRequest(res));
router.get('/captain', async (_req: Request, res: Response) => makeRequest(res, { is_captain: true }));
router.get('/vicecaptain', async (_req: Request, res: Response) => makeRequest(res, { is_vice_captain: true }));
router.get('/loan', async (_req: Request, res: Response) =>
	makeRequest(res, { $or: [{ on_loan_from: { $ne: null } }, { on_loan_to: { $ne: null } }] })
);
router.get('/loan/in', async (_req: Request, res: Response) => makeRequest(res, { on_loan_from: { $ne: null } }));
router.get('/loan/out', async (_req: Request, res: Response) => makeRequest(res, { on_loan_to: { $ne: null } }));
router.get('/:slug', async (req: Request, res: Response) => makeRequest(res, { slug: req.params.slug })); // Keep this :slug route last to allow for other routes to be hit

export default router;
