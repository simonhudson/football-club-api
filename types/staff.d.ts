import type { Person } from '@/types/person.d';

export interface Staff extends Person {
	role: string;
}
