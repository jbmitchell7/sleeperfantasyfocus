import { Component} from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-league',
    templateUrl: './league.component.html',
    imports: [
        NavbarComponent,
        CommonModule,
        RouterOutlet
    ]
})
export class LeagueComponent {}
