import { StandingsData } from '../data/interfaces/standingsData';
import { LeagueState } from './league/league.reducer';
import { ManagerState } from './managers/managers.reducers';
import { RosterState } from './rosters/rosters.reducers';
import { TransactionsState } from './transactions/transactions.reducer';
import { PlayersState } from './players/players.reducer';
import { Transaction } from '../data/interfaces/Transactions';
import { getCurrentTransactionsWeek, getRosterMoves } from '../utils/transactions';
import { getSeverity, getStreakIcon } from '../utils/standings';

export interface DataInterface {
  isLoading: boolean;
  isLoaded: boolean;
  errorMessage: string;
}

export const initialDataInterfaceState: DataInterface = {
  isLoading: false,
  isLoaded: false,
  errorMessage: '',
};

export interface AppState {
  playerData: PlayersState;
  leagueData: LeagueState;
  rosterData: RosterState;
  managersData: ManagerState;
  transactionsData: TransactionsState;
}

export const selectApp = (state: AppState) => state;

export const selectLeague = (state: AppState) => state.leagueData.league;

export const selectRosters = (state: AppState) => state.rosterData;

export const selectTransactions = (state: AppState) => state.transactionsData.transactions;

export const selectAllPlayers = (state: AppState) => state.playerData;

export const selectStandingsData = (state: AppState) => {
  const data: StandingsData[] = [];
  Object.keys(state.rosterData.entities).forEach(key => {
    const manager = state.managersData.entities[key];
    const roster = state.rosterData.entities[key];
    if (!!manager && !!roster)  {
      const streak = roster.metadata?.streak;
      data.push({
        owner_id: roster.owner_id,
        playerIds: roster.players,
        username: manager.display_name,
        points: roster.settings.fpts,
        maxPoints: roster.settings.ppts,
        pointsAgainst: roster.settings.fpts_against,
        wins: roster.settings.wins,
        losses: roster.settings.losses,
        streak: streak,
        avatarUrl: manager.avatarUrl ?? '',
        streakColor: streak ? getSeverity(streak) : undefined,
        streakIcon: streak ? getStreakIcon(streak) : undefined
      }); 
    }
  });
  return data;
};

export const selectCurrentWeekTransactions = (state: AppState): Transaction[] => {
  const currentWeek = getCurrentTransactionsWeek(state.leagueData.league);
  const weeklyTransactions = state.transactionsData.transactions[currentWeek];
  if (!weeklyTransactions?.length) {
    return [];
  }
  return weeklyTransactions.map(t => ({
    ...t,
    rosterMoves: getRosterMoves(t, state)
  }));
};
