import express, { Request, Response } from 'express';
const router = express.Router();
import { makeRequest } from '../makeRequest';

const COLLECTION_NAME = 'staff';

router.get('/', async (req: Request, res: Response) =>
	makeRequest({ req, res, collectionName: COLLECTION_NAME, sortBy: 'last_name', sortDirection: 'asc' })
);
router.post('/', async (req: Request, res: Response) => makeRequest({ req, res, collectionName: COLLECTION_NAME }));
router.patch('/', async (req: Request, res: Response) => makeRequest({ req, res, collectionName: COLLECTION_NAME }));
router.delete('/', async (req: Request, res: Response) => makeRequest({ req, res, collectionName: COLLECTION_NAME }));

// Keep this :slug route last to allow for other routes to be hit
router.get('/:slug', async (req: Request, res: Response) =>
	makeRequest({
		req,
		res,
		collectionName: COLLECTION_NAME,
		query: { slug: req.params.slug },
	})
);

export default router;
