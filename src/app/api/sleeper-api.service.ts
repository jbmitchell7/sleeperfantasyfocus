import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { League } from '../data/interfaces/league';
import { Roster } from '../data/interfaces/roster';
import { LeagueUser } from '../data/interfaces/leagueuser';
import { SportState } from '../data/interfaces/sportstate';

const apiUrl = 'https://api.sleeper.app/v1';

@Injectable({
  providedIn: 'root'
})
export class SleeperApiService {
  readonly #http = inject(HttpClient);

  getLeague(id: string): Observable<League> {
    return this.#http.get<League>(`${apiUrl}/league/${id}`);
  }

  getRosters(leagueId: string): Observable<Roster[]> {
    return this.#http.get<Roster[]>(`${apiUrl}/league/${leagueId}/rosters`);
  }

  getManagers(leagueId: string): Observable<LeagueUser[]> {
    return this.#http.get<LeagueUser[]>(`${apiUrl}/league/${leagueId}/users`);
  }

  getSportState(sport: string): Observable<SportState> {
    return this.#http.get<SportState>(`${apiUrl}/state/${sport}`);
  }

  getTransactions(leagueId: string, week: string | number): Observable<any[]> {
    return this.#http.get<any[]>(`${apiUrl}/league/${leagueId}/transactions/${week}`);
  }
}
