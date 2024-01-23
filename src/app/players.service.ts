import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// Import the environment
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  // Base URL for the API
  private apiUrl = 'https://api-football-v1.p.rapidapi.com/v3';

  // Private property to store the API key
  private apiKey = environment.apiKey;

  // Inject the HttpClient service and set the apiKey in the constructor
  constructor(private http: HttpClient) {}

  getPlayerStatsByNameAndSeason(
    name: string,
    season: string,
    teamName: string
  ): Observable<any> {
    // Set headers for the API request
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    });

    // Set parameters for the API request
    const params = new HttpParams()
      .set('search', name)
      .set('season', season)
      .set('team', teamName); // Include teamName

    // Make the API request to get player statistics
    return this.http.get(`${this.apiUrl}/players`, { headers, params });
  }

  getTeamIdByName(teamName: string): Observable<any> {
    // Set headers for the API request
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    });

    // Set parameters for the API request
    const params = new HttpParams().set('search', teamName);

    // Make the API request to get team ID
    return this.http.get(`${this.apiUrl}/teams`, { headers, params });
  }
}
