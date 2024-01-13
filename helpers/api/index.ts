import { Response } from 'express';
import { httpStatusCodes } from '../../constants/httpStatusCodes';
import type { WithId } from 'mongodb';

interface ResponsePayload {
	status: number;
	metadata: { count: number };
	data: WithId<any>[];
}

export const sendResponsePayload = (response: WithId<any>[], res: Response) => {
	const responsePayload: ResponsePayload = {
		status: httpStatusCodes.OK,
		metadata: { count: response.length },
		data: response,
	};
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
	return res.json(responsePayload);
};
