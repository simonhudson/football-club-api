import { httpStatusCodes } from '../../constants/httpStatusCodes';
import { Response } from 'express';
import { WithId } from 'mongodb';

export const sendResponsePayload = (response: WithId<any>[], res: Response) => {
	interface ResponsePayload {
		status: number;
		metadata: { count: number };
		data: WithId<any>[];
	}

	const responsePayload: ResponsePayload = {
		status: httpStatusCodes.OK,
		metadata: { count: response.length },
		data: response,
	};
	// res.setHeader('Content-Type', 'application/json');
	// res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
	res.json(responsePayload);
};
