import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.page.html',
  styleUrls: ['./locales.page.scss'],
})
export class LocalesPage implements OnInit {
  locales: any[] = [];

  constructor(private placesService: PlacesService) { }

  async ngOnInit() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = coordinates.coords;

      this.locales = await this.placesService.getNearbyPlaces(latitude, longitude);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }
}