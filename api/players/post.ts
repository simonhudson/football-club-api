import { httpStatusCodes } from '../../constants/httpStatusCodes';
import { COLLECTION_NAME } from './constants';
import { Response } from 'express';
import { sanitizeString } from '../../helpers/sanitizeString';
import { sendResponsePayload } from '../../helpers/api';
import { slugify } from '../../helpers/slugify';
import mongoClient from '../../mongoClient';

export const post = async (req: Request, res: Response) => {
	if (!req.body) return res.status(httpStatusCodes.BAD_REQUEST).json({ message: 'No body found' });

	const payload = {
		first_name: req.body.first_name,
		is_captain: req.body.is_captain,
		is_vice_captain: req.body.is_vice_captain,
		last_name: req.body.last_name,
		nationality: req.body.nationality,
		on_loan_from: req.body.on_loan_from,
		on_loan_to: req.body.on_loan_to,
		position: req.body.position,
		slug: slugify(`${req.body.first_name} ${req.body.last_name}`),
		squad_number: req.body.squad_number,
	};

	for (let key in payload) {
		if (typeof payload[key] === 'string') payload[key] = sanitizeString(payload[key]);
	}

	const client = mongoClient;
	const db = client.db(process.env.DB_NAME);

	const existingRecords = await db.collection(COLLECTION_NAME).find(payload).toArray();

	if (existingRecords.length > 0)
		return res.status(httpStatusCodes.BAD_REQUEST).json({
			collection: COLLECTION_NAME,
			method: 'POST',
			message: `Existing record(s) found`,
			existingRecords,
		});

	const response = await db.collection(COLLECTION_NAME).insertOne(payload);
	sendResponsePayload(response, res);
};
