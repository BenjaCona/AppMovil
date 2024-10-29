// receta.page.ts
import { Component } from '@angular/core';
import { RecetaService } from 'src/app/receta.service'; // Asegúrate de que la ruta sea correcta
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-receta',
  templateUrl: './escribir-receta.page.html',
  styleUrls: ['./escribir-receta.page.scss'],
})
export class EscribirRecetaPage {
  nombreReceta: string = '';
  tipoComida: string = '';
  descripcion: string = '';
  ingredientes: string[] = [];
  fotoReceta: string | undefined;

  constructor(private recetaService: RecetaService) {}

  async subirReceta() {
    const receta = {
      nombre: this.nombreReceta,
      tipo: this.tipoComida,
      descripcion: this.descripcion,
      ingredientes: this.ingredientes,
      foto: this.fotoReceta || 'No hay foto',
      
    };
    await this.recetaService.agregarReceta(receta);
    // Aquí puedes agregar lógica para limpiar el formulario o mostrar un mensaje
  }
  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri, // Puedes cambiar a Base64 si es necesario
    });

    this.fotoReceta = image.webPath; // Guarda la URL de la imagen
}
}

