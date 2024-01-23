import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
// Import the environment
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  // Base URL for the API
  private apiUrl = 'https://api-football-v1.p.rapidapi.com/v3';

  // Private property to store the API key
  private apiKey = environment.apiKey;

  // Inject the HttpClient service and set the apiKey in the constructor
  constructor(private http: HttpClient) {}

  getTeamByName(teamName: string): Observable<any> {
    // Set headers for the API request
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    });

    // Set parameters for the API request
    const params = new HttpParams().set('search', teamName);

    // Make the API request to get team details
    return this.http.get(`${this.apiUrl}/teams`, { headers, params });
  }

  getLeagueByName(leagueName: string): Observable<any> {
    // Set headers for the API request
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    });

    // Set parameters for the API request
    const params = new HttpParams().set('search', leagueName);

    // Make the API request to get league details
    return this.http.get(`${this.apiUrl}/leagues`, { headers, params });
  }

  getTeamStatsByLeagueSeasonAndName(
    league: string,
    season: string,
    teamName: string
  ): Observable<any> {
    // Set headers for the API request
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    });

    // Fetch the team ID by name using the getTeamByName method
    return this.getTeamByName(teamName).pipe(
      switchMap((teamData) => {
        // Extract team ID from the API response
        const teamId = teamData.response[0]?.team?.id || '';

        // Fetch the league ID by name using the getLeagueByName method
        return this.getLeagueByName(league).pipe(
          switchMap((leagueData) => {
            // Extract league ID from the API response
            const leagueId = leagueData.response[0]?.league?.id || '';

            // Set parameters for the API request
            const params = new HttpParams()
              .set('league', leagueId)
              .set('season', season)
              .set('team', teamId);

            // Make the API request to get team statistics
            return this.http.get(`${this.apiUrl}/teams/statistics`, {
              headers,
              params,
            });
          })
        );
      })
    );
  }
}
