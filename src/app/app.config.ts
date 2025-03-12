import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';
import { GlobalEffects } from './store/global.effects';
import { leagueReducer } from './store/league/league.reducer';
import { managersReducer } from './store/managers/managers.reducers';
import { playersReducer } from './store/players/players.reducer';
import { rostersReducer } from './store/rosters/rosters.reducers';
import { transactionsReducer } from './store/transactions/transactions.reducer';
import { routes } from './app.routes';
import { myTheme } from './app.theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideStore({
      leagueData: leagueReducer,
      rosterData: rostersReducer,
      managersData: managersReducer,
      transactionsData: transactionsReducer,
      playerData: playersReducer
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), connectInZone: true }),
    provideEffects([GlobalEffects]),
    providePrimeNG({
      theme: {
        preset: myTheme,
        options: {
          darkModeSelector: '.dark-mode'
        }
      }
    })
  ]
};