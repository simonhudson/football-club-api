import { httpStatusCodes } from '../../constants/httpStatusCodes';
import { Response } from 'express';
import { InsertOneResult, UpdateResult, WithId } from 'mongodb';

interface ResponsePayload {
	status: number;
	data: any;
	metadata?: { count: number };
}

export const sendResponsePayload = (
	response: WithId<any>[] | InsertOneResult<Document> | UpdateResult<Document>,
	res: Response
) => {
	const responsePayload: ResponsePayload = {
		status: httpStatusCodes.OK,
		data: response,
	};

	if (Array.isArray(response) && response.length > 0) responsePayload.metadata = { count: response.length };

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.json(responsePayload);
};
