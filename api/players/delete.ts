import { COLLECTION_NAME } from './constants';
import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { sendResponsePayload } from '../../helpers/api';
import mongoClient from '../../mongoClient';
import type { Player } from '../../types/player';

export const del = async (req: Request, res: Response) => {
	const requestBody = req.body as Player;
	const query = { _id: new ObjectId(requestBody._id) };
	const client = mongoClient;
	const db = client.db(process.env.DB_NAME);
	const response = await db.collection(COLLECTION_NAME).deleteOne(query);
	sendResponsePayload(response, res);
};
