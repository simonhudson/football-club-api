import { sendResponsePayload } from '../helpers/api';
import type { RequestMethodParams } from '../types/api';

interface GetParams extends RequestMethodParams {
	query?: {};
	sortBy?: string;
	sortDirection?: 'asc' | 'desc';
}

export const get = async ({ res, collectionName, db, query, sortBy, sortDirection }: GetParams) => {
	let queryObj = query || {};
	let sortQuery = {};
	if (sortBy) sortQuery = { [sortBy]: sortDirection === 'asc' ? 1 : -1 };

	const response = await db.collection(collectionName).find(queryObj).sort(sortQuery).toArray();
	sendResponsePayload(response, res);
};
