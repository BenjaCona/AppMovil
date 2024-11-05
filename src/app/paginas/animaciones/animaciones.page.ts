import { Component, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import { RecetaService } from '../../receta.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-animaciones',
  templateUrl: 'animaciones.page.html',
})
export class AnimacionesPage {
  @ViewChild('modalReceta', { static: true }) modalReceta!: IonModal;

  recetas: any[] = []; // Arreglo para almacenar las recetas del usuario
  selectedReceta: any = {}; // Variable para la receta seleccionada
  isModalOpen: boolean = false; // Controla si el modal está abierto o cerrado

  constructor(
    private navCtrl: NavController,
    private recetaService: RecetaService,
    private auth: Auth
  ) {}

  async ngOnInit() {
    const user = this.auth.currentUser; // Obtener el usuario actual
    if (user) {
      this.recetas = await this.recetaService.obtenerRecetasPorUsuario(user.uid); // Cargar recetas
      console.log('Recetas cargadas:', this.recetas); // Verifica si las recetas se cargan correctamente
    }
  }

  closeModal() {
    this.isModalOpen = false; // Cerrar el modal
    this.selectedReceta = {}; // Resetear la receta seleccionada
    console.log('Modal cerrado'); // Verifica que se cierra el modal
  }

  openModal(receta: any) {
    this.selectedReceta = receta; // Establecer la receta seleccionada
    console.log('Receta seleccionada:', this.selectedReceta); // Verificar la receta seleccionada
    this.isModalOpen = true; // Abrir el modal
  }
}
