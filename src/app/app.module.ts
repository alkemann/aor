import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TurnLogComponent } from './ui/turn-log/turn-log.component';
import { PlayersComponent } from './ui/players/players.component';
import { AdvancesComponent } from './ui/advances/advances.component';
import { StartComponent } from './ui/start/start.component';
import { EndComponent } from './ui/end/end.component';
import { PlayerTableComponent } from './ui/players/player-table/player-table.component';
import { CardComponent } from './ui/advances/card/card.component';
import { CreateComponent } from './ui/start/create/create.component';
import { NamesComponent } from './ui/start/names/names.component';
import { BidComponent } from './ui/start/bid/bid.component';
import { DevideComponent } from './ui/start/devide/devide.component';
import { TokensComponent } from './ui/start/tokens/tokens.component';
import { StaticComponent } from './ui/static/static.component';
import { CitiesComponent } from './ui/cities/cities.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
// import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [
    AppComponent,
    TurnLogComponent,
    PlayersComponent,
    AdvancesComponent,
    StartComponent,
    EndComponent,
    PlayerTableComponent,
    CardComponent,
    CreateComponent,
    NamesComponent,
    BidComponent,
    DevideComponent,
    TokensComponent,
    StaticComponent,
    CitiesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    // MatChipsModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
