import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private storage: Storage
  ) {
    this.init(); // Inicializar el almacenamiento al crear el servicio
  }

  async init() {
    await this.storage.create(); // Asegúrate de que el almacenamiento esté creado
  }

  async register(email: string, password: string, username: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        username: username,
        email: email,
      };

      await setDoc(doc(this.firestore, 'users', user.uid), userData);
      localStorage.setItem('userUID', user.uid); // Guardar UID en LocalStorage
      await this.storage.set('usuario', email); // Guardar usuario en Ionic Storage
      console.log('Usuario registrado y datos guardados en Firestore:', userData);
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('userUID', user.uid); // Guardar UID en LocalStorage
      await this.storage.set('usuario', email); // Guardar el email en Ionic Storage
      return user;
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      // Intentar cargar desde localStorage si hay un error (posiblemente sin conexión)
      const userUID = localStorage.getItem('userUID');
      if (userUID) {
        return this.loadUserFromLocalStorage(userUID);
      }
      throw error; // Lanza el error si no hay UID guardado
    }
  }

  private loadUserFromLocalStorage(uid: string) {
    const userData = localStorage.getItem('userData');
    if (userData) {
      return { uid, ...JSON.parse(userData) }; // Devuelve un objeto de usuario simulado
    }
    return null; // Devuelve null si no se encuentran datos
  }

  async getUserData(uid: string) {
    try {
      const docRef = doc(this.firestore, 'users', uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const userData = docSnap.data();
        localStorage.setItem('userData', JSON.stringify(userData)); // Guardar datos en LocalStorage
        return userData;
      } else {
        console.log('No se encontró el documento!');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
      
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('userUID');
  }
}
