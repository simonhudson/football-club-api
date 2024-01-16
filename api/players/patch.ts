import { COLLECTION_NAME } from './constants';
import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { sanitizeString } from '../../helpers/sanitizeString';
import { sendResponsePayload } from '../../helpers/api';
import { slugify } from '../../helpers/slugify';
import mongoClient from '../../mongoClient';
import type { Player } from '../../types/player';

export const patch = async (req: Request, res: Response) => {
	const requestBody = req.body as Player;
	const query = { _id: new ObjectId(requestBody._id) };

	const newValues: Player = {
		_id: new ObjectId(requestBody._id),
		first_name: requestBody.first_name,
		is_captain: requestBody.is_captain,
		is_vice_captain: requestBody.is_vice_captain,
		last_name: requestBody.last_name,
		nationality: requestBody.nationality,
		on_loan_from: requestBody.on_loan_from,
		on_loan_to: requestBody.on_loan_to,
		position: requestBody.position,
		slug: slugify(`${requestBody.first_name} ${requestBody.last_name}`),
		squad_number: requestBody.squad_number,
	};

	for (let key in newValues) {
		if (typeof newValues[key as keyof Player] === 'string')
			newValues[key as keyof Player] = sanitizeString(newValues[key as keyof Player]);
	}

	const payload = {
		$set: newValues,
	};
	const client = mongoClient;
	const db = client.db(process.env.DB_NAME);
	const response = await db.collection(COLLECTION_NAME).updateOne(query, payload);
	sendResponsePayload(response, res);
};
