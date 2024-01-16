import type { Person } from './person.d';

export interface Player extends Person {
	[key: string]: any;
	is_captain?: boolean;
	is_vice_captain?: boolean;
	on_loan_from?: string;
	on_loan_to?: string;
	position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward' | undefined;
	squad_number?: number;
}
