import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TurnLogComponent } from './turn-log/turn-log.component';
import { PlayersComponent } from './players/players.component';
import { AdvancesComponent } from './advances/advances.component';
import { StartComponent } from './start/start.component';
import { EndComponent } from './end/end.component';
import { PlayerTableComponent } from './players/player-table/player-table.component';
import { ScienceComponent } from './advances/science/science.component';

@NgModule({
  declarations: [
    AppComponent,
    TurnLogComponent,
    PlayersComponent,
    AdvancesComponent,
    StartComponent,
    EndComponent,
    PlayerTableComponent,
    ScienceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
