import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SleeperApiService } from '../api/sleeper-api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { Roster } from '../data/interfaces/roster';
import { getLeagueSuccess, getLeagueFailure } from './league/league.actions';
import {
  getRostersSuccess,
  getRostersFailure
} from './rosters/rosters.actions';
import { getSportStateFailure, getSportStateSuccess, leagueEntryRequest } from './global.actions';
import { getManagersSuccess } from './managers/managers.actions';
import { LeagueUser } from '../data/interfaces/leagueuser';
import { League } from '../data/interfaces/league';
import { FantasyFocusApiService } from '../api/fantasy-focus-api.service';
import { SportState } from '../data/interfaces/sportstate';
import { Router } from '@angular/router';
import { getTransactionsFailure, getTransactionsRequest, getTransactionsSuccess } from './transactions/transactions.actions';
import { getPlayersRequest, getPlayersSuccess, getPlayersFailure } from './players/players.actions';

@Injectable()
export class GlobalEffects {
  readonly #actions$ = inject(Actions);
  readonly #sleeperApi = inject(SleeperApiService);
  readonly #router = inject(Router);
  readonly #fantasyFocusApi = inject(FantasyFocusApiService);

  getLeague$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(leagueEntryRequest),
      switchMap((props) =>
        this.#sleeperApi.getLeague(props.leagueId).pipe(
          map((res: League) => getLeagueSuccess({ league: res })),
          catchError(() => {
            this.#router.navigateByUrl('/welcome');
            return of(getLeagueFailure({ error: 'error getting league data' }))
          })
        )
      )
    )
  );

  getSportState$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(getLeagueSuccess),
      switchMap(props =>
        this.#sleeperApi.getSportState(props.league.sport).pipe(
          map((sport: SportState) => {
            localStorage.setItem('LEAGUE_ID', props.league.league_id);
            return getSportStateSuccess({sport});
          }),
          catchError((error) => {
            this.#router.navigateByUrl('/welcome');
            return of(getSportStateFailure({error}));
          })
        )
      )
    )
  );

  getRosters$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(getLeagueSuccess),
      switchMap((props) =>
        this.#sleeperApi
          .getRosters(props.league.league_id)
          .pipe(
            map((res: Roster[]) => getRostersSuccess({ rosters: res, sport: props.league.sport})),
            catchError(() =>
              of(getRostersFailure({ error: 'error getting roster data' }))
            )
          )
      )
    )
  );

  getManagers$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(leagueEntryRequest),
      switchMap((props) =>
        this.#sleeperApi
          .getManagers(props.leagueId)
          .pipe(
            map((res: LeagueUser[]) => getManagersSuccess({ players: res })),
            catchError(() =>
              of(getRostersFailure({ error: 'error getting roster data' }))
            )
          )
      )
    )
  );

  getPlayers$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(getRostersSuccess),
      map(props => {
        const ids = props.rosters.map(r => r.players).flat();
        return getPlayersRequest({sport: props.sport, ids});
      })
    )
  );

  getPlayersData$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(getPlayersRequest),
      switchMap((props) =>
        this.#fantasyFocusApi.fantasyFocusGet(`players/${props.sport}`, props.ids)
          .pipe(
            map((res: any) => getPlayersSuccess({ players: res })),
            catchError(() =>
              of(getPlayersFailure({ error: 'error getting roster data' }))
            )
          )
      )
    )
  );

  getTransactions$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(getTransactionsRequest),
      switchMap(({leagueId, week}) =>
        this.#sleeperApi.getTransactions(leagueId, week)
          .pipe(
            map(transactions => getTransactionsSuccess({week, transactions})),
            catchError(() =>
              of(getTransactionsFailure({error: 'error getting transactions'}))
            )
          )
      )
    )
  );
}
