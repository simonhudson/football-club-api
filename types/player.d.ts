import type { Person } from '@/types/person.d';

export interface Player extends Person {
	is_captain: boolean;
	is_vice_captain: boolean;
	on_loan_from?: string;
	on_loan_to?: string;
	position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
	squad_number: number;
}
