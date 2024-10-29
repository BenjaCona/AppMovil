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
  
    console.log('Imagen capturada:', image); // Agrega esta línea para ver qué se devuelve
  
    if (image && image.webPath) {
      const imageFile = await fetch(image.webPath!).then(res => res.blob());
      const fileName = `image_${new Date().getTime()}.jpg`;
  
      try {
        const imageUrl = await this.mlkitService.uploadImage(new File([imageFile], fileName));
        const result = await this.mlkitService.labelImage(imageUrl);
  
        // Filtrar solo las etiquetas relacionadas con alimentos
        if (result.responses && result.responses[0]?.labelAnnotations) {
          const foodLabels = result.responses[0].labelAnnotations.filter(label =>
            this.isFoodLabel(label.description)
          );
          
          if (foodLabels.length > 0) {
            this.labels = foodLabels; // Actualiza solo con etiquetas de alimentos
          } else {
            console.error('No se encontraron etiquetas de alimentos en la respuesta:', result);
          }
        } else {
          console.error('No se encontraron etiquetas en la respuesta:', result);
        }
      } catch (error) {
        console.error('Error al obtener las etiquetas:', error);
      }
    } else {
      console.error('No se pudo obtener la ruta de la imagen.', image);
    }
  }

  // Método para verificar si una etiqueta está relacionada con alimentos
  isFoodLabel(label: string): boolean {
    const foodKeywords = [
      'apple', 'banana', 'orange', 'carrot', 'potato', 'tomato', 
      'bread', 'chicken', 'beef', 'fish', 'vegetable', 'fruit', 'cheese',
      // Agrega más palabras clave de alimentos según sea necesario
    ];
    
    return foodKeywords.some(keyword => label.toLowerCase().includes(keyword));
  }

  ngOnInit() {}
}
