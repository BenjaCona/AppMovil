import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-reconocimiento-de-ingredientes',
  templateUrl: './reconocimiento-de-ingredientes.page.html',
  styleUrls: ['./reconocimiento-de-ingredientes.page.scss'],
})
export class ReconocimientoDeIngredientesPage implements OnInit {
  imageUrl: string | undefined;
  constructor() { }
  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
    this.imageUrl = image.webPath;
  }
  ngOnInit() {
  }

}

