import express, { Request, Response } from 'express';
const router = express.Router();

import { get } from './get';
import { post } from './post';
import { put } from './put';

const makeRequest = async (req: Request, res: Response, query = {}) => {
	const METHOD = req.method?.toLowerCase();

	switch (METHOD) {
		case 'get':
			await get(res, query);
			break;
		case 'post':
			await post(req, res);
			break;
		case 'put':
			await put(req, res);
			break;
		// case 'delete':
		// 	await doDelete();
		// 	break;
	}
};

router.get('/', async (req: Request, res: Response) => makeRequest(req, res));
router.post('/', async (req: Request, res: Response) => makeRequest(req, res));

router.get('/captain', async (req: Request, res: Response) => makeRequest(req, res, { is_captain: true }));
router.get('/vicecaptain', async (req: Request, res: Response) => makeRequest(req, res, { is_vice_captain: true }));
router.get('/loan', async (req: Request, res: Response) =>
	makeRequest(req, res, { $or: [{ on_loan_from: { $ne: null } }, { on_loan_to: { $ne: null } }] })
);
router.get('/loan/in', async (req: Request, res: Response) => makeRequest(req, res, { on_loan_from: { $ne: null } }));
router.get('/loan/out', async (req: Request, res: Response) => makeRequest(req, res, { on_loan_to: { $ne: null } }));
router.get('/:slug', async (req: Request, res: Response) => makeRequest(req, res, { slug: req.params.slug })); // Keep this :slug route last to allow for other routes to be hit

export default router;

/*
import mongoClient from '@/db/mongoClient';
import type { NextApiRequest, NextApiResponse } from 'next';
import { sendResponsePayload } from '@/helpers/api';
import { ObjectId } from 'mongodb';
const COLLECTION_NAME = 'items';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = mongoClient;
	const db = client.db(process.env.DB_NAME);

	const doGet = async () => {
		const response = await db
			.collection(COLLECTION_NAME)
			.aggregate([
				{
					$lookup: {
						from: 'categories', // Collection we want to query
						localField: 'categories', // Local field we want to match against
						foreignField: 'category_id', // Foreign field we want to query
						as: 'categoryValues', // Key name we want to create (if this already exists, it will be over-written)
					},
				},

				// Now that we have our new 'categoryValues' key (which is an array of objects pulled from the collection)
				//	we use $addFields with $map to strip this down to a simple array of strings
				{
					$addFields: {
						categoryValues: {
							$map: {
								input: '$categoryValues',
								in: '$$this.value',
							},
						},
					},
				},
			])
			.toArray();
		sendResponsePayload(response, res);
	};

	const doPost = async () => {
		const body = JSON.parse(req.body);
		const response = await db.collection(COLLECTION_NAME).insertOne(body);
		sendResponsePayload(response, res);
	};

	const doPut = async () => {
		const body = JSON.parse(req.body);
		const query = { _id: new ObjectId(body._id) };
		const newValues = {
			$set: {
				name: body.name,
				is_complete: body.is_complete,
				categories: body.categories,
			},
		};
		const response = await db.collection(COLLECTION_NAME).updateOne(query, newValues);
		sendResponsePayload(response, res);
	};

	const doDelete = async () => {
		const body = JSON.parse(req.body);
		const query = { _id: new ObjectId(body._id) };
		const response = await db.collection(COLLECTION_NAME).deleteOne(query);
		sendResponsePayload(response, res);
	};

	const METHOD = req.method?.toLowerCase();
	switch (METHOD) {
		case 'get':
			await doGet();
			break;
		case 'post':
			await doPost();
			break;
		case 'put':
			await doPut();
			break;
		case 'delete':
			await doDelete();
			break;
	}
};

export default handler;
*/
