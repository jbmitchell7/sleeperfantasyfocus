import { SportState } from "./sportstate";

export interface League {
    status: string;
    previous_league_id: string;
    league_id: string;
    name: string;
    season: string;
    total_rosters?: number;
    sport: string;
    settings?: LeagueSettings
    season_type?: string;
    scoring_settings?: Scoring;
    roster_positions?: string[];
    metadata?: LeagueMetadata;
    loser_bracket_id?: number;
    draft_id?: string;
    avatar?: null;
    sportState: SportState;
}

export interface LeagueSettings {
    max_keepers: number;
    draft_rounds: number;
    taxi_years: number;
    waiver_clear_days: number;
    waiver_day_of_week: number;
    start_week: number;
    playoff_teams: number;
    reserve_slots: number;
    daily_waivers_hour: number;
    waiver_budget: number;
    offseason_adds: number;
    playoff_week_start: number;
    trade_deadline: number;
    taxi_slots: number;
}

export interface Scoring {
    pass_2pt: number;
    pass_int: number;
    fgmiss: number;
    rec_yd: number;
    xpmiss: number;
    fgm_30_39: number;
    blk_kick: number;
    pts_allow_7_13: number;
    ff: number;
    fgm_20_29: number;
    fgm_40_49: number;
    pts_allow_1_6: number;
    st_fum_rec: number;
    def_st_ff: number;
    st_ff: number;
    bonus_rec_te: number;
    pts_allow_28_34: number;
    fgm_50p: number;
    fum_rec: number;
    def_td: number;
    fgm_0_19: number;
    int: number;
    pts_allow_0: number;
    pts_allow_21_27: number;
    rec_2pt: number;
    rec: number;
    xpm: number;
    st_td: number;
    def_st_fum_rec: number;
    def_st_td: number;
    sack: number;
    fum_rec_td: number;
    rush_2pt: number;
    rec_td: number;
    pts_allow_35p: number;
    pts_allow_14_20: number;
    rush_yd: number;
    pass_yd: number;
    pass_td: number;
    rush_td: number;
    fum_lost: number;
    fum: number;
    safe: number;
}

export interface LeagueMetadata {
    latest_league_winner_roster_id: string;
    keeper_deadline: string;
}