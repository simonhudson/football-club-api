import type { Goal } from './goal';

export interface Fixture {
	_id: string;
	date: string;
	kick_off_time: string;
	venue: string;
	competition: string;
	referee: string;
	attendance: {
		home: number;
		away: number;
	};
	teams: {
		home: string;
		away: string;
	};
	goals: {
		home: Goal[];
		away: Goal[];
	};
}
