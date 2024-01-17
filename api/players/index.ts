import express, { Request, Response } from 'express';
const router = express.Router();
import mongoClient from '../mongoClient';
import { MongoClient } from 'mongodb';

import { get } from './get';
import { post } from './post';
import { patch } from './patch';
import { del } from './delete';

const makeRequest = async (req: Request, res: Response, query = {}) => {
	const METHOD = req.method?.toLowerCase();
	const client: MongoClient = mongoClient;
	const db = client.db(process.env.DB_NAME);

	switch (METHOD) {
		case 'get':
			await get(db, res, query);
			break;
		case 'post':
			await post(db, req, res);
			break;
		case 'patch':
			await patch(db, req, res);
			break;
		case 'delete':
			await del(db, req, res);
			break;
	}
};

router.get('/', async (req: Request, res: Response) => makeRequest(req, res));
router.post('/', async (req: Request, res: Response) => makeRequest(req, res));
router.patch('/', async (req: Request, res: Response) => makeRequest(req, res));
router.delete('/', async (req: Request, res: Response) => makeRequest(req, res));

router.get('/captain', async (req: Request, res: Response) => makeRequest(req, res, { is_captain: true }));
router.get('/vicecaptain', async (req: Request, res: Response) => makeRequest(req, res, { is_vice_captain: true }));
router.get('/loan', async (req: Request, res: Response) =>
	makeRequest(req, res, { $or: [{ on_loan_from: { $ne: null } }, { on_loan_to: { $ne: null } }] })
);
router.get('/loan/in', async (req: Request, res: Response) => makeRequest(req, res, { on_loan_from: { $ne: null } }));
router.get('/loan/out', async (req: Request, res: Response) => makeRequest(req, res, { on_loan_to: { $ne: null } }));
router.get('/:slug', async (req: Request, res: Response) => makeRequest(req, res, { slug: req.params.slug })); // Keep this :slug route last to allow for other routes to be hit

export default router;
