import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartComponent } from './start/start.component';
import { TurnLogComponent } from './turn-log/turn-log.component';
import { AdvancesComponent } from './advances/advances.component';
import { PlayersComponent } from './players/players.component';
import { EndComponent } from './end/end.component';

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
