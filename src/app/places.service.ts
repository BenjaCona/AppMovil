import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface Place {
  id: string; // Identificador único del lugar
  name: string; // Nombre del lugar
  geometry: {
    location: {
      lat: number; // Latitud
      lng: number; // Longitud
    };
  };
}

export interface PlacesResponse {
  results: Place[]; // Arreglo de lugares
  status: string; // Estado de la respuesta (OK, ZERO_RESULTS, etc.)
}

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor(private http: HttpClient) {}

  async getNearbyPlaces(latitude: number, longitude: number): Promise<Place[]> {
    const apiKey = environment.googlePlacesApiKey;
    const radius = 1500; // Radio en metros para buscar lugares
    const type = 'restaurant'; // Tipo de lugar que deseas buscar
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;

    try {
      const response = await this.http.get<PlacesResponse>(url).toPromise();

      // Verifica si la respuesta existe y tiene resultados
      if (response && response.results) {
        return response.results; // Devuelve los resultados
      } else {
        return []; // Devuelve un arreglo vacío si no hay resultados
      }
    } catch (error) {
      console.error('Error al obtener lugares cercanos:', error);
      return []; // Devuelve un arreglo vacío en caso de error
    }
  }
}

