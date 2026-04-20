import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
// Allow class to inject this class into other components or services
@Injectable({
  // Makes this a singleton and registers it globally
  providedIn: 'root',
})
export class TripDataService {
  private url = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}
  public getTrips(): Observable<Trip[]> {
    console.log('getTrips() test in trip-data.ts');
    return this.http.get<Trip[]>(this.url);
  }

  public getTrip(tripCode: string): Observable<Trip[]> {
    console.log('Inside TripdataService::getTrip');
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  public addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  public updateTrip(formData: Trip): Observable<Trip> {
    // console log ("Inside TripDataService::addTrips")
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }
}
