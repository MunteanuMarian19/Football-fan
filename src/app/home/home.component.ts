import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  aboutMessages: string[] = [
    'This is your go-to platform for exploring football teams and players statistics.',
    'Enjoy the football fan experience with real-time data and insights at your fingertips.',
    'Search for a team to see its latest results, or find a player to delve into detailed stats and performance.',
  ];
}
