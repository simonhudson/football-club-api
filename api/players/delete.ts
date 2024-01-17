import { COLLECTION_NAME } from './constants';
import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { sendResponsePayload } from '../../helpers/api';
import type { Player } from '../../types/player';
import { Db } from 'mongodb';

export const del = async (db: Db, req: Request, res: Response) => {
	const requestBody = req.body as Player;
	const query = { _id: new ObjectId(requestBody._id) };
	const response = await db.collection(COLLECTION_NAME).deleteOne(query);
	sendResponsePayload(response, res);
};
