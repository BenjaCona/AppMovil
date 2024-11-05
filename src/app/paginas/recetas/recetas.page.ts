import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage implements OnInit {
  recetas: any[] = []; // Array para almacenar las recetas de otros usuarios
  isModalOpen = false;
  selectedReceta: any = null;

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    public mensaje: ToastController
  ) {}

  async ngOnInit() {
    await this.loadRecetasDeOtrosUsuarios();
  }

  async loadRecetasDeOtrosUsuarios() {
    const currentUserUid = this.auth.currentUser?.uid;

    if (!currentUserUid) {
      console.error("No se encontró el usuario actual");
      return;
    }

    const recetasCollection = collection(this.firestore, 'recetas');
    const recetaSnapshot = await getDocs(recetasCollection);

    // Filtrar recetas que no sean del usuario actual
    this.recetas = recetaSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter((receta: any) => receta.uid !== currentUserUid);
  }

  openModal(receta: any) {
    this.selectedReceta = receta;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedReceta = null;
  }
}
