import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { LeagueRoutingModule } from './league-routing.module';
import { GraphComponent } from '../../components/graph/graph.component';
import { StandingsComponent } from '../../components/standings/standings.component';
import { LeagueComponent } from './league.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    LeagueComponent,
    GraphComponent,
    StandingsComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    AgGridModule,
    AgChartsAngularModule,
    LeagueRoutingModule,
  ],
  providers: [],
})
export class LeagueModule {}
