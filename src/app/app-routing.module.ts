import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartComponent } from './ui/start/start.component';
import { TurnLogComponent } from './ui/turn-log/turn-log.component';
import { AdvancesComponent } from './ui/advances/advances.component';
import { PlayersComponent } from './ui/players/players.component';
import { EndComponent } from './ui/end/end.component';

const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'turn', component: TurnLogComponent },
  { path: 'advances', component: AdvancesComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'end', component: EndComponent },
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: '**', component: EndComponent } // TODO add 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
