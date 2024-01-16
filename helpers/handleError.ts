import { httpStatusCodes } from '../constants/httpStatusCodes';
import { Response } from 'express';

interface ErrorObject {
	collection: string;
	method: 'GET' | 'POST';
	message: string;
	info?: any;
}

const badRequest = (res: Response, errorObj: ErrorObject) => {
	return res.status(httpStatusCodes.BAD_REQUEST).json({ status: httpStatusCodes.BAD_REQUEST, ...errorObj });
};

export const handleError = {
	badRequest,
};
