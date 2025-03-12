import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { MenuItem } from "primeng/api";
import { Store } from "@ngrx/store";
import { Subscription, filter, tap } from "rxjs";
import { League } from "../../data/interfaces/league";
import { leagueEntryRequest } from "../../store/global.actions";
import { clearLeagueData } from "../../store/league/league.actions";
import { clearManagersData } from "../../store/managers/managers.actions";
import { clearRosterData } from "../../store/rosters/rosters.actions";
import { selectLeague } from "../../store/global.selectors";
import { MenubarModule } from "primeng/menubar";
import { MENU_ROUTES } from "../../data/constants/navigation.constants";
import { ColorModeBtnComponent } from "../color-mode-btn/color-mode-btn.component";

@Component({
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule,
    ColorModeBtnComponent
  ],
  selector: 'ui-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  readonly #store = inject(Store);
  readonly #sub: Subscription;
  readonly #router = inject(Router);

  menuItems!: MenuItem[];
  mobile = JSON.parse(localStorage.getItem('MOBILE') as string);
  leagueName!: string;

  constructor() {
    this.#sub = this.#store
      .select(selectLeague)
      .pipe(
        filter(l => !!l.sportState?.season),
        tap(l => {
          this.leagueName = l.name;
          this.menuItems = [
            ...MENU_ROUTES,
            {
              label: 'Sleeper Link',
              icon: 'fa-solid fa-arrow-up-right-from-square',
              url: `https://sleeper.com/leagues/${l.league_id}/league`
            },
            {
              label: 'Change League/Season',
              icon: 'fa-solid fa-shuffle',
              items: [
                {
                  label: 'Change League',
                  icon: 'fa-solid fa-arrows-rotate',
                  command: () => this.#resetLeague()
                },
                {
                  label: 'Previous Season',
                  icon: 'fa-solid fa-backward',
                  disabled: !l.previous_league_id,
                  command: () => this.#setLastSeason(l)
                },
                {
                  label: 'Next Season',
                  icon: 'fa-solid fa-forward',
                  disabled: l.sportState.season === l.season,
                  command: () => this.#setNextSeason(l)
                }
              ]
            },
          ]
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }

  #resetLeague(): void {
    this.#store.dispatch(clearLeagueData());
    this.#store.dispatch(clearRosterData());
    this.#store.dispatch(clearManagersData());
    localStorage.setItem('LEAGUE_ID', '');
    this.#router.navigateByUrl('/welcome');
  }

  #setNextSeason(league: League): void {
    const nextYear = +league.season + 1;
    const nextSeasonId = localStorage.getItem(nextYear.toString());
    this.#store.dispatch(leagueEntryRequest({ leagueId: nextSeasonId as string }));
  }

  #setLastSeason(league: League): void {
    localStorage.setItem(league.season, league.league_id);
    this.#store.dispatch(leagueEntryRequest({ leagueId: league.previous_league_id }));
  }
}