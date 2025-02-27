import { createAction, props } from "@ngrx/store";
import { Player } from "../../data/interfaces/roster";

export const getPlayersRequest = createAction(
  '[Players] getPlayersRequest',
  props<{sport: string; ids: string[] }>()
);

export const getPlayersSuccess = createAction(
  '[Players] getPlayersSuccess',
  props<{players: Player[] }>()
);

export const getPlayersFailure = createAction(
  '[Players] getPlayersFailure',
  props<{ error: string }>()
);
