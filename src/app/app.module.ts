import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TurnLogComponent } from './ui/turn-log/turn-log.component';
import { PlayersComponent } from './ui/players/players.component';
import { AdvancesComponent } from './ui/advances/advances.component';
import { StartComponent } from './ui/start/start.component';
import { EndComponent } from './ui/end/end.component';
import { PlayerTableComponent } from './ui/players/player-table/player-table.component';
import { CardComponent } from './ui/advances/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    TurnLogComponent,
    PlayersComponent,
    AdvancesComponent,
    StartComponent,
    EndComponent,
    PlayerTableComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
