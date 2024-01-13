import * as dayjs from 'dayjs';
import { WithId } from 'mongodb';

export const mutatePerson = (data: WithId<any>[]): WithId<any>[] => {
	data.forEach((person) => {
		if (person.date_of_birth) person.age = dayjs().diff(dayjs(person.date_of_birth), 'year');
	});
	return data;
};
