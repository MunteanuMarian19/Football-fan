import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { TeamStatsComponent } from './team-stats/team-stats.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'players', component: PlayerStatsComponent },
  { path: 'teams', component: TeamStatsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
