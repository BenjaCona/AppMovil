import { Injectable } from '@angular/core';
import { Firestore, collection, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {}

  // Registro de usuario
  async register(email: string, password: string, username: string) {
    try {
      // Crear usuario con autenticación
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Guardar datos adicionales en Firestore usando setDoc
      const userData = {
        uid: user.uid,
        username: username,
        email: email,
      };

      // Usar setDoc para crear un documento con el ID del usuario
      await setDoc(doc(this.firestore, 'users', user.uid), userData);
      console.log('Usuario registrado y datos guardados en Firestore:', userData);
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error; // Lanza el error para manejarlo más tarde
    }
  }

  async logout() {
    try {
      await this.auth.signOut(); // Método de cierre de sesión
      this.router.navigate(['/login']); // Redirigir a la página de login
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  async getUserData(uid: string) {
    try {
      const docRef = doc(this.firestore, 'users', uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        return docSnap.data(); // Devuelve los datos del usuario
      } else {
        console.log('No se encontró el documento!');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      throw error; // Lanza el error para manejarlo más tarde
    }
  }
}
