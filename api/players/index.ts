import express, { Request, Response } from 'express';
const router = express.Router();

import { get } from './get';
import { post } from './post';
import { patch } from './patch';
import { del } from './delete';

const makeRequest = async (req: Request, res: Response, query = {}) => {
	const METHOD = req.method?.toLowerCase();

	switch (METHOD) {
		case 'get':
			await get(res, query);
			break;
		case 'post':
			await post(req, res);
			break;
		case 'patch':
			await patch(req, res);
			break;
		case 'delete':
			await del(req, res);
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
