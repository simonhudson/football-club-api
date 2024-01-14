const dayjs = require('dayjs');

const mutatePerson = (data) => {
	data.forEach((person) => {
		if (person.date_of_birth) person.age = dayjs().diff(dayjs(person.date_of_birth), 'year');
	});
	return data;
};

module.exports = { mutatePerson };
