import { COLLECTION_NAME } from './constants';
import { mutatePerson } from '../../mutate/person';
import { Response } from 'express';
import { sendResponsePayload } from '../../helpers/api';
import mongoClient from '../../mongoClient';

export const get = async (res: Response, query = {}) => {
	const client = mongoClient;
	const db = client.db(process.env.DB_NAME);
	const response = await db.collection(COLLECTION_NAME).find(query).sort({ last_name: 1 }).toArray();
	const mutated = mutatePerson(response);
	sendResponsePayload(mutated, res);
};
