import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { MlkitService } from '../../mlkit.service'; // Ajusta la ruta según tu estructura de carpetas

@Component({
  selector: 'app-reconocimiento-de-ingredientes',
  templateUrl: './reconocimiento-de-ingredientes.page.html',
  styleUrls: ['./reconocimiento-de-ingredientes.page.scss'],
})
export class ReconocimientoDeIngredientesPage implements OnInit {
  imageUrl: string | undefined;
  labels: any[] = [];

  constructor(private mlkitService: MlkitService) {}

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
  
    this.imageUrl = image.webPath;
  
    if (this.imageUrl) {
      try {
        const result = await this.mlkitService.labelImage(this.imageUrl);
  
        // Verifica si las respuestas y las etiquetas están presentes
        if (result.responses && result.responses[0]?.labelAnnotations) {
          this.labels = result.responses[0].labelAnnotations; 
        } else {
          console.error('No se encontraron etiquetas en la respuesta:', result);
        }
      } catch (error) {
        console.error('Error al obtener las etiquetas:', error);
      }
    } else {
      console.error('No se pudo obtener la ruta de la imagen.');
    }
  }

  ngOnInit() {}
}

