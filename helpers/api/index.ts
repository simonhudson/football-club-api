import { httpStatusCodes } from '../../constants/httpStatusCodes';
import type { WithId } from 'mongodb';

export const sendResponsePayload = (response: WithId<any>[], res) => {
	const responsePayload = {
		status: httpStatusCodes.OK,
		metadata: { count: response.length },
		data: response,
	};
	return res.json(responsePayload);
};
