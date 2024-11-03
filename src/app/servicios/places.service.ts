import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private apiKey = 'AIzaSyBD3ii7gV03wUTpKtbeowIhQMY9EdjnSvg';

  constructor(private http: HttpClient) {}

  // Obtener restaurantes cercanos a partir de la latitud y longitud del usuario
  getNearbyRestaurants(latitude: number, longitude: number, radius: number = 1000) {
    const location = `${latitude},${longitude}`;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=restaurant&key=${this.apiKey}`;
    return this.http.get(url);
  }
}