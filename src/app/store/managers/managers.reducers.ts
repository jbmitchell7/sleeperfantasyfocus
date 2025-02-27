import { LeagueUser } from '../../data/interfaces/leagueuser';
import { DataInterface, initialDataInterfaceState } from '../global.selectors';
import { createReducer, on } from '@ngrx/store';
import {
  clearManagersData,
  getManagersFailure,
  getManagersSuccess,
} from './managers.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ManagerState extends DataInterface, EntityState<LeagueUser> {}

export const managerAdapter: EntityAdapter<LeagueUser> = createEntityAdapter<LeagueUser>();

export const initialRosterState: ManagerState = managerAdapter.getInitialState({
  ...initialDataInterfaceState
})

export const managersReducer = createReducer(
  initialRosterState,
  on(getManagersSuccess, (state, action) => {
    const avatarUrl = 'https://sleepercdn.com/avatars/thumbs';
    const defaultAvatar ='4f4090e5e9c3941414db40a871e3e909';
    const managersWithAvatars = action.players.map(p => ({
      ...p,
      avatarUrl: `${avatarUrl}/${p.avatar ?? defaultAvatar}`,
      id: p.user_id
    }));
    const managersState = managerAdapter.addMany(managersWithAvatars, state);
    return {
      ...managersState,
      isLoading: false,
      isLoaded: true,
      errorMessage: '',
    }
  }),
  on(getManagersFailure, (state, result) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    errorMessage: result.error,
  })),
  on(clearManagersData, () => ({
    ...initialRosterState,
  }))
);
