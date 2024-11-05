import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = "";
  password: string = "";

  constructor(
    public mensaje: ToastController,
    public alerta: AlertController,
    private router: Router,
    private storage: Storage,
    private authService: AuthService // Usar AuthService
  ) {}

  async ngOnInit() {
    await this.storage.create();

    // Cargar datos guardados
    const usuarioGuardado = await this.storage.get('usuario');
    const passwordGuardada = await this.storage.get('password');

    if (usuarioGuardado && passwordGuardada) {
      this.usuario = usuarioGuardado; // Rellenar el formulario si hay datos guardados
      this.password = passwordGuardada;
    }
  }

  async MensajeError() {
    const alert = await this.alerta.create({
      header: 'Error',
      message: 'No se ha podido iniciar sesión. Compruebe Usuario y Contraseña',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  async MensajeCerrarSesion() {
    const toast = await this.mensaje.create({
      message: 'Cerrar Sesión Exitoso',
      duration: 2000,
    });
    toast.present();
  }

  async MensajeCorrecto() {
    const toast = await this.mensaje.create({
      message: 'Inicio de Sesión Exitoso',
      duration: 2000,
    });
    toast.present();
  }

  async ingresar() {
    if (this.usuario === "" || this.password === "") {
      console.log("No se puede dejar el usuario y contraseñas vacíos");
      await this.MensajeError();
      return; // Salir de la función si los campos están vacíos
    }

    try {
      await this.authService.login(this.usuario, this.password);
      console.log("Inicio de Sesión Exitoso");
      await this.MensajeCorrecto();
      // Guardar datos de usuario y contraseña solo si el inicio de sesión fue exitoso
      await this.storage.set("usuario", this.usuario);
      await this.storage.set("password", this.password);
      this.router.navigate(["/home"]);
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      await this.MensajeError();
    }
  }
}
