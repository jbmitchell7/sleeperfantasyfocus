import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IconAttributionComponent } from '../../components/icon-attribution/icon-attribution.component';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  imports: [
    NavbarComponent,
    CommonModule,
    RouterOutlet,
    IconAttributionComponent
  ]
})
export class LeagueComponent { }
