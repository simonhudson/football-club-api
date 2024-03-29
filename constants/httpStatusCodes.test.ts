import { httpStatusCodes } from './httpStatusCodes';
describe('httpStatusCodes', () => {
	it('should return expected values', () => {
		expect(httpStatusCodes).toEqual({
			BAD_REQUEST: 400,
			NOT_FOUND: 404,
			OK: 200,
			SERVER_ERROR: 500,
		});
	});
});
