import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading',
  imports: [ProgressSpinnerModule],
  template:
  `
    <div class="h-full w-full flex items-center justify-center">
      <p-progress-spinner />
    </div>
  `
})
export class LoadingComponent {}
