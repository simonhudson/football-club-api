import { COLLECTION_NAME } from './constants';
import { handleError } from '../../helpers/handleError';
import { OptionalId } from 'mongodb';
import { Request, Response } from 'express';
import { sanitizeString } from '../../helpers/sanitizeString';
import { sendResponsePayload } from '../../helpers/api';
import { slugify } from '../../helpers/slugify';
import dayjs from 'dayjs';
import type { Player } from '../../types/player';
import { Db } from 'mongodb';

export const post = async (db: Db, req: Request, res: Response) => {
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

	const existingName = await db
		.collection(COLLECTION_NAME)
		.find({
			slug: payload.slug,
			first_name: payload.first_name,
			last_name: payload.last_name,
			squad_number: payload.squad_number,
		})
		.toArray();

	const existingSquadNumber = await db
		.collection(COLLECTION_NAME)
		.find({
			squad_number: payload.squad_number,
		})
		.toArray();

	const existingCaptain = await db
		.collection(COLLECTION_NAME)
		.find({
			is_captain: true,
		})
		.toArray();

	const existingViceCaptain = await db
		.collection(COLLECTION_NAME)
		.find({
			is_vice_captain: true,
		})
		.toArray();

	if (
		!!existingName.length ||
		!!existingSquadNumber.length ||
		!!existingCaptain.length ||
		!!existingViceCaptain.length
	) {
		interface ErrorDetails {
			message: string;
			info?: any;
		}

		const getErrorDetails = () => {
			if (existingName.length) {
				return {
					message: `Player '${payload.first_name} ${payload.last_name}' with squad number ${payload.squad_number} already exists`,
					info: existingName,
				};
			}
			if (existingSquadNumber.length) {
				return {
					message: `Squad number ${payload.squad_number} already in use`,
					info: existingSquadNumber,
				};
			}
			if (payload.is_captain && existingCaptain.length) {
				return {
					message: `Captain already exists`,
					info: existingCaptain,
				};
			}
			if (payload.is_vice_captain && existingViceCaptain.length) {
				return {
					message: `Vice captain already exists`,
					info: existingViceCaptain,
				};
			}
			return {
				message: 'Unknown error',
			};
		};

		const errorDetails: ErrorDetails = getErrorDetails();

		return handleError.badRequest(res, {
			collection: COLLECTION_NAME,
			method: 'POST',
			message: errorDetails.message,
			info: errorDetails.info,
		});
	}

	const response = await db.collection(COLLECTION_NAME).insertOne(payload as OptionalId<Document>);
	sendResponsePayload(response, res);
};
