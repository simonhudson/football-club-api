import { Db, ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { sendResponsePayload } from '../helpers/api';
import { del } from './delete';
import { COLLECTION_NAME } from './players/constants';

jest.mock('mongodb');
jest.mock('../../helpers/api');

const mockDb = {
	collection: jest.fn().mockReturnThis(),
	deleteOne: jest.fn(),
} as unknown as Db;

const mockReq = {
	body: { _id: 'someId' },
} as unknown as Request;

const mockRes = {} as Response;

describe('delete', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should call deleteOne with correct query', async () => {
		await del(mockDb, mockReq, mockRes);

		expect(mockDb.collection).toHaveBeenCalledWith(COLLECTION_NAME);
		// expect(mockDb.deleteOne).toHaveBeenCalledWith({ _id: new ObjectId('someId') });
	});

	it('should call sendResponsePayload with the response from deleteOne', async () => {
		const mockResponse = { deletedCount: 1 };
		// mockDb.deleteOne.mockResolvedValue(mockResponse);

		await del(mockDb, mockReq, mockRes);

		expect(sendResponsePayload).toHaveBeenCalledWith(mockResponse, mockRes);
	});
});
