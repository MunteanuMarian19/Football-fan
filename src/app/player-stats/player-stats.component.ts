import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PlayersService } from '../players.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss'],
})
export class PlayerStatsComponent implements OnInit {
  playerName: string = '';
  season: string = '';
  teamName: string = '';
  playerStats: any;
  buttonClicked: boolean = false; //  flag
  apiResponseReceived: boolean = false; // Track whether the API response has been received
  showHeading: boolean = false; // Property for controlling the visibility of the heading

  //special method in a TypeScript class that gets called when an instance of the class is created
  constructor(
    private playersService: PlayersService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  // Observer to handle API response
  private playerStatsObserver: Observer<any> = {
    next: (data) => {
      console.log('API Response:', data);

      // Delay the display of the API response by 2 seconds
      setTimeout(() => {
        this.apiResponseReceived = true; // Set to true when API response is received
        this.showHeading = false; // Hide the heading after the API response is displayed

        if (data.results === 0) {
          // Handle empty response
          this.playerStats = null;
        } else {
          this.playerStats = data.response[0];
        }
      }, 2000);
    },
    error: (error) => {
      console.error('Error fetching player data:', error);
      // Reset the showHeading flag immediately if there's an error
      this.showHeading = false;
    },
    complete: () => {
      console.log('Observable completed successfully.');
    },
  };

  ////////////////////// Function to filter out duplicate statistics based on competition name ////////////////////////
  filterUniqueStatistics(statistics: any) {
    // Create an array to store unique statistics
    const uniqueStatistics: any[] = [];

    // Loop through each statistic in the provided array
    for (const stat of statistics) {
      // Check if a statistic with the same competition name is not already in uniqueStatistics
      if (
        !uniqueStatistics.some(
          //at least one satisfies the condition
          (uniqueStat) =>
            uniqueStat.team.name === stat.team.name &&
            uniqueStat.league.name === stat.league.name
        )
      ) {
        // If the statistic is not already in the uniqueStatistics array, add it
        uniqueStatistics.push(stat);
      }
    }
    return uniqueStatistics;
  }

  //////////////////////// Function to get non-null values or display 'Data N/A' //////////////////////////////////
  getNonNullValuePlayers(value: any, isPercentage: boolean = false): string {
    if (value === null) {
      return 'Data N/A';
    } else {
      return isPercentage ? value : value.toString();
    }
  }

  //////////////////////// Function triggered on button click to search for player stats ///////////////////////////
  searchPlayer() {
    // Set the flag to true when the button is clicked
    this.buttonClicked = true;
    // Set the showHeading flag to true
    this.showHeading = true;

    // Check if the required input fields are not empty
    if (this.teamName && this.playerName && this.season) {
      this.apiResponseReceived = false; // Reset the flag before making the API request
      // Fetch the team ID by name
      this.playersService
        .getTeamIdByName(this.teamName)
        .subscribe((teamData) => {
          const teamId = teamData.response[0]?.team?.id || ''; // Extract team ID or use an empty string

          // Use the team ID in the player search
          this.playersService
            .getPlayerStatsByNameAndSeason(this.playerName, this.season, teamId)
            .subscribe(this.playerStatsObserver);
        });
    } else {
      // Handle the case where input fields are empty, for example, you can show a message or log a warning
      alert(
        'Please enter player name, team name, and season before searching.'
      );
      // Reset the showHeading flag immediately if there's an error or incomplete input
      this.showHeading = false;
      // You can also clear any existing data to ensure nothing is displayed on the page
      this.playerStats = null;
    }
  }
}
