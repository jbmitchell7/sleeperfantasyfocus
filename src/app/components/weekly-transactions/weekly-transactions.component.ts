import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Transaction } from '../../data/interfaces/Transactions';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
    selector: 'ui-weekly-transactions',
    imports: [CommonModule, ProgressSpinnerModule, DividerModule, ScrollPanelModule],
    templateUrl: './weekly-transactions.component.html',
    styleUrl: './weekly-transactions.component.scss'
})
export class WeeklyTransactionsComponent {
  @Input({required: true}) transactions: Transaction[] = [];
  @Input({required: true}) isLoading = true;
}
