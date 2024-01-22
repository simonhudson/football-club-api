import { Request, Response } from 'express';
import { Db } from 'mongodb';

export interface ApiResponseBase {
	status: number;
	metadata: {
		count: number;
	};
	data: any[];
}

export interface RequestMethodParams {
	req?: Request;
	res: Response;
	db: Db;
	collectionName: string;
}
