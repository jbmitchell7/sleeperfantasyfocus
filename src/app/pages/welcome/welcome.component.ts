import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { leagueEntryRequest } from '../../store/global.actions';
import { FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { ColorModeBtnComponent } from '../../components/color-mode-btn/color-mode-btn.component';
import { IconAttributionComponent } from '../../components/icon-attribution/icon-attribution.component';

@Component({
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    MessagesModule,
    FormsModule,
    ColorModeBtnComponent,
    IconAttributionComponent
  ],
  providers: [MessageService],
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  leagueInputForm = new FormControl<string>('', [Validators.required, Validators.minLength(3)]);

  setLeagueId(): void {
    const id = this.leagueInputForm.value ?? '';
    this.#store.dispatch(leagueEntryRequest({ leagueId: id }));
    this.#router.navigate(['league']);
  }
}
