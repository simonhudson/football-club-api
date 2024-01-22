import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { sendResponsePayload } from '../helpers/api';
import type { Player } from '../types/player';
import { Db } from 'mongodb';

interface DeleteParams {
	req: Request;
	res: Response;
	db: Db;
	collectionName: string;
}

export const del = async ({ req, res, db, collectionName }: DeleteParams) => {
	const requestBody = req.body as Player;
	const query = { _id: new ObjectId(requestBody._id) };
	const response = await db.collection(collectionName).deleteOne(query);
	sendResponsePayload(response, res);
};
