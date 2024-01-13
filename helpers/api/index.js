"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponsePayload = void 0;
var httpStatusCodes_1 = require("../../constants/httpStatusCodes");
var sendResponsePayload = function (response, res) {
    var responsePayload = {
        status: httpStatusCodes_1.httpStatusCodes.OK,
        metadata: { count: response.length },
        data: response,
    };
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    return res.send(responsePayload);
};
exports.sendResponsePayload = sendResponsePayload;
