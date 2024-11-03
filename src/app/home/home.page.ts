import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { getAuth } from 'firebase/auth';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  nombre: string = "";
  nombreRecibido: string = "";

  constructor(public alerta: AlertController, private router: Router, private storage : Storage , private authService: AuthService) {}

  ngOnInit() {
    const auth = getAuth();
    const user = auth.currentUser; // Obtén el usuario actual
    if (user) {
      this.authService.getUserData(user.uid).then(userData => {
          if (userData) {
              this.nombreRecibido = userData['username']; // Asigna el nombre del usuario
              console.log('Nombre de usuario obtenido de Firestore:', this.nombreRecibido);
            }
        }).catch(error => {
            console.error('Error al obtener el nombre del usuario:', error);
        });
    } else {
        console.log('No hay usuario autenticado');
    }
}

  

  logout() {
    this.authService.logout();}
  
  

  async presentAlert(titulo: string, message: string) {
    const alert = await this.alerta.create({
      header: titulo,
      message: message,
      buttons: ["ok"]
    });
    await alert.present();
  }

  mostrarAlerta() {
    if (this.nombre !== "") {
      this.presentAlert("Usuario", "su nombre es " + this.nombre);
    } else {
      this.presentAlert("Usuario", "el campo no puede estar vacío");
    }
  }

  someMethodToNavigateToPagina1() {
    console.log('Navegando a Página 1 con nombre:', this.nombreRecibido); // Verifica que nombreRecibido tenga un valor
    this.router.navigate(['/pagina1'], {
        state: {
            nombre: this.nombreRecibido,
      },
    });
  }
 
  async verStorage(){

    let usuario = await this.storage.get("aa")
    console.log("El nombre guardado es: " +usuario)
  }  
  

  
}
