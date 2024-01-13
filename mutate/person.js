"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutatePerson = void 0;
var dayjs = require("dayjs");
var mutatePerson = function (data) {
    data.forEach(function (person) {
        if (person.date_of_birth)
            person.age = dayjs().diff(dayjs(person.date_of_birth), 'year');
    });
    return data;
};
exports.mutatePerson = mutatePerson;
