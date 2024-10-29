import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; 
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private apiKey: string = environment.googlePlacesApiKey;

  constructor(private http: HttpClient) {}

  async getNearbyPlaces(lat: number, lng: number): Promise<any> {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=establishment&key=${this.apiKey}`;

    try {
      const response = await lastValueFrom(this.http.get<any>(apiUrl));
      return response.results;
    } catch (error) {
      console.error('Error al obtener lugares cercanos:', error);
      throw error;
    }
  }
}
