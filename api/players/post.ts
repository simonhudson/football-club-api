import { COLLECTION_NAME } from './constants';
import { handleError } from '../../helpers/handleError';
import { OptionalId } from 'mongodb';
import { Response } from 'express';
import { sanitizeString } from '../../helpers/sanitizeString';
import { sendResponsePayload } from '../../helpers/api';
import { slugify } from '../../helpers/slugify';
import dayjs from 'dayjs';
import mongoClient from '../../mongoClient';
import type { Player } from '../../types/player';

export const post = async (req: Request, res: Response) => {
	const requestBody = req.body as Player;

	if (!Object.keys(requestBody).length)
		return handleError.badRequest(res, {
			collection: COLLECTION_NAME,
			method: 'POST',
			message: `No request body found`,
		});

	const payload: Player = {
		age: dayjs().diff(dayjs(requestBody.date_of_birth), 'year'),
		date_of_birth: requestBody.date_of_birth,
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

	for (let key in payload) {
		if (typeof payload[key as keyof Player] === 'string')
			payload[key as keyof Player] = sanitizeString(payload[key as keyof Player]);
	}

	const client = mongoClient;
	const db = client.db(process.env.DB_NAME);

	const existingRecords = await db
		.collection(COLLECTION_NAME)
		.find({
			slug: payload.slug,
			first_name: payload.first_name,
			last_name: payload.last_name,
			squad_number: payload.squad_number,
		})
		.toArray();

	if (existingRecords.length > 0)
		return handleError.badRequest(res, {
			collection: COLLECTION_NAME,
			method: 'POST',
			message: `Existing record(s) found`,
			info: existingRecords,
		});

	const response = await db.collection(COLLECTION_NAME).insertOne(payload as OptionalId<Document>);
	sendResponsePayload(response, res);
};
