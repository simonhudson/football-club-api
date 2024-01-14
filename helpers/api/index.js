const { httpStatusCodes } = require('../../constants/httpStatusCodes');

const sendResponsePayload = (response, res) => {
	const responsePayload = {
		status: httpStatusCodes.OK,
		metadata: { count: response.length },
		data: response,
	};
	// res.setHeader('Content-Type', 'application/json');
	// res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
	return res.send(responsePayload);
};

module.exports = { sendResponsePayload };
