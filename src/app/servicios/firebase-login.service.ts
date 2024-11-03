import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {
  

  constructor(private auth: Auth, private router: Router, private storage: Storage) {
    
  }

  // Método para iniciar sesión
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential; // Retorna las credenciales del usuario
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      throw error; // Lanza el error para que pueda ser manejado en el componente
    }
  }

  // Método para cerrar sesión
  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']); // Navega a la página de inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
