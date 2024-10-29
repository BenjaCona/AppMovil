
import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  private db = getFirestore();

  async agregarReceta(receta: any) {
    try {
      const docRef = await addDoc(collection(this.db, 'recetas'), receta);
      console.log('Receta añadida con ID:', docRef.id);
    } catch (e) {
      console.error('Error al añadir receta:', e);
    }
  }
}
