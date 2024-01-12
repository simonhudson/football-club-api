export interface PersonApiResponse {
	_id: string;
	date_of_birth?: string;
	first_name: string;
	last_name: string;
	nationality?: string;
	slug: string;
}

export interface Person extends PersonApiResponse {
	age?: number;
}
