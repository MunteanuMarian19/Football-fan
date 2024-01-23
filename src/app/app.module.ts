import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; // Import this
import { PlayersService } from './players.service'; // Import your service
import { TeamsService } from './teams.service';
import { AppComponent } from './app.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { TeamStatsComponent } from './team-stats/team-stats.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerStatsComponent,
    TeamStatsComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    CarouselComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [PlayersService, TeamsService],

  bootstrap: [AppComponent],
})
export class AppModule {}
