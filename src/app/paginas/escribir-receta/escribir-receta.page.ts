import { Component } from '@angular/core';
import { RecetaService } from 'src/app/receta.service';
import { Capacitor } from '@capacitor/core';
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
  ingredientes: string[] = [''];
  pasos: string[] = [];
  fotoReceta: string | undefined;

  constructor(private recetaService: RecetaService) {}

  async subirReceta() {
    const receta = {
      nombre: this.nombreReceta,
      tipo: this.tipoComida,
      descripcion: this.descripcion,
      ingredientes: this.ingredientes.filter(ing => ing.trim() !== ''),
      pasos: this.pasos.filter(paso => paso.trim() !== ''),
      foto: this.fotoReceta || 'No hay foto',
    };

    try {
      await this.recetaService.agregarReceta(receta);
      this.limpiarFormulario();
    } catch (error) {
      console.error('Error al subir la receta:', error);
    }
  }

  async tomarFoto() {
    if (!Capacitor.isNativePlatform()) {
      alert('La funcionalidad de la cámara no está disponible en el navegador.');
      console.error('Not implemented on web.');
      return;
    }
  
    const status = await Camera.requestPermissions({ permissions: ['camera', 'photos'] });
  
    if (status.camera !== 'granted') {
      console.error('Permiso de cámara denegado.');
      alert('Se necesita acceso a la cámara para tomar fotos.');
      return;
    }
  
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });
  
    this.fotoReceta = image.dataUrl;
    console.log('Foto tomada:', this.fotoReceta);
  }
  agregarIngrediente() {
    this.ingredientes.push(''); // Añade un campo vacío al arreglo
  }

  eliminarIngrediente() {
    if (this.ingredientes.length > 0) {
      this.ingredientes.pop();
    }
  }

  agregarPaso() {
    this.pasos.push('');
  }

  eliminarPaso() {
    if (this.pasos.length > 0) {
      this.pasos.pop();
    }
  }

  limpiarFormulario() {
    this.nombreReceta = '';
    this.tipoComida = '';
    this.descripcion = '';
    this.ingredientes = [''];
    this.pasos = [];
    this.fotoReceta = undefined;
  }
}
