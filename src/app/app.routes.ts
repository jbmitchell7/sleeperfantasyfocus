import { Routes } from '@angular/router';
import { HomeComponent } from './pages/league/home/home.component';
import { LeagueComponent } from './pages/league/league.component';
import { StandingsComponent } from './pages/league/standings/standings.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoadingComponent } from './pages/loading/loading.component';

export const routes: Routes = [
  {path: '', component: LoadingComponent},
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'league',
    component: LeagueComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'standings', component: StandingsComponent }
    ],
  },
  { path: '**', redirectTo: 'welcome', pathMatch: 'prefix' },
];