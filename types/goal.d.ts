import type { Player } from './player';

export interface Goal {
	scorer: Player;
	minute: number;
	assist?: string;
	ownGoal?: boolean;
	penalty?: boolean;
}
