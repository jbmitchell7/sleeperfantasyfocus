import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { leagueEntryRequest } from './store/global.actions';
import Bowser from "bowser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet]
})
export class AppComponent {
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  constructor() {
    this.#setMobile();
    const id = localStorage.getItem('LEAGUE_ID');
    if (!!id) {
      this.#store.dispatch(leagueEntryRequest({ leagueId: id }));
      if (!this.#router.url.includes('league')) {
        this.#router.navigateByUrl('/league');
      }
    } else {
      this.#router.navigateByUrl('/welcome');
    }
  }

  #setMobile(): void {
    const parser = Bowser.getParser(navigator.userAgent);
    if (parser.getPlatformType() === 'mobile') {
      localStorage.setItem('MOBILE', 'true');
    } else {
      localStorage.setItem('MOBILE', 'false');
    }
  }
}
