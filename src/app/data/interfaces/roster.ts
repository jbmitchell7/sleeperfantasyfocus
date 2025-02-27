export interface Roster {
    taxi: string[];
    starters: string[];
    settings: Settings;
    roster_id: number;
    reserve: string[];
    players: string[];
    player_map: string;
    owner_id: string;
    league_id: string;
    metadata: Metadata;
}

export interface Settings {
    wins: number;
    waiver_position: number;
    waiver_budget_used: number;
    total_moves: number;
    ties: number;
    ppts_decimal: number;
    ppts: number;
    losses: number;
    fpts_decimal: number;
    fpts_against_decimal: number;
    fpts_against: number;
    fpts: number;
}

export interface Metadata {
    streak: string;
    record: string;
}

export interface Player {
  injury_status: string;
  team: string;
  first_name: string;
  last_name: string;
  full_name: string;
  fantasy_positions: string[];
  player_id: string;
  sport: string;
  position: string;
  active: boolean;
}
