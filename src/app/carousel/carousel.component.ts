import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  slidesText: Array<string> = [
    'Welcome to the Football Fan App',
    'Explore Teams and their Stats',
    'Search for Teams',
    'View their Statistics',
    'Discover Player Performance',
    'Search for Players',
    'See their Stats',
  ];
}
