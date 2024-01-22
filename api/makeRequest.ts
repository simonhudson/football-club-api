import { Request, Response } from 'express';
import mongoClient from './mongoClient';
import { MongoClient } from 'mongodb';

import { get } from './get';
import { post } from './post';
import { patch } from './patch';
import { del } from './delete';

interface MakeRequestParams {
	req: Request;
	res: Response;
	collectionName: string;
	query?: {};
	sortBy?: string;
	sortDirection?: 'asc' | 'desc';
}

export const makeRequest = async ({ req, res, collectionName, query, sortBy, sortDirection }: MakeRequestParams) => {
	const METHOD = req.method?.toLowerCase();
	const client: MongoClient = mongoClient;
	const db = client.db(process.env.DB_NAME);

	switch (METHOD) {
		case 'get':
			await get({ res, db, collectionName, query, sortBy, sortDirection });
			break;
		case 'post':
			await post({ req, res, collectionName, db });
			break;
		case 'patch':
			await patch({ req, res, db, collectionName });
			break;
		case 'delete':
			await del({ req, res, db, collectionName });
			break;
	}
};
