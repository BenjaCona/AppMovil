import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  nombre: string = "";
  nombreRecibido: string = "";

  constructor(public alerta: AlertController, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      console.log('Estado recibido:', navigation.extras.state);
      this.nombreRecibido = (navigation.extras.state as { nombre: string }).nombre;
      console.log('Nombre recibido en Home:', this.nombreRecibido);
    } else {
      console.log('No se recibió ningún estado.');
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

  mostrar_nombre() {
    console.log(this.nombre);
  }
  
}
