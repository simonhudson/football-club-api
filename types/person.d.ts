import { ObjectId } from 'mongodb';
export interface PersonBase {
	_id?: ObjectId;
	date_of_birth?: string;
	first_name?: string;
	last_name?: string;
	nationality?: string;
	slug?: string;
}

export interface Person extends PersonBase {
	age?: number;
}
