import { ObjectId } from 'mongodb';
import { sendResponsePayload } from '../helpers/api';
import type { Player } from '../types/player';
import type { RequestMethodParams } from '../types/api';

export const del = async ({ req, res, db, collectionName }: RequestMethodParams) => {
	const requestBody = req?.body as Player;
	const query = { _id: new ObjectId(requestBody._id) };
	const response = await db.collection(collectionName).deleteOne(query);
	sendResponsePayload(response, res);
};
