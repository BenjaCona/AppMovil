import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.page.html',
  styleUrls: ['./pagina1.page.scss'],
})
export class Pagina1Page implements OnInit {
  nombreRecibido: string = ''; // Propiedad para almacenar el nombre

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      this.authService.getUserData(user.uid).then(userData => {
        if (userData) {
          this.nombreRecibido = userData['username']; // Asigna el nombre del usuario directamente
          console.log('Nombre de usuario obtenido en Página 1:', this.nombreRecibido);
        }
      }).catch(error => {
        console.error('Error al obtener el nombre del usuario:', error);
      });
    } else {
      console.log('No hay usuario autenticado');
    }
  }
}
