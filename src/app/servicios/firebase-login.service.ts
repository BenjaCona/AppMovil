import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app'; // Asegúrate de importar FirebaseError

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {
  constructor(private auth: Auth, private router: Router) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('userUID'); // Verificar autenticación a través del localStorage
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      localStorage.setItem('userUID', userCredential.user.uid);
      return userCredential; // Retorna las credenciales del usuario
    } catch (error) {
      let errorMessage: string;

      // Usar un type assertion para acceder a las propiedades del error
      const firebaseError = error as FirebaseError; // Afirmar que error es un FirebaseError
      
      // Manejar diferentes tipos de errores
      switch (firebaseError.code) {
        case 'auth/user-not-found':
          errorMessage = 'No se encontró un usuario con este correo.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'La contraseña es incorrecta.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'El correo electrónico no es válido.';
          break;
        default:
          errorMessage = 'Error en el inicio de sesión. Intenta de nuevo más tarde.';
          break;
      }
      console.error('Error en el inicio de sesión:', firebaseError);
      throw new Error(errorMessage); // Lanza el error personalizado
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      localStorage.removeItem('userUID'); // Eliminar UID de localStorage
      this.router.navigate(['/login']); // Navega a la página de inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
