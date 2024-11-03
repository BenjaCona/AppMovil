import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-vista-mapa',
  templateUrl: './vista-mapa.component.html',
  styleUrls: ['./vista-mapa.component.scss'],
})
export class VistaMapaComponent  implements AfterViewInit {
  @ViewChild('mapContainer', {static:false}) mapContainer!: ElementRef;
  map: any;
  marker: any;

  async ngAfterViewInit() {
    await this.initializeMap();
    
  }

  async initializeMap(){
    // Obtener la posición inicial del usuario
    const position = await Geolocation.getCurrentPosition();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Inicializar el mapa centrado en la posición del usuario
    this.map = L.map(this.mapContainer.nativeElement).setView([latitude, longitude], 15);

    // Agregar el tile layer de OpenStreetMap (gratis)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Agregar un marcador en la ubicación actual del usuario
    this.marker = L.marker([latitude, longitude]).addTo(this.map)
      .bindPopup('Usted está aquí!')
      .openPopup();

    // Llamar a la función para rastrear la ubicación en tiempo real
    this.trackLocation();
  }

  trackLocation() {
    Geolocation.watchPosition({}, (position) => {
      if (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Mover el marcador a la nueva ubicación
        this.marker.setLatLng([latitude, longitude]);
        this.map.setView([latitude, longitude], 15);
      }
    });
  }


  constructor() { }

  ngOnInit() {}

}
