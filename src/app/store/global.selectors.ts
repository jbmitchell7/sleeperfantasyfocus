import { StandingsData } from '../data/interfaces/standingsData';
import { LeagueState } from './league/league.reducer';
import { ManagerState } from './managers/managers.reducers';
import { RosterState } from './rosters/rosters.reducers';
import { TransactionsState } from './transactions/transactions.reducer';
import { PlayersState } from './players/players.reducer';
import { RosterMove, Transaction } from '../data/interfaces/Transactions';
import { LeagueUser } from '../data/interfaces/leagueuser';
import { Player } from '../data/interfaces/roster';

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

const getSeverity = (streak: string): 'success' | 'info' | 'warning' | 'danger' => {
  const type = streak.slice(-1);
  const streakNumber = +streak.slice(0, -1);
  if (type.toLowerCase() === 'l') {
    return streakNumber > 2 ? 'info' : 'warning';
  }
  return streakNumber > 2 ? 'danger' : 'success';
};

const getStreakIcon = (streak: string): string => {
  const type = streak.slice(-1);
  const streakNumber = +streak.slice(0, -1);
  if (type.toLowerCase() === 'l') {
    return streakNumber > 2 ? 'fa-regular fa-snowflake' : 'fa-regular fa-face-frown';
  }
  return streakNumber > 2 ? 'fa-solid fa-fire' : 'fa-regular fa-face-smile';
};

export const selectCurrentWeekTransactions = (state: AppState): Transaction[] => {
  const currentWeek = state.leagueData.league.sportState?.week;
  const weeklyTransactions = state.transactionsData.transactions[currentWeek];
  return weeklyTransactions?.length ? weeklyTransactions?.map(t => ({
    ...t,
    rosterMoves: getRosterMoves(t, state)
  })) : []
}

const getRosterMoves = (t: Transaction, state: AppState) => {
  const moves = [] as RosterMove[];
  t.roster_ids.forEach(id => moves.push(
    getMoveData(state.playerData, t, id, getManager(state, id))
  ));
  return moves;
};

const getMoveData = (state: PlayersState, transaction: Transaction, id: number, manager: LeagueUser| undefined): RosterMove  => {
  let result = {
    adds: [] as Partial<Player>[],
    drops: [] as Partial<Player>[],
    manager,
    type: transaction.type,
    waiverBid: transaction.settings?.waiver_bid
  };
  if (transaction.adds !== null) {
    Object.keys(transaction.adds).forEach((key) => {
      if (transaction.adds?.[+key] === id) {
        result.adds.push(state.entities[key] ?? {player_id: key} as Partial<Player>);
      }
    })
  }
  if (transaction.drops !== null) {
    Object.keys(transaction.drops).forEach((key) => {
      if (transaction.drops?.[+key] === id) {
        result.drops.push(state.entities[key] ?? {player_id: key});
      }
    })
  }
  return result;
};

const getManager = (state: AppState, rosterId: number): LeagueUser | undefined => {
  const managerId = Object
    .keys(state.rosterData.entities)
    .find(key => state.rosterData.entities[key]?.roster_id === rosterId);
  return managerId ? state.managersData.entities[managerId]: undefined;
};
