import { createAction, props } from '@ngrx/store';
import { Roster } from '../../data/interfaces/roster';

export const getRostersSuccess = createAction(
  '[Rosters] getRostersSuccess',
  props<{ rosters: Roster[], sport: string }>()
);

export const getRostersFailure = createAction(
  '[Rosters] getRostersFailure',
  props<{ error: string }>()
);

export const clearRosterData = createAction('[Roster] clearRosterData');
