import { COLLECTION_NAME } from './constants';
import { Response } from 'express';
import { sendResponsePayload } from '../../helpers/api';
import { Db } from 'mongodb';

export const get = async (db: Db, res: Response, query = {}) => {
	const response = await db.collection(COLLECTION_NAME).find(query).sort({ last_name: 1 }).toArray();
	sendResponsePayload(response, res);
};
