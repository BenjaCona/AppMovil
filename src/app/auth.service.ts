import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
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

      // Guardar datos adicionales en Firestore
      const userData = {
        uid: user.uid,
        username: username,
        email: email,
      };

      await addDoc(collection(this.firestore, 'users'), userData);
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
}