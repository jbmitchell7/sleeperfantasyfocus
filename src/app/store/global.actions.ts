import { createAction, props } from '@ngrx/store';
import { SportState } from '../data/interfaces/sportstate';

export const leagueEntryRequest = createAction(
  '[Login] leagueEntryRequest',
  props<{ leagueId: string }>()
);

export const getSportStateSuccess = createAction(
  '[Login] getSportStateSuccess',
  props<{sport: SportState}>()
)

export const getSportStateFailure = createAction(
  '[Login] getSportStateFailure',
  props<{error: any}>()
)
