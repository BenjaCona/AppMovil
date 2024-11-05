import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { getStorage, ref, uploadString, getDownloadURL } from '@firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  async obtenerRecetasPorUsuario(uid: string) {
    const q = query(collection(this.firestore, 'recetas'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    const recetas: any[] = [];

    querySnapshot.forEach((doc) => {
      recetas.push({ id: doc.id, ...doc.data() });
    });
    return recetas;
  }

  async subirImagen(fotoReceta: string): Promise<string> {
    try {
        if (!fotoReceta.startsWith('data:image/png;base64,') && !fotoReceta.startsWith('data:image/jpeg;base64,')) {
            throw new Error('El formato de la imagen no es válido');
        }

        const storage = getStorage();
        const imageRef = ref(storage, `recetas/${Date.now()}.png`);

        await uploadString(imageRef, fotoReceta, 'data_url');

        const url = await getDownloadURL(imageRef);
        return url;
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        throw error;
    }
  }
  
  async agregarReceta(receta: any) {
    try {
      const user = this.auth.currentUser;
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      if (receta.foto) {
        receta.foto = await this.subirImagen(receta.foto);
      } else {
        receta.foto = 'No hay foto';
      }

      const docRef = await addDoc(collection(this.firestore, 'recetas'), {
        ...receta,
        uid: user.uid,
      });

      console.log('Receta añadida con ID:', docRef.id);
    } catch (e) {
      console.error('Error al añadir receta:', e);
    }
  }
}
