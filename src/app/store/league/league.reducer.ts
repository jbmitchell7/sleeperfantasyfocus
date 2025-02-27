import { createReducer, on } from '@ngrx/store';
import {
  clearLeagueData,
  getLeagueFailure,
  getLeagueSuccess,
} from './league.actions';
import { League } from '../../data/interfaces/league';
import { DataInterface, initialDataInterfaceState } from '../global.selectors';
import { getSportStateSuccess, leagueEntryRequest } from '../global.actions';

export interface LeagueState extends DataInterface {
  league: League;
}

export const initialLeagueState: LeagueState = {
  league: {} as League,
  ...initialDataInterfaceState,
};

export const leagueReducer = createReducer(
  initialLeagueState,
  on(leagueEntryRequest, (state) => ({
    ...state,
    isLoaded: false,
    isLoading: true
  })),
  on(getLeagueSuccess, (state, result) => ({
    ...state,
    league: result.league,
    errorMessage: '',
  })),
  on(getLeagueFailure, (state, result) => ({
    ...state,
    league: {} as League,
    errorMessage: result.error,
  })),
  on(clearLeagueData, () => ({
    ...initialLeagueState,
  })),
  on(getSportStateSuccess, (state, action) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    league: {
      ...state.league,
      sportState: action.sport
    }
  }))
);
