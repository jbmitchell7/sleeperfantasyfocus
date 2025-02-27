import { Component, inject, OnDestroy } from '@angular/core';
import { GraphComponent } from '../../../components/graph/graph.component';
import { Store } from '@ngrx/store';
import { combineLatest, distinctUntilChanged, filter, Observable, Subscription, switchMap, tap } from 'rxjs';
import { selectAllPlayers, selectApp, selectCurrentWeekTransactions, selectStandingsData } from '../../../store/global.selectors';
import { StandingsData } from '../../../data/interfaces/standingsData';
import { CommonModule } from '@angular/common';
import { SportState } from '../../../data/interfaces/sportstate';
import { PanelModule } from 'primeng/panel';
import { League } from '../../../data/interfaces/league';
import { Transaction } from '../../../data/interfaces/Transactions';
import { getTransactionsRequest } from '../../../store/transactions/transactions.actions';
import { WeeklyTransactionsComponent } from "../../../components/weekly-transactions/weekly-transactions.component";
import { RosterState } from '../../../store/rosters/rosters.reducers';
import { getPlayersRequest } from '../../../store/players/players.actions';
import { TITLE_TEXT } from '../../../data/constants/graph.constants';

@Component({
  selector: 'app-home',
  imports: [CommonModule, GraphComponent, PanelModule, WeeklyTransactionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnDestroy {
  readonly #store = inject(Store);
  #standingSub!: Subscription;
  #leagueSub!: Subscription;

  standingsData!: StandingsData[];
  sportState!: SportState;
  league!: League;
  rosters!: RosterState;
  weekTitle!: string;
  weekNumber!: number;
  transactions: Transaction[] = [];
  seasonComplete = false;
  transactionsLoading = true;
  graphHeader = TITLE_TEXT;

  constructor() {
    this.#standingSub = this.#store
      .select(selectStandingsData)
      .subscribe(sd => this.standingsData = sd);

    this.#initLeagueSub();
  }

  ngOnDestroy(): void {
    this.#standingSub.unsubscribe();
    this.#leagueSub.unsubscribe();
  }

  #initLeagueSub(): void {
    this.#leagueSub =  this.#store
      .select(selectApp)
      .pipe(
        filter(app => !!app.leagueData.league?.sportState?.season),
        tap(({ leagueData, rosterData }) => {
          this.rosters = rosterData;
          this.league = leagueData.league;
          this.sportState = this.league.sportState;
          this.seasonComplete = this.league.status === 'complete';
          this.weekNumber = this.seasonComplete ? 18 : this.league.sportState.week;
          this.weekTitle = `${this.league.sport.toUpperCase()} ${this.league.season} - Week ${this.weekNumber}`;
          if (this.seasonComplete) {
            this.transactionsLoading = false;
          }
        }),
        filter(() => !this.seasonComplete),
        tap(({ transactionsData }) => {
          if (!transactionsData.transactions[this.weekNumber]) {
            this.#store.dispatch(getTransactionsRequest({
              leagueId: this.league.league_id,
              week: this.weekNumber
            }));
          }
        }),
        switchMap(() => this.#subWeeklyTransactions())
      )
      .subscribe();
  }

  #subWeeklyTransactions(): Observable<any> {
    return combineLatest([this.#store.select(selectCurrentWeekTransactions), this.#store.select(selectAllPlayers)])
      .pipe(
        filter(([_, players]) => !!players.ids.length),
        //necessary to prevent infinite refreshing
        distinctUntilChanged(([_, p], [_b, pb]) => p.ids.length === pb.ids.length),
        tap(([transactions]) => {
          const missingPlayers: any[] = [];
          this.transactions = transactions;
          transactions.forEach(t => {
            t.rosterMoves?.forEach((m: any) => {
              m.adds?.forEach((a: any) => {
                if (!a.full_name) {
                  missingPlayers.push(a.player_id);
                }
              });
              m.drops?.forEach((a: any) => {
                if (!a.full_name) {
                  missingPlayers.push(a.player_id);
                }
              });
            });
          });
          if (missingPlayers.length) {
            this.#store.dispatch(getPlayersRequest({ sport: this.league.sport, ids: missingPlayers }));
          } else {
            this.transactionsLoading = false;
          }
        }),
      )
  }
}
