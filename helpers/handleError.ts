import { httpStatusCodes } from '../constants/httpStatusCodes';
import { Response } from 'express';

interface ErrorObject {
	collection: string;
	method: 'GET' | 'POST';
	message: string;
	info?: any;
}

interface ErrorResponse extends ErrorObject {
	status: number;
}

const badRequest = (res: Response, errorObj: ErrorObject) => {
	const errorResponse: ErrorResponse = {
		status: httpStatusCodes.BAD_REQUEST,
		...errorObj,
	};
	return res.status(httpStatusCodes.BAD_REQUEST).json(errorResponse);
};

export const handleError = {
	badRequest,
};
