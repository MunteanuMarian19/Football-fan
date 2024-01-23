import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TeamsService } from '../teams.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.scss'],
})
export class TeamStatsComponent implements OnInit {
  league: string = '';
  season: string = '';
  teamName: string = '';
  teamStats: any; // Will store the fetched team statistics
  buttonClicked: boolean = false; // New flag
  apiResponseReceived: boolean = false; // Track whether the API response has been received
  showHeading: boolean = false; // Property for controlling the visibility of the heading

  constructor(
    private teamsService: TeamsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  // Observer object to handle API response
  teamStatsObserver: Observer<any> = {
    next: (data) => {
      console.log('API Response:', data);

      // Delay the display of the API response by 2 seconds
      setTimeout(() => {
        // Reset the flags
        this.apiResponseReceived = true;
        this.showHeading = false;

        // Check if there are errors in the API response
        if (
          data.errors &&
          typeof data.errors === 'object' &&
          Object.keys(data.errors).length > 0
        ) {
          // Handle case when there are errors in the API response
          this.teamStats = null;
        } else {
          // Handle case when there are no errors in the API response
          this.teamStats = data.response;
        }
      }, 2000);
    },
    error: (error) => {
      console.error('Error fetching team data:', error);
      // Reset the showHeading flag immediately if there's an error
      this.showHeading = false;

      if (Array.isArray(error.response) && error.response.length === 0) {
        // Handle errors when the response is an empty array
        this.teamStats = null;
        this.apiResponseReceived = true; // Set to true when there's an error
      }
    },
    complete: () => {
      console.log('Observable completed successfully.');
    },
  };

  // Helper function to handle null values and format display for various types of data
  getNonNullValueTeams(
    value: any,
    isPercentage: boolean = false,
    isYellowRedCard: boolean = false
  ): string {
    if (value === null) {
      return isYellowRedCard ? 'Data N/A' : isPercentage ? '0%' : '0';
    } else {
      return isPercentage ? value : value.toString();
    }
  }

  // Function triggered when the "Search Team" button is clicked
  searchTeam() {
    // Set the flag to true when the button is clicked
    this.buttonClicked = true;

    // Set the showHeading flag to true
    this.showHeading = true;

    // Check if the required input fields are not empty
    if (this.teamName && this.league && this.season) {
      this.apiResponseReceived = false; // Reset the flag before making the API request

      // Fetch the team and league IDs by name, then use them in the statistics request
      this.teamsService
        .getTeamStatsByLeagueSeasonAndName(
          this.league,
          this.season,
          this.teamName
        )
        .subscribe(this.teamStatsObserver);
    } else {
      // Handle the case where input fields are empty, for example, you can show a message or log a warning
      alert(
        'Please enter team name, league name, and season before searching.'
      );
      // Reset the showHeading flag immediately if there's an error or incomplete input
      this.showHeading = false;
      // You can also clear any existing data to ensure nothing is displayed on the page
      this.teamStats = null;
    }
  }

  // different handling for the errors from the API than in player-stats component
  isErrorInResponse(response: any): boolean {
    return (
      response &&
      response.errors &&
      (typeof response.errors === 'object' ||
        (Array.isArray(response.errors) && response.errors.length > 0))
    );
  }
}
